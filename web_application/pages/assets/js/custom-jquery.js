(function ($) {
	"use strict";

  jQuery(document).ready(function($){

    // ========= Mobile menu =========
    //------ SlickNav Mobile-menu
    $("#mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        duration: 500,
        label: ''
    });

    // wow js
    // ===============================
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 250, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }

    // Slick Slider for 
    // ===============================
    $('.newest-item-slider-wrapper').slick({
      infinite: true,
      margin: 50,
      slidesToShow: 2,
      slidesToScroll: 2,
      arrows: true,
          prevArrow: '<span class="prev"><i class="fa fa-chevron-left"></i></span>',
          nextArrow: '<span class="next"><i class="fa fa-chevron-right"></i></span>', 
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ]
    });

    // Slick Slider for Related Products
    // ===================================
    $('.related-products-slider').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 2,
      arrows: true,
          prevArrow: '<span class="prev"><i class="fa fa-chevron-left"></i></span>',
          nextArrow: '<span class="next"><i class="fa fa-chevron-right"></i></span>', 
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
          ]
    });


      // ================================
      // About page Counter
      // ================================
      jQuery(window).scroll(startCounter);
      function startCounter() {
          var countDiv = jQuery('.company-details-number');
          if (countDiv.length) {
            var hT = countDiv.offset().top,
                hH = jQuery('.company-details-number').outerHeight(),
                wH = jQuery(window).height();
            if (jQuery(window).scrollTop() > hT+hH-wH) {
                jQuery(window).off("scroll", startCounter);
                jQuery('.c-d-n').each(function () {
                    var $this = jQuery(this);
                    jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
                        duration: 6000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.ceil(this.Counter) );
                        }
                    });
                });
            }
          }  
      }






  }); 
// End of jquery ready


}(jQuery));	
// End of Jquery


