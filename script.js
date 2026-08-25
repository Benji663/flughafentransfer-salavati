document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const mobileMenu = document.getElementById("mobileMenu");
    const mainNav = document.getElementById("mainNav");

    if (mobileMenu && mainNav) {

        mobileMenu.addEventListener("click", function () {

            const isOpen =
                mainNav.classList.toggle("open");

            mobileMenu.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        mainNav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("open");

                mobileMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }



    /* =========================================
       RÜCKFAHRT
    ========================================= */

    const returnTrip =
        document.getElementById("returnTrip");

    const returns =
        document.getElementById("returns");

    if (returnTrip && returns) {

        returnTrip.addEventListener(
            "change",
            function () {

                returns.classList.toggle(
                    "show",
                    returnTrip.checked
                );

            }
        );

    }



    /* =========================================
       BEWERTUNGSSLIDER
    ========================================= */

    const track =
        document.getElementById("reviewTrack");

    const windowElement =
        document.getElementById("reviewWindow");

    const previous =
        document.getElementById("reviewPrev");

    const next =
        document.getElementById("reviewNext");

    const dots =
        document.querySelectorAll(
            "#reviewDots span"
        );


    let currentIndex = 0;


    function cardsPerView() {

        if (window.innerWidth <= 620) {
            return 1;
        }

        if (window.innerWidth <= 850) {
            return 1;
        }

        if (window.innerWidth <= 1150) {
            return 2;
        }

        return 3;
    }


    function maxIndex() {

        const totalCards =
            track
                ? track.children.length
                : 0;

        return Math.max(
            0,
            totalCards - cardsPerView()
        );

    }


    function updateSlider() {

        if (!track || !windowElement) {
            return;
        }


        const cards =
            track.children;


        if (!cards.length) {
            return;
        }


        const firstCard =
            cards[0];


        const cardWidth =
            firstCard.getBoundingClientRect().width;


        const gap =
            parseFloat(
                window.getComputedStyle(track).gap
            ) || 0;


        const distance =
            currentIndex * (cardWidth + gap);


        track.style.transform =
            "translateX(-" + distance + "px)";


        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }


    function moveSlider(direction) {

        const maximum =
            maxIndex();


        currentIndex += direction;


        if (currentIndex < 0) {
            currentIndex = 0;
        }


        if (currentIndex > maximum) {
            currentIndex = maximum;
        }


        updateSlider();

    }


    if (previous) {

        previous.addEventListener(
            "click",
            function () {
                moveSlider(-1);
            }
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            function () {
                moveSlider(1);
            }
        );

    }


    dots.forEach(function (dot, index) {

        dot.addEventListener(
            "click",
            function () {

                currentIndex =
                    Math.min(
                        index,
                        maxIndex()
                    );

                updateSlider();

            }
        );

    });


    window.addEventListener(
        "resize",
        function () {

            currentIndex =
                Math.min(
                    currentIndex,
                    maxIndex()
                );

            updateSlider();

        }
    );


    updateSlider();

});
