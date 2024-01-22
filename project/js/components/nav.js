import gsap from "gsap";

const navTimeline = gsap.timeline({});
const timing = 0.6;
const halfTiming = timing / 2;

function initNavAnimation() {
  const nav = document.querySelector("#navigation-header-js");
  const navList = nav.querySelector("#nav-list-js");
  const navListBrand = navList.querySelector("#brand-js");
  const navListBrandSpans = navListBrand.querySelectorAll("a > span");
  const navListItemsFirst = navList.querySelectorAll(
    "[data-animation='anim-first']"
  );
  const navListItemsLast = navList.querySelectorAll(
    "[data-animation='anim-last']"
  );

  navTimeline
    .add("start")
    .to(
      nav,
      {
        opacity: 1,
        duration: timing,
        ease: "power1.in",
      },
      "start"
    )
    .to(
      navListBrandSpans,
      {
        y: 0,
        duration: function (index) {
          return halfTiming * index + 1;
        },
        ease: "power1.inOut",
      },
      "start"
    )
    .to(
      navListItemsFirst,
      {
        opacity: 1,
        duration: function (index) {
          return halfTiming * index + 2;
        },
        ease: "power1.inOut",
        stagger: 0.25,
      },
      "start+=0.75"
    )
    .to(
      navListItemsLast,
      {
        opacity: 1,
        duration: function (index) {
          return halfTiming * index + 2;
        },
        ease: "power1.inOut",
        stagger: 0.25,
      },
      "start+=0.75"
    );

  // navListBrandSpans.forEach((span, index) => {
  //   navTimeline.to(
  //     span,
  //     {
  //       y: 0,
  //       duration: halfTiming * index + 1,
  //       ease: "power1.inOut",
  //     },
  //     "start"
  //   );
  // });

  // navListItemsFirst.forEach((element, index) => {
  //   navTimeline.to(
  //     element,
  //     {
  //       opacity: 1,
  //       //y: 0,
  //       duration: halfTiming * index + 2,
  //       ease: "power1.inOut",
  //     },
  //     halfTiming
  //   );
  // });

  // navListItemsLast.forEach((element, index) => {
  //   navTimeline.to(
  //     element,
  //     {
  //       opacity: 1,
  //       //y: 0,
  //       duration: halfTiming * index + 2,
  //       ease: "power1.inOut",
  //     },
  //     timing
  //   );
  // });
}

window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      initNavAnimation();
    }
  });
});
