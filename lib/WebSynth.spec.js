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
        expect(modules[WebSynth.CONST.ADSR]).to.be.a('object');
    });
});
