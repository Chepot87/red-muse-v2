"use strict";

// Keep navigation available when JavaScript is disabled.
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
if (navToggle && navMenu) {
  document.documentElement.classList.add("js");
  const setMenu = (open) => {
    navMenu.classList.toggle("active", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  };
  navToggle.addEventListener("click", () => setMenu(navToggle.getAttribute("aria-expanded") !== "true"));
  navMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      navToggle.focus();
    }
  });
  document.addEventListener("click", event => {
    if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) setMenu(false);
  });
  navMenu.addEventListener("focusout", event => {
    if (!navMenu.contains(event.relatedTarget) && event.relatedTarget !== navToggle) setMenu(false);
  });
  window.matchMedia("(max-width: 900px)").addEventListener("change", () => setMenu(false));
}

const currentYear = document.getElementById("current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();

// Native modal semantics keep the background inert and contain keyboard focus.
const cards = [...document.querySelectorAll(".gallery-card")];
const lightbox = document.getElementById("lightbox");
const photo = document.getElementById("lightbox-image");
const closeButton = document.getElementById("lightbox-close");
const previousButton = document.getElementById("lightbox-prev");
const nextButton = document.getElementById("lightbox-next");
const status = document.getElementById("lightbox-status");
if (cards.length && lightbox && photo && closeButton && previousButton && nextButton) {
  let index = 0;
  let opener;
  function showImage(nextIndex) {
    index = (nextIndex + cards.length) % cards.length;
    photo.src = cards[index].dataset.image || cards[index].querySelector("img").src;
    photo.alt = cards[index].querySelector("img").alt;
    if (status) status.textContent = "Design " + (index + 1) + " of " + cards.length;
  }
  cards.forEach((card, cardIndex) => card.addEventListener("click", () => {
    opener = card;
    showImage(cardIndex);
    lightbox.showModal();
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  }));
  closeButton.addEventListener("click", () => lightbox.close());
  previousButton.addEventListener("click", () => showImage(index - 1));
  nextButton.addEventListener("click", () => showImage(index + 1));
  lightbox.addEventListener("click", event => { if (event.target === lightbox) lightbox.close(); });
  lightbox.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    opener?.focus({preventScroll: true});
  });
  lightbox.addEventListener("keydown", event => {
    if (event.key === "Tab") {
      if (event.shiftKey && document.activeElement === closeButton) { event.preventDefault(); nextButton.focus(); }
      else if (!event.shiftKey && document.activeElement === nextButton) { event.preventDefault(); closeButton.focus(); }
    }
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      showImage(index + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
}
