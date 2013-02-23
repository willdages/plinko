/*global describe it expect*/

(function () {
    'use strict';
    /*global getRandom buckets*/
    describe('The Random number generator', function () {
        it('should return a number', function () {
            var random = getRandom();
            expect(random).to.be.a('number');
        });
        it('should always be -1 or 1', function () {
            var i = 0;
            var valid = true;
            while (i < 100) {
                var r = getRandom();
                if (r !== -1 && r !== 1) {
                    valid = false;
                }
                i++;
            }
            /*jshint expr:true */
            expect(valid).to.be.true;
        });
    });

    /*global Chip*/
    var chip = new Chip('plinko-board', 0);

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

        chip.start();

        it('should have a path to follow once it has started', function () {
            expect(chip.path).to.be.an('array');
            expect(chip.path).to.have.length(4);
        });

        it('should update the bucket numbers once finished', function () {
            expect(buckets.drops).to.equal(1);
        });
    });
})();
