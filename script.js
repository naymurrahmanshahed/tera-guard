"use strict";

/////////////////////////////////////////////////////////////
// Elements
/////////////////////////////////////////////////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");
const navToggle = document.querySelector(".nav__toggle");
const header = document.querySelector(".header");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const allSections = document.querySelectorAll(".section");
const section1 = document.querySelector("#section--1");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const cookieBody = document.querySelector(".cookie");
const cookieCloseBtn = document.querySelector(".cookie__close");
const imgTargets = document.querySelectorAll("img[data-src]");
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

// sticky navbar

//nav height
const navHeight = nav.getBoundingClientRect().height;

function sticky(entries, observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}

// observer create
const headerObs = new IntersectionObserver(sticky, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

// observe
headerObs.observe(header);

// smooth behaviour
navLinks.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const attr = e.target.getAttribute("href");
    document.querySelector(attr).scrollIntoView({ behavior: "smooth" });
  }
});

// Nav Toggler
navToggle.addEventListener("click", () => {
  if (navLinks.classList.contains("nav__open")) {
    navLinks.classList.remove("nav__open");
    document.querySelector("html").style.overflow = "visible";
  } else {
    navLinks.classList.add("nav__open");
    document.querySelector("html").style.overflow = "hidden";
  }
});

navLinks.addEventListener("click", () => {
  navLinks.classList.contains("nav__open") &&
    navLinks.classList.remove("nav__open");
  document.querySelector("html").style.overflow = "visible";
});

// modal
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
// reveal section
function revealSection(entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  else entry.target.classList.remove("section--hidden");

  //stop intersection observer
  observer.unobserve(entry.target);
}

const sectionObs = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.2,
});

allSections.forEach((section) => {
  sectionObs.observe(section);
  section.classList.add("section--hidden");
});

// lazy loading

function lazyImage(entries) {
  const entry = entries[0];

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
}

const imgObserver = new IntersectionObserver(lazyImage, {
  root: null,
  threshold: 0,
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Tab content

tabsContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".operations__tab");

  if (!btn) return;

  tabs.forEach((tab) => {
    tab.classList.remove("operations__tab--active");
  });
  tabsContent.forEach((content) => {
    content.classList.remove("operations__content--active");
  });
  btn.classList.add("operations__tab--active");

  document
    .querySelector(`.operations__content--${btn.dataset.tab}`)
    .classList.add("operations__content--active");
});

// testimonial section
let currentSlide = 0;
const maxSlide = slides.length - 1;

// dots
function makingDots() {
  slides.forEach((_, i) => {
    const dot = `<button class = 'dots__dot' data-slide = ${i}> </button>`;
    dotContainer.insertAdjacentHTML("beforeend", dot);
  });
}
makingDots();
// active dots

function activeDots(slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add("dots__dot--active");
}

activeDots(0);
function changeSlide(cs) {
  slides.forEach((sl, i) => {
    sl.style.transform = `translateX(${100 * (i - cs)}%)`;
  });
}
changeSlide(0);

function prevSlide() {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else currentSlide--;

  changeSlide(currentSlide);
  activeDots(currentSlide);
}

function nextSlide() {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else currentSlide++;
  changeSlide(currentSlide);
  activeDots(currentSlide);
}

// handler
btnLeft.addEventListener("click", prevSlide);
btnRight.addEventListener("click", nextSlide);

//dot handler

dotContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dots__dot")) {
    activeDots(e.target.dataset.slide);
    changeSlide(e.target.dataset.slide);
  }
});
