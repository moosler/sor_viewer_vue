/* eslint-disable no-console */ ! function (t) {
  var e = {};

  function n(a) {
    if (e[a]) return e[a].exports;
    var r = e[a] = {
      i: a,
      l: !1,
      exports: {}
    };
    return t[a].call(r.exports, r, r.exports, n), r.l = !0, r.exports
  }
  n.m = t, n.c = e, n.d = function (t, e, a) {
    n.o(t, e) || Object.defineProperty(t, e, {
      enumerable: !0,
      get: a
    })
  }, n.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    })
  }, n.t = function (t, e) {
    if (1 & e && (t = n(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var a = Object.create(null);
    if (n.r(a), Object.defineProperty(a, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t)
      for (var r in t) n.d(a, r, function (e) {
        return t[e]
      }.bind(null, r));
    return a
  }, n.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default
    } : function () {
      return t
    };
    return n.d(e, "a", e), e
  }, n.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }, n.p = "", n(n.s = 0)
}([function (t, e, n) {
  "use strict";
  n.r(e);
  class a {
    constructor(t, e = "LE") {
      this.data = t, this.endian = e, this.cursor = 0
    }
    async getArrayName(t, e) {
      let n = 8 * e,
        a = "";
      return "uInt" == t ? a = "Uint" + n + "Array" : "Int" == t ? a = "Int" + n + "Array" : "Float" == t ? a = "Float" + n + "Array" : "BigInt" == t ? a = "BigInt" + n + "Array" : "BigInt" == t && (a = "BigUint" + n + "Array"), a
    }
    async readString(t) {
      let e = "";
      for (let a = 0; a < t; a++) {
        var n = await this.readVal(1);
        e += String.fromCharCode(n)
      }
      return e
    }
    async getString() {
      for (var t = "", e = await this.readVal(1); 0 != e && e <= 128;) t += String.fromCharCode(e), e = await this.read(1);
      return t
    }
    async readVal(t, e = "Int", n = this.cursor) {
      let a = n + t,
        r = this.data.slice(n, a),
        s = await this.getArrayName(e, t),
        i = new window[s](r);
      return this.cursor = a, i[0]
    }
    async read(t = 1) {
      return await this.readVal(t)
    }
    async readInt8(t) {
      return await this.readVal(1, "Int", t)
    }
    async readUInt8(t) {
      return await this.readVal(1, "uInt", t)
    }
    async readInt16(t) {
      return await this.readVal(2, "Int", t)
    }
    async readUInt16(t) {
      return await this.readVal(2, "uInt", t)
    }
    async readInt32(t) {
      return await this.readVal(4, "Int", t)
    }
    async readUInt32(t) {
      return await this.readVal(4, "uInt", t)
    }
    async readFloat32(t) {
      return await this.readVal(4, "Float", t)
    }
    async readFloat64(t) {
      return await this.readVal(8, "Float", t)
    }
    async readBigInt64(t) {
      return await this.readVal(8, "BigInt", t)
    }
    async readBigUint64(t) {
      return await this.readVal(8, "BigUint", t)
    }
    async seek(t) {
      return this.cursor = t, t
    }
    async tell() {
      return this.cursor
    }
  }
  class r {
    constructor() {
      this.mapping = {
        mt: "meters",
        km: "kilometers",
        mi: "miles",
        kf: "kilo-ft",
        ST: "[standard trace]",
        RT: "[reverse trace]",
        DT: "[difference trace]",
        RF: "[reference]",
        BC: "(as-built)",
        CC: "(as-current)",
        RC: "(as-repaired)",
        OT: "(other)",
        651: "G.651 (50um core multimode)",
        652: "G.652 (standard SMF)",
        653: "G.653 (dispersion-shifted fiber)",
        654: "G.654 (1550nm loss-minimzed fiber)",
        655: "G.655 (nonzero dispersion-shifted fiber)"
      }
    }
    async getMapping(t, e = !1) {
      let n = "";
      if (t in this.mapping) {
        let a = "";
        e && (a = t + " "), n = a + this.mapping[t]
      }
      return n
    }
  }
  class s {
    constructor() {
      this.params = {}, this.factor = 0, this.units = [{
        name: "total loss",
        type: "Int",
        length: 4,
        pres: 3,
        scale: .001
      }, {
        name: "loss start",
        type: "Int",
        length: 4,
        pres: 6,
        mult: "factor"
      }, {
        name: "loss end",
        type: "uInt",
        length: 4,
        pres: 6,
        mult: "factor"
      }, {
        name: "ORL",
        type: "uInt",
        length: 2,
        scale: .001,
        pres: 3
      }, {
        name: "ORL start",
        type: "Int",
        length: 4,
        pres: 6,
        mult: "factor"
      }, {
        name: "ORL finish",
        type: "uInt",
        length: 4,
        pres: 6,
        mult: "factor"
      }]
    }
  }
  class i {
    constructor() {
      this.params = {}, this.factor = 0, this.units = [{
        name: "number",
        type: "uInt",
        length: 2
      }, {
        name: "distance",
        type: "uInt",
        length: 4,
        mult: "factor"
      }, {
        name: "slope",
        type: "Int",
        length: 2,
        pres: 3,
        scale: .001
      }, {
        name: "splice",
        type: "Int",
        length: 2,
        pres: 3,
        scale: .001
      }, {
        name: "refl loss",
        type: "Int",
        length: 4,
        pres: 3,
        scale: .001
      }, {
        name: "event type",
        type: "String",
        length: 8,
        func: ["eventMap"],
        params: [
          ["this"]
        ],
        result: "append"
      }, {
        name: "end of prev",
        type: "uInt",
        length: 4,
        pres: 3,
        mult: "factor"
      }, {
        name: "start of curr",
        type: "uInt",
        length: 4,
        pres: 3,
        mult: "factor"
      }, {
        name: "end of curr",
        type: "uInt",
        length: 4,
        pres: 3,
        mult: "factor"
      }, {
        name: "start of next",
        type: "uInt",
        length: 4,
        pres: 3,
        mult: "factor"
      }, {
        name: "peak",
        type: "uInt",
        length: 4,
        pres: 3,
        mult: "factor"
      }, {
        name: "comments",
        type: "String",
        length: 0
      }]
    }
    async eventMap(t) {
      let e = t[0],
        n = e.match("(.)(.)9999LS"),
        a = e;
      if (null != n) {
        switch (a += " ", n[2]) {
          case "A":
            a += "manual";
            break;
          case "E":
            a += "end";
            break;
          default:
            a += "auto"
        }
        switch (a += " ", parseInt(n[1])) {
          case 0:
            a += "loss/drop/gain";
            break;
          case 1:
            a += "reflection";
            break;
          case 2:
            a += "multiple";
            break;
          default:
            a += "unknown"
        }
      }
      return {
        result: a
      }
    }
  }
  const l = {
    GenParams: class {
      constructor(t) {
        this.name = t, this.prefix = t.length + 1, this.params = {}, this.units = [{
          name: "lang",
          type: "String",
          length: 2,
          term: !0
        }, {
          name: "cable ID",
          type: "String",
          length: 0,
          term: !0
        }, {
          name: "fiber ID",
          type: "String",
          length: 0,
          term: !0
        }, {
          name: "fiber type",
          type: "Char",
          read: "uInt",
          length: 2,
          term: !0
        }, {
          name: "wavelength",
          type: "uInt",
          length: 2,
          unit: "nm",
          term: !0
        }, {
          name: "location A",
          type: "String",
          length: 0,
          term: !0
        }, {
          name: "location B",
          type: "String",
          length: 0,
          term: !0
        }, {
          name: "cable|fiber type",
          type: "String",
          length: 0,
          term: !0
        }, {
          name: "build condition",
          type: "Char",
          read: "String",
          length: 2,
          append: !1,
          term: !1
        }, {
          name: "user offset",
          type: "Int",
          length: 4,
          term: !0
        }, {
          name: "user offset distance",
          type: "Int",
          length: 4,
          term: !0,
          version: 2
        }, {
          name: "operator",
          type: "String",
          length: 0,
          term: !0
        }, {
          name: "comments",
          type: "String",
          length: 0,
          term: !0
        }]
      }
    },
    SupParams: class {
      constructor(t) {
        this.name = t, this.prefix = t.length + 1, this.params = {}, this.units = [{
          name: "supplier",
          type: "String",
          length: 0,
          term: !0
        }, {
          name: "OTDR",
          type: "String",
          length: 0,
          term: !0
        }, {
          name: "OTDR S/N",
          type: "String",
          length: 0,
          term: !0
        }, {
          name: "module",
          type: "String",
          length: 0,
          term: !0
        }, {
          name: "module S/N",
          type: "String",
          length: 0,
          term: !0
        }, {
          name: "software",
          type: "String",
          length: 0,
          term: !0
        }, {
          name: "other",
          type: "String",
          length: 0,
          term: !0
        }]
      }
    },
    FxdParams: class {
      constructor(t) {
        this.name = t, this.sol = .299792458, this.units = [{
          name: "date/time",
          type: "uInt",
          length: 4,
          term: !0
        }, {
          name: "unit",
          type: "Char",
          read: "String",
          length: 2,
          term: !0
        }, {
          name: "wavelength",
          type: "uInt",
          length: 2,
          scale: .1,
          pres: 1,
          unit: "nm",
          term: !0
        }, {
          name: "acquisition offset",
          type: "Int",
          length: 4,
          term: !0
        }, {
          name: "acquisition offset distance",
          type: "Int",
          length: 4,
          term: !0
        }, {
          name: "number of pulse width entries",
          type: "uInt",
          length: 2,
          term: !0
        }, {
          name: "pulse width",
          type: "uInt",
          length: 2,
          pres: 0,
          unit: "ns",
          term: !0
        }, {
          name: "sample spacing",
          type: "uInt",
          scale: 1e-8,
          unit: "usec",
          length: 4,
          term: !0
        }, {
          name: "num data points",
          type: "uInt",
          length: 4,
          term: !0
        }, {
          name: "index",
          type: "uInt",
          length: 4,
          scale: 1e-5,
          pres: 6,
          term: !0
        }, {
          name: "BC",
          type: "uInt",
          scale: -.1,
          pres: 2,
          unit: "dB",
          length: 2,
          term: !0
        }, {
          name: "num average",
          type: "uInt",
          length: 4,
          term: !0
        }, {
          name: "averaging time",
          type: "uInt",
          length: 2,
          scale: .1,
          pres: 0,
          unit: "sec",
          term: !0
        }, {
          name: "range",
          type: "uInt",
          length: 4,
          scale: 2e-5,
          pres: 6,
          unit: "km",
          func: ["tDx"],
          params: [
            ["index", "sample spacing", "num data points"]
          ],
          result: "append",
          term: !0
        }, {
          name: "acquisition range distance",
          type: "Int",
          length: 4,
          term: !0
        }, {
          name: "front panel offset",
          type: "Int",
          length: 4,
          term: !0
        }, {
          name: "noise floor level",
          type: "uInt",
          length: 2,
          term: !0
        }, {
          name: "noise floor scaling factor",
          type: "Int",
          length: 2,
          term: !0
        }, {
          name: "power offset first point",
          type: "uInt",
          length: 2,
          term: !0
        }, {
          name: "loss thr",
          type: "uInt",
          length: 2,
          scale: .001,
          pres: 3,
          unit: "dB",
          term: !0
        }, {
          name: "refl thr",
          type: "uInt",
          length: 2,
          scale: -.001,
          pres: 3,
          unit: "dB",
          term: !0
        }, {
          name: "EOT thr",
          type: "uInt",
          length: 2,
          scale: .001,
          pres: 3,
          unit: "dB",
          term: !0
        }, {
          name: "trace type",
          type: "Char",
          read: "String",
          append: !0,
          length: 2,
          term: !0
        }, {
          name: "X1",
          type: "Int",
          length: 4,
          term: !0
        }, {
          name: "Y1",
          type: "Int",
          length: 4,
          term: !0
        }, {
          name: "X2",
          type: "Int",
          length: 4,
          term: !0
        }, {
          name: "Y2",
          type: "Int",
          length: 4,
          term: !0
        }]
      }
      async tDx(t) {
        let e = t[0],
          n = t[1],
          a = t[2],
          r = parseFloat(e),
          s = n;
        isNaN(n) && (s = n.split(" ")[0]);
        let i = parseFloat(s) * this.sol / r;
        return {
          dx: i,
          ior: r,
          sol: this.sol,
          resolution: 1e3 * i,
          result: i * a
        }
      }
    },
    KeyEvents: class {
      constructor(t) {
        this.name = t, this.eventMap = new i, this.summaryMap = new s, this.units = [{
          name: "event number",
          type: "uInt",
          length: 2,
          term: !0,
          func: ["loopEvents", "getSummary"],
          numCalls: ["this", 1],
          result: "numCalls",
          params: [
            ["FxdParams.ior", "FxdParams.sol"],
            []
          ]
        }]
      }
      async loopEvents(t) {
        let e = t[0],
          n = 1e-4 * t[1] / parseFloat(e);
        return this.eventMap.factor = n, this.summaryMap.factor = n, {
          name: "events",
          obj: this.eventMap
        }
      }
      async getSummary() {
        return {
          name: "summary",
          obj: this.summaryMap
        }
      }
    },
    DataPts: class {
      constructor(t, e) {
        this.name = t, this.reader = e, this.yMin = null, this.yMax = null, this.units = [{
          name: "number of Points",
          type: "uInt",
          length: 4,
          term: !0
        }, {
          name: "traces",
          type: "Int",
          length: 2,
          term: !0
        }, {
          name: "repeat",
          type: "uInt",
          length: 4,
          term: !0
        }, {
          name: "scaling",
          type: "Int",
          length: 2,
          scale: .001,
          term: !0
        }]
      }
    },
    Cksum: class {
      constructor(t) {
        this.name = t, this.prefix = t.length + 1, this.params = {}, this.units = [{
          name: "checksum",
          type: "uInt",
          length: 2,
          term: !0
        }]
      }
    }
  };
  class o {
    constructor(t, e = "") {
      return new l[t](e)
    }
  }
  class h {
    constructor(t, e, n) {
      this.name = t, this.parser = e, this.devMode = n, this.pointMap = new u, this.yMin = null, this.yMax = null
    }
    async loopPoints(t, e, n = 1) {
      let a = 1 / 0,
        r = -1 / 0;
      this.devMode && (t = 100);
      let s = [];
      for (let i = 0; i <= t; i++) {
        let t = (await this.parser.parseBlock(this.pointMap)).point * e * .001;
        t >= r && (r = t), t <= a && (a = t);
        let l = n * i * 1 / 1e3;
        await s.push([l, t])
      }
      let i = r,
        l = {
          yMin: a,
          yMax: r,
          points: await this.calcOffset(s, i)
        };
      return this.yMin = a, this.yMax = r, l
    }
    async calcOffset(t, e) {
      return await t.map((function (t) {
        return t.map((function (t, n) {
          return 1 === n ? parseFloat((e - t).toFixed(6)) : parseFloat(t.toFixed(6))
        }))
      }))
    }
  }
  class u {
    constructor() {
      this.params = {}, this.units = [{
        name: "point",
        type: "uInt",
        length: 2,
        pres: 6
      }]
    }
  }
  class c {
    constructor(t, e, n, a, r) {
      this.name = t, this.version = e, this.size = n, this.pos = a, this.order = r
    }
  }
  class p {
    constructor(t, e, n = {}) {
      this.config = e, this.path = t, this.bf = {}, this.result = {
        params: {},
        points: {}
      }, this.fileInfo = {}, this.data = n, this.unitMapping = new r
    }
    async run() {
      try {
        return this.config.browserMode && (this.bf = new a(this.data)), this.config.debug && console.log("File opened"), await this.setVersion(), await this.setMap(), await this.parseParams("GenParams"), await this.parseParams("SupParams"), await this.parseParams("FxdParams"), await this.parseParams("KeyEvents"), await this.parseParams("DataPts"), await this.parsePoints("Points"), await this.parseParams("Cksum"), this.config.browserMode || await this.bf.close(), this.config.debug && console.log("File closed"), this.result
      } catch (t) {
        console.log(`There was an error: ${t}`)
      }
    }
    async parsePoints(t) {
      let e = new h(t, this, this.config.devMode),
        n = this.result.params.DataPts["number of Points"],
        a = this.result.params.DataPts.scaling,
        r = await e.loopPoints(n, a);
      this.result.points = r
    }
    async parseParams(t) {
      await this.checkBlockAndSetCursor(t);
      let e = new o(t),
        n = await this.parseBlock(e);
      this.result.params[t] = n
    }
    async parseBlock(t) {
      let e = {};
      for (const n of t.units) try {
        let a = "";
        if ("Char" === n.type) {
          a = await this.parseCommand(n, "read");
          let t = !1;
          n.hasOwnProperty("append") && (t = n.append), a = await this.unitMapping.getMapping(a, t)
        } else a = await this.parseCommand(n);
        let r = await this.parseResult(a, n, t);
        if (e[n.name] = await this.addUnit(r, n), n.hasOwnProperty("func")) {
          let a = await this.callFunction(n, t, e, r);
          e = await this.convertResult(n, a, e)
        }
      } catch (t) {
        throw "Something went wront by reading unit: " + n.name + ": " + t
      }
      return e
    }
    async convertResult(t, e, n) {
      if ("append" == t.result) n = await this.setBlockInfo(t, e, n);
      else if ("numCalls" == t.result) {
        let t = Object.keys(e);
        for (let a = 0; a < t.length; a++) {
          const r = t[a];
          n[r] = e[r]
        }
      }
      return n
    }
    async parseResult(t, e, n) {
      if (e.hasOwnProperty("scale") && (t *= e.scale), e.hasOwnProperty("pres") && (t = t.toFixed(e.pres)), e.hasOwnProperty("mult")) {
        t = (t * n[e.mult]).toFixed(4)
      }
      return t
    }
    async addUnit(t, e) {
      return e.hasOwnProperty("unit") && (t = t + " " + e.unit), t
    }
    async callFunction(t, e, n, a) {
      await this.functionChecks(t);
      let r = {};
      for (let s = 0; s < t.func.length; s++) {
        const i = t.func[s];
        let l = await this.getValuesFromBlock(n, t.params[s], a),
          o = await e[i](l);
        if (t.hasOwnProperty("numCalls")) {
          let e = t.numCalls[s];
          "this" === t.numCalls[s] && (e = a);
          let n = o.obj,
            i = o.name,
            l = await this.loopBlock(e, n);
          r[i] = l
        } else r = {
          ...o
        }
      }
      return r
    }
    async functionChecks(t) {
      if (!t.hasOwnProperty("params")) throw "No Params defined for Block: " + t.name;
      if (!t.hasOwnProperty("result")) throw "No result defined for Block call in: " + t.name;
      if (t.func.length !== t.params.length) throw "Different amounts of functions vs params in: " + t.name
    }
    async loopBlock(t, e) {
      let n = [];
      for (let a = 0; a < t; a++) {
        let t = await this.parseBlock(e);
        await n.push(t)
      }
      return 1 === n.length ? n[0] : n
    }
    async setBlockInfo(t, e, n) {
      let a = t.name;
      for (const r in e)
        if (e.hasOwnProperty(r)) {
          let s = e[r];
          "result" === r ? (t.hasOwnProperty("unit") && (s += " " + t.unit), n[a] = s) : n[r] = s
        } return n
    }
    async getValuesFromBlock(t, e, n) {
      let a = [];
      return e.forEach(e => {
        if (-1 !== e.indexOf(".")) {
          let t = e.split("."),
            n = this.result.params[t[0]][t[1]];
          a.push(n)
        } else if ("this" === e) a.push(n);
        else {
          if (!t.hasOwnProperty(e)) throw "Wrong Parameter Name";
          a.push(t[e])
        }
      }), a
    }
    async parseCommand(t, e = "type") {
      let n = "";
      return "String" === t[e] ? n = t.length ? await this.bf.readString(t.length) : await this.getString() : "uInt" === t[e] ? n = await this.getUInt(t.length) : "Int" === t.type && (n = await this.getInt(t.length)), n
    }
    async checkBlockAndSetCursor(t) {
      let e = this.fileInfo.blocks;
      if (!(t in e)) throw "blockName " + t + " not found!";
      if (e[t].version < 2) throw "currently only Version 2 allowed!";
      if (await this.bf.seek(e[t].pos), await this.getString() != t) throw "Wrong Header Start-Position for: " + t
    }
    async setVersion() {
      if (this.fileInfo.version = await this.getVersion(), this.fileInfo.version < 2) throw "at this moment only Version 2 is supported";
      this.fileInfo.fullversion = await this.getFullVersion()
    }
    async setMap() {
      this.fileInfo.map = await this.getMap(), this.fileInfo.blocks = await this.getBlocks(this.fileInfo.map)
    }
    async toFixedPoint(t = .01, e = 2) {
      return (await this.getUInt(2) * t).toFixed(e)
    }
    async getString() {
      if (this.config.browserMode) return this.bf.getString();
      for (var t = "", e = await this.bf.read(1);
        "" != e;) {
        if (0 == String(e).charCodeAt(0)) break;
        t += e, e = await this.bf.read(1)
      }
      return t
    }
    async getUInt(t = 2) {
      var e = null;
      if (2 == t) e = await this.bf.readUInt16();
      else {
        if (4 != t) throw console.log(`parts.get_uint(): Invalid number of bytes ${t}`), "Invalid bytes";
        e = await this.bf.readUInt32()
      }
      return e
    }
    async getInt(t = 2) {
      var e = null;
      if (2 == t) e = await this.bf.readInt16();
      else {
        if (4 != t) throw console.log(`parts.get_uint(): Invalid number of bytes ${t}`), "Invalid bytes";
        e = await this.bf.readInt32()
      }
      return parseInt(e)
    }
    async getVersion() {
      let t = 2;
      return "Map" != await this.getString() && (await this.bf.seek(0), t = 1), t
    }
    async getFullVersion() {
      return await this.toFixedPoint()
    }
    async getMap() {
      var t = {};
      return t.bytes = await this.getUInt(4), t.nBlocks = await this.getUInt(2) - 1, t
    }
    async getBlocks(t) {
      for (var e = {}, n = t.bytes, a = 0; a < t.nBlocks; a++) {
        let t = await this.getString(),
          r = await this.toFixedPoint(),
          s = await this.getUInt(4),
          i = new c(t, r, s, n, a);
        e[t] = i, n += s
      }
      return e
    }
  }
  n.d(e, "default", (function () {
    return m
  }));
  class m {
    constructor(t, e = {}, n = {}) {
      this.path = t, this.defaultConfig = {
        debug: !1,
        createJson: !1,
        jsonPath: ".",
        jsonName: "result.json",
        devMode: !1,
        browserMode: !1
      }, this.config = {
        ...this.defaultConfig,
        ...e
      }, this.data = n, this.parser = new p(this.path, this.config, this.data)
    }
    async parse() {
      try {
        let t = await this.parser.run();
        if (!this.config.createJson) return t;
        this.config.jsonPath, this.config.jsonName, JSON.stringify(t)
      } catch (t) {
        console.log(`There was an parsing error: ${t}`)
      }
    }
  }
  "undefined" != typeof window && (window.SorReader = m)
}]);