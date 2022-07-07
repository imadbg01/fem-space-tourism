import "../css/style.css";
import data from "../data/data.json";

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

const tabList = document.querySelector("[role='tablist']");
const tabs = document.querySelectorAll("[role='tab']");

const pageLabel = tabList
  ? tabList.getAttribute("aria-label")
  : console.log("not tabList found");
let page = data[pageLabel];

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

  let pageFieldIds = [];

  if (pageLabel === "destinations") {
    pageFieldIds = ["name", "image", "description", "distance", "travel"];
  } else if (pageLabel === "crew") {
    pageFieldIds = ["name", "image", "role", "bio"];
  } else if (pageLabel === "technology") {
    pageFieldIds = ["name", "portrait", "landscape", "description"];
  }

  const [objectData] = page.filter(
    (el) => el.name === firstLetterUpperCase(targetName)
  );

  const [objectCrewData] = page.filter(
    (el) => el.role === firstLetterUpperCase(targetName)
  );
  prevActive.setAttribute("aria-selected", false);
  targetElement.setAttribute("aria-selected", true);

  if (pageLabel === "destinations") {
    changeContent(pageFieldIds, objectData);
    // console.log(objectData);
    // console.log(pageFieldIds);
  } else if (pageLabel === "crew") {
    changeContent(pageFieldIds, objectCrewData);
    console.log(objectCrewData);
    console.log(pageFieldIds);
  } else {
    changeTechnologyContent(pageFieldIds, objectData);
    console.log(objectData);
  }
}

function changeContent(pageFieldIds, data) {
  console.log("hello");
  pageFieldIds.map((fieldId) => {
    const elementId = document.querySelector(`#${fieldId}`);
    console.log(fieldId);
    if (fieldId == "image") {
      elementId.src = data[fieldId];
      elementId.setAttribute("alt", `${data.name}-${page}`);
    } else {
      elementId.textContent = data[fieldId];
    }
  });
}

function changeTechnologyContent(pageFieldIds, data) {
  pageFieldIds.forEach((fieldId) => {
    const elementId = document.querySelector(`#${fieldId}`);

    if (fieldId === "portrait") {
      elementId.srcset = data.images[fieldId];
    } else if (fieldId === "landscape") {
      elementId.src = data.images[fieldId];
      elementId.setAttribute("alt", `${data.name}-${page}`);
    } else {
      elementId.textContent = data[fieldId];
    }
  });
}
