function Sprite(src, x, y, w, h, outlets) {
	this.img = new Image();
	this.img.src = src;
	this.loaded = false;
	this.img.onload = function() {
		this.loaded = true;
	};
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;

	this.outlets = outlets;
}