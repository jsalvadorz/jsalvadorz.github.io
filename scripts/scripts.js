/* Features */

(function($, fnFrontend) { 
"use strict";

    var theme_elements = {

        init: function() {

            var widgets = {
                'work-clients.default' : theme_elements.clients,
                'hard-skills.default' : theme_elements.skills,
                'home-page-second.default' : theme_elements.textRotation,
            };

            $.each( widgets, function( widget, callback ) {
                fnFrontend.hooks.addAction( 'frontend/element_ready/' + widget, callback );
            });
        },

        testimonials: function() {
            setTimeout(function(){
                var mobile_mode_items = "",
                    tablet_mode_items = "",
                    items = "";
                
                $( '.testimonials' ).each( function() {
                    var mobile_mode_items = $(this).attr('data-mobile-items'),
                        tablet_mode_items = $(this).attr('data-tablet-items'),
                        items = $(this).attr('data-items'),
                        id = $(this).attr('id'),
                        loop = false,
                        windowWidth = $(window).width(),
                        autoplayTablet = '',
                        autoplayValue = '';
                    if ($(this).hasClass('autoplay-on')) {
                        autoplayValue = true;
                        if ($(this).hasClass('autoplay-mobile')) {
                            if (windowWidth > 768) {
                                autoplayValue = false;
                            } else {
                                autoplayValue = true;
                            }
                        }
                    } else {
                        autoplayValue = false;
                    }

                    if ($(this).hasClass('loop-on')) {
                        loop = true;
                    } else {
                        loop = false;
                    }

                    $("#" + id + ".testimonials.owl-carousel").imagesLoaded().owlCarousel({
                        nav: true,
                        dots: false,
                        items: 1,
                        loop: loop,
                        autoplay: autoplayValue,
                        navText: false,
                        autoHeight: false,
                        margin: 10,
                        responsive : {
                            0 : {
                                items: mobile_mode_items,
                            },
                            768 : {
                                items: tablet_mode_items,
                            },
                            1200 : {
                                items: items,
                            }
                        }
                    });
                });
            },500);
        },

        clients: function() {
            setTimeout(function(){
                // Clients Slider
                var mobile_mode_items = "",
                    tablet_mode_items = "",
                    items = "";
                
                $( '.clients' ).each( function() {
                    var mobile_mode_items = $(this).attr('data-mobile-items'),
                        tablet_mode_items = $(this).attr('data-tablet-items'),
                        items = $(this).attr('data-items'),
                        id = $(this).attr('id'),
                        loop = false,
                        windowWidth = $(window).width(),
                        autoplayTablet = '',
                        autoplayValue = '';
                    if ($(this).hasClass('autoplay-on')) {
                        autoplayValue = true;
                        if ($(this).hasClass('autoplay-mobile')) {
                            if (windowWidth > 768) {
                                autoplayValue = false;
                            } else {
                                autoplayValue = true;
                            }
                        }
                    } else {
                        autoplayValue = false;
                    }

                    if ($(this).hasClass('loop-on')) {
                        loop = true;
                    } else {
                        loop = false;
                    }

                    $("#" + id + ".clients.owl-carousel").imagesLoaded().owlCarousel({
                        nav: true, // Show next/prev buttons.
                        items: 4, // The number of items you want to see on the screen.
                        loop: loop,
                        autoplay: autoplayValue,
                        navText: false,
                        margin: 10,
                        autoHeight: false,
                        responsive : {
                            // breakpoint from 0 up
                            0 : {
                                items: mobile_mode_items,
                            },
                            // breakpoint from 768 up
                            768 : {
                                items: tablet_mode_items,
                            },
                            1200 : {
                                items: items,
                            }
                        }
                    });
                });
            },500);
        },

        skills: function() {
            var $custom_styles = "",
                $custom_style = "";
            
            function skillsStyles() {
                $( '.skill-container' ).each( function() {
                    var value = $(this).attr('data-value'),
                        color_value_left = $(this).attr('data-color-left'),
                        color_value_right = $(this).attr('data-color-right'),
                        $id = $(this).attr('id');

                    if( value >= 101) {
                        value = '100';
                    }

                    if( typeof value != 'undefined' ) {
                        $custom_style = '#' + $id + ' .skill-percentage { width: ' + value + '%; background-image: linear-gradient(to right, ' + color_value_left + ', ' + color_value_right +'); } ';
                        $custom_styles += $custom_style;
                    }
                });
                $('head').append('<style data-styles="theme_elements-theme-skills-css" type="text/css">' + $custom_styles + '</style>');
            }

            skillsStyles();

            $(this).ajaxComplete(function() {
                $('style[data-styles="theme_elements-theme-skills-css"]').remove().detach();
                skillsStyles();
            });
        },

        updateScroll: function() {
            $('.animated-section, .single-page-content').each(function() {
                $(this).perfectScrollbar('update');
            });

        },

        textRotation: function() {
            $('.text-rotation').owlCarousel({
                loop: true,
                dots: false,
                nav: false,
                margin: 10,
                items: 1,
                autoplay: true,
                autoplayHoverPause: true,
                autoplayTimeout: 3000,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn'
            });
        },

    }
    $( window ).on( 'elementor/frontend/init', theme_elements.init );
    $( window ).on( 'elementor/frontend/init', theme_elements.updateScroll );
    $( window ).on( 'elementor/frontend/init', theme_elements.textRotation );
    $( window ).on('resize',function(){
        theme_elements.testimonials();
        theme_elements.clients();
        theme_elements.updateScroll();
        theme_elements.textRotation();
    });
    $( window ).on('load',function(){
        theme_elements.updateScroll();
        theme_elements.textRotation();
    });
})(jQuery, window.elementorFrontend);