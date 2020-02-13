import GenParams from './genparams';
import SupParams from './supparams';
import FxdParams from './fxdparams';
import KeyEvents from './keyevents';
import DataPts from './datapts';
import Cksum from './cksum';

const classes = {
    GenParams,
    SupParams,
    FxdParams,
    KeyEvents,
    DataPts,
    Cksum,
};

export default class Proxy {
    constructor(className, opts = "") {
        return new classes[className](opts);
    }
}