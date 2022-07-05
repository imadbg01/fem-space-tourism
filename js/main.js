import "../css/style.css";

// Toggle mobile navigation
const nav = document.querySelector(".primary-nav");
const navToggle = document.querySelector(".mobile-navigation-toggle");

navToggle.addEventListener("click", () => {
  const visible = nav.getAttribute("data-visible");

  if (visible === "false") {
    nav.setAttribute("data-visible", "true");
    navToggle.setAttribute("aria-expanded", "true");
  } else {
    nav.setAttribute("data-visible", "false");
    navToggle.setAttribute("aria-expanded", "false");
  }
});
