function eventListeners() {
    CANVAS.addEventListener("mousedown", onMouseDown);
    CANVAS.addEventListener("mousemove", onMouseMove);
    CANVAS.addEventListener("mouseup", onMouseUp);
    CANVAS.addEventListener("touchstart", onTouchStart);
    CANVAS.addEventListener("touchmove", onTouchMove);
    CANVAS.addEventListener("touchend", onTouchEnd);
}
function onTouchStart(e) {
    let position = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    onMouseDown(position)
}

function onTouchMove(e) {
    let position = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    onMouseMove(position)
}

function onTouchEnd() {
    onMouseUp()
}

function onMouseDown(e) {
    SELECTED_PIECE = getPressedPiece(e);
    if (SELECTED_PIECE != null) {
        const index = PIECES.indexOf(SELECTED_PIECE)
        if (index > -1) {
            PIECES.splice(index, 1);
            PIECES.push(SELECTED_PIECE);
        }
        SELECTED_PIECE.offset = {
            x: e.x - SELECTED_PIECE.x,
            y: e.y - SELECTED_PIECE.y
        }
    }
}

function onMouseMove(e) {
    if (SELECTED_PIECE != null) {
        SELECTED_PIECE.x = e.x - SELECTED_PIECE.offset.x;
        SELECTED_PIECE.y = e.y - SELECTED_PIECE.offset.y;
    }
}

function onMouseUp() {
    //set selected piece to null
    if (SELECTED_PIECE.isClose()) {
        //improve on interactivity by adding appx position
        SELECTED_PIECE.snap();
    }
    SELECTED_PIECE = null;
}

function getPressedPiece(position) {
    //iterate inn reverse order prevent select last piece
    for (let i = PIECES.length - 1; i >= 0; i--) {
        if (position.x > PIECES[i].x && position.x < PIECES[i].x + PIECES[i].width &&
            position.y > PIECES[i].y && position.y < PIECES[i].y + PIECES[i].height) {
            return PIECES[i]
        }
    }
    return null
}
