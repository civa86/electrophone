import DecoratedSynth from './DecoratedSynth'
import * as Modules from './lib/modules'

describe('DecoratedSynth', function () {
    let synth;

    it('should create a Synth public instance', function () {
        synth = new DecoratedSynth();
        expect(synth).toBeDefined();
    });

    it('should implement play method', function () {
        expect(synth.play).toBeDefined();
        expect(synth.play.constructor).toBe(Function);
        synth.play(440);
    });

    it('should implement stop method', function () {
        expect(synth.stop).toBeDefined();
        expect(synth.stop.constructor).toBe(Function);
        synth.stop(440);
    });

    it('should implement Modules methods', function () {
        let fx,
            methods = Object.keys(Modules);

        for (let type of methods) {
            fx = type.toLowerCase();
            expect(synth[fx]).toBeDefined();
            expect(synth[fx].constructor).toBe(Function);
        }
    });

});
