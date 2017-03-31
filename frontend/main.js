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
		resizeAlign = new OnResize,
		scrollTiming = 0,
		scrollTimingH = 0;

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
******** SLIDER ********
************************/

$('.partner-slider').slick({
	prevArrow: $('.partner-left'),
	nextArrow: $('.partner-right'),
	slidesToShow: 6
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

	$('.accordion').on('mouseover','.accordion__item',function(){
		$(this).siblings().removeClass('accordion__item_act');
		$(this).addClass('accordion__item_act');
	});

}

$('.reason').ravno();

/**************************
******** Top search *******
***************************/

$('#topSearch').click(function(e){

	e.preventDefault();

	$(this).hide();

	$(this).next().animate({
		width: "190px",
		paddingLeft: "show",
		paddingRight: "show",
		marginLeft: "show",
		marginRight: "show"
	});




});
