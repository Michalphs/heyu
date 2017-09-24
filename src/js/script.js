'use strict';
(function() {

    var fixedNav = function fixedNav() {
        var nav = document.querySelector('.nav');
        if (window.scrollY > 1) {
            nav.classList.add('nav-fixed');
        } else {
            nav.classList.remove('nav-fixed');
        }
    }
    window.addEventListener('scroll', fixedNav);

    var hamburger = document.querySelector('.nav-hamburger');
    var slideDown = function slideDown() {
        var navList = document.querySelector(".nav-list");

        navList.classList.toggle('toggle-list');
    }
    var toggleButton = function toggleButton() {
        hamburger.classList.toggle('toggle-activ');
    }
    hamburger.addEventListener('click', slideDown);
    hamburger.addEventListener('click', toggleButton);
})();