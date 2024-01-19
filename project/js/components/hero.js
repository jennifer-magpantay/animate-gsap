function manageHeroAnimation() {
  const hero = document.querySelector("#hero-js");
  console.log("hero");
}

window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      manageHeroAnimation();
    }
  });
});
