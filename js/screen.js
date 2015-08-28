function Screen(width, height) {
	this.canvas = document.getElementById("gameCanvas");
	this.canvas.width = this.width = width;
	this.canvas.height = this.height = height;
	this.ctx = this.canvas.getContext("2d");
}

Screen.prototype.renderPlaying = function(scroll, tiles) {
	this.ctx.fillRect(0, 0, this.width, this.height);
	for (var i = 0; i < tiles.length; i++) {
		var tile = tiles[i];
		if (this.tileOnScreen(tile.col, tile.row, scroll)) {
			var sprite = tile.sprite;
			var x = this.getX(tile.col);
			var y = this.getY(tile.row, scroll);
			this.ctx.translate(x+(Tile.width)/2, y+(Tile.height)/2);
			this.ctx.rotate(tile.rotation);
			this.ctx.translate(-x-(Tile.width)/2, -y-(Tile.height)/2);

			this.ctx.drawImage(sprite.img, sprite.x, sprite.y, Tile.width, Tile.height, x, y, Tile.width, Tile.height);

			this.ctx.translate(x+(Tile.width)/2, y+(Tile.height)/2);
			this.ctx.rotate(-tile.rotation);
			this.ctx.translate(-x-(Tile.width)/2, -y-(Tile.height)/2);	
		}
	}
};

Screen.prototype.renderReady = function() {
	this.ctx.fillRect(0, 0, this.width, this.height);
	this.ctx.font = "30px Arial";
	this.ctx.textAlign = "center";
	this.ctx.textBaseline = "middle";
	this.ctx.fillStyle = "#ffffff";
	this.ctx.fillText("Click to start!", this.width/2, this.height/2);
	this.ctx.fillStyle = "#000000";
};

Screen.prototype.tileOnScreen = function(col, row, scroll) {
	var x = this.getX(col);
	var y = this.getY(row, scroll);
	if (x>=0 && x<this.width && y>=-Tile.height && y<this.height) {
		return true;
	}
	return false;
};

Screen.prototype.getY = function(row, scroll) {
	return Math.floor(scroll) + this.height - ((row+1) * Tile.height);
};

Screen.prototype.getX = function(col) {
	return col * Tile.width;
};

Screen.prototype.getRow = function(y, scroll) {
	return Math.ceil((Math.floor(scroll) + this.height - y)/Tile.height - 1);
};

Screen.prototype.getCol = function(x) {
	return Math.floor(x / Tile.width);
};