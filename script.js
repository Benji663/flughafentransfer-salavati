document.addEventListener("DOMContentLoaded", function () {

    /* Rückfahrt */

    const returnTrip = document.getElementById("returnTrip");
    const returns = document.getElementById("returns");

    if (returnTrip && returns) {

        returnTrip.addEventListener("change", function () {

            returns.classList.toggle(
                "show",
                returnTrip.checked
            );

        });

    }


    /* Bewertungs-Slider */

    const track =
        document.querySelector(".review-track");

    const previous =
        document.querySelector(".review-arrow.prev");

    const next =
        document.querySelector(".review-arrow.next");


    function moveReviews(direction) {

        if (!track) {
            return;
        }

        const distance =
            Math.max(
                320,
                track.clientWidth * 0.9
            );

        track.scrollBy({
            left: direction * distance,
            behavior: "smooth"
        });

    }


    previous?.addEventListener(
        "click",
        function () {
            moveReviews(-1);
        }
    );


    next?.addEventListener(
        "click",
        function () {
            moveReviews(1);
        }
    );

});
