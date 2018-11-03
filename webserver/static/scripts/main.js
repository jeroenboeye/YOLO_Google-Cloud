// Generated by CoffeeScript 1.4.0
(function() {
  var canvas, ctx, onError, onSuccess, update, video, ws;

  onError = function(e) {
    return console.log("Rejected", e);
  };

  onSuccess = function(localMediaStream) {
    video.src = URL.createObjectURL(localMediaStream);
    return setInterval(update, 50);
  };

  update = function() {
    ctx.drawImage(video, 0, 0, 320, 240);
    return canvas.toBlob(function(blob) {
      return ws.send(blob);
    }, 'image/jpeg');
  };

  video = document.querySelector('video');

  canvas = document.querySelector('canvas');

  ctx = canvas.getContext('2d');

  ctx.strokeStyle = '#ff0';

  ctx.lineWidth = 2;

  ws = new WebSocket("wss://" + location.host + "/facedetector");

  ws.onopen = function() {
    return console.log("Opened websocket");
  };

  ws.onmessage = function(e) {
    var openCvCoords;
    openCvCoords = JSON.parse(e.data)[0];
    return ctx.strokeRect(openCvCoords[0], openCvCoords[1], openCvCoords[2], openCvCoords[3]);
  };



  var constraints = { audio: false, video: { width: 1280, height: 720 } }; 
  navigator.mediaDevices.getUserMedia(constraints)
     .then(onSuccess)
     .catch(onError);

}).call(this);
