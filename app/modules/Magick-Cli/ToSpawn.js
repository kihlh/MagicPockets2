"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitArise = exports.ToSpawn = exports.SetTemp = exports.GetTemp = void 0;
const cmd_1 = require("../cmd");
const path_1 = __importDefault(require("path"));
let TempDir = "";
const fs_extra_1 = require("fs-extra");
/**
 *  代码阻塞
 *
 * @param {*} ms 毫秒
 * @return undefined
 * 调用： await this._Sleep(500);
 */
function Sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function ID() { return (Date.now().toString(36) + Math.random().toString(36).slice(2, 7)).toUpperCase(); }
/**
 * 获取适当的缓存地址（不在electron环境也能使用 ）
 */
function MatchTempDir() {
    let { argv, versions, resourcesPath, env } = process;
    // 判断是否是electron环境
    if (versions?.electron) {
        for (const iterator of argv) {
            if (iterator.includes("--user-data-dir=")) {
                TempDir = path_1.default.join(iterator.replace("--user-data-dir=", 'Temp'));
            }
        }
    }
    if (!TempDir && env.TEMP)
        TempDir = path_1.default.join(env.TEMP);
}
/**
 * 获取临时文件路径
 * @param Ext 后缀名
 */
function GetTemp(Ext) {
    if (Ext)
        Ext = Ext.match(/^[.]/) ? Ext : "." + Ext;
    if (!Ext)
        Ext = "";
    if (!TempDir)
        MatchTempDir();
    return path_1.default.join(TempDir, ID() + Ext);
}
exports.GetTemp = GetTemp;
/**
 * 设置临时文件路径
 * @param Ext 后缀名
 */
function SetTemp(Path) {
    if (typeof Path === "string") {
        let PathExists = false;
        try {
            let Stats = (0, fs_extra_1.statSync)(Path);
            PathExists = !Stats ? false : true;
            if (Stats.isDirectory())
                TempDir = Path;
            return true;
        }
        catch (error) {
        }
    }
    return false;
}
exports.SetTemp = SetTemp;
function ToSpawn(ExecPath, arge) {
    let RUN_PushCommand_Promise = null;
    let CommandList = [];
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
        let ToSpawn = (0, cmd_1.spawn)(ExecPath, CommandList);
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
exports.ToSpawn = ToSpawn;
/**
 * 等待该文件出现 并停止更新
 * @param Path 路径
 * @param limit  超时（该时间超时后有该文件则返回成功）
 * @returns
 */
function WaitArise(Path, limit) {
    return new Promise(async function (resolve, reject) {
        let StartTime = +new Date();
        let OidSize = 0;
        for (let index = 0; index < 500; index++) {
            let status = await (0, fs_extra_1.stat)(Path).catch(Not => { });
            if (!status) {
                if (limit && (+new Date()) - StartTime > limit)
                    return status !== undefined ? status : undefined;
                await Sleep((limit && 500 > limit && limit < 1) ? limit : 500);
            }
            else {
                // 没有继续更新了
                if (OidSize == status.size)
                    return resolve(status);
                OidSize = status.size;
            }
        }
    });
}
exports.WaitArise = WaitArise;
//# sourceMappingURL=ToSpawn.js.map