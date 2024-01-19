async function getUserCountry() {
  const response = await fetch("https://ipinfo.io/json");
  const data = await response.json();
  const country = document.querySelector("[data-animation='country']");

  if (data.status) {
    country.innerHTML = data.country;
  }
  country.innerHTML = "Local time";
}

function getCurrentTime() {
  const date = new Date();
  const currentTime = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "short",
  }).format(date);
  const time = document.querySelector("[data-animation='time']");

  time.innerHTML = currentTime;
}

window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      getUserCountry();
      getCurrentTime();
    }
  });
});
