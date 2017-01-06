import { expect } from 'chai';
import Synth from '../../lib/src/Synth'

/** @test {Synth} */
describe('Synth', () => {
    //TODO export in a file...
    const mockAudioCtx = {
        createGainNode: () => ({
            gain: {
                value: 0
            },
            connect: () => null
        }),
        createDelayNode: () => ({}),
        createScriptProcessor: () => ({
            connect: () => null
        }),
        createAnalyser: () => ({
            smoothingTimeConstant: '',
            fftSize: '',
            minDecibels: 0,
            maxDecibels: 0,
            connect: () => null,
            getByteFrequencyData: () => null
        }),
        createGain: () => ({
            gain: {
                value: 0
            },
            connect: () => null
        }),
        createOscillator: () => ({
            type: '',
            connect: () => null
        }),
        destination: {}
    };
    let synth;

    it('should have a Synth function', () => {
        expect(Synth).to.be.a('function');
    });

    /** @test {Synth#constructor} */
    it('should create a Synth instance with no audio context and properties', () => {
        synth = new Synth();
        expect(synth).to.be.a('object');
    });

    /** @test {Synth#constructor} */
    it('should create a Synth instance, uniforming web audio api methods', () => {
        synth = new Synth(mockAudioCtx);
        expect(synth).to.be.a('object');
        expect(synth.audioContext).to.be.a('object');
        expect(synth.audioContext.createGain).to.be.a('function');
        expect(synth.audioContext.createDelay).to.be.a('function');
        expect(synth.audioContext.createGain()).to.be.a('object');
        expect(synth.audioContext.createDelay()).to.be.a('object');
    });

    /** @test {Synth#constructor} */
    it('should create a Synth instance with spectrum node', () => {
        synth = new Synth(mockAudioCtx, { spectrum: true });
        expect(synth).to.be.a('object');
        expect(synth.spectrum).to.equal(true);
        expect(synth.javascriptNode).to.be.a('object');
        expect(synth.analyser).to.be.a('object');
    });

    /** @test {Synth#createSpectrum} */
    it('should have a createSpectrum method to create a connected spectrum node', () => {
        const
            synthNoCtx = new Synth(),
            synthCtx = new Synth(mockAudioCtx);

        expect(synth.createSpectrum).to.be.a('function');

        synthNoCtx.createSpectrum();
        expect(synthNoCtx.javascriptNode).to.be.equal(null);
        expect(synthNoCtx.analyser).to.be.equal(null);

        synthCtx.createSpectrum();
        expect(synthCtx.javascriptNode).to.be.a('object');
        expect(synthCtx.analyser).to.be.a('object');
    });

    /** @test {Synth#modulesConfig} */
    it('should have a modulesConfig property and master, adsr modules created', () => {
        expect(synth.modulesConfig).to.be.a('object');
        expect(synth.modulesConfig['master']).to.be.a('object');
        expect(synth.modulesConfig['adsr']).to.be.a('object');
    });

    /** @test {Synth#module} */
    it('should have a module method that fails without a type parameter', () => {
        expect(synth.module).to.be.a('function');
        expect(synth.module.bind(synth, null, 'node1', {})).to.throw(Error);
    });

    /** @test {Synth#module} */
    it('should have a module method that fails without a label parameter', () => {
        expect(synth.module.bind(synth, 'Oscillator', null, {})).to.throw(Error);
    });

    /** @test {Synth#module} */
    it('should have a module method that add a module that doesn\'t exist', () => {
        expect(synth.modulesConfig['node1']).to.be.undefined;
        synth.module('Oscillator', 'node1');
        expect(synth.modulesConfig['node1']).to.be.a('object');
        expect(synth.modulesConfig['node1'].props).to.be.a('object');
    });

    /** @test {Synth#addModule} */
    it('should have a addModule method that fails if try to add an existing module', () => {
        expect(synth.addModule).to.be.a('function');
        expect(synth.addModule.bind(synth, 'Oscillator', 'node1', {})).to.throw(Error);
    });

    /** @test {Synth#addModule} */
    it('should have a addModule method that add a module that doesn\'t exist', () => {
        expect(synth.modulesConfig['node2']).to.be.undefined;
        synth.addModule('Oscillator', 'node2');
        expect(synth.modulesConfig['node2']).to.be.a('object');
        expect(synth.modulesConfig['node2'].props).to.be.a('object');

        expect(synth.modulesConfig['node3']).to.be.undefined;
        synth.addModule('Oscillator', 'node3', { link: 'master' });
        expect(synth.modulesConfig['node3']).to.be.a('object');
        expect(synth.modulesConfig['node3'].props).to.be.a('object');
        expect(synth.modulesConfig['node3'].props.link).to.be.equal('master');
    });

    /** @test {Synth#updateModule} */
    it('should have a updateModule method that fails if try to update a module that doesn\'t exist', () => {
        expect(synth.updateModule).to.be.a('function');
        expect(synth.updateModule.bind(synth, 'nodeX', {})).to.throw(Error);
    });

    /** @test {Synth#updateModule} */
    it('should have a updateModule method that update a module ideintifyied by label', () => {
        synth.updateModule('node3');
        expect(synth.modulesConfig['node3'].props.link).to.be.equal('master');
        synth.updateModule('node3', { link: 'node2' });
        expect(synth.modulesConfig['node3'].props.link).to.be.equal('node2');
        synth.updateModule('node3', { aProp: 50 });
        expect(synth.modulesConfig['node3'].props.aProp).to.be.undefined;
    });

    /** @test {Synth#updateModule} */
    it('should have a updateModule method that update running voices with their updateModule method', () => {
        let voiceUpdated = false;

        const synthVoice = new Synth(mockAudioCtx);

        synthVoice.voices = {
            440: {
                updateModule: () => voiceUpdated = true
            }
        };
        expect(voiceUpdated).to.be.equal(false);
        synthVoice.addModule('Oscillator', 'node', { level: 100 });
        expect(synthVoice.modulesConfig['node'].props.level).to.be.equal(100);
        synthVoice.updateModule('node', { level: 50 });
        expect(synthVoice.modulesConfig['node'].props.level).to.be.equal(50);
        expect(voiceUpdated).to.be.equal(true);
    });

    /** @test {Synth#destroyModule} */
    it('should have a destroyModule method that fails if try to destroy a module that doesn\'t exist', () => {
        expect(synth.destroyModule).to.be.a('function');
        expect(synth.destroyModule.bind(synth, 'nodeX', {})).to.throw(Error);
    });

    /** @test {Synth#destroyModule} */
    it('should have a destroyModule method that destroy a module ideintifyied by label', () => {
        synth.destroyModule('node3');
        expect(synth.modulesConfig['node3']).to.be.undefined;
        synth.destroyModule('node2');
        expect(synth.modulesConfig['node2']).to.be.undefined;
        synth.destroyModule('node1');
        expect(synth.modulesConfig['node1']).to.be.undefined;
    });

    /** @test {Synth#destroyModule} */
    it('should have a destroyModule method that destroy running voices with their removeModule method', () => {
        let voiceRemoved = false;

        const synthVoice = new Synth(mockAudioCtx);

        synthVoice.voices = {
            440: {
                removeModule: () => voiceRemoved = true
            }
        };
        expect(voiceRemoved).to.be.equal(false);
        synthVoice.addModule('Oscillator', 'node', { level: 100 });
        expect(synthVoice.modulesConfig['node'].props.level).to.be.equal(100);
        synthVoice.destroyModule('node');
        expect(synthVoice.modulesConfig['node']).to.be.undefined;
        expect(voiceRemoved).to.be.equal(true);
    });

    /** @test {Synth#play} */
    it('should have a play method to play a voice if doesn\'t exist and update spectrum if necessary', () => {
        let cnt = 1;
        const synthSpectrum = new Synth(mockAudioCtx, { spectrum: true, updateSpectrum: () => cnt = 3 });

        expect(synthSpectrum.play).to.be.a('function');
        synthSpectrum.play(440);
        expect(synthSpectrum.voices[440]).to.be.a('object');
        synthSpectrum.voices[440] = {
            noteOn: () => cnt = 2
        };

        synthSpectrum.play(440);
        expect(cnt).to.be.equal(1);

        synthSpectrum.play(100);
        expect(synthSpectrum.javascriptNode).to.be.a('object');
        expect(synthSpectrum.javascriptNode.onaudioprocess).to.be.a('function');

        synthSpectrum.javascriptNode.onaudioprocess();
        expect(cnt).to.be.equal(3);

        synthSpectrum.updateSpectrum = null;
        synthSpectrum.javascriptNode.onaudioprocess();
        expect(cnt).to.be.equal(3);
    });

    /** @test {Synth#stop} */
    it('should have a stop method to stop a voice if exist and reset spectrum if necessary', () => {
        let cnt = 1;
        const synthSpectrum = new Synth(mockAudioCtx, { spectrum: true });

        expect(synthSpectrum.stop).to.be.a('function');
        synthSpectrum.play(440);
        expect(synthSpectrum.voices[440]).to.be.a('object');
        synthSpectrum.voices[440] = {
            noteOff: () => cnt = 2
        };

        synthSpectrum.stop(440);
        expect(cnt).to.be.equal(2);

        synthSpectrum.resetSpectrum = () => cnt = 3;
        synthSpectrum.stop(100);
        expect(synthSpectrum.javascriptNode).to.be.a('object');
        expect(synthSpectrum.javascriptNode.onaudioprocess).to.be.equal(null);
        expect(cnt).to.be.equal(3);
    });
});
