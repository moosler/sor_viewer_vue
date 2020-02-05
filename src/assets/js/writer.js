const path = require('path');
const jsonfile = require('jsonfile');


class Writer {
    /**
     * The extension of an sor file can be: "sor" or "SOR"!
     * @param {*} dataPath 
     */
    constructor(dataPath) {
        // this.cfilename = path.basename(dataPath);
        this.sorPath = dataPath;
        this.ext = path.extname(dataPath);
        this.dirname = path.dirname(dataPath);
        this.fileNameWithExt = path.basename(dataPath);
        this.filename = this.fileNameWithExt.split('.').slice(0, -1).join('.');
        this.originalFileName = this.fileNameWithExt.split('.').slice(0, -1).join('.');
        this.newExtension = ".json";

    }
    setNewName(ext, text = "", addText = true) {
        this.resetName();
        this.newExtension = ext;
        if (addText) {
            this.filename += text;
        } else {
            this.filename = text;
        }
    }
    resetName() {
        this.filename = this.originalFileName;
    }
    getFullName() {
        return (this.dirname + "/" + this.filename + this.newExtension);
    }

    async createFile(obj, filename = false, ext = ".json") {
        if (!filename) {
            filename = this.getFullName();
        } else {
            this.setNewName(ext, filename, false);
            filename = this.getFullName();
        }

        jsonfile.writeFile(filename, obj)
        // .then(res => {
        //     console.log('Write complete: ' + filename)
        // })
        // .catch(error => console.error(error))
    }
}

module.exports = Writer;