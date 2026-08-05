document.addEventListener("DOMContentLoaded", function(){

const menuBtn = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");


if(menuBtn && navMenu){

    menuBtn.addEventListener("click", function(){

        navMenu.classList.toggle("active");

    });

}



document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function(){

        if(navMenu){

            navMenu.classList.remove("active");

        }

    });

});


window.addEventListener("scroll", function(){

    const header = document.querySelector("#header");

    if(header){

        if(window.scrollY > 50){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    }

});


});