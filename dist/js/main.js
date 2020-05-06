//Elements
const imageTrack = document.querySelector(".about__images__track");
const mobileMenuBtn = document.querySelector(".navbar__mobile__btn");
const smoothScrollBtns = document.querySelectorAll(".smooth__scroll");
const backToTopBtn = document.querySelector(".back__to__top");
const searchBoxToggle = document.querySelectorAll(".search__box--toggle");

//Flags
let navListOpen = false;
let searchBoxOpen = false;

//See if on mobile device if it is then use Draggable on the imageTrack
function checkIfMobile() {
  if (!matchMedia("(min-width: 768px)").matches) {
    Draggable.create(".about__images__track", {
      type: "x",
      bounds: {
        minX: -240,
        maxX: 0,
      },
      edgeResistance: 0.7,
      inertia: true,
      snap: [0, -240],
    });
  }
}

//Toggle the mobile menu button icon.
function toggleButtonIcon() {
  mobileMenuBtn.firstElementChild.classList.toggle("fa-bars");
  mobileMenuBtn.firstElementChild.classList.toggle("fa-times");
}

// Simply check for the navListOpen flag variable, then manipulate .navbar__list to open or close.
function toggleMobileMenu(e) {
  e.preventDefault();
  toggleButtonIcon();
  if (!navListOpen) {
    navListOpen = true;
    gsap.to(".navbar__list", 0.5, {
      height: "auto",
    });
  } else {
    navListOpen = false;
    gsap.to(".navbar__list", 0.5, {
      height: "0",
    });
  }
}

//Toggle the search box.
function toggleSearchBox(e) {
  e.preventDefault();
  if (!searchBoxOpen) {
    searchBoxOpen = true;
    gsap
      .timeline()
      .to(".search__box__outer", 0.3, {
        display: "block",
        opacity: 1,
      })
      .to(".search__box", 0.4, {
        transform: "translate3d(0, 0, 0)",
      });
  } else {
    searchBoxOpen = false;
    gsap
      .timeline()
      .to(".search__box", 0.4, {
        transform: "translate3d(0, -100%, 0)",
      })
      .to(".search__box__outer", 0.3, {
        opacity: 0,
        display: "none",
      });
  }
}

//Trigger the SmoothScroll
function triggerSmoothScroll() {
  new SmoothScroll('.smooth__scroll[href*="#"]', {
    speed: 1000,
  });
}

//Check if you are at then bottom of the page.
function checkIfBottomPage() {
  return window.innerHeight + window.pageYOffset >= document.body.offsetHeight
    ? true
    : false;
}

//Show Back To Top Button
function showBTTButton() {
  checkIfBottomPage()
    ? backToTopBtn.classList.remove("floating__button--hide")
    : backToTopBtn.classList.add("floating__button--hide");
}

//Eventlisteners

//Eventlistener for checkIfMobile function (line: 10)
window.addEventListener("load", checkIfMobile);

//Eventlistener for toggleMobileMenu function (line: 32)
mobileMenuBtn.addEventListener("click", toggleMobileMenu);

//Eventlistener for triggerSmoothScroll function (line: 77)
smoothScrollBtns.forEach((scrollBtn) =>
  scrollBtn.addEventListener("click", triggerSmoothScroll)
);

//Eventlistener for toggleSearchBox function (line: 49)
searchBoxToggle.forEach((toggle) =>
  toggle.addEventListener("click", toggleSearchBox)
);

//Eventlistener for showBTTButton function (line: 91)
window.addEventListener("scroll", showBTTButton);
