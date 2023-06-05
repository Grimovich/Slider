// eslint-disable-next-line no-undef
const carousel = new SwipeCarousel();

carousel.init();

$(document).ready(() => {
  $('.header-navbar__btn').on('click', function () {
    // eslint-disable-next-line no-invalid-this
    $(this).toggleClass('-active');
    $('.header-navbar__list').toggleClass('-active');
  });
});
