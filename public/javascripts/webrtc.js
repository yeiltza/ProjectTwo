"use strict";

// Self and Peer Objects
const $self = {
  constraints: {
    audio: false,
    video: true,
  },
};

requestUserMedia($self.constraints);

// On page load, asks for permission to use audio/video.
async function requestUserMedia(constraints) {
  const video = document.querySelector("#self");
  $self.stream = await navigator.mediaDevices.getUserMedia(constraints);
  video.srcObject = $self.stream;
}

// Socket IO
const namespace = prepareNamespace(window.location.hash, true);

const sc = io.connect("/" + namespace, { autoConnect: false });

// DOM Events
function handleButton(e) {
  const button = e.target;
  if (button.innerText === "Join Room") {
    joinCall();
  } else {
    leaveCall();
  }
}

// DOM Elements
const button = document.querySelector(".call-button");

button.addEventListener("click", handleButton);

document.querySelector(".room-number").innerText = `#${namespace}`;
function joinCall() {
  sc.open();
  button.classList.add("leave");
  button.innerText = "Leave Room";
}

function leaveCall() {
  button.classList.remove("leave");
  button.innerText = "Join Room";
  sc.close();
}
// WebRTC Events

// Utility Functions for SocketIO
function prepareNamespace(hash, set_location) {
  let ns = hash.replace(/^#/, ""); // remove # from the hash
  if (/^[a-z]{3}-[a-z]{4}-[a-z]{3}$/.test(ns)) {
    console.log(`Checked existing namespace '${ns}'`);
    return ns;
  }

  ns = generateRandomAlphaString("-", 3, 4, 3);

  console.log(`Created new namespace '${ns}'`);
  if (set_location) window.location.hash = ns;
  return ns;
}

function generateRandomAlphaString(separator, ...groups) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let ns = [];
  for (let group of groups) {
    let str = "";
    for (let i = 0; i < group; i++) {
      str += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    ns.push(str);
  }
  return ns.join(separator);
}
