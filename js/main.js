$(document).ready(function() {
	
	// Navigation
	$('.navigation').on('click', function(e) {
		$(this).toggleClass('active');
		$('.site-nav').toggleClass('is-visible');
	});

	// Slick Slider for updates
	$('.updates').slick({
		dots: true,
	});

	// Slick Slider for updates
	$('.cards').slick({
		dots: true,
	});


});