import SwipeCarousel from './swipe-carousel.js';

const carousel = new SwipeCarousel({
  // containerID: '.carousel',
  // slideID: '.slide',
  // interval: 2000,
  // isPlaying: true
});

carousel.init();

$(document).ready(() => {
  $('.header-navbar__btn').on('click', function () {
    // eslint-disable-next-line no-invalid-this
    $(this).toggleClass('-active');
    $('.header-navbar__list').toggleClass('-active');
  });
});
