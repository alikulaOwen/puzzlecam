let VIDEO_FEED = null;
let CANVAS = null;
let CONTEXT = null;
let SCALER = 0.8;
let PIECES =  [];
let SIZE = {
    x:0,
    y:0,
    width: 0,
    height:0,
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
            window.addEventListener('resize',handleResize) // handles rsize and listens for change in orientation
            initPieces(SIZE.rows, SIZE.columns)
            updateCanvas()
        };
    }).catch(err => {
        alert("Camera: " + err);
    });

}
function updateCanvas() {
    CONTEXT.clearRect(0,0, CANVAS.width, CANVAS.height);
    CONTEXT.globalAlpha = 0.4
    CONTEXT.drawImage(VIDEO_FEED,
         SIZE.x, SIZE.y,
         SIZE.width,SIZE.height
        );
    CONTEXT.globalAlpha = 1;
        for(let i =0; i <PIECES.length; i++){
            PIECES[i].draw(CONTEXT)
        }
    window.requestAnimationFrame(updateCanvas)

}
function eventListeners(){
    CANVAS.addEventListener("mousedown",onMouseDown);
    CANVAS.addEventListener("mousemove",onMouseMove);
    CANVAS.addEventListener("mouseup",onMouseUp);
    CANVAS.addEventListener("touchstart",onTouchStart);
    CANVAS.addEventListener("touchmove",onTouchMove);
    CANVAS.addEventListener("touchend",onTouchEnd);
}
function onTouchStart(e){
    let position = {x:e.touches[0].clientX, y:e.touches[0].clientY}
    onMouseDown(position)
}
function onTouchMove(e){
    let position = {x:e.touches[0].clientX, y:e.touches[0].clientY}
    onMouseMove(position)
}
function onTouchEnd(e){
    let position = {x:e.touches[0].clientX, y:e.touches[0].clientY}
    onMouseUp(position)
}
function onMouseDown(e){
    SELECTED_PIECE = getPressedPiece(e);
    if (SELECTED_PIECE != null){
        const index = PIECES.indexOf(SELECTED_PIECE)
        if (index>-1){
            PIECES.splice(index,1);
            PIECES.push(SELECTED_PIECE);
        }
        SELECTED_PIECE.offset={
            x:e.x-SELECTED_PIECE.x,
            y:e.y-SELECTED_PIECE.y
        }
    }
}
function onMouseMove(e){
    if (SELECTED_PIECE!=null){
        SELECTED_PIECE.x=e.x-SELECTED_PIECE.offset.x;
        SELECTED_PIECE.y=e.y-SELECTED_PIECE.offset.y;
    }
}
function onMouseUp(e){
    //set selected piece to null
    if (SELECTED_PIECE.isClose()){
        //improve on interactivity by adding appx position
        SELECTED_PIECE.snap();
    }
    SELECTED_PIECE=null;
}
function getPressedPiece(position){
    //iterate inn reverse order prevent select last piece
    for(let i=PIECES.length-1;i>=0;i--){
        if(position.x>PIECES[i].x && position.x <PIECES[i].x+ PIECES[i].width &&
            position.y>PIECES[i].y && position.y <PIECES[i].y+ PIECES[i].height){
                return PIECES[i]
            }
    }
    return null 
}

function handleResize(){
    //centering video feed feed and resizing based on resolution
            
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;


    let resizer = SCALER * 
                Math.min(
                    window.innerWidth/VIDEO_FEED.videoWidth,
                    window.innerHeight/VIDEO_FEED.videoHeight
                );
            SIZE.width =resizer*VIDEO_FEED.videoWidth;
            SIZE.height =resizer*VIDEO_FEED.videoHeight;
            SIZE.x = window.innerWidth/2-SIZE.width/2;
            SIZE.y = window.innerHeight/2-SIZE.height/2; 
}

function scatterPieces(){
    for(let i =0; i<PIECES.length; i++){
        let position = {
            x: Math.random() * (CANVAS.width - PIECES[i].width),
            y: Math.random() * (CANVAS.height - PIECES[i].height)
        }
        PIECES[i].x = position.x;
        PIECES[i].y = position.y;
    }
}

function initPieces(rows, columns){
    SIZE.rows = rows;
    SIZE.columns = columns;
    PIECES = [];
    //iterating through the pieces
    for (let i = 0; i<SIZE.rows; i++){
        for(let j = 0 ; j<SIZE.columns; j++){
            PIECES.push(new Piece(i,j));
        }
    }
}


class Piece{
    constructor(rowIndex, columnIndex){
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
        this.x = SIZE.x + SIZE.width * this.columnIndex/SIZE.columns;
        this.y = SIZE.y + SIZE.height * this.rowIndex/SIZE.rows;
        this.width = SIZE.width/SIZE.columns;
        this.height = SIZE.height/SIZE.rows;
        this.xCorrect =this.x;
        this.yCorrect = this.y;
    }
    draw(context){
        context.beginPath();

        context.drawImage(VIDEO_FEED,
            this.columnIndex*VIDEO_FEED.videoWidth/SIZE.columns,
            this.rowIndex*VIDEO_FEED.videoHeight/SIZE.rows,
            VIDEO_FEED.videoWidth/SIZE.columns,
            VIDEO_FEED.videoHeight/SIZE.rows,
            this.x,
            this.y,
            this.width,
            this.height)
        context.rect(this.x, this.y, this.width,this.height)
        context.stroke();
    }
    isClose(){
        if(distance({x:this.x,y:this.y},
            {x:this.xCorrect,y:this.yCorrect})<this.width/4){
            return true
        }
        return false;
    }
    snap(){
        this.x=this.xCorrect;
        this.y=this.yCorrect;
    }
}

function distance(p1,p2){
    return Math.sqrt(
        (p1.x-p2.x)*(p2.x-p2.x) + (p1.y-p2.y)*(p2.y-p2.y) 
    )
}