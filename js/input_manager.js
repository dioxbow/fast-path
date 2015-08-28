function InputManager(gameState, screen) {
	this.events = {};
	this.gameState = gameState;
	this.screen = screen;

	this.listen();
}

InputManager.prototype.on = function(event, callback) {
	if (!this.events[event]) {
		this.events[event] = [];
	}
	this.events[event].push(callback);
};

InputManager.prototype.emit = function(event, data) {
	var callbacks = this.events[event];
	if (callbacks) {
		for (var i = 0; i < callbacks.length; i++) {
			callbacks[i](data);
		}
	}
};

InputManager.prototype.listen = function() {
	var _this = this;
	document.addEventListener("click", function(event) {
		if (_this.gameState == "playing" || _this.gameState == "ready") {
			var mouse = {
				x: event.clientX - _this.screen.canvas.getBoundingClientRect().left,
				y: event.clientY - _this.screen.canvas.getBoundingClientRect().top
			};
			if (mouse.x>=0&&mouse.x<_this.screen.width&&mouse.y>=0&&mouse.y<_this.screen.height) {
				_this.emit(_this.gameState+"Click", mouse);
			}
		}
	});
};