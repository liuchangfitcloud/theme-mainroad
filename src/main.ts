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

const init = () => {
  const menuBtn = document.querySelector('.menu__btn');
  const menu = document.querySelector('.menu__list');
  menuBtn?.addEventListener('click', toggleMenu, false);
  menu?.addEventListener('transitionend', removeMenuTransition, false);
}

window.addEventListener("DOMContentLoaded", init);

