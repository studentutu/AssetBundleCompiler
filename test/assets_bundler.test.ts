import { expect } from 'chai';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';
import * as assetsBundler from '../src/assets_bundler';

describe('AssetsBundler', () => {
    const tmpFilePath = path.normalize(`${os.tmpdir()}/test.empty`);
    let bundler: assetsBundler.AssetsBundler;

    before(() => fs.createFileSync(tmpFilePath));

    beforeEach(() => bundler = new assetsBundler.AssetsBundler());

    describe('#including()', () => {
        it('should take path strings or read streams', () => {
            expect(bundler.including(tmpFilePath)).to.equal(bundler);
            expect(bundler.including(fs.createReadStream(tmpFilePath))).to.equal(bundler);
        });

        it('should throw when passing something other than a string or read stream', () => {
            expect(() => { bundler.including(null as any); }).to.throw();
            expect(() => { bundler.including(5 as any); }).to.throw();
            expect(() => { bundler.including(fs.createWriteStream(tmpFilePath) as any); }).to.throw();
        });
    });

    describe('#for()', () => {
        it('should take strings', () => {
            expect(bundler.for('EnumMemberName')).to.equal(bundler);
        });

        it('should throw when passing something other than a string', () => {
            expect(() => { bundler.for(null as any); }).to.throw();
            expect(() => { bundler.for(5 as any); }).to.throw();
        });
    });
});
