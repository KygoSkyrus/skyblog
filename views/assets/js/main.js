(function ($) {
	"use strict";

	$(document).ready(function () {
		/**-----------------------------
		 *  Post Slider Control Inside
		 * ---------------------------*/
		let incontrol = $(".post-slider-incontrol");
		if (incontrol.length) {
			incontrol.slick({
				mobileFirst: true,
				prevArrow:
					'<button type="button" class="news-scroll__arrow news-scroll__prev news-scroll__prev-zeta"><span class="news-scroll__icon"><i class="las la-long-arrow-alt-left"></i></span></button>',
				nextArrow:
					'<button type="button" class="news-scroll__arrow news-scroll__next news-scroll__next-zeta"><span class="news-scroll__icon"><i class="las la-long-arrow-alt-right"></i></span></button>',
			});
		}
		/**-----------------------------
		 *  Post Nav Menu
		 * ---------------------------*/
		$(document).on("click", ".post-nav__bar", function (e) {
			e.preventDefault();
			$(".post-nav__list").toggleClass("active");
			$('.la-bars').toggleClass('d-none');
			$('.la-times').toggleClass('d-none');
		});
		/**-----------------------------
		 *  News Scroll Slider
		 * ---------------------------*/
		let newsScroll = $(".news-scroll");
		if (newsScroll.length) {
			newsScroll.slick({
				mobileFirst: true,
				prevArrow:
					'<button type="button" class="news-scroll__arrow news-scroll__prev news-scroll__prev-delta"><span class="news-scroll__icon"><i class="las la-long-arrow-alt-left"></i></span></button>',
				nextArrow:
					'<button type="button" class="news-scroll__arrow news-scroll__next news-scroll__next-delta"><span class="news-scroll__icon"><i class="las la-long-arrow-alt-right"></i></span></button>',
				responsive: [
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 3,
						},
					},
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 4,
						},
					},
				],
			});
		}
		/**-----------------------------
		 *  Post Slider
		 * ---------------------------*/
		let postSlider = $(".post-slider");
		if (postSlider.length) {
			postSlider.slick({
				mobileFirst: true,
				autoplay: true,
				autoplaySpeed: 300,
				arrows: false,
				speed: 4000,
				fade: true,
				responsive: [
					{
						breakpoint: 991,
						settings: {
							dots: true,
						},
					},
				],
			});
		}
		/**-----------------------------
		 *  Breaking News Slider
		 * ---------------------------*/
		let breakingSlider = $(".breaking-news__headline-slider");
		
		if(breakingSlider.length) {
			breakingSlider.jConveyorTicker({
				anim_duration:   200
			});
		}
		/**-----------------------------
		 *  Nice Select
		 * ---------------------------*/
		$("select").niceSelect();

		
		/**-----------------------------
		 *  Navbar fix
		 * ---------------------------*/
		$('.navbars__list-item-has-sub .navbars__list-link').on('click', function(e){
			e.preventDefault();
		})
		/**-----------------------------
		 *  Hamburger Icon Click fix
		 * ---------------------------*/

		$(document).on("click", ".navbars__hamburger", function (e) {
			e.preventDefault();
			$(".navbars__menu").addClass("active");
		});
		$(".navbars__cross").on("click", function () {
			$(".navbars__menu").removeClass("active");
		});

		// back to top
		$(document).on("click", ".back-to-top", function () {
			$("html,body").animate(
				{
					scrollTop: 0,
				},
				2000
			);
		});
	});
})(jQuery);

$(window).on("scroll", function () {
	var ScrollTop = $(".back-to-top");
	if ($(window).scrollTop() > 3000) {
		ScrollTop.fadeIn(1000);
	} else {
		ScrollTop.fadeOut(1000);
	}
});

$(window).on("load", function () {
	/*-----------------
        preloader
    ------------------*/
	var preLoder = $(".preloader");
	preLoder.fadeOut(1000);
});
