'use strict'

const body = document.body;

window.addEventListener('load', () => {
    body.classList.add('loaded');
});

const preloaderType = body.getAttribute('data-preloader');
if (preloaderType === 'true') {
    const e = document.createElement('div');
    e.className = 'preloader';
    e.innerHTML = "<div class='loader'></div>";
    body.appendChild(e);
}

const cursor = document.querySelector('.cursor-gradient');
document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
});

const navList = document.querySelector('.nav-list');
if (navList) {
    const t = document.querySelector('.nav-toggle');
    t.addEventListener('click', () => {
        navList.classList.contains('show')
            ? (navList.classList.remove('show'), t.classList.remove('active'))
            : (navList.classList.add('show'), t.classList.add('active'));
    });
    document.addEventListener('click', e => {
        !e.target.closest('.nav-list, .nav-toggle') &&
            navList.classList.contains('show') &&
            (navList.classList.remove('show'), t.classList.remove('active'));
    });
}

const toggleMenu = document.querySelector('.toggle-menu');
if (toggleMenu) {
    const s = document.querySelector('.toggle-menu-btn');
    s.addEventListener('click', () => {
        toggleMenu.classList.contains('show')
            ? (toggleMenu.classList.remove('show'), s.classList.remove('active'))
            : (toggleMenu.classList.add('show'), s.classList.add('active'));
    });
    document.addEventListener('click', e => {
        !e.target.closest('.toggle-menu, .toggle-menu-btn') &&
            toggleMenu.classList.contains('show') &&
            (toggleMenu.classList.remove('show'), s.classList.remove('active'));
    });
}

const lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: false,
    autoplayVideos: true,
    videosWidth: '90vw',
    plyr: {
        config: {
            ratio: '16:9',
            muted: false,
            hideControls: false,
            youtube: {
                noCookie: true,
                rel: 0,
                showinfo: 0,
                iv_load_policy: 3
            }
        }
    }
});

const pGrid = $('.portfolio-grid');
if (pGrid.length) {
    mixitup('.portfolio-grid', {
        selectors: { target: '.portfolio-item' },
        animation: { duration: 250 },
    });
}

const bGrid = $('.blog-grid');
if (bGrid.length) {
    mixitup('.blog-grid', {
        selectors: { target: '.blog-item' },
        animation: { duration: 250 },
    });
}

$('.animated-progress div').each(function () {
    $(this).appear(() => {
        $(this).css('width', $(this).attr('data-progress') + '%');
        $(this).addClass('progress-show');
    }, {
        accX: 0,
        accY: -10,
    });
});

let swiper = new Swiper('.portfolio-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
        640: { slidesPerView: 1, spaceBetween: 30 },
        768: { slidesPerView: 1, spaceBetween: 40 },
        992: { slidesPerView: 2, spaceBetween: 40 },
        1200: { slidesPerView: 2, spaceBetween: 50 },
    },
    navigation: {
        nextEl: '.portfolio-next',
        prevEl: '.portfolio-prev',
    },
});

swiper = new Swiper('.sliding-text', {
    slidesPerView: 'auto',
    spaceBetween: 70,
    speed: 20000,
    loop: true,
    allowTouchMove: false,
    autoplay: {
        delay: 0,
        clickable: false,
        pauseOnMouseEnter: false,
        disableOnInteraction: false,
    },
});

swiper = new Swiper('.sliding-text-reverse', {
    slidesPerView: 'auto',
    spaceBetween: 70,
    speed: 20000,
    loop: true,
    allowTouchMove: false,
    autoplay: {
        delay: 0,
        clickable: false,
        pauseOnMouseEnter: false,
        disableOnInteraction: false,
        reverseDirection: true,
    },
});

document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.querySelector("#year");
    yearSpan.textContent = new Date().getFullYear();
});