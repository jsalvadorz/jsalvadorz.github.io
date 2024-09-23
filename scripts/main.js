/* Main Script */

(function($) {
"use strict";
    var body = $('body');

    function imageCarousel() {
        $('.portfolio-page-carousel').each(function() {
            $(this).imagesLoaded(function () {
                $('.portfolio-page-carousel').owlCarousel({
                    smartSpeed:1200,
                    items: 1,
                    loop: true,
                    dots: true,
                    nav: true,
                    navText: false,
                    autoHeight: true,
                    margin: 10
                });
            });
        });
    }

    
    // Custom scroll
    function customScroll() {
        var windowWidth = $(window).width();
        if (windowWidth > 1024) {
            $('.animated-section, .single-page-content').each(function() {
                $(this).perfectScrollbar();
            });
        } else {
            $('.animated-section, .single-page-content').each(function() {
                $(this).perfectScrollbar('destroy');
            });
        }
    }
    // /Custom scroll

    // Hide Mobile menu
    function mobileMenuHide() {
        var windowWidth = $(window).width(),
            siteHeader = $('#site_header');

        if (windowWidth < 1025) {
            siteHeader.addClass('mobile-menu-hide');
            $('.menu-toggle').removeClass('open');
            setTimeout(function(){
                siteHeader.addClass('animate');
            }, 500);
        } else {
            siteHeader.removeClass('animate');
        }
    }
    // /Hide Mobile menu

    // Custom scroll
    function updateScroll() {
        $('.animated-section, .single-page-content').each(function() {
            $(this).perfectScrollbar('update');
        });
    }
    // /Custom scroll

    // Portfolio subpage filters
    function portfolio_init() {
        $( '.portfolio-content' ).each( function() {
            var portfolio_grid_container = $(this),
                portfolio_grid_container_id = $(this).attr('id'),
                portfolio_grid = $('#' + portfolio_grid_container_id + ' .portfolio-grid'),
                portfolio_filter = $('#' + portfolio_grid_container_id + ' .portfolio-filters'),
                portfolio_filter_item = $('#' + portfolio_grid_container_id + ' .portfolio-filters .filter');
                
            if (portfolio_grid) {

                portfolio_grid.shuffle({
                    speed: 450,
                    itemSelector: 'figure'
                });

                $('.site-auto-menu').on("click", "a", function (e) {
                    portfolio_grid.shuffle('update');
                });

                portfolio_filter.on("click", ".filter", function (e) {
                    portfolio_grid.shuffle('update');
                    e.preventDefault();
                    portfolio_filter_item.parent().removeClass('active');
                    $(this).parent().addClass('active');
                    portfolio_grid.shuffle('shuffle', $(this).attr('data-group') );
                });

            }
        })
    }
    // /Portfolio subpage filters

    // Animate layout
    function animateLayout() {
        var windowWidth = $(window).width(),
            animatedContainer = '',
            blogSidebar = $(".blog-sidebar"),
            animateType = $('#page_container').attr('data-animation')

        if (windowWidth > 1024) {
            animatedContainer = $(".page-container");
        } else {
            animatedContainer = $(".site-main");
        }

        animatedContainer.addClass("animated " + animateType);
        $('.page-scroll').addClass('add-prespective');
        animatedContainer.addClass('transform3d');
        setTimeout(function() {
            blogSidebar.removeClass("hidden-sidebar");
            $('.page-scroll').removeClass('add-prespective');
            animatedContainer.removeClass('transform3d');
        }, 1000);
    }
    // /Animate layout

    //On Window load & Resize
    $(window)
        .on('load', function() { //Load
            // Animation on Page Loading
            $(".preloader").fadeOut( 800, "linear" );
            animateLayout();

             // initializing page transition.
            var ptPage = $('.animated-sections');
                if (ptPage[0]) {
                    PageTransitions.init({
                        menu: 'ul.main-menu',
                    });
                }
            })
        .on('resize', function() { //Resize
            updateScroll();
            customScroll();
        });


    // On Document Load
    $(document).on('ready', function() {
        var movementStrength = 15;
        var height = movementStrength / $(document).height();
        var width = movementStrength / $(document).width();

        customScroll();

        // Initialize Portfolio grid
        var $portfolio_container = $(".portfolio-grid"),
            $gallery_container = $("#portfolio-gallery-grid");

        $portfolio_container.imagesLoaded(function () {
            portfolio_init(this);
        });

        imageCarousel();

        // Mobile menu
        $('.menu-toggle').on("click", function () {
            $('#site_header').addClass('animate');
            $('#site_header').toggleClass('mobile-menu-hide');
            $('.menu-toggle').toggleClass('open');
        });

        // Mobile menu hide on main menu item click
        $('.main-menu').on("click", "a", function (e) {
            mobileMenuHide();
        });

        $('body').append('<div id="page-ajax-loaded" class="page-portfolio-loaded animated animated-section-moveFromLeft" style="display: none"><div class="preloader-portfolio"><div class="preloader-animation"><div class="preloader-spinner"></div></div></div></div>');
        ajaxLoader();

        // Sidebar toggle
        $('.sidebar-toggle').on("click", function () {
            $('#blog-sidebar').toggleClass('open');
            $(this).toggleClass('open');
        });

    });

})(jQuery);