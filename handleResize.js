function handleResize() {
    //centering video feed feed and resizing based on resolution
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;


    let resizer = SCALER *
        Math.min(
            window.innerWidth / VIDEO_FEED.videoWidth,
            window.innerHeight / VIDEO_FEED.videoHeight
        );
    SIZE.width = resizer * VIDEO_FEED.videoWidth;
    SIZE.height = resizer * VIDEO_FEED.videoHeight;
    SIZE.x = (window.innerWidth / 2) - SIZE.width / 2;
    SIZE.y = (window.innerHeight / 2) - SIZE.height / 2;
}
