import Synth from './Synth'

describe('Synth', function () {
    let synth;

    it('should exist', function () {
        expect(Synth).toBeDefined();

        synth = new Synth();
        expect(synth).toBeDefined();
    });

    it('should implement play method', function () {
        expect(synth.play).toBeDefined();

        synth.play(200);

        expect(synth.play.constructor).toBe(Function);
    });

    it('should implement stop method', function () {
        expect(synth.stop).toBeDefined();
        expect(synth.stop.constructor).toBe(Function);
    });
});
