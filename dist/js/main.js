const imageTrack = document.querySelector(".about__images__track");
const mobileMenuBtn = document.querySelector(".navbar__mobile__btn");
const smoothScrollBtns = document.querySelectorAll(".smooth__scroll");
const backToTopBtn = document.querySelector(".back__to__top");
let navListOpen = false;
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
//Trigger the SmoothScroll
function triggerSmoothScroll() {
  new SmoothScroll('.smooth__scroll[href*="#"]', {
    speed: 1000,
  });
}
//Check if you are at then bottom of the page.
function checkIfBottomPage() {
  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    return true;
  }
  return false;
}
function showBTTButton() {
  if (checkIfBottomPage()) {
    backToTopBtn.classList.remove("floating__button--hide");
  } else {
    backToTopBtn.classList.add("floating__button--hide");
  }
}
window.addEventListener("load", checkIfMobile);
mobileMenuBtn.addEventListener("click", toggleMobileMenu);
smoothScrollBtns.forEach((scrollBtn) => {
  scrollBtn.addEventListener("click", triggerSmoothScroll);
});
window.addEventListener("scroll", showBTTButton);
