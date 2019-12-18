import '../styles/about.css';
// import '../../node_modules/swiper/js/swiper.min.js';
import Swiper from 'swiper';

var commitSwiper = new Swiper('.history__container', {
  // Optional parameters
  direction: 'horizontal',
  loop: false,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  speed: 400,
  spaceBetween: 16,
  setWrapperSize: true,

  // slidesPerView: 4,
  // slidesPerGroup: 3,
  centeredSlides: true,
  updateOnWindowResize: true,
  centeredSlidesBounds: true,
});

commitSwiper.slides
commitSwiper.width = 50;
