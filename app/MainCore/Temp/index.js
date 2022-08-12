"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const os_1 = require("os");
const electron_1 = require("electron");
const fs = require("fs-extra");
function ID() { return (Date.now().toString(36) + Math.random().toString(36).slice(2, 7)).toUpperCase(); }
let TempData = [];
function writeTemp(Path, data) {
    return new Promise(async function (resolve, reject) {
        if (typeof data === "undefined")
            return reject("Not Data");
        if (Buffer.isBuffer(data) || typeof data == "string") {
            await fs.writeFile(Path, data).then(() => resolve(Path)).catch(reject);
            return;
        }
        if (Array.isArray(data) || data instanceof Object) {
            await fs.writeJSON(Path, data).then(() => resolve(Path)).catch(reject);
            return;
        }
        reject(new Error("Errors of unknown data types"));
    });
}
class CreateTemp {
    /**前缀 */
    #prefix = "HM_Sack_";
    /**app缓存路径 */
    #app = electron_1.app.getPath("temp");
    /**系统缓存路径 */
    #system = (0, os_1.tmpdir)();
    /**
     * 格式化后缀名
     * @param Ext
     * @returns
     */
    #formatExt(Ext) {
        if (typeof Ext === "string")
            return Ext?.replace(/^(?:[.])?(.+)/, ".$1") || "";
        return "";
    }
    /**
     * 创建并记录缓存路径
     * @param place 位置
     * @param Ext 后缀
     * @param Timeout 超时
     * @returns
     */
    #CreateTempToStore(place, Ext, Timeout) {
        let ForMatExt = this.#formatExt(Ext || "");
        let id = ID();
        let name = id.concat(ForMatExt);
        let tempPath = place == "app" ? path_1.default.join(this.#app, name) : path_1.default.join(this.#system, name);
        let TempStoreSoho = {
            "name": name,
            "path": tempPath,
            "ext": ForMatExt,
            "time": typeof Timeout === "number" ? Timeout : 1000 * 60 * 60 * 24 * 15,
            "timeout": +new Date()
        };
        TempData.push(TempStoreSoho);
        return TempStoreSoho;
    }
    /**数据存储 */
    #TempStore = path_1.default.join(electron_1.app.getPath("appData"), "UserTemp.HM");
    /**
     * 创建一个快速操作的接口
     * @param TempToStore
     * @returns
     */
    #GetRunCreateTemp(TempToStore) {
        return {
            TempStoreSoho: TempToStore,
            /**路径 */
            path: TempToStore.path,
            /**向该临时文件写入内容 */
            write(data) {
                return writeTemp(this.path, data);
            },
            /**删除该临时文件 */
            remove() {
                return fs.remove(this.path);
            }
        };
    }
    /**设置app缓存路径 */
    setAppTempPath(Path) { this.#app = Path; }
    ;
    /**设置系统缓存路径 */
    setSystemTempPath(Path) { this.#system = Path; }
    ;
    /**设置数据存储路径*/
    setTempStorePath(Path) { this.#TempStore = Path; }
    ;
    /**设置前缀 */
    setPrefix(prefix) { this.#prefix = prefix; }
    ;
    /**app缓存路径 */
    get getAppTemp() { return this.#app; }
    ;
    /**系统缓存路径 */
    get getSystemTemp() { return this.#system; }
    ;
    /**数据存储路径 */
    get getTempStore() { return this.#TempStore; }
    ;
    /**前缀 */
    get getPrefix() { return this.#prefix; }
    ;
    /**
     * 创建一个APP的随机缓存路径
     * @param Ext 后缀
     * @param Timeout 有效期
     * @returns
     */
    appTemp(Ext, Timeout) {
        let TempToStore = this.#CreateTempToStore("app", Ext, Timeout);
        return this.#GetRunCreateTemp(TempToStore);
    }
    ;
    /**
     * 创建一个放在系统C盘的随机缓存路径
     * @param Ext 后缀
     * @param Timeout 有效期
     * @returns
     */
    systemTemp(Ext, Timeout) {
        let TempToStore = this.#CreateTempToStore("system", Ext, Timeout);
        return this.#GetRunCreateTemp(TempToStore);
    }
    ;
    remove;
}
;
const Temp = new CreateTemp();
//# sourceMappingURL=index.js.map