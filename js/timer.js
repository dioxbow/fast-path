function Timer() {
	this.start;
	this.last;
	this.deltaT;
	this.totalT;
}

Timer.prototype.refresh = function() {
	var now = new Date().getTime();
	this.deltaT = (now - this.last)/1000;
	this.totalT = (now - this.start)/1000;
	this.last = now;
};

Timer.prototype.start = function() {
	this.start = new Date().getTime();
	this.last = new Date().getTime();
};