import iconv = require('iconv-lite');
import ffi, { Library, ref, types } from "../ffi-cross";
import path from "path";
import cmd from "../../cmd";
let { int, CString, charPtr, bool } = types;
export {ffi}
export function win32Text(Text: string) {
    return iconv.encode(Text + "\0", 'utf16le')
}
export var HMC = new Library(path.join(process.resourcesPath, "bin", "Dll1.dll"), {
    'confirm':
        [
            int, [charPtr, charPtr]
        ],
    "KillProcess": [
        bool, [int]
    ],
    "sleep": [
        int, [int]
    ]

});

export function Sleep(ms: number, Sync: true | 1): void
export function Sleep(ms: number): Promise<void>
/**
 * 线程/进程 阻塞
 * @param ms 
 * @param Sync 
 * @returns 
 */
export function Sleep(ms: unknown, Sync?: unknown) {
    if (Sync) return HMC.sleep(isNaN(Number(ms)) ? 150 : Number(ms)), void 0;
    return new Promise(resolve => setTimeout(resolve, Number(ms)));
}

/**
 * 消息窗口 
 * @param tile 
 * @param message 
 * @returns 
 */
export function confirm(tile: string | Buffer, message: string | Buffer): boolean {
    if (typeof message == 'string') message = win32Text(message);
    if (typeof tile == 'string') tile = win32Text(tile);
    return !!HMC.confirm(message,tile);
}
/**
 * 结束该ID的进程
 * @param Pid 
 * @returns 
 */
export function KillProcess(Pid: number): boolean {
    return !!HMC.KillProcess(Pid);
}

/**
 * 获取进程列表
 * @returns 
 */
export function getProcessList(): Promise<ProcessList> {
    return new Promise(async function (resolve, reject) {
        try {
            let GetProcessList: Set<string> = new Set();
            let ps2_GetProcess = await cmd.spawn("PowerShell", ["Get-Process"]);
            for (let Process of ps2_GetProcess?.split(/[\r\n]+/) || []) if (Process && !Process?.match(/^[\s\t ]+$/)) GetProcessList.add(Process);
            let ProcessList = [];
            let index = 0;
            let Hade = ["Handles", "NPM(K)", "PM(K)", "WS(K)", "CPU(s)", "PID", "SI", "ProcessName"];
            for (let Process of GetProcessList) {
                if (index != 0 && index != 1) {
                    let matchProcess: string[] = Process?.match(/^ +([\d\.]+) +([\d\.]+) +([\d\.]+) +([\d\.]+) +([\d\.]+) +([\d\.]+) +([\d\.]+) (.+?) +$/i) || [];
                    let ProcessCont: ProcessCont = {};
                    if (matchProcess) {
                        for (let index = 1; index < matchProcess.length; index++) {
                            // @ts-expect-error 
                            ProcessCont[Hade[index - 1]] = matchProcess[index];
                            ProcessCont["CPU(s)"] = Number(ProcessCont["CPU(s)"]);
                            ProcessCont["Handles"] = Number(ProcessCont["Handles"]);
                            ProcessCont["PID"] = Number(ProcessCont["PID"]);
                            ProcessCont["NPM(K)"] = Number(ProcessCont["NPM(K)"]);
                            ProcessCont["PM(K)"] = Number(ProcessCont["PM(K)"]);
                            ProcessCont["SI"] = Number(ProcessCont["SI"]);
                            ProcessCont["WS(K)"] = Number(ProcessCont["WS(K)"]);
                            ProcessCont["CmdName"] = ProcessCont["ProcessName"] + ".exe";
                        }
                        ProcessList.push(ProcessCont);
                    }
                }
                index++;
            }
            resolve(ProcessList)
        } catch (err) { reject(err) }
    })
}

/**
 * 进程列表
 */
type ProcessList = ProcessCont[];
type ProcessCont = {
    /**句柄 */
    "Handles"?: number,
    /**CPU每秒占用百分比 */
    "CPU(s)"?: number,
    /**进程 ID */
    "PID"?: number,
    /**进程使用的非分页内存，单位：Kb */
    "NPM(K)"?: number,
    /**进程使用的可分页内存，单位：Kb */
    "PM(K)"?: number,
    /**会话id*/
    "SI"?: 0 | 1 | number,
    /** 进程的工作集大小，单位：Kb，工作集由进程所引用到的内存页组成*/
    "WS(K)"?: number,
    /**进程名 不带exe*/
    "ProcessName"?: string
    /**进程名 带exe*/
    "CmdName"?: string
}
export default{
    getProcessList,
    KillProcess,
    confirm,
    Sleep,
    HMC,
    ffi,
    win32Text
}