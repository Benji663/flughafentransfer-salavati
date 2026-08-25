document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mainNav =
        document.getElementById("mainNav");


    if (mobileMenu && mainNav) {

        mobileMenu.addEventListener("click", function () {

            const open =
                mainNav.classList.toggle("open");

            mobileMenu.setAttribute(
                "aria-expanded",
                open ? "true" : "false"
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



    /* =====================================================
       RÜCKFAHRT
    ===================================================== */

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



    /* =====================================================
       BEWERTUNGEN
    ===================================================== */

    const track =
        document.getElementById("reviewTrack");

    const prev =
        document.getElementById("reviewPrev");

    const next =
        document.getElementById("reviewNext");

    const dots =
        document.querySelectorAll(
            "#reviewDots span"
        );


    let current =
        0;


    function cardsVisible() {

        if (window.innerWidth <= 850) {
            return 1;
        }

        if (window.innerWidth <= 1150) {
            return 2;
        }

        return 3;

    }


    function maximum() {

        if (!track) {
            return 0;
        }

        return Math.max(
            0,
            track.children.length -
            cardsVisible()
        );

    }


    function updateReviews() {

        if (!track || !track.children.length) {
            return;
        }


        const card =
            track.children[0];


        const width =
            card.getBoundingClientRect().width;


        const gap =
            parseFloat(
                window.getComputedStyle(track).gap
            ) || 0;


        const distance =
            current * (width + gap);


        track.style.transform =
            "translateX(-" +
            distance +
            "px)";


        dots.forEach(function (dot, index) {

            dot.classList.toggle(
                "active",
                index === current
            );

        });

    }


    function moveReviews(direction) {

        current += direction;


        const max =
            maximum();


        if (current < 0) {
            current = 0;
        }


        if (current > max) {
            current = max;
        }


        updateReviews();

    }


    if (prev) {

        prev.addEventListener(
            "click",
            function () {
                moveReviews(-1);
            }
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            function () {
                moveReviews(1);
            }
        );

    }


    dots.forEach(function (dot, index) {

        dot.addEventListener(
            "click",
            function () {

                current =
                    Math.min(
                        index,
                        maximum()
                    );

                updateReviews();

            }
        );

    });


    window.addEventListener(
        "resize",
        function () {

            current =
                Math.min(
                    current,
                    maximum()
                );

            updateReviews();

        }
    );


    updateReviews();

});
