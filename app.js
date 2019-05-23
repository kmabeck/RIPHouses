// JavaScript Document
// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
   // canvas = document.querySelector("#canvas"),
    //cameraTrigger = document.querySelector("#camera--trigger"),
	swipeView = document.querySelector("swipeView")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
//cameraTrigger.onclick = function() {
  //  cameraSensor.width = cameraView.videoWidth;
  //  cameraSensor.height = cameraView.videoHeight;
  //  cameraSensor.getContext("2d").drawImage(cameraView, swipeView, document.body); //adding swipeview to canvas?
	
//};

function generateScreenshot() {
    document.getElementById("trigger").focus();
    setTimeout(() => {
    html2canvas(document.getElementById('capture'), {
            logging: true,
            profile: true,
            useCORS: true}).then(function(canvas) {
        var data = canvas.toDataURL('image/jpeg', 0.9);
        var src = encodeURI(data);
        document.getElementById('screenshot').src = src;
        
    }); }, 1000);
}
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);