"use strict";


/*
    TECHFIX SOFTWARE EXP v11
    ANIMATION ENGINE

    Handles:
    - Scroll reveal
    - Counters
    - Floating effects
    - Smooth UI animations
*/



document.addEventListener(
    "DOMContentLoaded",
    () => {



        /* =========================
           SCROLL REVEAL SYSTEM
        ========================= */


        const revealItems =
        document.querySelectorAll(
            ".reveal"
        );



        if(revealItems.length){


            const revealObserver =
            new IntersectionObserver(
                entries => {


                    entries.forEach(
                        entry => {


                            if(
                                entry.isIntersecting
                            ){


                                entry.target.classList.add(
                                    "active"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );


                            }


                        }
                    );


                },
                {
                    threshold:0.15
                }
            );



            revealItems.forEach(
                item => {


                    revealObserver.observe(
                        item
                    );


                }
            );


        }





        /* =========================
           COUNTER ANIMATION
        ========================= */


        const counters =
        document.querySelectorAll(
            "[data-count]"
        );



        counters.forEach(
            counter => {



                let started = false;



                const counterObserver =
                new IntersectionObserver(
                    entries => {



                        entries.forEach(
                            entry => {



                                if(
                                    entry.isIntersecting &&
                                    !started
                                ){


                                    started = true;



                                    let target =
                                    Number(
                                        counter.dataset.count
                                    );



                                    let current = 0;



                                    let speed =
                                    Math.max(
                                        target / 80,
                                        1
                                    );



                                    const update =
                                    () => {



                                        current += speed;



                                        if(
                                            current >= target
                                        ){


                                            counter.textContent =
                                            target;



                                            return;


                                        }



                                        counter.textContent =
                                        Math.floor(
                                            current
                                        );



                                        requestAnimationFrame(
                                            update
                                        );


                                    };



                                    update();



                                    counterObserver.unobserve(
                                        counter
                                    );


                                }



                            }
                        );


                    },
                    {
                        threshold:0.5
                    }
                );



                counterObserver.observe(
                    counter
                );


            }
        );







        /* =========================
           FLOATING EFFECT
        ========================= */


        const floatingElements =
        document.querySelectorAll(
            ".floating"
        );



        floatingElements.forEach(
            element => {


                element.style.animation =
                "floatAnimation 4s ease-in-out infinite";


            }
        );





        /* =========================
           SMOOTH ANCHOR SCROLL
        ========================= */


        document.querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {


                link.addEventListener(
                    "click",
                    event => {


                        const target =
                        document.querySelector(
                            link.getAttribute(
                                "href"
                            )
                        );



                        if(target){


                            event.preventDefault();



                            target.scrollIntoView(
                                {
                                    behavior:"smooth"
                                }
                            );


                        }


                    }
                );


            }
        );



    }
);






/* =========================
   FLOAT KEYFRAME SUPPORT
========================= */


const floatingStyle =
document.createElement(
    "style"
);



floatingStyle.innerHTML = `

@keyframes floatAnimation {

0% {
transform:translateY(0);
}

50% {
transform:translateY(-15px);
}

100% {
transform:translateY(0);
}

}

`;



document.head.appendChild(
    floatingStyle
);