"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageMagick = void 0;
const cmd_1 = require("../cmd");
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const convert_1 = require("./convert");
function ID() { return (Date.now().toString(36) + Math.random().toString(36).slice(2, 7)).toUpperCase(); }
class ImageMagick {
    convert;
    #_ = {
        MagickBinaryPath: "",
        Ready: false,
    };
    /**
     * 设置Magick所在位置
     * @param MagickBinaryPath
     */
    SetMagickPath(MagickBinaryPath) {
        // 验证二进制是否存在
        if (MagickBinaryPath && !(0, fs_extra_1.existsSync)(MagickBinaryPath)) {
            throw new Error("Exist Not Magick Binary Path");
        }
        else {
            this.#_.MagickBinaryPath = MagickBinaryPath.replace(/[\\\/]+/g, '\/');
            this.#_.Ready = true;
        }
    }
    constructor(MagickBinaryPath) {
        if (typeof MagickBinaryPath == "string") {
            this.SetMagickPath(MagickBinaryPath);
        }
        else if (MagickBinaryPath) {
            this.SetMagickPath(MagickBinaryPath.MagickPath);
        }
        const MagickPath = this.MagickPath;
        function ToSpawn(arge, ExecType) {
            let RUN_PushCommand_Promise = null;
            let CommandList = [ExecType];
            let RUN_Promise = new Promise(function (resolve, reject) {
                if (!arge.length)
                    return reject("Not Command");
                /**将层级数组命令也转为 单层命令数组*/
                function PushCommand(arge) {
                    for (const ForCommand of arge) {
                        if (Array.isArray(ForCommand)) {
                            PushCommand(ForCommand);
                            continue;
                        }
                        ;
                        if (typeof ForCommand == "string")
                            CommandList.push(ForCommand.replace(/[\\\/]+/g, "/"));
                    }
                }
                PushCommand(arge);
                if (CommandList.length <= 1)
                    return reject("Not Command");
                let ToSpawn = (0, cmd_1.spawn)(MagickPath, CommandList);
                ToSpawn.then(data => resolve(data));
                ToSpawn.catch(error => reject(error));
                RUN_PushCommand_Promise = ToSpawn;
                return ToSpawn;
            });
            if (RUN_PushCommand_Promise) {
                let d = RUN_PushCommand_Promise;
                RUN_Promise.ErrorList = d.ErrorList;
                RUN_Promise.GetDataList = d.GetDataList;
                RUN_Promise.Quit = d.Quit;
                RUN_Promise.GetData = d.GetData;
                RUN_Promise.on = d.on;
            }
            return RUN_Promise;
        }
        this.convert = new convert_1.convert(MagickPath, true);
        this.cli = {
            /**
             * 格式
             * @param arge
             * @returns
             */
            convert(...arge) { return ToSpawn(arge, "convert"); },
            /**
             * 比较 compare
             * @param arge
             * @returns
             */
            diff(...arge) { return ToSpawn(arge, "compare"); },
            /**
             * 合成
             * @param arge
             * @returns
             */
            composite(...arge) { return ToSpawn(arge, "composite"); },
            /**
             * 执行文件脚本
             * @param ScriptPath
             * @returns
             */
            Script(ScriptPath) {
                return ToSpawn([ScriptPath], "-script");
            },
            /**将脚本导出为文件后执行 */
            EvalScript(ScriptCode) {
                return new Promise(function (resolve, reject) {
                    let WriteFilePath = process.env.TEMP ? path_1.default.join(process.env.TEMP, ID()) : path_1.default.join(process.execPath, "..", ID());
                    (0, fs_extra_1.writeFile)(WriteFilePath, ScriptCode).then(() => {
                        ToSpawn([WriteFilePath], "-script").then(data => {
                            resolve(data);
                        }).catch(reject);
                    }).catch(reject);
                });
            }
        };
    }
    get Ready() {
        if (!this.#_.Ready && this.#_.MagickBinaryPath)
            return false;
        return this.#_.Ready;
    }
    cli;
    get MagickPath() {
        return this.#_.MagickBinaryPath;
    }
}
exports.default = ImageMagick;
exports.ImageMagick = ImageMagick;
//# sourceMappingURL=index.js.map