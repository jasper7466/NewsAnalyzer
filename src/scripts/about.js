import '../styles/about.css';
// import '../../node_modules/swiper/js/swiper.min.js';
import Swiper from 'swiper';

var mySwiper = new Swiper('.history__container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

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
});
