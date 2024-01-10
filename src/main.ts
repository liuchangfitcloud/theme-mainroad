import "./css/core.css";


const toggleMenu = (event:Event) => {
  const menu = document.querySelector('.menu__list');
  menu?.classList.toggle('menu__list--active');
  menu?.classList.toggle('menu__list--transition');
  const target = event.currentTarget as Element
  target.classList.toggle('menu__btn--active');
  target.setAttribute(
    'aria-expanded',
    target.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
  );
}

const removeMenuTransition = (event: Event) => {
  const target = event.target as Element
  target.classList.remove('menu__list--transition');
}

const showPreNextBtn = (preEle:HTMLElement,nextEle:HTMLElement,index:number,total:number) => {
  if (index == 0) {
    preEle.style.display = 'none'
  } else {
    preEle.style.display = 'block'
  }
  if (index === total -1) {
    nextEle.style.display = 'none'
  } else {
    nextEle.style.display = 'block'
  }
}

const init = () => {
  const menuBtn = document.querySelector('.menu__btn');
  const menu = document.querySelector('.menu__list');
  menuBtn?.addEventListener('click', toggleMenu, false);
  menu?.addEventListener('transitionend', removeMenuTransition, false);

  const images = document.querySelectorAll(".photos_content_img > img");
  if (images) {
    const preEle: HTMLElement = document.querySelector(".overlay .pre") as HTMLElement;
    const nextEle: HTMLElement = document.querySelector(".overlay .next") as HTMLElement;
    const imageList:string[] = [];
    images.forEach((img: Element, index: number) => {
      const imageSrc = img.getAttribute("src");
      if (imageSrc) {
        imageList.push(imageSrc)
      }
      img.addEventListener("click", function () { 
        //判断是否显示这个玩意
        showPreNextBtn(preEle, nextEle, index, imageList.length)
        const imageBox = document.querySelector(".image-box");
        if (imageSrc) {
          imageBox?.querySelector('img')?.setAttribute('src', imageSrc);
          imageBox?.querySelector('img')?.setAttribute('data-index',index+"")
          imageBox?.parentElement?.classList.toggle('show')

          //触发按钮
          window.addEventListener('keydown', function (event: KeyboardEvent) {
            if (event.code === 'ArrowLeft') {
              const imageBox = document.querySelector(".image-box");
              const currentIndex = imageBox?.querySelector('img')?.getAttribute('data-index')
              const index: number = Number(currentIndex) - 1
              if (currentIndex && index > -1) {
                const imageSrc = imageList[index]
                showPreNextBtn(preEle, nextEle, index, imageList.length)
                imageBox?.querySelector('img')?.setAttribute('src', imageSrc);
                imageBox?.querySelector('img')?.setAttribute('data-index', index + "")
              }
            } else if (event.code === 'ArrowRight') {
              const imageBox = document.querySelector(".image-box");
              const currentIndex = imageBox?.querySelector('img')?.getAttribute('data-index')
              const index: number = Number(currentIndex) + 1
              if (currentIndex && index < imageList.length) {
                const imageSrc = imageList[index]
                showPreNextBtn(preEle, nextEle, index, imageList.length)
                imageBox?.querySelector('img')?.setAttribute('src', imageSrc);
                imageBox?.querySelector('img')?.setAttribute('data-index', index + "")
              }
            }
          });

          
        }
      })
    })
    //上一步
    preEle.addEventListener('click', function () {
      const imageBox = document.querySelector(".image-box");
      const currentIndex = imageBox?.querySelector('img')?.getAttribute('data-index')
      const index: number = Number(currentIndex) - 1
      if (currentIndex && index > -1) {
        const imageSrc = imageList[index]
        showPreNextBtn(preEle, nextEle, index, imageList.length)
        imageBox?.querySelector('img')?.setAttribute('src', imageSrc);
        imageBox?.querySelector('img')?.setAttribute('data-index', index + "")
      }
    })
    //下一步
    nextEle.addEventListener('click', function () {
      const imageBox = document.querySelector(".image-box");
      const currentIndex = imageBox?.querySelector('img')?.getAttribute('data-index')
      const index: number = Number(currentIndex) + 1
      if (currentIndex && index < imageList.length) {
        const imageSrc = imageList[index]
        showPreNextBtn(preEle, nextEle, index, imageList.length)
        imageBox?.querySelector('img')?.setAttribute('src', imageSrc);
        imageBox?.querySelector('img')?.setAttribute('data-index', index + "")
      }
    })
  }

  document.querySelector(".close-btn")?.addEventListener("click", function (event: Event) {
    const closeBtn: HTMLElement = event.currentTarget as HTMLElement;
    closeBtn.parentElement?.classList.toggle('show')
    window.removeEventListener('keydown', () => {
      console.log("remove keydown event")
    })
  })
}

window.addEventListener("DOMContentLoaded", init);

