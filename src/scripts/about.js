import '../styles/about.css';
// import '../../node_modules/swiper/js/swiper.min.js';
import Swiper from 'swiper';
import Flickity from 'flickity';

let flkty = new Flickity( '.main-carousel', {
  // options
});

var commitSwiper = new Swiper('.history__container', {
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
