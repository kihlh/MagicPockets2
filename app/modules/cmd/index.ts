/*
 * @Author: your name
 * @Date: 2022-04-29 20:03:33
 * @LastEditTime: 2022-06-26 16:41:09
 * @LastEditors: your name
 * @Description:
 * @FilePath: \app\modules\cmd\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import iconv = require("iconv-lite");
import { promisify } from "util";
import child_process from "child_process";
import {ChildProcess,ChildProcessWithoutNullStreams,SpawnOptionsWithoutStdio} from "child_process"

let Decode: encodingTypeof = "cp936";
/**
 * 获取字节大小 中文=2字节
 * @param InputText
 */
function GetStringByteLength(InputText: string | Buffer): number {
    if (Buffer.isBuffer(InputText)) return InputText.byteLength;
    return InputText.replace(/[^\x00-\xff]/g, "01").length;
}
/**
* 文本转内存
* @param InputText
* @returns
*/
function StringToBuffer(InputText: string | Buffer): Buffer {
    let NewBuffer = Buffer.alloc(
        GetStringByteLength(InputText) || 1,
        InputText
    );
    if (Buffer.isBuffer(InputText)) return InputText;
    return NewBuffer;
}
/**
* win(zh-cn) 返回的内容需要格式化不然是乱码
* @param InputText
* @returns
*/
function CommandReturnInputText(InputText: string | Buffer | null | undefined): string {
    let ReturnInputText = "";
    if (!InputText) return ReturnInputText;
    try {
        if (!Buffer.isBuffer(InputText))
            InputText = StringToBuffer(InputText);
        ReturnInputText = iconv
            .decode(InputText, Decode)
            .replace(/[\r\n]+/gim, "\n");
    } catch (e) { }
    return ReturnInputText;
}
/**
* 格式化命令 "cmd-1" "cmd-2"...
* @param Command
*/
function FormatCommandInputText(Command: string | string[] | Set<string> | Buffer): string {
    let ReturnCmdText = "";
    if (Buffer.isBuffer(Command)) ReturnCmdText = ReturnCmdText.concat(Command.toString());
    if (Command instanceof String) ReturnCmdText = ReturnCmdText.concat(String(Command));
    if (Command instanceof Set || Array.isArray(Command)) {
        let index = 0;
        for (let iterator of Command) {
            if (index !== 0) iterator = `"${iterator}"`;
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
    run(Command: string | string[], Callback?: any,Options?:any): Promise<NodeCmdReturnResult> | void | ChildProcess {
        let fun: ChildProcess | undefined = undefined
        if (!Command) throw new Error("Not Command");
        let CommandInputText = FormatCommandInputText(Command);
        let ToSpawnVarList=[CommandInputText,];

        if(Callback&&Options){
            if(typeof Callback=="function"&&typeof Options=="object")ToSpawnVarList.push(...[Options,Callback])
            if(typeof Callback=="object"&&typeof Options=="function")ToSpawnVarList.push(...[Callback,Options])
        }else {
            
        }

        function RunAsync(): Promise<NodeCmdReturnResult> {
            return new Promise(async function (resolve, reject) {
            
                fun = child_process.exec(CommandInputText, function (error, stdout, stderr) {
                    let run: NodeCmdReturnResult = {
                        err: error,
                        data: CommandReturnInputText(stdout),
                        stderr: CommandReturnInputText(stderr),
                    };
                    if (error) return reject(run);
                    resolve(run);
                });
            });
        }
        if (Callback) {
            RunAsync()
                .then(({ err, data, stderr }) => Callback(err, data, stderr))
                .catch((NodeCmdReturnResult: NodeCmdReturnResult) => {
                    let { err, data, stderr } = NodeCmdReturnResult;
                    Callback(err, data, stderr);
                });
            if (fun) return fun;
        }
        else return RunAsync();
    }
    /**
     *
     * @param Command 执行的命令
     *
     * @returns
     */
    runSync(Command: string | string[]) {
        let InputCommandText = FormatCommandInputText(Command);
        try {
            return {
                data: CommandReturnInputText(child_process.execSync(InputCommandText)),
                err: null,
                stderr: null,
            };
        } catch (error: any) {
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
    SetDecode(decode: encodingTypeof) {
        if (!decode) throw new Error("Not decode");
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
    spawn(file: string, args: string[], callback?: (this:ChildProcessWithoutNullStreams|undefined,data:string)=>void, options?: SpawnOptionsWithoutStdio) {
        if(!options)options={};
        let SpawnFun:undefined|ChildProcessWithoutNullStreams=undefined;
        /**返回的二进制数据将放在这里 */
        let SpawnFunDataList:Set<Buffer> = new Set;
        let DataByteLength = 0;
        /**一些添加到Promise返回体的功能 */
        let SpawnAdditionStdout:SpawnAdditionStdout={};
        let StartSpawn:StartSpawn =new  Promise(async function (resolve, reject){
            try {
                SpawnFun= child_process.spawn(file, args, options);
                SpawnAdditionStdout.on=SpawnFun?.stdout.on;
                
                SpawnFun?.stdout.on('data', (data:Buffer) => {
                    SpawnFunDataList.add(data);
                    if(callback)callback.apply(SpawnFun,[CommandReturnInputText(data)])
                })

                SpawnFun?.stdout.on('close', () => {
                    for (let Data of SpawnFunDataList) {
                        DataByteLength += Data.byteLength
                    };
                    let ResponseData = Buffer.concat([...SpawnFunDataList], DataByteLength);
                    delete  StartSpawn.HaveDataList;
                    StartSpawn.Fulfil=true;
                    resolve(CommandReturnInputText(ResponseData));
                });
                SpawnAdditionStdout.ErrorList=new Set();
                SpawnFun?.stdout.on("error",function(error){
                    SpawnAdditionStdout.ErrorList?.add(error);
                });
            }catch(error){
                return reject(error)
            }
        })
        StartSpawn.Quit=function(){
          return  SpawnFun?.stdin.end()
        }
        StartSpawn.GetDataList=function():Set<Buffer>{return  SpawnFunDataList}

        StartSpawn.GetData=function():string{
            for (let Data of SpawnFunDataList) {
                DataByteLength += Data.byteLength
            };
            let ResponseData = Buffer.concat([...SpawnFunDataList], DataByteLength);
            return CommandReturnInputText(ResponseData)
        }

        StartSpawn.on=SpawnAdditionStdout.on;
        StartSpawn.ErrorList=SpawnAdditionStdout.ErrorList;
        StartSpawn.Options=options;
        StartSpawn.Spawn=SpawnFun;
        StartSpawn.HaveDataList=SpawnFunDataList
        StartSpawn.Fulfil=false;
        return StartSpawn
    }
    execFile=promisify(child_process.execFile)
}
let { run, runSync, SetDecode ,spawn,execFile} = new NodeCommand();


export { run, runSync, SetDecode,spawn,execFile ,StartSpawn,NodeCmdReturnResult}
export default  { run, runSync, SetDecode,spawn,execFile}
type Options ={

}
interface NodeCommand {

    run(Command: string | string[]): Promise<NodeCmdReturnResult>;

    run(
        Command: string | string[],
        Callback: (
            error: NodeCmdReturnResult["err"],
            data: NodeCmdReturnResult["data"],
            stderr: NodeCmdReturnResult["stderr"]
        ) => void
    ): ChildProcess | void;

}

interface SpawnAdditionStdout{
    on?: { (event: "close", listener: () => void): import("stream").Readable; (event: "data", listener: (chunk: any) => void): import("stream").Readable; (event: "end", listener: () => void): import("stream").Readable; (event: "error", listener: (err: Error) => void): import("stream").Readable; (event: "pause", listener: () => void): import("stream").Readable; (event: "readable", listener: () => void): import("stream").Readable; (event: "resume", listener: () => void): import("stream").Readable; (event: string | symbol, listener: (...args: any[]) => void): import("stream").Readable; };
    /**
     * 退出
     */
    Quit?:()=>void;
    /**
     * 返回当前已有的所有文本 并编码
     */
    GetData?:()=>string
    /**
     * 返回当前已经有的Buffer 未经过编码
     */
    GetDataList?:()=>Set<Buffer>
    /**途中发生的错误都会记录在这里 */
    ErrorList?:Set<Error>
    Spawn?:child_process.ChildProcessWithoutNullStreams
    Options?:SpawnOptionsWithoutStdio
    /**进行中的所有返回的Buffer 
     * ?数据获取结束后会清空该内容
    */
    HaveDataList?:Set<Buffer>
    /**
     * 是否完成
     */
    Fulfil?:boolean
}

 type StartSpawn=Promise<string>&SpawnAdditionStdout;

type NodeCmdReturnResult = {
    data: string | null | undefined;
    err: null | Error | string | undefined;
    stderr: null | string | undefined;
};
type encodingTypeof = |
    "cp936" | "win1251" | "utf8" | "us-ascii" | "utf-32be" | "utf-16be" | "ucs2" | "utf16-le" |
    "ascii" | "binary" | "base64" | "hex" | "utf16" | "utf-7" | "utf-7-imap" | "utf32" | "ISO-8859" |
    "ISO-8859" | "family" | "Windows 125x family" | "IBM/DOS" | "'us-ascii" | "latin1" |
    "EUC-JP." | "Shift_JIS" | "GB18030" | "GBK" | "GB2312" | "CP950" | "CP949" | "CP936" | "CP932"
