function manageLanguageAnimation() {
  const navButtonLanguage = document.querySelector("#nav-button-language-js");
  navButtonLanguage.addEventListener("click", () => {
    // expande backdrop menu
    const backdropLanguage = document.querySelector("#backdrop-language-js");
    backdropLanguage.classList.toggle("expanded");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      manageLanguageAnimation();
    }
  });
});
