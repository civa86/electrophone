import { expect } from 'chai';
import WebSynth from './WebSynth'

/** @test {WebSynth} */
describe('WebSynth', () => {
    let synth;

    it('should have a WebSynth function', () => {
        expect(WebSynth).to.be.a('function');
    });

    /** @test {WebSynth#constructor} */
    it('should create a WebSynth instance', () => {
        synth = new WebSynth();
        expect(synth).to.be.a('object');
    });

    /** @test {WebSynth#isPlaying} */
    it('should have a isPlaying property', () => {
        expect(synth.isPlaying).to.be.defined;
        expect(synth.isPlaying).to.be.equal(false);
    });

    /** @test {WebSynth#getModules} */
    it('should have a method to get modules', () => {
        synth = new WebSynth();
        expect(synth.getModules).to.be.a('function');
        expect(synth.getModules()).to.be.a('object');
    });

    /** @test {WebSynth#defaultModules} */
    it('should have master and adsr modules created', () => {
        const modules = synth.getModules();
        expect(modules[WebSynth.CONST.MASTER]).to.be.a('object');
        expect(modules[WebSynth.CONST.ADSR]).to.be.a('object');
    });

    /** @test {WebSynth#create} */
    it('should have a create method to add new module', () => {
        let modules;
        const nodeProps = { level: 100, link: null, wave: 'sine' };

        expect(synth.create).to.be.a('function');
        synth.create('node1', WebSynth.TYPES.OSCILLATOR, nodeProps);

        modules = synth.getModules();
        expect(modules['node1']).to.be.a('object');
        expect(modules['node1'].type).to.equal(WebSynth.TYPES.OSCILLATOR);
        expect(modules['node1'].props).to.deep.equal(nodeProps);
    });

    /** @test {WebSynth#create} */
    it('should fail if try to create an existing module', () => {
        expect(synth.create.bind(synth, 'node1', WebSynth.TYPES.OSCILLATOR, {})).to.throw(Error);
    });

    /** @test {WebSynth#update} */
    it('should have a update method to update a module', () => {
        let modules;

        expect(synth.update).to.be.a('function');
        synth.update('node1', { level: 50 });

        modules = synth.getModules();
        expect(modules['node1']).to.be.a('object');
        expect(modules['node1'].props).to.be.a('object');
        expect(modules['node1'].props.level).to.equal(50);
    });

    /** @test {WebSynth#update} */
    it('should fail if try to update a module that doesn\'t exist', () => {
        expect(synth.update.bind(synth, 'nodeX', {})).to.throw(Error);
    });

    /** @test {WebSynth#master} */
    it('should have a master method to update the master module', () => {
        let modules;

        expect(synth.master).to.be.a('function');
        synth.master({ level: 50 });

        modules = synth.getModules();
        expect(modules[WebSynth.CONST.MASTER].props).to.be.a('object');
        expect(modules[WebSynth.CONST.MASTER].props.level).to.equal(50);
    });

    /** @test {WebSynth#adsr} */
    it('should have a adsr method to update the adsr module', () => {
        let modules;

        expect(synth.adsr).to.be.a('function');
        synth.adsr({ attack: 10 });

        modules = synth.getModules();
        expect(modules[WebSynth.CONST.ADSR].props).to.be.a('object');
        expect(modules[WebSynth.CONST.ADSR].props.attack).to.equal(10);
    });

    /** @test {WebSynth#destroy} */
    it('should have a destroy method to destroy a module', () => {
        let modules;

        expect(synth.destroy).to.be.a('function');
        synth.destroy('node1');

        modules = synth.getModules();
        expect(modules['node1']).to.be.undefined;
    });

    /** @test {WebSynth#destroy} */
    it('should fail if try to destroy a module that doesn\'t exist', () => {
        expect(synth.destroy.bind(synth, 'nodeX')).to.throw(Error);
    });

    /** @test {WebSynth#play} */
    it('should have a play method to start playing a frequency (default 0)', () => {
        synth.play();
        expect(synth.isPlaying).to.be.equal(true);
    });

    /** @test {WebSynth#stop} */
    it('should have a stop method to stop playing a frequency (default 0)', () => {
        synth.stop();
        expect(synth.isPlaying).to.be.equal(false);
    });

    /** @test {WebSynth#link} */
    it('should have a link method to link two modules', () => {
        const nodeProps = { level: 100, link: null, wave: 'sine' };
        let modules;

        synth.create('node1', WebSynth.TYPES.OSCILLATOR, nodeProps)

        expect(synth.link).to.be.a('function');
        synth.link('node1', WebSynth.CONST.MASTER);

        modules = synth.getModules();
        expect(modules['node1']).to.be.a('object');
        expect(modules['node1'].props).to.be.a('object');
        expect(modules['node1'].props.link).to.equal(WebSynth.CONST.MASTER);
    });

    /** @test {WebSynth#link} */
    it('should fail if try to link the master module to anything', () => {
        expect(synth.link.bind(synth, WebSynth.CONST.MASTER, 'node1')).to.throw(Error);
    });

    /** @test {WebSynth#getModuleProperties} */
    it('should have a static getModuleProperties method to get module properties by type', () => {
        const
            props = WebSynth.getModuleProperties(),
            oscProps = WebSynth.getModuleProperties(WebSynth.TYPES.OSCILLATOR);

        expect(props).is.an('array');
        expect(props.length).to.be.above(0);
        expect(props.filter(e => e.name === 'level').pop().defaultValue).to.be.equal(100);

        expect(oscProps).is.an('array');
        expect(oscProps.length).to.be.above(0);
        expect(oscProps.filter(e => e.name === 'wave').pop().defaultValue).to.be.equal(WebSynth.CONST.WAVE_SINE);
    });
});
