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
});
