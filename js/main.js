import "../css/style.css";
// import data from "../data/data.json";

function getImages(page, image) {
  return `../assets/${page}/image-${image}.png`;
}
import destinationMoonImg from "../assets/destination/image-moon.png";
import destinationMarsImg from "../assets/destination/image-mars.png";
import descriptionEuropaImg from "/assets/destination/image-europa.png";
import descriptionTitanImg from "/assets/destination/image-titan.png";
import crewDouglasImg from "../assets/crew/image-douglas-hurley.png";
import crewMarkImg from "/assets/crew/image-mark-shuttleworth.png";
import crewAnoushehImg from "/assets/crew/image-anousheh-ansari.png";
import crewVictorImg from "/assets/crew/image-victor-glover.png";
import techLaunchPortrait from "../assets/technology/image-launch-vehicle-portrait.jpg";
import techLaunchLandscape from "../assets/technology/image-launch-vehicle-landscape.jpg";
import techSpaceportPortrait from "../assets/technology/image-spaceport-portrait.jpg";
import techSpaceportLandscape from "../assets/technology/image-spaceport-landscape.jpg";
import techSpacePortrait from "../assets/technology/image-space-capsule-portrait.jpg";
import techSpaceLandscape from "../assets/technology/image-space-capsule-landscape.jpg";
let data = {
  destinations: [
    {
      name: "Moon",
      image: destinationMoonImg,
      description:
        "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
      distance: "384,400 km",
      travel: "3 days",
    },
    {
      name: "Mars",
      image: destinationMarsImg,
      description:
        "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
      distance: "225 mil. km",
      travel: "9 months",
    },
    {
      name: "Europa",
      image: descriptionEuropaImg,
      description:
        "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
      distance: "628 mil. km",
      travel: "3 years",
    },
    {
      name: "Titan",
      image: descriptionTitanImg,
      description:
        "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
      distance: "1.6 bil. km",
      travel: "7 years",
    },
  ],
  crew: [
    {
      name: "Douglas Hurley",
      image: crewDouglasImg,
      role: "Commander",
      bio: "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
    },
    {
      name: "Mark Shuttleworth",
      image: crewMarkImg,
      role: "Mission Specialist",
      bio: "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
    },
    {
      name: "Victor Glover",
      image: crewVictorImg,
      role: "Pilot",
      bio: "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer.",
    },
    {
      name: "Anousheh Ansari",
      image: crewAnoushehImg,
      role: "Flight Engineer",
      bio: "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space.",
    },
  ],
  technology: [
    {
      name: "Launch vehicle",
      images: {
        portrait: techLaunchPortrait,
        landscape: techLaunchLandscape,
      },
      description:
        "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!",
    },
    {
      name: "Spaceport",
      images: {
        portrait: techSpaceportPortrait,
        landscape: techSpaceportLandscape,
      },
      description:
        "A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.",
    },
    {
      name: "Space capsule",
      images: {
        portrait: techSpacePortrait,
        landscape: techSpaceLandscape,
      },
      description:
        "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.",
    },
  ],
};

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
      elementId.setAttribute("src", data[fieldId]);
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
