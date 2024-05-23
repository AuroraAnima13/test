$(function () {
  $(".rightside-menu--close-btn").on("click", () => {
    $(".rightside-menu").addClass("rightside-menu--close")
  })

  $(".menu__btn").on("click", () => {
    $(".rightside-menu").removeClass("rightside-menu--close")
  })
  $(".top__slider").slick({
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3000,
  })
  $(".contact__slider-inner").slick({
    slidesToShow: 10,
    slidesToScroll: 10,
    dots: true,
    arrows: false,
  })
  $(".article-slider-box ").slick({
    prevArrow: `      <button
        type="button"
        class="article-slider__arrow article-slider__arrow-left"
      >
        <img src="images/prev.svg" alt="" />
      </button>
    `,
    nextArrow: `      <button
        type="button"
        class="article-slider__arrow article-slider__arrow-right"
      >
        <img src="images/next.svg" alt="" />
      </button>`,
  })

  let mixer = mixitup(".gallery__inner", {
    load: {
      filter: ".bedroom",
    },
  })
})
Fancybox.bind("[data-fancybox]", {
  // Your custom options
})
