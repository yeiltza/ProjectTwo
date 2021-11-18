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
  function joinCall() {
    sc.open();
  }

  function leaveCall() {
    sc.close();
    for (let id in $peers) {
      resetCall(id, true);
    }
  }

  function handleUsernameForm(event) {
    event.preventDefault();
    const form = event.target;
    const username = form.querySelector('#username-input').value;
    const figcaption = document.querySelector('#self figcaption');
    figcaption.innerText = username;
    $self.username = username;
    for (let id in $peers) {
      shareUsername(username, id);
    }
  }
  /**
   *  User-Media and Data-Channel Functions
   */

  async function requestUserMedia(media_constraints) {
    $self.stream = new MediaStream();
    $self.media = await navigator.mediaDevices
      .getUserMedia(media_constraints);
    $self.stream.addTrack($self.media.getTracks()[0]);
    displayStream('#self', $self.stream);
  }

  function createVideoElement(id) {
    const figure = document.createElement('figure');
    const figcaption = document.createElement('figcaption');
    const video = document.createElement('video');
    const video_attrs = {
      'autoplay': '',
      'playsinline': '',
      'poster': 'img/placeholder.png'
    };
    figure.id = `peer-${id}`;
    figcaption.innerText = id;
    for (let attr in video_attrs) {
      video.setAttribute(attr, video_attrs[attr]);
    }
    figure.appendChild(video);
    figure.appendChild(figcaption);
    return figure;
  }

  function displayStream(selector, stream) {
    let video_element = document.querySelector(selector);
    if (!video_element) {
      let id = selector.split('#peer-')[1]; // #peer-abc123
      video_element = createVideoElement(id);
    }
    let video = video_element.querySelector('video');
    video.srcObject = stream;
    document.querySelector('#videos').appendChild(video_element);
  }

  function addStreamingMedia(id, stream) {
    const peer = $peers[id];
    if (stream) {
      for (let track of stream.getTracks()) {
        peer.connection.addTrack(track, stream);
      }
    }
  }

  function shareUsername(username, id) {
    const peer = $peers[id];
    const udc = peer.connection.createDataChannel(`username-${username}`);
  }

  /**
 *  Call Features & Reset Functions
 */

function initializeSelfAndPeerById(id, politeness) {
  $self[id] = {
    isPolite: politeness,
    isMakingOffer: false,
    isIgnoringOffer: false,
    isSettingRemoteAnswerPending: false
  };
  $peers[id] = {
    connection: new RTCPeerConnection($self.rtcConfig)
  }
}

function establishCallFeatures(id) {
  registerRtcCallbacks(id);
  addStreamingMedia(id, $self.stream);
  if ($self.username) {
    shareUsername($self.username, id);
  }
}

function resetCall(id, disconnect) {
  const peer = $peers[id];
  const videoSelector = `#peer-${id}`;
  displayStream(videoSelector, null);
  peer.connection.close();
  if (disconnect) {
    document.querySelector(videoSelector).remove();
    delete $self[id];
    delete $peers[id];
  }
}
