/*global describe it expect*/

(function () {
    'use strict';
    /*global getPath getRandom*/    
    describe('The Random number generator', function () {
        it('should return a number', function () {
            var random = getRandom();
            expect(random).to.be.a('number');
        });
        it('should always be 0 or 1', function () {
            var i = 0;
            var withinRange = true;
            while (i < 100) {
                var r = getRandom();
                if ((r < 0) || (r > 1)) {
                    withinRange = false;
                }
                i++;
            }
            /*jshint expr:true */
            expect(withinRange).to.be.true;
        });
    });

    /*global Chip*/
    var chip = new Chip('plinko-board');

    describe('The game', function () {

        it('should generate a chip to drop', function () {
            /*jshint expr:true*/
            expect(chip).to.be.defined;
            expect(chip).to.be.an.instanceof(Chip);
        });

        it('should have a board to animate over', function () {
            /*jshint expr:true*/
            expect(chip.board).to.be.defined;
        });

        it('should have a reference to itself in the DOM', function () {
            /*jshint expr:true*/
            expect(chip.el).to.be.defined;
        });

        it('should be centered at the top of the board', function () {
            var topOfBoard = {
                x: chip.board.width() / 2,
                y: 0
            };
            expect(JSON.stringify(topOfBoard)).to.equal(JSON.stringify(chip.location));
        });

        it('should have a path to follow', function () {
            expect(chip.path).to.be.an('array');
            expect(chip.path).to.have.length(4);
        });
    });
})();
