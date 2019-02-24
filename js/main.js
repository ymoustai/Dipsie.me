(function ($) {
	"use strict";
	jQuery(document).ready(function ($) {
		// fullpage menu
		$('.navbar-toggles').click(function () {
			$('.navbar-toggles').toggleClass('navbar-on');
			$('nav').fadeToggle();
		});
		// mouse follower remove area
		$("li, a, button, input, textarea, .navbar-toggles").mouseenter(function () {
			$("#follower").css("opacity", "0");
			$("li, a, button, input, textarea, .navbar-toggles").mouseleave(function () {
				$("#follower").css("opacity", "1");
			});
		});
		// On scroll header effect
		$('.on-scroll').scrollClass({
			callback: function () {
				jQuery('.skillbar.active').each(function () {
					jQuery(this).find('.skillbar-bar').animate({
						width: jQuery(this).attr('data-percent')
					}, 2000);
				});
			}
		});
		//project filter function
		$(".project-titles li").on('click', function () {
			$(".project-titles li").removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$(".project-list").isotope({
				filter: selector
			});
		});
		//select language add/remone function
		$(".secect-language li a").on('click', function () {
			$(".secect-language li a").removeClass('active');
			$(this).addClass('active');
		});
		//one page nav
		$('#nav').onePageNav({
			currentClass: 'current',
			changeHash: false,
			scrollSpeed: 750
		});
		//header sticker
		$("#sticker").sticky({
			topSpacing: 0,
			bottomSpacing: 0,
		});
		// SMOOTH SCROLLING
		$(function () {
			$("#mainmenu a[href*='#'], a[href*='#']").bind('click', function (event) {
				var $anchor = $(this);
				$('html, body').stop().animate({
					scrollTop: $($anchor.attr('href')).offset().top
				}, 1250);
				event.preventDefault();
			});
		});
		/*----------------------------
            SCROLL TO TOP
        ------------------------------*/
		$(window).scroll(function () {
			var $totalHeight = $(window).scrollTop();
			var $scrollToTop = $(".scrolltotop");
			if ($totalHeight > 300) {
				$(".scrolltotop").fadeIn();
			} else {
				$(".scrolltotop").fadeOut();
			}
			if ($totalHeight + $(window).height() === $(document).height()) {
				$scrollToTop.css("bottom", "90px");
			} else {
				$scrollToTop.css("bottom", "20px");
			}
		});
		$(".embed-responsive iframe").addClass("embed-responsive-item");
		$(".carousel-inner .item:first-child").addClass("active");
		$('[data-toggle="tooltip"]').tooltip();
		// service carosule
		$(".service-teatimonial").slick({
			infinite: true,
			dots: true,
			arrows: false,
			centerPadding: '10px',
			centerMode: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			}, {
				breakpoint: 770,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}, {
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});
		//testimonial carosule
		$(".jems-testi-active").slick({
			infinite: true,
			dots: true,
			arrows: false,
			centerPadding: '15px',
			centerMode: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: true
				}
			}, {
				breakpoint: 770,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}, {
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
		});
		//single portfolio slider
		$('.portfolio-slider-active').slick({
			dots: false,
			infinite: true,
			nextArrow: $('.portfolio-nav-right'),
			prevArrow: $('.portfolio-nav-left'),
			speed: 1000,
			fade: true,
			cssEase: 'linear',
			autoplay: true,
			autoplaySpeed: 2000,
		});
		//partner logo carosule
		$('.clinets-carosule-active').owlCarousel({
			loop: true,
			margin: 10,
			autoplay: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1,
				},
				600: {
					items: 3,
				},
				1000: {
					items: 5,
				}
			}
		});
		//isotope  
		$('#container').imagesLoaded(function () {
			$('.project-list').isotope({
				// set itemSelector so .grid-sizer is not used in layout
				itemSelector: '.grid-item',
				percentPosition: true,
				masonry: {
					// use element for option
					columnWidth: '.grid-item'
				}
			})
		});
		// mouse follow 
		var mouseX = 0,
			mouseY = 0,
			limitX = 150 - 15,
			limitY = 150 - 15;
		$('#fullpage').mousemove(function (e) {
			var offset = $('#fullpage').offset();
			mouseX = Math.min(e.pageX - offset.left, limitX);
			mouseY = Math.min(e.pageY - offset.top, limitY);
			if (mouseX < 0) mouseX = 0;
			if (mouseY < 0) mouseY = 0;
			mouseX = e.pageX;
			mouseY = e.pageY;
		});
		// cache the selector
		var follower = $("#follower");
		var xp = 0,
			yp = 0;
		var loop = setInterval(function () {
			// change 12 to alter damping higher is slower
			xp += (mouseX - xp) / 12;
			yp += (mouseY - yp) / 12;
			follower.css({
				left: xp - 15,
				top: yp - 15
			});
		}, 0);
	});
	// preloader
	$(window).on('load', function () {
		$('.preloder').fadeOut(3000);
		$('.preloader-wrapper').delay(2500).fadeOut('slow');
	});
}(jQuery));