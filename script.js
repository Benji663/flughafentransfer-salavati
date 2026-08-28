document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE MENÜ
    ===================================================== */

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mainNav =
        document.getElementById("mainNav");


    if (mobileMenu && mainNav) {

        mobileMenu.addEventListener(
            "click",
            function () {

                const open =
                    mainNav.classList.toggle("open");

                mobileMenu.setAttribute(
                    "aria-expanded",
                    open ? "true" : "false"
                );

            }
        );


        mainNav
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        mainNav.classList.remove("open");

                        mobileMenu.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

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
       FLUGHAFEN AUTOMATISCH INS FORMULAR ÜBERNEHMEN
    ===================================================== */

    const airportCards =
        document.querySelectorAll(
            ".airport-card[data-airport]"
        );

    const airportSelect =
        document.getElementById(
            "airportSelect"
        );


    airportCards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    const airport =
                        card.dataset.airport;


                    if (
                        airportSelect &&
                        airport
                    ) {

                        for (
                            const option
                            of airportSelect.options
                        ) {

                            if (
                                option.text === airport
                            ) {

                                airportSelect.value =
                                    option.value;

                                break;

                            }

                        }

                    }

                }
            );

        }
    );



    /* =====================================================
       BEWERTUNGSSLIDER
    ===================================================== */

    const track =
        document.getElementById(
            "reviewTrack"
        );

    const prev =
        document.getElementById(
            "reviewPrev"
        );

    const next =
        document.getElementById(
            "reviewNext"
        );

    const dotsContainer =
        document.getElementById(
            "reviewDots"
        );


    if (!track) {
        return;
    }


    const cards =
        Array.from(
            track.children
        );


    let currentIndex = 0;

    let startX = 0;
    let currentX = 0;
    let dragging = false;


    function visibleCards() {

        if (window.innerWidth <= 850) {
            return 1;
        }

        if (window.innerWidth <= 1150) {
            return 2;
        }

        return 3;

    }


    function maxIndex() {

        return Math.max(
            0,
            cards.length -
            visibleCards()
        );

    }


    function createDots() {

        if (!dotsContainer) {
            return;
        }


        dotsContainer.innerHTML = "";


        const count =
            maxIndex() + 1;


        for (
            let index = 0;
            index < count;
            index++
        ) {

            const dot =
                document.createElement(
                    "span"
                );


            if (
                index === currentIndex
            ) {

                dot.classList.add(
                    "active"
                );

            }


            dot.addEventListener(
                "click",
                function () {

                    currentIndex =
                        index;

                    updateSlider();

                }
            );


            dotsContainer.appendChild(
                dot
            );

        }

    }


    function updateSlider() {

        const firstCard =
            cards[0];


        if (!firstCard) {
            return;
        }


        const cardWidth =
            firstCard.getBoundingClientRect()
                .width;


        const gap =
            parseFloat(
                window
                    .getComputedStyle(track)
                    .gap
            ) || 0;


        const offset =
            currentIndex *
            (cardWidth + gap);


        track.style.transform =
            "translateX(-" +
            offset +
            "px)";


        if (dotsContainer) {

            Array.from(
                dotsContainer.children
            ).forEach(
                function (dot, index) {

                    dot.classList.toggle(
                        "active",
                        index === currentIndex
                    );

                }
            );

        }

    }


    function move(direction) {

        const maximum =
            maxIndex();


        currentIndex += direction;


        if (
            currentIndex < 0
        ) {

            currentIndex =
                maximum;

        }


        if (
            currentIndex > maximum
        ) {

            currentIndex = 0;

        }


        updateSlider();

    }


    if (prev) {

        prev.addEventListener(
            "click",
            function () {

                move(-1);

            }
        );

    }


    if (next) {

        next.addEventListener(
            "click",
            function () {

                move(1);

            }
        );

    }


    /* TOUCH / SWIPE */

    track.addEventListener(
        "touchstart",
        function (event) {

            startX =
                event.touches[0].clientX;

            currentX =
                startX;

            dragging = true;

        },
        { passive: true }
    );


    track.addEventListener(
        "touchmove",
        function (event) {

            if (!dragging) {
                return;
            }

            currentX =
                event.touches[0].clientX;

        },
        { passive: true }
    );


    track.addEventListener(
        "touchend",
        function () {

            if (!dragging) {
                return;
            }


            const distance =
                currentX - startX;


            dragging = false;


            if (
                Math.abs(distance) < 45
            ) {

                return;

            }


            if (distance < 0) {

                move(1);

            } else {

                move(-1);

            }

        }
    );


    window.addEventListener(
        "resize",
        function () {

            currentIndex =
                Math.min(
                    currentIndex,
                    maxIndex()
                );

            createDots();

            updateSlider();

        }
    );


    createDots();

    updateSlider();

});
