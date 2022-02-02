let VIDEO_FEED = null;
let CANVAS = null;
let CONTEXT = null;
let SCALER = 0.8;


function main() {
    CANVAS = document.getElementById("myCanvas")
    CONTEXT = CANVAS.getContext("2d");
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
    //get access to user camera
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then((signal) => {
        VIDEO_FEED = document.createElement("video")
        VIDEO_FEED.arcObject = signal;
        VIDEO_FEED.play();

        VIDEO_FEED.onloadeddata = () => {
            updateCanvas()
        };
    }).catch(err => {
        alert("Camera: " + err);
    })

}

function updateCanvas() {
    CONTEXT.drawImage(VIDEO_FEED, 0, 0);
    window.requestAnimationFrame(updateCanvas)
}