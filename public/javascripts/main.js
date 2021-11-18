"use strict";

// DOM Stuff
const logo = document.querySelector(".logo");
logo.addEventListener("click", goHome);

function goHome() {
  window.location.href = "/";
}

function homebFunc() {
  window.location.href = "";
}
