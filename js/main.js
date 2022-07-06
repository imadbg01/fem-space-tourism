import "../css/style.css";

import data from "../data/data.json";

const tabList = document.querySelector("[role='tablist']");
const tabs = document.querySelectorAll("[role='tab']");

const pageLabel = tabList
  ? tabList.getAttribute("aria-label")
  : console.log("not tabList found");
let page = data[pageLabel];

let pageFieldIds = [];

if (pageLabel === "destinations") {
  pageFieldIds = ["name", "image", "description", "distance", "travel"];
} else {
  pageFieldIds = ["name", "image", "role", "bio"];
}

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTapContent);
});

function changeTapContent(e) {
  const firstLetterUpperCase = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  const targetElement = e.target;
  const targetName = targetElement.getAttribute("aria-controls");
  const prevActive = targetElement.parentNode.querySelector(
    '[aria-selected="true"]'
  );

  const [objectData] = page.filter(
    (el) => el.name === firstLetterUpperCase(targetName)
  );

  prevActive.setAttribute("aria-selected", false);
  targetElement.setAttribute("aria-selected", true);
  changeContent(objectData);
}

function changeContent(data) {
  pageFieldIds.forEach((fieldId) => {
    const elementId = document.querySelector(`#${fieldId}`);
    if (fieldId === "image") {
      elementId.src = data[fieldId];
      elementId.setAttribute("alt", `${data.name}-${page}`);
    } else {
      elementId.textContent = data[fieldId];
    }
  });
}

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
