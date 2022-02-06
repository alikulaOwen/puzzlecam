class Piece {
    constructor(rowIndex, columnIndex) {
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
        this.x = SIZE.x + (SIZE.width * (this.columnIndex / SIZE.columns));
        this.y = SIZE.y + (SIZE.height * (this.rowIndex / SIZE.rows));
        this.width = SIZE.width / SIZE.columns;
        this.height = SIZE.height / SIZE.rows;
        this.xCorrect = this.x;
        this.yCorrect = this.y;
    }
    draw(context) {
        context.beginPath();

        context.drawImage(VIDEO_FEED,
            this.columnIndex * (VIDEO_FEED.videoWidth / SIZE.columns),
            this.rowIndex * (VIDEO_FEED.videoHeight / SIZE.rows),
            VIDEO_FEED.videoWidth / SIZE.columns,
            VIDEO_FEED.videoHeight / SIZE.rows,
            this.x,
            this.y,
            this.width,
            this.height);
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();
    }
    isClose() {
        if (distance({ x: this.x, y: this.y }, { x: this.xCorrect, y: this.yCorrect }) < this.width / 4) {
            return true;
        }
        return false;
    }
    snap() {
        this.x = this.xCorrect;
        this.y = this.yCorrect;
    }
}
function distance(p1, p2) {
    return Math.sqrt(
        (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y)
    )
}
