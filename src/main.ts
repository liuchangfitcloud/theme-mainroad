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

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.code === 'ArrowLeft') {
      imgPre()
    } else if (event.code === 'ArrowRight') {
      imgNext()
    }
  })
}

//代表图片
let imageList: string[] = []
// 展示图片集合
// const showImage = (idx: number, parent: HTMLElement) => {
//   const preEle: HTMLElement = document.querySelector(".overlay .pre") as HTMLElement;
//   const nextEle: HTMLElement = document.querySelector(".overlay .next") as HTMLElement;
//   imageList = []
//   const images = parent.querySelectorAll('img');
//   if (images) { 
//     images.forEach((img: HTMLElement) => {
//       const src = img.getAttribute('src');
//       if (src) {
//         imageList.push(src);
//       }
//     })
//     showPreNextBtn(preEle, nextEle, idx, imageList.length)
//     const imageBox = document.querySelector(".image-box");
//     imageBox?.querySelector('img')?.setAttribute('src', imageList[idx]);
//     imageBox?.querySelector('img')?.setAttribute('data-index', idx + "")
//     imageBox?.parentElement?.classList.toggle('show')
//   }
// }

//上一个照片
const imgPre = () => {
  const preEle: HTMLElement = document.querySelector(".overlay .pre") as HTMLElement;
  const nextEle: HTMLElement = document.querySelector(".overlay .next") as HTMLElement;
  const imageBox = document.querySelector(".image-box");
  const currentIndex = imageBox?.querySelector('img')?.getAttribute('data-index')
  const index: number = Number(currentIndex) - 1
  if (currentIndex && index > -1) {
    const imageSrc = imageList[index]
    showPreNextBtn(preEle, nextEle, index, imageList.length)
    imageBox?.querySelector('img')?.setAttribute('src', imageSrc);
    imageBox?.querySelector('img')?.setAttribute('data-index', index + "")
  }
}

//下一个照片
const imgNext = () => {
  const preEle: HTMLElement = document.querySelector(".overlay .pre") as HTMLElement;
  const nextEle: HTMLElement = document.querySelector(".overlay .next") as HTMLElement;
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

const closeImagewindow = (win:HTMLElement) => {
  win.classList.toggle('show')
}

// 另外一个方法
const showImage = (e: HTMLElement) => {
  const preEle: HTMLElement = document.querySelector(".overlay .pre") as HTMLElement;
  const nextEle: HTMLElement = document.querySelector(".overlay .next") as HTMLElement;
  const parentNodeName: string = e.dataset.parentNode as string;
  const hisIndex = e.dataset.index;
  const src: string = e.dataset.src as string;
  let idx:any = hisIndex ? hisIndex : 0;
  const parentNode = document.querySelector("#"+parentNodeName);
  if (parentNode) {
    imageList = []
    const images = parentNode.querySelectorAll('img');
    images.forEach((img: HTMLElement, index: number) => {
      const imgSrc:string = img.dataset.src as string;
      imageList.push(imgSrc)
      if (!hisIndex) {
        if (imgSrc === src) {
          idx = index
        }
      }
    })
    showPreNextBtn(preEle, nextEle, idx, imageList.length)
    const imageBox = document.querySelector(".image-box");
    imageBox?.querySelector('img')?.setAttribute('src', imageList[idx]);
    imageBox?.querySelector('img')?.setAttribute('data-index', idx + "")
    imageBox?.parentElement?.classList.toggle('show')
  }
}

const showVideo = (current: HTMLElement)=>{
  const videoSrc = current.dataset.videoSrc as string;
  const videoBox = document.querySelector(".video-box");
  videoBox?.querySelector('video')?.setAttribute('src', videoSrc);
  videoBox?.parentElement?.classList.toggle('show')
}

const showComment = (current:HTMLElement) => {
  const commentId = current.dataset.commentId;
  const commentEle = document.querySelector("#" + commentId);
  commentEle?.classList.toggle("show")
}

window.showImage = showImage
window.imgPre = imgPre
window.imgNext = imgNext
window.closeImagewindow = closeImagewindow
window.showComment = showComment
window.showVideo = showVideo

window.addEventListener("DOMContentLoaded", init);

declare global {
  interface Window {
    showImage: any;
    imgPre: any;
    imgNext: any;
    closeImagewindow: any;
    showComment: any;
    showVideo: any;
  }
}