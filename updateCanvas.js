function updateCanvas() {
    CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CONTEXT.globalAlpha = 0.4;
    CONTEXT.drawImage(VIDEO_FEED,
        SIZE.x, SIZE.y,
        SIZE.width, SIZE.height
    );
    CONTEXT.globalAlpha = 1;
    for (let i = 0; i < PIECES.length; i++) {
        PIECES[i].draw(CONTEXT);
    }
    window.requestAnimationFrame(updateCanvas);

}
