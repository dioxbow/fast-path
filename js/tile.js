function Tile(col, row, direction, sprite, spriteIndex) {
	this.col = col;
	this.row = row;
	this.sprite = sprite;
	this.spriteIndex = spriteIndex;
	this.rotation = direction*Math.PI/2;
	this.outlets = sprite.outlets;
	this.activated = false;

	for (var i = 0; i < this.outlets.length; i++) {
		this.outlets[i] = (this.outlets[i] + direction) % 4;
	}
}

Tile.width = 63;
Tile.height = 63;

Tile.prototype.getDirection = function() {
	return this.rotation*2/Math.PI;
};

Tile.prototype.setDirection = function(direction) {
	this.rotation = direction*Math.PI/2;

};