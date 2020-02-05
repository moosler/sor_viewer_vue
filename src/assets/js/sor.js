const BinaryFile = require('binary-file');
const Writer = require('./writer');
const Reader = require('./reader');


class Sor {
    constructor(path, dirpath) {
        this.path = path;
        this.dir = dirpath;
        this.bf = new BinaryFile(path, 'r', true);
        this.fileinfo = new Fileinfo(path);
        this.result = new Result();
        this.tracePoints = {};
        this.reader = new Reader(this.bf);
        this.writer = new Writer(path);
    }
    async parse() {
        try {
            await this.bf.open();
            // console.log('File opened');
            await this.getVersion();
            await this.getMap();
            await this.getParams();
            await this.bf.close();
            // console.log('File closed');
            await this.writer.createFile(this.result);
            await this.writer.createFile(this.fileinfo, "fileInfo");
            await this.writer.createFile(this.tracePoints, "points");

        } catch (err) {
            // console.log(`There was an error: ${err}`);
        }
    }

    async getVersion() {
        this.fileinfo.version = await this.reader.getVersion();
        this.fileinfo.fullversion = await this.reader.getFullVersion();
    }
    async getMap() {
        this.fileinfo.map = await this.reader.getMap();
        this.fileinfo.blocks = await this.reader.getBlocks(this.fileinfo.map);
    }
    async getParams() {
        var blockNames = ["GenParams", "SupParams", "FxdParams", "DataPts", "KeyEvents", "Cksum"];

        for (var bname in this.fileinfo['blocks']) {
            if (blockNames.includes(bname)) {
                let lowName = bname.toLowerCase();

                let result = await this.reader.extractParams(this.fileinfo, bname);
                // this.result[lowName] = result;
                this.fileinfo[lowName] = result['fileinfo'];
                this.result[lowName] = result['result'];
                if ('points' in result) {
                    this.tracePoints = result['points'];
                }
            } else {
                // console.log("Ignoring Data Blog: " + bname);
            }
        }
        // console.log(this.fileinfo);
        // console.log(this.result);
    }
}


class Fileinfo {
    constructor(path) {
        this.path = path;
        this.version = "";
        this.fullversion = "";
        this.map = {};
        this.blocks = {};
    }
}

class Result {
    constructor() {
        this.genparams = {};
        this.supparams = {};
        this.fxdparams = {};
        this.datapts = {};
        this.keyevents = {};
        this.cksum = {};
    }
}

module.exports = Sor;