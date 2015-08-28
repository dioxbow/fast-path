function Game(width, height) {
	this.screen = new Screen(width, height);
	this.inputManager = new InputManager("ready", this.screen);
	this.gameTimer = new Timer();

	this.inputManager.on("readyClick", this.startPlaying.bind(this));
	this.inputManager.on("playingClick", this.rotateTile.bind(this));

	this.redSprites = [];
	this.redSprites.push(new Sprite("images/roads.png", 0, 0, Tile.width, Tile.height, [2, 0])); // straight_red
	this.redSprites.push(new Sprite("images/roads.png", Tile.width, 0, Tile.width, Tile.height, [2, 3])); // curved_red
	this.greenSprites = [];
	this.greenSprites.push(new Sprite("images/roads.png", 0, Tile.height, Tile.width, Tile.height, [2, 0])); // straight_green
	this.greenSprites.push(new Sprite("images/roads.png", Tile.width, Tile.height, Tile.width, Tile.height, [2, 3])); // curved_green

	this.scrollSpeed;
	this.scroll;
	this.tiles;
	this.columns;

	window.requestAnimationFrame(this.startReady.bind(this));
}

Game.prototype.startReady = function() {
	this.screen.renderReady();
};

Game.prototype.startPlaying = function(mouse) {
	this.inputManager.gameState = "playing";
	this.gameTimer.start();

	this.scrollSpeed = 50;
	this.scroll = -this.screen.height;
	this.columns = 5;
	
	this.tiles = [];
	for (var col = 0; col < this.columns; col++) {
		this.addRandomTile(col, 0);
	}
	this.tiles[Math.floor(this.columns/2)].activated = true;

	window.requestAnimationFrame(this.playingLoop.bind(this));
};

Game.prototype.playingLoop = function() {
	this.gameTimer.refresh();
	this.scroll += this.scrollSpeed * this.gameTimer.deltaT;

	for (var i = 0; i < this.tiles.length; i++) {
		var tile = this.tiles[i];
		if (this.screen.tileOnScreen(tile.col, tile.row+1, this.scroll) && !this.getTile(tile.col, tile.row+1)) {
			this.addRandomTile(tile.col, tile.row+1);
		}
		if (i != Math.floor(this.columns/2)) {
			tile.activated = false;
			var adjacentTiles = [];
			adjacentTiles.push(this.getTile(tile.col, tile.row+1));
			adjacentTiles.push(this.getTile(tile.col+1, tile.row));
			adjacentTiles.push(this.getTile(tile.col, tile.row-1));
			adjacentTiles.push(this.getTile(tile.col-1, tile.row));
			for (var j = 0; j < adjacentTiles.length; j++) {
				var adj = adjacentTiles[j];
				if (adj && adj.activated && adj.outlets.indexOf((j+2)%4)!=-1 && tile.outlets.indexOf(j)!=-1) tile.activated = true;
			}
			if (tile.activated) tile.sprite = this.greenSprites[tile.spriteIndex];
			else tile.sprite = this.redSprites[tile.spriteIndex];
		}
	}

	this.screen.renderPlaying(this.scroll, this.tiles);

	if (this.inputManager.gameState == "playing") window.requestAnimationFrame(this.playingLoop.bind(this));
};

Game.prototype.rotateTile = function(mouse) {
	var col = this.screen.getCol(mouse.x);
	var row = this.screen.getRow(mouse.y, this.scroll);
	var tile = this.getTile(col, row);
	var dir = tile.getDirection();
	tile.setDirection(dir > 2 ? dir%3 : dir+1);
	tile.enter = tile.enter > 2 ? tile.enter%3 : tile.enter+1;
	tile.exit = tile.exit > 2 ? tile.exit%3 : tile.exit+1;
};

Game.prototype.getTile = function(col, row) {
	for (var i = 0; i < this.tiles.length; i++) {
		var tile = this.tiles[i];
		if (tile.col == col && tile.row == row) {
			return tile;
		}
	}
	return null;
};

Game.prototype.addRandomTile = function(col, row) {
	var spriteIndex = Math.floor(Math.random()*this.redSprites.length);
	this.tiles.push(new Tile(col, row, Math.floor(Math.random()*4), this.redSprites[spriteIndex], spriteIndex));
};