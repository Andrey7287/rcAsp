'use strict';

/* Make jQuery available in global */
console.log(`jQuery ${$.fn.jquery} is loaded`);
window.$ = $;
window.jQuery = $;


/* Import project styles and components */
require('script-loader!slick-carousel');
import '../sass/css.scss';
import OnResize from './modules/resize';
import ravno from './modules/ravno';
import scrollup from './modules/scrollup';

/* Define project components and variables */
var	isMap = $('#map').is('#map'),
		isAccordion = $('.accordion').is('.accordion'),
		mobileView = window.matchMedia("(max-width: 768px)").matches,
		resizeReasons = new OnResize(true),
		scrollTiming = 0;

resizeReasons.bind(()=>$('.reason').ravno());

/************************
****** Mobile menu ******
*************************/

$('.c-hamburger').on('click', function(){
	$(this).toggleClass('is-active');
	$('.site-nav').slideToggle();
});


/**********************
********* MAP *********
***********************/

if ( isMap ) {

	require.ensure([], (require) => {
		require('./modules/ymap');
	}, 'map');

}

/***********************
******** SLIDERS ********
************************/

$('.partner-slider').slick({
	prevArrow: $('.partner-left'),
	nextArrow: $('.partner-right'),
	slidesToShow: 6,
	responsive: [{

		breakpoint: 1200,
		settings: {
			slidesToShow: 5
		}

	},{

		breakpoint: 992,
		settings: {
			slidesToShow: 4
		}

	},{

		breakpoint: 640,
		settings: {
			slidesToShow: 3
		}

	},{

		breakpoint: 480,
		settings: {
			slidesToShow: 2
		}

	},{

		breakpoint: 360,
		settings: {
			slidesToShow: 1
		}

	}]
});

$('.discont-slider').slick({
	prevArrow: $('.discont-left'),
	nextArrow: $('.discont-right'),
	slidesToShow: 4,
	responsive: [{

		breakpoint: 992,
		settings: {
			slidesToShow: 3
		}

	},{

		breakpoint: 768,
		settings: {
			slidesToShow: 2
		}

	},{

		breakpoint: 480,
		settings: {
			slidesToShow: 1
		}

	}]
});

$('.news-slider').slick({
	prevArrow: $('.news-left'),
	nextArrow: $('.news-right'),
	slidesToShow: 4,
	responsive: [{

		breakpoint: 992,
		settings: {
			slidesToShow: 3
		}

	},{

		breakpoint: 768,
		settings: {
			slidesToShow: 2
		}

	},{

		breakpoint: 480,
		settings: {
			slidesToShow: 1
		}

	}]
});



/************************
******* Scroll Up *******
*************************/

$(document).scroll(function(){

	if ( !scrollTiming ) {

		scrollTiming = setTimeout(function(){

			var scroll = $('body').scrollTop() ? $('body').scrollTop() : $('html').scrollTop();
			scroll >= 300 ? $('.scrollup').addClass('act') : $('.scrollup').removeClass('act');
			scrollTiming = 0;

		},300);

	}

});

$('.scrollup').scrollUp();

/**************************
****** Smooth scroll ******
***************************/

$('a[href^="#"]').click(function(e){

	e.preventDefault();

	var target = $(this).attr('href'),
			//headerHeight = $('header').outerHeight(),
			scrollTo = $(''+target).offset().top;

	$('html, body').animate({scrollTop: scrollTo}, 800);

});

/**************************
******** Accordion ********
***************************/

if ( isAccordion ){
	var timing,
			slideAccordion = function (item, timing){
				item.siblings().removeClass('accordion__item_act');
				item.addClass('accordion__item_act');
			};

	$('.accordion').on('mouseover','.accordion__item',function(){

		var item = $(this);
		clearInterval(timing);

		timing = setTimeout(function(){
			slideAccordion(item, timing);
		}, 200)

	});

}

/**************************
******** Top search *******
***************************/

$('#topSearch').click(function(e){

	e.preventDefault();

	$(this).hide();
	$(this).closest('.control-panel').addClass('collaps');
	$(this).next().animate({
		width: "100%",
		paddingLeft: "show",
		paddingRight: "show",
		marginLeft: "show",
		marginRight: "show"
	});

});
