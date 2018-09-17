$(document).ready(function() {
	
	$('.navigation').on('click', function(e) {
		$(this).toggleClass('active');
		$('.site-nav').toggleClass('is-visible');
	});

});