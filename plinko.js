/*global $*/
'use strict';

var buckets = {
	drops: 0,
	1: 0,
	2: 0,
	3: 0,
	4: 0,
	5: 0
};

function updateStat(selector, count, percent) {
	$(selector).text(count);
	$(selector + '_percent').text(percent);
}

function updateBuckets() {
	var selectors = [ '#one', '#two', '#three', '#four', '#five'];
	$.each(selectors, function(i, e) {
		var count = buckets[i+1];
		var percent = ((buckets[i+1] / buckets.drops) * 100).toFixed(2) + '%';
		updateStat(e, count, percent);
	});
}

function getRandom() {
	var random = Math.floor(Math.random()*2);
	return random === 0 ? -1 : 1;
}

function getBucket(chip) {
	var total = 0;
	$.each(chip.path, function(i, e) {
		total += e;
	});
	switch(total) {
		case -4:
			buckets[1]++;
			break;
		case -2:
			buckets[2]++;
			break;
		case 0:
			buckets[3]++;
			break;
		case 2:
			buckets[4]++;
			break;
		case 4:
			buckets[5]++;
			break;
		default:
			break;
	}
	buckets.drops++;
	updateBuckets();
	$(chip.el).remove();
}

function printPath(path) {
	// for debugging
	// Shows path, 0 is left, 1 is right
	var directions = [];
	$.each(path, function(i, e) {
		var dir = e < 0 ? 'left' : 'right';
		directions.push(dir);
	});
	//console.log('New path: ' + directions);
}

var Chip = function(boardId, speed) {
	this.board = $('#' + boardId);
	this.speed = speed;
	this.location = {
		x: this.board.width() / 2,
		y: 0
	};
	this.lastStep = 0;
	var chip = $('<div class="chip"></div>');
	this.board.append(chip);
	this.el = $(chip);
	this.el.css('left', this.location.x + 'px').css('top', this.location.y + 'px');
};

Chip.prototype.start = function() {
	var self = this;
	self.path = [];
	for (var i=0; i<4; i++) {
		self.path.push(getRandom());
	}
	printPath(self.path);
	this.nextStep();
};

Chip.prototype.nextStep = function() {
	var self = this;
	if (self.lastStep < 4) {
		var offset = self.path[self.lastStep] < 0 ? -2  : 2;
		self.animateTo({
			x: offset,
			y: 2
		});
	} else {
		getBucket(self);
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
	}, self.speed, function() {
		self.location.x = self.el.css('left');
		self.location.y = self.el.css('top');
		self.lastStep++;
		self.nextStep();
	});
};

var id = 1;
$(document).ready(function () {
	$(document).keydown(function (e) {
		e = e || window.event;
		e.preventDefault();
		if (e.keyCode === 32) {
			var chip = new Chip('plinko-board', 500);
			chip.start();
		} else if (e.keyCode === 79) {
            // toggle faucet
            if ($('#faucet').text() == 'on') {
                $('#faucet').text('off');
                id = window.setInterval(function() {
			        var chip = new Chip('plinko-board', 500);
			        chip.start();
                }, 30);
           } else {
                $('#faucet').text('on');
                window.clearInterval(id);
            }
		}
	});
});
