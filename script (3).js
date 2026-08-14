/* =========================
   INTRO SCREEN
========================= */

const introScreen =
    document.getElementById("introScreen");

const nameInput =
    document.getElementById("nameInput");

const openBtn =
    document.getElementById("openBtn");


openBtn.addEventListener(
    "click",
    function() {

        const name =
            nameInput.value.trim();

        if (!name) {

            nameInput.focus();

            nameInput.placeholder =
                "Please enter your name ❤️";

            return;
        }

        introScreen.classList.add("hide");

        setTimeout(
            function() {

                const firstHeading =
                    document.querySelector(
                        "#mainCard h1"
                    );

                if (firstHeading) {

                    firstHeading.textContent =
                        `Hey ${name}! ❤️`;

                }

            },
            500
        );

    }
);


/* =========================
   GET ELEMENTS
========================= */

const yesBtn =
    document.getElementById("yesBtn");

const noBtn =
    document.getElementById("noBtn");

const mainCard =
    document.getElementById("mainCard");

const hint =
    document.getElementById("hint");


/* =========================
   NO BUTTON
========================= */

let noCount = 0;

let lastMoveTime = 0;


/* =========================
   NO MESSAGES
========================= */

const noMessages = [

    "No 😜",

    "Are you sure? 👀",

    "Really? 😂",

    "Think again! 🥺",

    "Please? 🥹",

    "Nice try! 😏",

    "Catch me! 🏃",

    "Still NO? 😭",

    "You can't catch me 😂",

    "Okay... one last try 😜"

];


/* =========================
   MOVE NO BUTTON
========================= */

function moveNoButton() {

    /* Maximum 10 attempts */

    if (noCount >= 10) {

        noBtn.style.display =
            "none";

        hint.textContent =
            "NO has officially given up 😂❤️";

        return;

    }


    /* Count one attempt */

    noCount++;


    /* Change message */

    noBtn.textContent =
        noMessages[noCount - 1];


    /* Show counter */

    hint.textContent =
        `NO attempt ${noCount} of 10 😂`;


    /* =========================
       SAFE POSITION
    ========================= */

    const padding = 25;

    const buttonWidth =
        noBtn.offsetWidth;

    const buttonHeight =
        noBtn.offsetHeight;


    const maxX =
        Math.max(
            padding,
            window.innerWidth
            - buttonWidth
            - padding
        );


    const maxY =
        Math.max(
            padding,
            window.innerHeight
            - buttonHeight
            - padding
        );


    const randomX =
        padding +
        Math.random()
        * Math.max(
            0,
            maxX - padding
        );


    const randomY =
        padding +
        Math.random()
        * Math.max(
            0,
            maxY - padding
        );


    noBtn.style.position =
        "fixed";

    noBtn.style.left =
        randomX + "px";

    noBtn.style.top =
        randomY + "px";

    noBtn.style.zIndex =
        "9999";


    /* =========================
       YES GETS BIGGER
    ========================= */

    const scale =
        Math.min(
            1 + noCount * 0.03,
            1.3
        );

    yesBtn.style.transform =
        `scale(${scale})`;

}


/* =========================
   SAFE TRIGGER
========================= */

function safeMoveNoButton() {

    const now =
        Date.now();


    /* Prevent duplicate events */

    if (
        now - lastMoveTime
        < 700
    ) {

        return;

    }


    lastMoveTime =
        now;


    moveNoButton();

}


/* =========================
   DESKTOP
========================= */

noBtn.addEventListener(
    "mouseenter",
    function() {

        safeMoveNoButton();

    }
);


/* =========================
   MOBILE
========================= */

noBtn.addEventListener(
    "pointerdown",
    function(event) {

        event.preventDefault();

        event.stopPropagation();

        safeMoveNoButton();

    }
);


/* =========================
   YES BUTTON
========================= */

yesBtn.addEventListener(
    "click",
    showSuccessScreen
);


/* =========================
   SUCCESS SCREEN
========================= */

function showSuccessScreen() {

    startConfetti();


    mainCard.innerHTML = `

        <div class="emoji">
            💖
        </div>

        <p class="small-title">
            IT'S A YES!
        </p>

        <h1 class="success-title">
            Yayyy! 🥰
        </h1>

        <p class="success-message">
            I knew you would say YES! ❤️
            <br>
            Now let's plan our special date.
        </p>


        <div class="date-box">

            <label>
                Pick a date 📅
            </label>

            <input
                type="date"
                id="dateInput"
            >

        </div>


        <div class="date-box">

            <label>
                What should we do? 💕
            </label>

            <div class="plan-buttons">

                <button
                    class="plan-btn"
                    data-plan="☕ Coffee"
                >
                    ☕ Coffee
                </button>

                <button
                    class="plan-btn"
                    data-plan="🍿 Movie"
                >
                    🍿 Movie
                </button>

                <button
                    class="plan-btn"
                    data-plan="🍽️ Dinner"
                >
                    🍽️ Dinner
                </button>

                <button
                    class="plan-btn"
                    data-plan="🌆 Walk"
                >
                    🌆 Walk
                </button>

            </div>

        </div>


        <button
            class="confirm-btn"
            id="confirmBtn"
        >
            Confirm Date ❤️
        </button>


        <p
            class="final-message"
            id="finalMessage">
        </p>

    `;


    setupDatePlanning();

}


/* =========================
   DATE PLANNING
========================= */

function setupDatePlanning() {

    const planButtons =
        document.querySelectorAll(
            ".plan-btn"
        );


    let selectedPlan = "";


    planButtons.forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    planButtons.forEach(
                        function(btn) {

                            btn.classList.remove(
                                "selected"
                            );

                        }
                    );


                    button.classList.add(
                        "selected"
                    );


                    selectedPlan =
                        button.dataset.plan;

                }
            );

        }
    );


    const confirmBtn =
        document.getElementById(
            "confirmBtn"
        );


    const dateInput =
        document.getElementById(
            "dateInput"
        );


    const finalMessage =
        document.getElementById(
            "finalMessage"
        );


    confirmBtn.addEventListener(
        "click",
        function() {

            if (!dateInput.value) {

                finalMessage.textContent =
                    "Please choose a date first 📅";

                return;

            }


            if (!selectedPlan) {

                finalMessage.textContent =
                    "Choose what we should do ❤️";

                return;

            }


            const date =
                new Date(
                    dateInput.value
                );


            const formattedDate =
                date.toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    }
                );


            finalMessage.innerHTML = `

                💕 <strong>Date Confirmed!</strong> 💕

                <br><br>

                📅 ${formattedDate}

                <br>

                ${selectedPlan}

                <br><br>

                Can't wait! 🥰❤️

            `;


            confirmBtn.textContent =
                "Date Confirmed ❤️";


            confirmBtn.disabled =
                true;

        }
    );

}


/* =========================
   CONFETTI
========================= */

function startConfetti() {

    const canvas =
        document.getElementById(
            "confetti"
        );


    const ctx =
        canvas.getContext("2d");


    canvas.width =
        window.innerWidth;


    canvas.height =
        window.innerHeight;


    const pieces = [];


    for (
        let i = 0;
        i < 120;
        i++
    ) {

        pieces.push({

            x:
                Math.random()
                * canvas.width,

            y:
                Math.random()
                * canvas.height
                - canvas.height,

            size:
                Math.random()
                * 8 + 4,

            speed:
                Math.random()
                * 4 + 2,

            rotation:
                Math.random()
                * 360

        });

    }


    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        pieces.forEach(
            function(piece) {

                piece.y +=
                    piece.speed;

                piece.rotation += 5;


                ctx.save();


                ctx.translate(
                    piece.x,
                    piece.y
                );


                ctx.rotate(
                    piece.rotation
                    * Math.PI
                    / 180
                );


                ctx.fillStyle =
                    `hsl(
                        ${Math.random() * 360},
                        80%,
                        60%
                    )`;


                ctx.fillRect(
                    -piece.size / 2,
                    -piece.size / 2,
                    piece.size,
                    piece.size
                );


                ctx.restore();

            }
        );


        requestAnimationFrame(
            animate
        );

    }


    animate();

}