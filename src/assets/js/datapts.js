class Datapoints {
    constructor(name, reader) {
        this.name = name;
        this.prefix = name.length + 1; // including \0
        this.reader = reader;
        this.params = {};
        this.pointMap = new Points();
        this.yMin = null;
        this.yMax = null;

        this.units = [{
                /**@todo error check if points numbers are same */
                "name": "number of Points",
                "type": "uInt",
                "length": 4,
                "term": true, //termination \0
            },
            {
                "name": "traces",
                "type": "Int",
                "length": 2,
                "term": true,
            },
            {
                "name": "repeat",
                "type": "uInt",
                "length": 4,
                "term": true,
            },
            {
                "name": "scaling",
                "type": "Int",
                "length": 2,
                "scale": 0.001,
                "term": true,
            },
        ];
    }
    async loopPoints(param, resolution = 1) {
        let yMin = Infinity;
        let yMax = -Infinity;
        let scale = param["scaling"];
        let xScale = 1;

        let num = param["number of Points"];
        // num = 10;

        let valArr = [];
        for (let i = 0; i <= num; i++) {
            let param = await this.reader.parseUnit(this.pointMap);
            let y = (param.point * scale * 0.001);
            if (y >= yMax) {
                yMax = y;
            }
            if (y <= yMin) {
                yMin = y;
            }
            let x = (resolution * i * xScale / 1000.0);
            await valArr.push([x, y]);
        }

        let mult = yMax;

        let vals = await this.calcOffset(valArr, mult);

        let resObj = {
            "yMin": yMin,
            "yMax": yMax,
            "points": vals,
        };
        this.yMin = yMin;
        this.yMax = yMax;
        return resObj;
    }
    async calcOffset(arr, mult) {
        let cvalArr = await arr.map(function (nested) {
            return nested.map(function (element, index) {
                if (index === 1) {
                    return parseFloat((mult - element).toFixed(6));
                } else {
                    return parseFloat(element.toFixed(6));
                }
            });
        });
        return cvalArr;
    }
}

class Points {
    constructor() {
        this.params = {};
        this.units = [{
            "name": "point",
            "type": "uInt",
            "length": 2,
            "pres": 6,
        }, ];
    }
}

module.exports = Datapoints;