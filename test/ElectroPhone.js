import { expect } from 'chai';
import ElectroPhone from '../lib/ElectroPhone'

/** @test {ElectroPhone} */
describe('ElectroPhone', () => {
    let synth;

    it('should have a ElectroPhone function', () => {
        expect(ElectroPhone).to.be.a('function');
    });

    /** @test {ElectroPhone#constructor} */
    it('should create a ElectroPhone instance', () => {
        synth = new ElectroPhone();
        expect(synth).to.be.a('object');
    });

    /** @test {ElectroPhone#isPlaying} */
    it('should have a isPlaying property', () => {
        expect(synth.isPlaying).to.be.defined;
        expect(synth.isPlaying).to.be.equal(false);
    });

    /** @test {ElectroPhone#getModules} */
    it('should have a method to get modules', () => {
        synth = new ElectroPhone();
        expect(synth.getModules).to.be.a('function');
        expect(synth.getModules()).to.be.a('object');
    });

    /** @test {ElectroPhone#defaultModules} */
    it('should have master and adsr modules created', () => {
        const modules = synth.getModules();
        expect(modules[ElectroPhone.CONST.MASTER]).to.be.a('object');
        expect(modules[ElectroPhone.CONST.ADSR]).to.be.a('object');
    });

    /** @test {ElectroPhone#create} */
    it('should have a create method to add new module', () => {
        let modules;
        const nodeProps = { level: 100, link: null, wave: 'sine' };

        expect(synth.create).to.be.a('function');
        synth.create('node1', ElectroPhone.TYPES.OSCILLATOR, nodeProps);

        modules = synth.getModules();
        expect(modules['node1']).to.be.a('object');
        expect(modules['node1'].type).to.equal(ElectroPhone.TYPES.OSCILLATOR);
        expect(modules['node1'].props).to.deep.equal(nodeProps);
    });

    /** @test {ElectroPhone#create} */
    it('should fail if try to create an existing module', () => {
        expect(synth.create.bind(synth, 'node1', ElectroPhone.TYPES.OSCILLATOR, {})).to.throw(Error);
    });

    /** @test {ElectroPhone#update} */
    it('should have a update method to update a module', () => {
        let modules;

        expect(synth.update).to.be.a('function');
        synth.update('node1', { level: 50 });

        modules = synth.getModules();
        expect(modules['node1']).to.be.a('object');
        expect(modules['node1'].props).to.be.a('object');
        expect(modules['node1'].props.level).to.equal(50);
    });

    /** @test {ElectroPhone#update} */
    it('should fail if try to update a module that doesn\'t exist', () => {
        expect(synth.update.bind(synth, 'nodeX', {})).to.throw(Error);
    });

    /** @test {ElectroPhone#master} */
    it('should have a master method to update the master module', () => {
        let modules;

        expect(synth.master).to.be.a('function');
        synth.master({ level: 50 });

        modules = synth.getModules();
        expect(modules[ElectroPhone.CONST.MASTER].props).to.be.a('object');
        expect(modules[ElectroPhone.CONST.MASTER].props.level).to.equal(50);
    });

    /** @test {ElectroPhone#adsr} */
    it('should have a adsr method to update the adsr module', () => {
        let modules;

        expect(synth.adsr).to.be.a('function');
        synth.adsr({ attack: 10 });

        modules = synth.getModules();
        expect(modules[ElectroPhone.CONST.ADSR].props).to.be.a('object');
        expect(modules[ElectroPhone.CONST.ADSR].props.attack).to.equal(10);
    });

    /** @test {ElectroPhone#destroy} */
    it('should have a destroy method to destroy a module', () => {
        let modules;

        expect(synth.destroy).to.be.a('function');
        synth.destroy('node1');

        modules = synth.getModules();
        expect(modules['node1']).to.be.undefined;
    });

    /** @test {ElectroPhone#destroy} */
    it('should fail if try to destroy a module that doesn\'t exist', () => {
        expect(synth.destroy.bind(synth, 'nodeX')).to.throw(Error);
    });

    /** @test {ElectroPhone#play} */
    it('should have a play method that doesn\'t start if no frequency given', () => {
        synth.play();
        expect(synth.isPlaying).to.be.equal(false);
    });

    /** @test {ElectroPhone#play} */
    it('should have a play method that start playing given frequency', () => {
        synth.play(440);
        expect(synth.isPlaying).to.be.equal(true);
    });


    /** @test {ElectroPhone#stop} */
    it('should have a stop method that doesn\'t stop if no frequency given', () => {
        synth.stop();
        expect(synth.isPlaying).to.be.equal(true);
    });

    /** @test {ElectroPhone#stop} */
    it('should have a stop method that stop playing given frequency', () => {
        synth.stop(440);
        expect(synth.isPlaying).to.be.equal(false);
    });

    /** @test {ElectroPhone#link} */
    it('should have a link method to link two modules', () => {
        const nodeProps = { level: 100, link: null, wave: 'sine' };
        let modules;

        synth.create('node1', ElectroPhone.TYPES.OSCILLATOR, nodeProps);

        expect(synth.link).to.be.a('function');
        synth.link('node1', ElectroPhone.CONST.MASTER);

        modules = synth.getModules();
        expect(modules['node1']).to.be.a('object');
        expect(modules['node1'].props).to.be.a('object');
        expect(modules['node1'].props.link).to.equal(ElectroPhone.CONST.MASTER);
    });

    /** @test {ElectroPhone#link} */
    it('should fail if try to link the master module to anything', () => {
        expect(synth.link.bind(synth, ElectroPhone.CONST.MASTER, 'node1')).to.throw(Error);
    });

    /** @test {ElectroPhone#link} */
    it('should fail if try to link a source that doesn\'t exist', () => {
        expect(synth.link.bind(synth, 'nodeX', ElectroPhone.CONST.MASTER)).to.throw(Error);
    });

    /** @test {ElectroPhone#link} */
    it('should fail if try to link a source to a target that doesn\'t exist', () => {
        expect(synth.link.bind(synth, 'node1', 'nodeX')).to.throw(Error);
    });

    /** @test {ElectroPhone#getModuleProperties} */
    it('should have a static getModuleProperties method to get module properties by type', () => {
        const
            props = ElectroPhone.getModuleProperties(),
            oscProps = ElectroPhone.getModuleProperties(ElectroPhone.TYPES.OSCILLATOR);

        expect(props).is.an('array');
        expect(props.length).to.be.above(0);
        expect(props.filter(e => e.name === 'level').pop().defaultValue).to.be.equal(100);

        expect(oscProps).is.an('array');
        expect(oscProps.length).to.be.above(0);
        expect(oscProps.filter(e => e.name === 'wave').pop().defaultValue).to.be.equal(ElectroPhone.CONST.WAVE_SINE);
    });

    /** @test {ElectroPhone#describeModules} */
    it('should have a static describeModules method to describe all ElectroPhone modules with properties', () => {
        const modules = ElectroPhone.describeModules();

        expect(modules).is.an('array');
        expect(modules.length).to.be.above(0);
        expect(modules.filter(e => e.type === ElectroPhone.TYPES.MASTER).pop().properties).is.an('array');
        expect(
            modules
                .filter(e => e.type === ElectroPhone.TYPES.MASTER)
                .pop()
                .properties
                .filter(p => p.name === 'level')
                .pop()
                .defaultValue
        ).to.be.equal(100);

        expect(modules.filter(e => e.type === ElectroPhone.TYPES.OSCILLATOR).pop().properties).is.an('array');
        expect(
            modules
                .filter(e => e.type === ElectroPhone.TYPES.OSCILLATOR)
                .pop()
                .properties
                .filter(p => p.name === 'wave')
                .pop()
                .defaultValue
        ).to.be.equal(ElectroPhone.CONST.WAVE_SINE);
    });

    /** @test {ElectroPhone#getFrequency} */
    it('should have a static getFrequency method to calculate frequency value from note and octave', () => {
        const
            freq = ElectroPhone.getFrequency(),
            freqA4 = ElectroPhone.getFrequency('A', 4);

        expect(freq).to.be.a('number');
        expect(freq).to.be.equal(0);
        expect(freqA4).to.be.a('number');
        expect(freqA4).to.be.equal(440);
    });

    /** @test {ElectroPhone#getFrequency} */
    it('should have a static getNotes method to get notes list', () => {
        const notes = ElectroPhone.getNotes();

        expect(notes).is.an('array');
        expect(notes.length).to.be.equal(12);
        expect(notes.indexOf('C')).to.be.equal(0);
        expect(notes.indexOf('A')).to.be.equal(9);
    });
});
