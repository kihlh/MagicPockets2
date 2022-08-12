"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execFile = exports.spawn = exports.SetDecode = exports.runSync = exports.run = void 0;
/*
 * @Author: your name
 * @Date: 2022-04-29 20:03:33
 * @LastEditTime: 2022-06-26 16:41:09
 * @LastEditors: your name
 * @Description:
 * @FilePath: \app\modules\cmd\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
const iconv = require("iconv-lite");
const util_1 = require("util");
const child_process_1 = __importDefault(require("child_process"));
let Decode = "cp936";
/**
 * 获取字节大小 中文=2字节
 * @param InputText
 */
function GetStringByteLength(InputText) {
    if (Buffer.isBuffer(InputText))
        return InputText.byteLength;
    return InputText.replace(/[^\x00-\xff]/g, "01").length;
}
/**
* 文本转内存
* @param InputText
* @returns
*/
function StringToBuffer(InputText) {
    let NewBuffer = Buffer.alloc(GetStringByteLength(InputText) || 1, InputText);
    if (Buffer.isBuffer(InputText))
        return InputText;
    return NewBuffer;
}
/**
* win(zh-cn) 返回的内容需要格式化不然是乱码
* @param InputText
* @returns
*/
function CommandReturnInputText(InputText) {
    let ReturnInputText = "";
    if (!InputText)
        return ReturnInputText;
    try {
        if (!Buffer.isBuffer(InputText))
            InputText = StringToBuffer(InputText);
        ReturnInputText = iconv
            .decode(InputText, Decode)
            .replace(/[\r\n]+/gim, "\n");
    }
    catch (e) { }
    return ReturnInputText;
}
/**
* 格式化命令 "cmd-1" "cmd-2"...
* @param Command
*/
function FormatCommandInputText(Command) {
    let ReturnCmdText = "";
    if (Buffer.isBuffer(Command))
        ReturnCmdText = ReturnCmdText.concat(Command.toString());
    if (Command instanceof String)
        ReturnCmdText = ReturnCmdText.concat(String(Command));
    if (Command instanceof Set || Array.isArray(Command)) {
        let index = 0;
        for (let iterator of Command) {
            if (index !== 0)
                iterator = `"${iterator}"`;
            ReturnCmdText = ReturnCmdText.concat(iterator);
            index++;
        }
    }
    return ReturnCmdText;
}
class NodeCommand {
    constructor() {
    }
    /**
     * 使用win 的cmd 执行命令行 异步
     * @param Command 命令
     * @param Callback 回调函数 没有则返回Promise异步函数
     * @returns
     */
    run(Command, Callback, Options) {
        let fun = undefined;
        if (!Command)
            throw new Error("Not Command");
        let CommandInputText = FormatCommandInputText(Command);
        let ToSpawnVarList = [CommandInputText,];
        if (Callback && Options) {
            if (typeof Callback == "function" && typeof Options == "object")
                ToSpawnVarList.push(...[Options, Callback]);
            if (typeof Callback == "object" && typeof Options == "function")
                ToSpawnVarList.push(...[Callback, Options]);
        }
        else {
        }
        function RunAsync() {
            return new Promise(async function (resolve, reject) {
                fun = child_process_1.default.exec(CommandInputText, function (error, stdout, stderr) {
                    let run = {
                        err: error,
                        data: CommandReturnInputText(stdout),
                        stderr: CommandReturnInputText(stderr),
                    };
                    if (error)
                        return reject(run);
                    resolve(run);
                });
            });
        }
        if (Callback) {
            RunAsync()
                .then(({ err, data, stderr }) => Callback(err, data, stderr))
                .catch((NodeCmdReturnResult) => {
                let { err, data, stderr } = NodeCmdReturnResult;
                Callback(err, data, stderr);
            });
            if (fun)
                return fun;
        }
        else
            return RunAsync();
    }
    /**
     *
     * @param Command 执行的命令
     *
     * @returns
     */
    runSync(Command) {
        let InputCommandText = FormatCommandInputText(Command);
        try {
            return {
                data: CommandReturnInputText(child_process_1.default.execSync(InputCommandText)),
                err: null,
                stderr: null,
            };
        }
        catch (error) {
            return {
                data: null,
                err: error?.stderr ? CommandReturnInputText(error.stderr) : null,
                stderr: error?.stderr ? CommandReturnInputText(error.stderr) : null,
            };
        }
    }
    /**
     * 设置解析cmd返回的文本编码
     * @param decode
     * @returns
     */
    SetDecode(decode) {
        if (!decode)
            throw new Error("Not decode");
        Decode = decode;
        return true;
    }
    /**
     * node的spawn 定制的异步 支持大文本 持续文本
     * @param  file 执行体 二进制或者链接
     * @param args 命令数组
     * @param  callback 回调函数
     * @param  options spawn 配置
     * @returns
     */
    spawn(file, args, callback, options) {
        if (!options)
            options = {};
        let SpawnFun = undefined;
        /**返回的二进制数据将放在这里 */
        let SpawnFunDataList = new Set;
        let DataByteLength = 0;
        /**一些添加到Promise返回体的功能 */
        let SpawnAdditionStdout = {};
        let StartSpawn = new Promise(async function (resolve, reject) {
            try {
                SpawnFun = child_process_1.default.spawn(file, args, options);
                SpawnAdditionStdout.on = SpawnFun?.stdout.on;
                SpawnFun?.stdout.on('data', (data) => {
                    SpawnFunDataList.add(data);
                    if (callback)
                        callback.apply(SpawnFun, [CommandReturnInputText(data)]);
                });
                SpawnFun?.stdout.on('close', () => {
                    for (let Data of SpawnFunDataList) {
                        DataByteLength += Data.byteLength;
                    }
                    ;
                    let ResponseData = Buffer.concat([...SpawnFunDataList], DataByteLength);
                    delete StartSpawn.HaveDataList;
                    StartSpawn.Fulfil = true;
                    resolve(CommandReturnInputText(ResponseData));
                });
                SpawnAdditionStdout.ErrorList = new Set();
                SpawnFun?.stdout.on("error", function (error) {
                    SpawnAdditionStdout.ErrorList?.add(error);
                });
            }
            catch (error) {
                return reject(error);
            }
        });
        StartSpawn.Quit = function () {
            return SpawnFun?.stdin.end();
        };
        StartSpawn.GetDataList = function () { return SpawnFunDataList; };
        StartSpawn.GetData = function () {
            for (let Data of SpawnFunDataList) {
                DataByteLength += Data.byteLength;
            }
            ;
            let ResponseData = Buffer.concat([...SpawnFunDataList], DataByteLength);
            return CommandReturnInputText(ResponseData);
        };
        StartSpawn.on = SpawnAdditionStdout.on;
        StartSpawn.ErrorList = SpawnAdditionStdout.ErrorList;
        StartSpawn.Options = options;
        StartSpawn.Spawn = SpawnFun;
        StartSpawn.HaveDataList = SpawnFunDataList;
        StartSpawn.Fulfil = false;
        return StartSpawn;
    }
    execFile = (0, util_1.promisify)(child_process_1.default.execFile);
}
let { run, runSync, SetDecode, spawn, execFile } = new NodeCommand();
exports.run = run;
exports.runSync = runSync;
exports.SetDecode = SetDecode;
exports.spawn = spawn;
exports.execFile = execFile;
exports.default = { run, runSync, SetDecode, spawn, execFile };
//# sourceMappingURL=index.js.map