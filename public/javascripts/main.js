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
 /**
  *  Signaling-Channel Setup
  */

 const namespace = prepareNamespace(window.location.hash, true);

 const sc = io.connect('/' + namespace, { autoConnect: false });

 registerScCallbacks();

 /**
  *  Begin Application-Specific Code
  */
 /**
  *  User-Interface Setup
  */
  document.querySelector('#header h1')
    .innerText = 'Welcome to Room #' + namespace;

  document.querySelector('#call-button')
    .addEventListener('click', handleCallButton);

  document.querySelector('#username-form')
    .addEventListener('submit', handleUsernameForm);

    /**
   *  User Features and Media Setup*/

  requestUserMedia($self.mediaConstraints);

  /**
   *  User-Interface Functions and Callbacks
   */

  function handleCallButton(event) {
    const callButton = event.target;
    if (callButton.className === 'join') {
      console.log('Joining the call...');
      callButton.className = 'leave';
      callButton.innerText = 'Leave Call';
      joinCall();
    } else {
      console.log('Leaving the call...');
      callButton.className = 'join';
      callButton.innerText = 'Join Call';
      leaveCall();
    }
  }
