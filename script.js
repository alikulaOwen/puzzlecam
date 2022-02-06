let VIDEO_FEED = null;
let CANVAS = null;
let CONTEXT = null;
let SCALER = 0.8;
let PIECES = [];
let SIZE = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    columns: 3,
    rows: 3
}
let SELECTED_PIECE = null;


function main() {
    CANVAS = document.getElementById("myCanvas")
    CONTEXT = CANVAS.getContext("2d");
    eventListeners();

    //get access to user camera
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then((signal) => {
        VIDEO_FEED = document.createElement("video")
        VIDEO_FEED.srcObject = signal;
        VIDEO_FEED.play();

        VIDEO_FEED.onloadeddata = () => {
            handleResize()
            window.addEventListener('resize', handleResize) // handles rsize and listens for change in orientation
            initPieces(SIZE.rows, SIZE.columns)
            updateCanvas()
        };
    }).catch(err => {
        alert("Camera: " + err);
    });

}

function scatterPieces() {
    for (let i = 0; i < PIECES.length; i++) {
        let position = {
            x: Math.random() * (CANVAS.width - PIECES[i].width),
            y: Math.random() * (CANVAS.height - PIECES[i].height)
        }
        PIECES[i].x = position.x;
        PIECES[i].y = position.y;
    }
}

function initPieces(rows, columns) {
    SIZE.rows = rows;
    SIZE.columns = columns;
    PIECES = [];
    //iterating through the pieces
    for (let i = 0; i < SIZE.rows; i++) {
        for (let j = 0; j < SIZE.columns; j++) {
            PIECES.push(new Piece(i, j));
        }
    }
}