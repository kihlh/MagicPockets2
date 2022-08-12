import path from 'path';
import { tmpdir } from "os";
import electron, { app, BrowserWindow, ipcMain, Menu, Tray, webContents, dialog } from "electron";
import fs = require("fs-extra");
function ID() { return (Date.now().toString(36) + Math.random().toString(36).slice(2, 7)).toUpperCase() }
import shake from '../../modules/shake';
let TempData: TempStoreSoho[] = [];


function writeTemp(Path: string, data: string | Buffer | Array<any> | Object): Promise<string> {
    return new Promise(async function (resolve, reject) {
        if (typeof data === "undefined") return reject("Not Data");
        if (Buffer.isBuffer(data) || typeof data == "string") {
            await fs.writeFile(Path, data).then(() => resolve(Path)).catch(reject);
            return
        }
        if (Array.isArray(data) || data instanceof Object) {
            await fs.writeJSON(Path, data).then(() => resolve(Path)).catch(reject);
            return
        }
        reject(new Error("Errors of unknown data types"));
    })
}


class CreateTemp {
    /**前缀 */
    #prefix = "HM_Sack_";
    /**app缓存路径 */
    #app = app.getPath("temp");
    /**系统缓存路径 */
    #system = tmpdir();
    /**
     * 格式化后缀名
     * @param Ext 
     * @returns 
     */
    #formatExt(Ext: string) {
        if (typeof Ext === "string") return Ext?.replace(/^(?:[.])?(.+)/, ".$1") || "";
        return "";
    }
    /**
     * 创建并记录缓存路径
     * @param place 位置 
     * @param Ext 后缀
     * @param Timeout 超时
     * @returns 
     */
    #CreateTempToStore(place: "app" | "system", Ext?: string, Timeout?: number): TempStoreSoho {
        let ForMatExt = this.#formatExt(Ext || "");
        let id = ID();
        let name = id.concat(ForMatExt);
        let tempPath = place == "app" ? path.join(this.#app, name) : path.join(this.#system, name);
        let TempStoreSoho: TempStoreSoho = {
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
    #TempStore = path.join(app.getPath("appData"), "UserTemp.HM");
    /**
     * 创建一个快速操作的接口
     * @param TempToStore 
     * @returns 
     */
    #GetRunCreateTemp(TempToStore: TempStoreSoho) {
        return {
            TempStoreSoho: TempToStore,
            /**路径 */
            path: TempToStore.path,
            /**向该临时文件写入内容 */
            write(data: string | Buffer | Array<any> | Object) {
                return writeTemp(this.path, data)
            },
            /**删除该临时文件 */
            remove() {
                return fs.remove(this.path);
            }
        }
    }
    /**设置app缓存路径 */
    setAppTempPath(Path: string) { this.#app = Path };
    /**设置系统缓存路径 */
    setSystemTempPath(Path: string) { this.#system = Path };
    /**设置数据存储路径*/
    setTempStorePath(Path: string) { this.#TempStore = Path };
    /**设置前缀 */
    setPrefix(prefix: string) { this.#prefix = prefix };
    /**app缓存路径 */
    get getAppTemp() { return this.#app; };
    /**系统缓存路径 */
    get getSystemTemp() { return this.#system; };
    /**数据存储路径 */
    get getTempStore() { return this.#TempStore; };
    /**前缀 */
    get getPrefix() { return this.#prefix; };
    /**
     * 创建一个APP的随机缓存路径
     * @param Ext 后缀
     * @param Timeout 有效期
     * @returns 
     */
    appTemp(Ext?: string, Timeout?: number): RunCreateTemp {
        let TempToStore = this.#CreateTempToStore("app", Ext, Timeout);
        return this.#GetRunCreateTemp(TempToStore)
    };
    /**
     * 创建一个放在系统C盘的随机缓存路径
     * @param Ext 后缀
     * @param Timeout 有效期
     * @returns 
     */
    systemTemp(Ext?: string, Timeout?: number): RunCreateTemp {
        let TempToStore = this.#CreateTempToStore("system", Ext, Timeout);
        return this.#GetRunCreateTemp(TempToStore)
    };
    remove
};
const Temp = new CreateTemp();


type TempStoreSoho = {
    /**名称 */
    name: string;
    /**路径 */
    path: string;
    /**超时/有效时间 */
    timeout: number;
    /**创建时间 */
    time: number;
    /**后缀 */
    ext: string;
};

type RunCreateTemp = {
    TempStoreSoho: TempStoreSoho,
    /**路径 */
    path: string;
    /**向该临时文件写入内容 */
    write(data: string | Buffer | Array<any> | Object): Promise<string>
    /**删除该临时文件 */
    remove(): Promise<void>
};