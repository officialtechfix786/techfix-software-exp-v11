/* =====================================
   TECHFIX SOFTWARE EXP
   Navigation System
   Part 1
===================================== */


document.addEventListener("DOMContentLoaded", function(){


"use strict";



/* ==============================
   VARIABLES
============================== */


const header = document.querySelector("#header");

const menuBtn = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-links");

const navLinks = document.querySelectorAll(".nav-links a");



/* ==============================
   CHECK ELEMENTS
============================== */


if(!header){

    console.log("Header not found");

}



if(!navMenu){

    console.log("Navigation menu not found");

}





/* ==============================
   MOBILE MENU
============================== */


if(menuBtn && navMenu){


menuBtn.addEventListener("click", function(){


    navMenu.classList.toggle("active");


    menuBtn.classList.toggle("open");


});


}






/* ==============================
   CLOSE MENU ON LINK CLICK
============================== */


navLinks.forEach(function(link){


link.addEventListener("click", function(){


    if(navMenu){

        navMenu.classList.remove("active");

    }


    if(menuBtn){

        menuBtn.classList.remove("open");

    }


});


});







/* ==============================
   ACTIVE PAGE
============================== */


let currentPage = window.location.pathname.split("/").pop();



if(currentPage === ""){

    currentPage = "index.html";

}



navLinks.forEach(function(link){


let linkPage = link.getAttribute("href");



if(linkPage === currentPage){


    link.classList.add("active");


}



});







/* ==============================
   SCROLL HEADER EFFECT
============================== */


window.addEventListener("scroll", function(){


if(header){


    if(window.scrollY > 50){


        header.classList.add("scrolled");


    }else{


        header.classList.remove("scrolled");


    }


}



});






});
/* =====================================
   OUTSIDE CLICK CLOSE MENU
===================================== */


document.addEventListener("click", function(e){


const target = e.target;



if(navMenu && menuBtn){



if(
!navMenu.contains(target) &&
!menuBtn.contains(target)

){


navMenu.classList.remove("active");


menuBtn.classList.remove("open");



}



}



});







/* =====================================
   ESC KEY CLOSE MENU
===================================== */


document.addEventListener("keydown", function(e){



if(e.key === "Escape"){



if(navMenu){


navMenu.classList.remove("active");


}



if(menuBtn){


menuBtn.classList.remove("open");


}



}



});








/* =====================================
   SMOOTH SCROLL LINKS
===================================== */


const smoothLinks = document.querySelectorAll(
'a[href^="#"]'
);



smoothLinks.forEach(function(link){



link.addEventListener(
"click",
function(e){



let targetID = this.getAttribute("href");



if(targetID !== "#"){



let section = document.querySelector(targetID);



if(section){



e.preventDefault();



section.scrollIntoView({

behavior:"smooth"

});



}



}



});



});








/* =====================================
   NAVIGATION LOADING EFFECT
===================================== */


if(navMenu){


navMenu.classList.add("loaded");



}




/* =====================================
   WINDOW RESIZE FIX
===================================== */


window.addEventListener(
"resize",
function(){



if(window.innerWidth > 900){



if(navMenu){


navMenu.classList.remove("active");


}



if(menuBtn){


menuBtn.classList.remove("open");


}



}



});


/* =====================================
   ACTIVE LINK UPDATE ON LOAD
===================================== */


function updateActiveLink(){


let path = window.location.pathname;



navLinks.forEach(function(link){



let href = link.getAttribute("href");



if(
path.includes(href)
){



link.classList.add("active");



}else{



link.classList.remove("active");



}



});



}



updateActiveLink();








/* =====================================
   PREVENT EMPTY LINKS
===================================== */


navLinks.forEach(function(link){



link.addEventListener(
"click",
function(e){



let url = this.getAttribute("href");



if(!url || url === "#"){



e.preventDefault();



}



});



});








/* =====================================
   ADD NAVIGATION READY CLASS
===================================== */


document.body.classList.add(
"navigation-ready"
);








/* =====================================
   PAGE VISIBILITY CHECK
===================================== */


document.addEventListener(
"visibilitychange",
function(){



if(document.visibilityState === "visible"){



document.body.classList.add(
"page-active"
);



}else{



document.body.classList.remove(
"page-active"
);



}



});








/* =====================================
   END OF TECHFIX NAVIGATION SYSTEM
===================================== */


})