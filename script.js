/* =========================================================
   NAVBAR — SCROLL EFFECT
   ========================================================= */

const navbar = document.getElementById("navbar");


/*
    Listen for scrolling.

    When the user scrolls more than 50px,
    we add the "scrolled" class to the navbar.

    The CSS then gives the navbar:
    - dark background
    - blur effect
    - bottom border
*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});



/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const hamburger =
    document.getElementById("hamburger");

const mobileMenu =
    document.getElementById("mobileMenu");


/*
    When the hamburger button is clicked,
    toggle the "active" class.

    CSS uses this class to:
    - turn hamburger into an X
    - show the mobile menu
*/

hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");

    mobileMenu.classList.toggle("active");

});



/* =========================================================
   CLOSE MOBILE MENU AFTER CLICKING A LINK
   ========================================================= */

const mobileLinks =
    mobileMenu.querySelectorAll("a");


mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

        hamburger.classList.remove("active");

        mobileMenu.classList.remove("active");

    });

});



/* =========================================================
   TYPEWRITER EFFECT
   ========================================================= */

const typewriter =
    document.getElementById("typewriter");


/*
    Words that will appear in the hero.

    The typewriter will cycle through
    these words one by one.
*/

const words = [
 
    "Computer Engineering student",

    "Aspiring Web Developer",

    "Problem Solver",

    "Forever a yearner"

];



/*
    Keeps track of which word we're typing.

    0 = Computer Engineer
    1 = Web Developer
    2 = Problem Solver
    3 = DevOps Learner
*/

let wordIndex = 0;


/*
    Keeps track of how many characters
    have currently been typed.
*/

let characterIndex = 0;


/*
    Determines whether we are:

    false = typing
    true  = deleting
*/

let isDeleting = false;



/* =========================================================
   TYPEWRITER FUNCTION
   ========================================================= */

function typeEffect() {


    /*
        Get the current word.
    */

    const currentWord =
        words[wordIndex];


    /*
        Add or remove a character.
    */

    if (isDeleting) {

        characterIndex--;

    } else {

        characterIndex++;

    }


    /*
        Display the current characters.

        Example:

        C
        Co
        Com
        Comp
        ...

    */

    typewriter.textContent =
        currentWord.substring(
            0,
            characterIndex
        );



    /* -----------------------------------------------------
       TYPING SPEED
       ----------------------------------------------------- */

    let typingSpeed = 90;



    /*
        When the entire word has been typed,
        pause for 1.8 seconds before deleting.
    */

    if (
        !isDeleting &&
        characterIndex === currentWord.length
    ) {

        typingSpeed = 1800;

        isDeleting = true;

    }



    /*
        When the word has been completely deleted,
        move to the next word.
    */

    else if (
        isDeleting &&
        characterIndex === 0
    ) {

        isDeleting = false;

        wordIndex++;


        /*
            If we reached the last word,
            start again from the first word.
        */

        if (wordIndex >= words.length) {

            wordIndex = 0;

        }


        /*
            Small pause before typing
            the next word.
        */

        typingSpeed = 400;

    }



    /*
        Run typeEffect again.

        This creates the typing animation.
    */

    setTimeout(
        typeEffect,
        typingSpeed
    );

}



/* =========================================================
   START TYPEWRITER
   ========================================================= */

typeEffect();



/* =========================================================
   HERO PHOTO HOVER SOUND
   ========================================================= */

const photoWrapper = document.getElementById("photoWrapper");
const rizzSound = new Audio("rizz.mp3");

photoWrapper.addEventListener("mouseenter", () => {
    rizzSound.currentTime = 1;

    rizzSound.play().catch(() => {

    });
});

photoWrapper.addEventListener("mouseleave", () => {
    rizzSound.pause();

    rizzSound.currentTime = 1;
});

// ==========================================
// PHOTO GALLERY LIGHTBOX
// ==========================================

const photoButtons = document.querySelectorAll(".view-photo");

const photoLightbox = document.getElementById("photoLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxClose = document.getElementById("lightboxClose");


// Open the photo
photoButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Get information from the button
        const image = button.dataset.image;
        const title = button.dataset.title;

        // Put the image inside the lightbox
        lightboxImage.src = image;

        // Put the title underneath
        lightboxTitle.textContent = title;

        // Show the lightbox
        photoLightbox.classList.add("active");

        // Update accessibility information
        photoLightbox.setAttribute("aria-hidden", "false");

    });

});


// Close the lightbox
lightboxClose.addEventListener("click", closeLightbox);


// Also close when clicking the dark background
photoLightbox.addEventListener("click", (event) => {

    if (event.target === photoLightbox) {
        closeLightbox();
    }

});


// Close with Escape key
document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        closeLightbox();
    }

});


function closeLightbox() {

    photoLightbox.classList.remove("active");

    photoLightbox.setAttribute("aria-hidden", "true");

}

// ==========================================
// MORPHING DEVICE LOADING SCREEN
// ==========================================

const loadingScreen = document.getElementById("loadingScreen");
const loadingMessage = document.getElementById("loadingMessage");
const deviceLabel = document.getElementById("deviceLabel");


// ------------------------------------------
// Device stages
// ------------------------------------------

const deviceStages = [

    {
        className: "phone",
        label: "MOBILE",
        message: "Starting up..."
    },

    {
        className: "monitor",
        label: "DESKTOP",
        message: "Loading some questionable code..."
    },

    {
        className: "laptop",
        label: "LAPTOP",
        message: "Almost ready..."
    }

];


// Current stage
let currentStage = 0;


// ------------------------------------------
// Change device
// ------------------------------------------

function changeDevice() {

    const stage = deviceStages[currentStage];


    // Remove previous device classes
    loadingScreen.classList.remove(
        "phone",
        "monitor",
        "laptop"
    );


    // Add new device class
    loadingScreen.classList.add(
        stage.className
    );


    // Change text
    loadingMessage.textContent =
        stage.message;


    // Change device label
    deviceLabel.textContent =
        stage.label;


    // Move to next device
    currentStage =
        (currentStage + 1) % deviceStages.length;

}


// ------------------------------------------
// Start with phone
// ------------------------------------------

loadingScreen.classList.add("phone");


// ------------------------------------------
// Morph every 2 seconds
// ------------------------------------------

const morphInterval = setInterval(() => {

    changeDevice();

}, 1000);


// ------------------------------------------
// Finish loading
// ------------------------------------------

setTimeout(() => {

    // Stop device animation
    clearInterval(morphInterval);


    // Show final message
    loadingMessage.textContent =
        "Welcome to my portfolio.";


    deviceLabel.textContent =
        "READY";


    // Wait a little before closing
    setTimeout(() => {

        loadingScreen.classList.add("hidden");

    }, 800);


}, 4000);


const exploredTech = [

    "Node.js",
    "Express",
    "MongoDB",
    "Tailwind CSS",
    "Vite",
    "Git",
    "GitHub",
    "Postman",
    "VS Code",
    "Bootstrap",
    "HTML5",
    "CSS3",
    "REST API",
    "JSON",
    "npm",
    "Vercel",
    "Canva",
    "Java"

];


/*
    Find the container where
    the pills will be placed.
*/

const pillsContainer =
    document.getElementById("pills");


/*
    For each tech in the list,
    create a pill and add it to the page.
*/

exploredTech.forEach((tech) => {


    /*
        Create a <span> element.
    */

    const pill =
        document.createElement("span");


    /*
        Give it the "pill" class
        so our CSS styles it.
    */

    pill.classList.add("pill");


    /*
        Put the tech name inside.
    */

    pill.textContent = tech;


    /*
        Add it to the container.
    */

    pillsContainer.appendChild(pill);

});

/* =========================================================
   IMAGE CAROUSEL
   ========================================================= */

/*
    Find every carousel on the page.

    Each project has its own carousel,
    so we loop through all of them.
*/

const carousels =
    document.querySelectorAll("[data-carousel]");


carousels.forEach((carousel) => {


    /*
        Get the parts inside THIS carousel.
    */

    const images =
        carousel.querySelectorAll(".carousel-image");

    const dotsContainer =
        carousel.querySelector(".carousel-dots");

    const prevButton =
        carousel.querySelector("[data-prev]");

    const nextButton =
        carousel.querySelector("[data-next]");


    /*
        Track which image is currently showing.
    */

    let currentIndex = 0;


    /*
        Timer used for auto-sliding.
    */

    let autoSlide;



    /* -----------------------------------------------------
       CREATE THE DOTS
       ----------------------------------------------------- */

    images.forEach((image, index) => {

        const dot =
            document.createElement("button");

        dot.classList.add("carousel-dot");


        /*
            The first dot starts active.
        */

        if (index === 0) {
            dot.classList.add("active");
        }


        /*
            Clicking a dot jumps to that image.
        */

        dot.addEventListener("click", () => {
            goToImage(index);
        });


        dotsContainer.appendChild(dot);

    });


    const dots =
        dotsContainer.querySelectorAll(".carousel-dot");



    /* -----------------------------------------------------
       SHOW A SPECIFIC IMAGE
       ----------------------------------------------------- */

    function goToImage(index) {


        /*
            Hide the current image and dot.
        */

        images[currentIndex].classList.remove("active");

        dots[currentIndex].classList.remove("active");


        /*
            Wrap around if we go past the ends.
        */

        currentIndex =
            (index + images.length) % images.length;


        /*
            Show the new image and dot.
        */

        images[currentIndex].classList.add("active");

        dots[currentIndex].classList.add("active");


        /*
            Restart the timer so it feels natural.
        */

        resetAutoSlide();

    }



    /* -----------------------------------------------------
       NEXT & PREVIOUS
       ----------------------------------------------------- */

    function nextImage() {
        goToImage(currentIndex + 1);
    }

    function prevImage() {
        goToImage(currentIndex - 1);
    }


    nextButton.addEventListener("click", nextImage);

    prevButton.addEventListener("click", prevImage);



    /* -----------------------------------------------------
       AUTO SLIDE
       ----------------------------------------------------- */

    function startAutoSlide() {

        if (images.length > 1) {

            autoSlide =
                setInterval(nextImage, 4000);

        }

    }


    function resetAutoSlide() {

        clearInterval(autoSlide);

        startAutoSlide();

    }


    /*
        Start it when the page loads.
    */

    startAutoSlide();

});

/* =========================================================
   DARK MODE TOGGLE
   ========================================================= */

/*
    Get both toggle buttons (desktop + mobile)
    and the body.
*/

const themeToggle =
    document.getElementById("themeToggle");

const themeToggleMobile =
    document.getElementById("themeToggleMobile");

const bodyElement = document.body;


/*
    A helper function that updates BOTH
    button icons at the same time.
*/

function updateThemeIcons(isDark) {

    themeToggle.textContent =
        isDark ? "☀️" : "🌙";

    themeToggleMobile.textContent =
        isDark ? "☀️ Toggle Theme" : "🌙 Toggle Theme";

}


/*
    When the page loads, check if the user
    previously chose dark mode.
*/

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "dark") {

    bodyElement.classList.add("dark-mode");

    updateThemeIcons(true);

}


/*
    The main function that toggles the theme.
*/

function toggleTheme() {


    /*
        Turn dark mode on or off.
    */

    bodyElement.classList.toggle("dark-mode");


    /*
        Check if dark mode is now active.
    */

    const isDark =
        bodyElement.classList.contains("dark-mode");


    /*
        Update both button icons.
    */

    updateThemeIcons(isDark);


    /*
        Save the choice for next time.
    */

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );

}


/*
    Connect BOTH buttons to the same function.
*/

themeToggle.addEventListener("click", toggleTheme);

themeToggleMobile.addEventListener("click", toggleTheme);