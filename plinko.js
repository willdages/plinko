/*global $*/
'use strict';

function getRandom() {
	return Math.floor(Math.random()*2);
}

function printPath(path) {
	// for debugging
	// Shows path, 0 is left, 1 is right
	var directions = [];
	$.each(path, function(i, e) {
		var dir = e ? 'left' : 'right';
		directions.push(dir);
	});
	console.log('New path: ' + directions);
}

var Chip = function(boardId) {
	this.board = $('#' + boardId);
	this.location = {
		x: this.board.width() / 2,
		y: 0
	};
	this.lastStep = 0;
	this.create();
};

Chip.prototype.create = function() {
	var chip = $('<div class="chip"></div>');
	this.board.append(chip);
	this.el = $(chip);
	this.el.css('left', this.location.x + 'px').css('top', this.location.y + 'px');
	this.start();
};

Chip.prototype.newPath = function() {
	var self = this;
	self.path = [];
	for (var i=0; i<4; i++) {
		self.path.push(getRandom());
	}
};

Chip.prototype.start = function() {
	this.newPath();
	printPath(this.path);
	this.nextStep();
};

Chip.prototype.nextStep = function() {
	var self = this;
	if (self.lastStep < 4) {
		var offset = self.path[self.lastStep] ? -2  : 2;
		self.animateTo({
			x: offset,
			y: 2
		});
	}
};

Chip.prototype.animateTo = function(offset) {
	var self = this;
	var step = {
		x : self.board.height() / 11,
		y : self.board.width() / 17
	};
	self.el.animate({
		left: '+=' + (step.x * offset.x),
		top: '+=' + (step.y * offset.y)
	}, 1000, function() {
		self.location.x = self.el.css('left');
		self.location.y = self.el.css('top');
		self.lastStep++;
		self.nextStep();
	});
};

$(document).ready(function () {
	$(document).keydown(function (e) {
		e = e || window.event;
		if (e.keyCode === 13) {
			var chip = new Chip('plinko-board');
		}
	});
});