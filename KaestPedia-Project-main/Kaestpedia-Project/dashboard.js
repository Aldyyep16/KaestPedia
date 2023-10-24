$(document).ready(function() {
    $(window).on('scroll', function() {
      if (Math.round($(window).scrollTop()) > 100) {
        $('.navbar').addClass('scrolled');
      } else {
        $('.navbar').removeClass('scrolled');
      }
    });
  });


  

/* Hovercard CSS & jQuery

via: http://designwithpc.com/post/9627254593/simple-yet-sexy-hovercard-with-minimum-css
*/