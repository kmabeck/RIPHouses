// JavaScript Documentlet videoElement;
// . ---------------------Setting up video stream ----------
navigator.mediaDevices.getUserMedia({
  audio: true,
  video: {facingMode: "environment"},
}).then(stream => {
  videoElement = document.createElement('video');
  videoElement.srcObject = stream;
  videoElement.muted = true;
  videoElement.play();
});

//-------------------------------- Setting up canvas to take image (Drawing) --------
const canvas = document.createElement('canvas');
canvas.width = videoElement.videoWidth;
canvas.height = videoElement.videoHeight;
const ctx = canvas.getContext('2d');
ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

//--------------Taking image---------------
const image = document.createElement('img');
image.setAttribute('src', canvas.toDataURL('image/png'));
 
//-----------------Downloading the image--------------
const a = document.createElement('a');
a.style.display = 'none';
a.href = captured.getAttribute('src');
a.download = `snap.${captured.tagName === 'IMG' ? 'png' : 'webm'}`;
document.body.appendChild(a);
a.click();
setTimeout(() => {
  document.body.removeChild(a);
}, 100);


//---------------------Creating another canvas for filters-------------
let requestId, tmpCanvas, tmpCtx, ctx;
const drawFrame = () => {
  if (!ctx) {
    ctx = canvas.getContext('2d');
  }
  if (!tmpCanvas) {
    tmpCanvas = document.createElement('canvas');
    tmpCtx = tmpCanvas.getContext('2d');
    tmpCanvas.width = canvas.width;
    tmpCanvas.height = canvas.height;
  }
  tmpCtx.drawImage(videoElement, 0, 0, tmpCanvas.width, tmpCanvas.height);
  const imgData = tmpCtx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height);
  const data = filter(imgData);
  ctx.putImageData(data, 0, 0);
  requestId = requestAnimationFrame(drawFrame);
};

// ---------To record filtered video --------------
let filteredStream = canvas.captureStream();
if (stream.getAudioTracks().length) {
  filteredStream.addTrack(stream.getAudioTracks()[0]);
}

//---------------drawing glasses----------------

const drawGlasses = (videoElement, canvas) => {
  let image;
  let ctx;
  if (!ctx) {
    ctx = canvas.getContext('2d');
  }
  if (!image) {
    image = document.createElement('img');
    image.src = 'OldBoylston.png';
	ctx.drawImage(image, 0, 0, width, height);
  }
};




