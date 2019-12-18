import '../styles/about.css';

import Swiper from 'swiper';
import Flickity from 'flickity';
import Glide from '@glidejs/glide';

let flkty = new Flickity( '.main-carousel', {
  // options
});

const glider = new Glide('.glide', {
  // type: 'carousel',
  startAt: 0,
  perView: 3,
})



glider.enable()

glider.mount();

let commitSwiper = new Swiper('.history__container', {
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    // clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed: 1000,
  spaceBetween: 16,
  setWrapperSize: true,

  slidesPerView: 4,
  slidesPerGroup: 3,
  centeredSlides: true,
  centeredSlidesBounds: true,
  // updateOnWindowResize: true,
  centerInsufficientSlides: true,
});

commitSwiper.width = 50;
