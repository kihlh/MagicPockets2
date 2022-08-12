import { spawn, StartSpawn } from "../cmd";
import path from "path";
let TempDir = "";
import { existsSync, pathExists, writeFile, stat,Stats,statSync } from "fs-extra";
    /**
     *  代码阻塞
     *
     * @param {*} ms 毫秒
     * @return undefined
     * 调用： await this._Sleep(500);
     */
     function Sleep(ms:number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

function ID() { return (Date.now().toString(36) + Math.random().toString(36).slice(2, 7)).toUpperCase() }
/**
 * 获取适当的缓存地址（不在electron环境也能使用 ）
 */
function MatchTempDir() {
    let { argv, versions, resourcesPath, env } = process;
    // 判断是否是electron环境
    if (versions?.electron) {
        for (const iterator of argv) {
            if (iterator.includes("--user-data-dir=")) {
                TempDir = path.join(iterator.replace("--user-data-dir=", 'Temp'));
            }
        }
    }
    if (!TempDir && env.TEMP) TempDir = path.join(env.TEMP);

}
/**
 * 获取临时文件路径
 * @param Ext 后缀名
 */
export function GetTemp(Ext?: string) {
    if (Ext) Ext = Ext.match(/^[.]/) ? Ext : "." + Ext;
    if (!Ext) Ext = "";
    if (!TempDir) MatchTempDir();
    return path.join(TempDir, ID() + Ext)
}
/**
 * 设置临时文件路径
 * @param Ext 后缀名
 */
export function SetTemp(Path?: string): boolean {
    if (typeof Path === "string") {
        let PathExists = false;
        try {
            let Stats = statSync(Path)
            PathExists = !Stats ? false : true;
            if (Stats.isDirectory()) TempDir = Path;
            return true
        } catch (error) {

        }
    }
    return false
}

export function ToSpawn(ExecPath: string, arge: string[] | [[string]]): Promise<string> {
    let RUN_PushCommand_Promise: StartSpawn | null = null;
    let CommandList: string[] = [];
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
        let ToSpawn = spawn(ExecPath, CommandList);
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

/**
 * 等待该文件出现 并停止更新
 * @param Path 路径
 * @param limit  超时（该时间超时后有该文件则返回成功）
 * @returns  
 */
export function WaitArise(Path: string, limit: number): Promise<Stats|undefined> {
    return new Promise(async function (resolve, reject) {
        let StartTime = +new Date();
        let OidSize = 0;
        for (let index = 0; index < 500; index++) {
            let status = await stat(Path).catch(Not => { });
            if (!status) {
                if (limit && (+new Date()) - StartTime > limit) return status!==undefined?status:undefined;
                await Sleep((limit && 500 > limit && limit < 1) ? limit : 500);
            }
            else {
                // 没有继续更新了
                if (OidSize == status.size) return resolve(status);
                OidSize = status.size;
            }

        }
    })
}


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