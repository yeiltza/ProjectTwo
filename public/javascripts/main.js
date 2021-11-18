"use strict";
/**
*Global Variables: $self and $peer
 */
 const $self = {
   rtcConfig: {
     iceServers: [{
       urls: "stun:stun.l.google.com:19302"
     }]
   },
   mediaConstraints: { audio: false, video: true }
 };

 const $peers = {};
