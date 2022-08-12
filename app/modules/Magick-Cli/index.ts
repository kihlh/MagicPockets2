import { promisify } from "util";
import { spawn, StartSpawn } from "../cmd";
import { existsSync, pathExists, writeFile } from "fs-extra";
import path from "path";
import fsWalk = require("@nodelib/fs.walk")
import { convert } from "./convert";
function ID() { return (Date.now().toString(36) + Math.random().toString(36).slice(2, 7)).toUpperCase() }
export default class ImageMagick {
    convert: convert
    #_ = {
        MagickBinaryPath: "",
        Ready: false,
    }

    /**
     * 设置Magick所在位置
     * @param MagickBinaryPath 
     */
    SetMagickPath(MagickBinaryPath: string) {
        // 验证二进制是否存在
        if (MagickBinaryPath && !existsSync(MagickBinaryPath)) {
            throw new Error("Exist Not Magick Binary Path");
        } else {
            this.#_.MagickBinaryPath = MagickBinaryPath.replace(/[\\\/]+/g, '\/');
            this.#_.Ready = true;
        }

    }
    constructor(MagickBinaryPath: string | { MagickPath: string, Temp?: string }) {
        if (typeof MagickBinaryPath == "string") {
            this.SetMagickPath(MagickBinaryPath);
        } else if (MagickBinaryPath) {
            this.SetMagickPath(MagickBinaryPath.MagickPath);

        }
        const MagickPath = this.MagickPath;
        function ToSpawn(arge: string[] | [[string]], ExecType: string): Promise<string> {
            let RUN_PushCommand_Promise: StartSpawn | null = null;
            let CommandList: string[] = [ExecType];
            let RUN_Promise: Promise<string> & SpawnAdditionStdout = new Promise(function (resolve, reject) {
                if (!arge.length) return reject("Not Command");
                /**将层级数组命令也转为 单层命令数组*/
                function PushCommand(arge: string | string[] | [string[]]) {
                    for (const ForCommand of arge) {
                        if (Array.isArray(ForCommand)) {
                            PushCommand(ForCommand);
                            continue;
                        };
                        if (typeof ForCommand == "string") CommandList.push(ForCommand.replace(/[\\\/]+/g, "/"));
                    }
                }
                PushCommand(arge);
                if (CommandList.length <= 1) return reject("Not Command");
                let ToSpawn = spawn(MagickPath, CommandList);
                ToSpawn.then(data => resolve(data));
                ToSpawn.catch(error => reject(error));
                RUN_PushCommand_Promise = ToSpawn
                return ToSpawn
            })
            if (RUN_PushCommand_Promise) {
                let d: StartSpawn = RUN_PushCommand_Promise
                RUN_Promise.ErrorList = d.ErrorList;
                RUN_Promise.GetDataList = d.GetDataList;
                RUN_Promise.Quit = d.Quit;
                RUN_Promise.GetData = d.GetData;
                RUN_Promise.on = d.on;
            }
            return RUN_Promise
        }
        this.convert = new convert(MagickPath, true);
        this.cli = {
            /**
             * 格式
             * @param arge 
             * @returns 
             */
            convert(...arge: string[] | [[string]]) { return ToSpawn(arge, "convert") },
            /**
             * 比较 compare
             * @param arge 
             * @returns 
             */
            diff(...arge: string[] | [[string]]) { return ToSpawn(arge, "compare") },
            /**
             * 合成
             * @param arge 
             * @returns 
             */
            composite(...arge: string[] | [[string]]) { return ToSpawn(arge, "composite") },
            /**
             * 执行文件脚本
             * @param ScriptPath 
             * @returns 
             */
            Script(ScriptPath: string) {
                return ToSpawn([ScriptPath], "-script")
            },
            /**将脚本导出为文件后执行 */
            EvalScript(ScriptCode: string) {
                return new Promise(function (resolve, reject) {
                    let WriteFilePath = process.env.TEMP ? path.join(process.env.TEMP, ID()) : path.join(process.execPath, "..", ID());
                    writeFile(WriteFilePath, ScriptCode).then(() => {
                        ToSpawn([WriteFilePath], "-script").then(data => {
                            resolve(data)
                        }).catch(reject)
                    }).catch(reject)
                })

            }
        };

    }

    get Ready() {
        if (!this.#_.Ready && this.#_.MagickBinaryPath) return false;
        return this.#_.Ready;
    }
    cli: {
        convert: () => Promise<string>;
        diff: () => Promise<string>;
        composite: () => Promise<string>;
        EvalScript: (ScriptCode: string) => Promise<string>;
        Script: (ScriptPath: string) => Promise<string>;

    }

    get MagickPath() {
        return this.#_.MagickBinaryPath;
    }
}

type Magick = typeof ImageMagick;
export { Magick ,ImageMagick}
interface SpawnAdditionStdout {
    on?: { (event: "close", listener: () => void): import("stream").Readable; (event: "data", listener: (chunk: any) => void): import("stream").Readable; (event: "end", listener: () => void): import("stream").Readable; (event: "error", listener: (err: Error) => void): import("stream").Readable; (event: "pause", listener: () => void): import("stream").Readable; (event: "readable", listener: () => void): import("stream").Readable; (event: "resume", listener: () => void): import("stream").Readable; (event: string | symbol, listener: (...args: any[]) => void): import("stream").Readable; };
    /**
     * 退出
     */
    Quit?: () => void;
    /**
     * 返回当前已有的所有文本 并编码
     */
    GetData?: () => string
    /**
     * 返回当前已经有的Buffer 未经过编码
     */
    GetDataList?: () => Set<Buffer>
    /**途中发生的错误都会记录在这里 */
    ErrorList?: Set<Error>
}