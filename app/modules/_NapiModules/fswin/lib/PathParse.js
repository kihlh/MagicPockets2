"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const FileSystemFastHandle_1 = __importDefault(require("./FileSystemFastHandle"));
class QuickApi {
    _Path = "";
    _FsFast;
    get path() {
        return this._Path;
    }
    get name() {
        return path_1.default.parse(this._Path).name;
    }
    get base() {
        return path_1.default.basename(this._Path);
    }
    get dir() {
        return path_1.default.parse(this._Path).dir;
    }
    get ext() {
        return path_1.default.extname(this._Path);
    }
    get resolve() {
        return path_1.default.resolve(this._Path);
    }
    diff(Path) {
        return path_1.default.resolve(Path) == path_1.default.resolve(this._Path);
    }
    fs() {
        this._FsFast = this._FsFast || new FileSystemFastHandle_1.default(this._Path);
        return this._FsFast;
    }
    constructor(Path) {
        this._Path = Path;
    }
}
//# sourceMappingURL=PathParse.js.map