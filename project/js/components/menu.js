import gsap from "gsap";

// components
let backdropMenu;
let backdropMenuContainer;
let backdropMenuList;
let backdropMenuGallery;

let homeSpan;
let countrySpan;
let timeSpan;

let homeUnderline;
let listUnderline;

let menuListItems;
let navItems;
let gallery;

// animation
let openMenuTimeline;
const timing = 1;
const halfTiming = timing / 2;

function openMenu() {
  backdropMenu = document.querySelector("[data-backdrop='menu']");
  backdropMenuContainer = backdropMenu.querySelector(
    "[data-animation='backdrop-container']"
  );
  backdropMenuList = document.querySelector("[data-animation='backdrop-menu']");
  homeSpan = document.querySelector("[data-animation='home']");
  countrySpan = document.querySelector("[data-animation='country']");
  timeSpan = document.querySelector("[data-animation='time']");
  homeUnderline = document.querySelector("[data-animation='home-underline']");
  listUnderline = document.querySelector("[data-animation='list-underline']");
  menuListItems = document.querySelectorAll(
    "[data-animation='list-item'] > a > span"
  );
  backdropMenuGallery = backdropMenu.querySelector(
    "[data-animation='backdrop-gallery']"
  );
  gallery = document.querySelector("#gallery-js");
  navItems = document.querySelectorAll("[data-fade='anim-fade']");

  const navItemsReversed = Array.from(navItems).reverse();
  const spaceLeft = calculateSpaceLeft();

  openMenuTimeline = gsap.timeline({
    paused: true,
    force3D: true,
    onComplete: initScrollGallery,
  });

  // const openMenuTimeline = gsap.timeline({});
  // remove scroll from page
  // open backdrop
  // set backdrop items
  openMenuTimeline
    .add("start")
    .set(backdropMenuContainer, {
      left: `${spaceLeft}px`,
    })
    .to(
      backdropMenu,
      {
        //width: "100%",
        opacity: 1,
        visibility: "visible",
        duration: timing,
        ease: "power1.in",
      },
      "start"
    )
    .to(
      backdropMenuContainer,
      {
        width: "100%",
        duration: timing,
        ease: "power1.in",
      },
      "start"
    )
    .to(backdropMenuList, {
      opacity: 1,
      duration: halfTiming,
      ease: "power1.in",
    })
    .to(homeSpan, {
      y: 0,
      duration: timing,
      ease: "back.out(1.7)",
    })
    .to(
      countrySpan,
      {
        y: 0,
        duration: timing,
        ease: "back.out(1.7)",
      },
      "-=75%"
    )
    .to(
      timeSpan,
      {
        y: 0,
        duration: timing + halfTiming,
        ease: "back.out(1.7)",
      },
      "<"
    )
    .to(
      listUnderline,
      {
        width: "100%",
        duration: timing,
        ease: "power4.in",
      },
      "<"
    )
    .to(
      homeUnderline,
      {
        width: "100%",
        duration: timing + halfTiming,
        ease: "power4.in",
      },
      "<"
    )
    .to(
      menuListItems,
      {
        y: 0,
        duration: function (index) {
          return (halfTiming / 3) * index + 1;
        },
        ease: "power1.inOut",
      },
      "<"
    )
    .to(
      backdropMenuGallery,
      {
        height: "100%",
        duration: timing,
        ease: "power4.in",
      },
      "<"
    )
    .to(
      gallery,
      {
        opacity: 1,
        visibility: "visible",
        y: 0,
        duration: timing + halfTiming,
        ease: "sine.inOut",
      },
      ">"
    )
    .to(
      navItemsReversed,
      {
        opacity: 0,
        duration: function (index) {
          return (halfTiming / 3) * index + 1;
        },
        ease: "power1.in",
      },
      "start"
    );

  // cascade menu list
  // menuListItems.forEach((item) => {
  //   const itemSpans = item.querySelectorAll("span");
  //   itemSpans.forEach((span, index) => {
  //     openMenuTimeline.to(
  //       span,
  //       {
  //         y: 0,
  //         duration: timing * index + 1,
  //         ease: "power1.inOut",
  //       },
  //       "<"
  //     );
  //   });
  // });

  // open gallery
  // openMenuTimeline
  //   .to(
  //     backdropMenuGallery,
  //     {
  //       height: "100%",
  //       duration: timing,
  //       ease: "power4.in",
  //     },
  //     "<"
  //   )
  //   .to(
  //     gallery,
  //     {
  //       opacity: 1,
  //       visibility: "visible",
  //       y: 0,
  //       duration: timing + halfTiming,
  //       ease: "sine.inOut",
  //     },
  //     ">"
  //   );

  // fade navigation reversed
  // navItemsReversed.forEach((element, index) => {
  //   openMenuTimeline.to(
  //     element,
  //     {
  //       opacity: 0,
  //       duration: (halfTiming / 3) * index + 1,
  //       ease: "power1.in",
  //     },
  //     "start"
  //   );
  // });

  openMenuTimeline.play();
}

function closeMenu() {
  // const backdropMenu = document.querySelector("[data-backdrop='menu']");
  // const backdropMenuContainer = backdropMenu.querySelector(
  //   "[data-animation='backdrop-container']"
  // );
  // const navItems = document.querySelectorAll("[data-fade='anim-fade']");

  // reset animations when closing is complete
  const closeMenuTimeline = gsap.timeline({
    paused: true,
    force3D: true,
    onComplete: clearTimeline,
  });

  // close backdrop
  closeMenuTimeline
    .to(backdropMenuContainer, {
      width: 0,
      duration: timing,
      ease: "power1.in",
    })
    .to(backdropMenu, {
      opacity: 0,
      visibility: "hidden",
      duration: halfTiming,
      ease: "power1.in",
    })
    .to(
      navItems,
      {
        opacity: 1,
        duration: function (index) {
          return (halfTiming / 3) * index + 1;
        },
        ease: "power1.in",
      },
      "-=75%"
    );

  // reset nav
  // navItems.forEach((element, index) => {
  //   closeMenuTimeline.to(
  //     element,
  //     {
  //       opacity: 1,
  //       duration: (halfTiming / 3) * index + 1,
  //       ease: "power1.in",
  //     },
  //     "-=75%"
  //   );
  // });

  closeMenuTimeline.play();
}

function clearTimeline() {
  setTimeout(() => {
    // 1. by setting pause to position 0 or
    //openMenuTimeline.pause(0);

    // 2. by clearProps all for each component
    openMenuTimeline.to(
      [
        backdropMenu,
        backdropMenuContainer,
        backdropMenuGallery,
        backdropMenuList,
        homeSpan,
        countrySpan,
        timeSpan,
        homeUnderline,
        listUnderline,
        menuListItems,
        gallery,
      ],
      { clearProps: "all" },
      0
    );
  }, 300);
}

function calculateSpaceLeft() {
  const spaceLeft =
    window.innerWidth > 1440 ? (Number(window.innerWidth) - 1440) / 2 : 24;
  return spaceLeft;
}

function initScrollGallery() {
  const p = document.querySelector("#gallery-message-js");
  setTimeout(() => {
    p.innerHTML = " Init scroll effect on gallery photos";
  }, 300);
}

function manageMenuAnimation() {
  const menu = document.querySelector("#menu-js");
  const bodyElement = document.body;
  menu.addEventListener("click", () => {
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
      bodyElement.classList.add("no-scroll");
      openMenu();

      const backdropLanguage = document.querySelector("#backdrop-language-js");
      // set menu on top of language, in case language is expanded
      if (backdropLanguage.classList.contains("expanded"))
        backdropMenu.classList.toggle("over");
    } else {
      closeMenu();
      // reset body scroll
      bodyElement.classList.remove("no-scroll");
      // remove scroll effect from gallery
      const p = document.querySelector("#gallery-message-js");
      p.innerHTML = "";
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      manageMenuAnimation();
    }
  });
});
