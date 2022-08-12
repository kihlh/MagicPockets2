import path from "path";
import fs, { existsSync } from "fs";
import os = require('os');
import child_process from "child_process";
import {spawn,SpawnOptionsWithStdioTuple,StdioPipe,SpawnOptionsWithoutStdio} from "child_process";
let HMC: any;
let _file_HMC_Path = path.join(__dirname, "HMC.node");
let _is_file_HMC__dirname_node = existsSync(_file_HMC_Path);
let _electron_file_HMC_Path = path.join(process.resourcesPath || process.cwd() || "", "bin", "HMC.node");
let _is_electron_file_HMC_Path = existsSync(_electron_file_HMC_Path);
if (_is_electron_file_HMC_Path) {
    HMC = require(_electron_file_HMC_Path);
}
else if (_is_file_HMC__dirname_node) {
    HMC = require(_file_HMC_Path);
}
else {
    throw new Error("HMC is not binary");
}

// let HMC = require((existsSync(_electron_file_HMC_Path) ? _electron_file_HMC_Path : _file_HMC_Path) || "HMC.node");
// import cmd from "../../cmd";
// function isRegExp(Input:any){return Input instanceof RegExp}
// function isSet(Input:any){return Input instanceof Set}

import { getSystemErrorCodes, SystemErrorCodesContain } from "./system-error-codes";
function AddToDefineProperty(Arrays: Array<any>, Name: string, Fun: Function) {
    Object.defineProperty(Arrays, Name, {
        value: Fun,
        writable: true,
        enumerable: true,
        configurable: true
    });
}
/**
 * 判断是否拥有管理员权限
 * @returns 
 */
export let CallHMC = HMC;
/**
 * 判断是否拥有管理员权限
 * @returns 
 */
export function isAdmin(): boolean {
    return HMC.isAdmin();
}

export function Sleep(ms: number, Sync: true | 1): void
export function Sleep(ms: number): Promise<void>
/**
 * 线程/进程 阻塞
 * @param ms 
 * @param Sync 
 * @returns 
 */
export function Sleep(ms: unknown, Sync?: unknown) {
    let FormatMs = isNaN(Number(ms)) ? 150 : Number(ms);
    if (Sync) return HMC.sleep(FormatMs), void 0;
    return new Promise(resolve => setTimeout(resolve, Number(FormatMs)));
}

/**
 * 结束该ID的进程
 * @param Pid 
 * @returns 
 */
export function KillProcess(Pid: number): boolean {
    if (isNaN(Number(Pid))) throw new Error("The parameter(PID) can only be a number");
    return HMC.killProcess(Number(Pid));
}

let BackLockProcessList: ProcessList = [];

/**
 * 获取进程列表
 * @returns 
 */
export function getProcessList(): Promise<ProcessList> {
    return new Promise(async function (resolve, reject) {
        let cpuSpeedSize = 0;
        for (let cpu of os.cpus()) {
            cpuSpeedSize += cpu.speed
        }
        try {
            let GetProcessList: Set<string> = new Set();
            function GetProcessListSystemText(): Promise<string> {
                return new Promise((resolve, reject) => {
                    let ps2_GetProcess = "";
                    let ps2_GetProcess_Buff: Set<Buffer> = new Set();
                    let cmd_ChildProcess = spawn("cmd", [`/C chcp 65001>nul && PowerShell Get-Process`], { windowsHide: true });
                    cmd_ChildProcess.stdout.on('data', (data) => ps2_GetProcess_Buff.add(data));
                    cmd_ChildProcess.stdout.once("close", function () {
                        let size = 0;
                        for (const Buff of ps2_GetProcess_Buff) size += Buff.byteLength;
                        let BuffConcat = Buffer.concat([...ps2_GetProcess_Buff], size);
                        ps2_GetProcess = BuffConcat.toString("utf-8");
                        resolve(ps2_GetProcess);
                    });
                    cmd_ChildProcess.once("error", function () {
                        resolve(ps2_GetProcess);
                    });
                });
            }
            let ps2_GetProcess = await GetProcessListSystemText();
            // let ps2_GetProcess = await cmd.spawn("PowerShell", ["Get-Process"]);
            for (let Process of ps2_GetProcess?.split(/[\r\n]+/) || []) if (Process && !Process?.match(/^[\s\t ]+$/)) GetProcessList.add(Process);
            let ProcessList = [];
            let index = 0;
            let Hade = ["Handles", "NPM(K)", "PM(K)", "WS(K)", "CPU(s)", "PID", "SI", "ProcessName"];
            for (let Process of GetProcessList) {
                if (index != 0 && index != 1) {
                    let match_Process: string[] = Process?.match(/^ +([,\d\.]+) +([,\d\.]+) +([,\d\.]+) +([,\d\.]+) +([,\d\.]+) +([,\d\.]+) +([,\d\.]+) (.+?) +$/i) || [];
                    let matchProcess = [...match_Process];
                    let ProcessCont: ProcessCont = {};
                    for (let index = 0; index < matchProcess.length; index++) {
                        const element = matchProcess[index];
                        if (element.match(/^[,\d\.]+$/)) {
                            matchProcess[index] = element.replace(/[,]+/g, '');
                        }
                    }
                    if (matchProcess) {
                        for (let index = 1; index < matchProcess.length; index++) {
                            // @ts-expect-error 
                            ProcessCont[Hade[index - 1]] = matchProcess[index]
                            ProcessCont["CPU(s)"] = Number(ProcessCont["CPU(s)"]);
                            // console.log(cpuSpeedSize%ProcessCont["CPU(s)"]);
                            
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
            BackLockProcessList.length = 0;
            BackLockProcessList.push(...ProcessList);
            setTimeout(() => BackLockProcessList.length = 0, 500);
            resolve(ProcessList)
        } catch (err) { reject(err) }
    })
}

/**
 * 获取进程列表（Cpp）
 * @returns 
 */
export function getWin32DetailsProcessList(): { pid: number, name: string, path: string }[] {
    return HMC.getWin32DetailsProcessList();
}
/**
 * 通过句柄设置系统右键是否可用(例如屏蔽默认右键)
 * @param HWND 句柄
 * @param bRevert 是否屏蔽
 * @returns 
 */
export function getSystemMenu(HWND: number, bRevert: boolean): boolean {
    return HMC.getSystemMenu(HWND, bRevert);
}
/**
 * 通过进程id获取主窗口句柄
 * @param ProcessID 进程id
 * @returns 
 */
export function getProcessHandle(ProcessID: number): number {
    return HMC.getProcessHandle(ProcessID)
}

/**
 * 获取活动窗口的句柄
 */
export function getForegroundWindow(): number {
    return HMC.getForegroundWindow();
}
/**
 * 通过进程id查询进程镜像的路径
 * @param ProcessID 
 * @returns 
 */
export function getPidFilePath(ProcessID: number): string {
    return HMC.getPidFilePath(ProcessID)
}
/**
 * 按照进程名称获取所有执行文件的路径
 * @param Name 
 * @returns 
 */
export function getProcessNameFilePath(Name: string | RegExp): string[] {
    let FilePathSetList: Set<string> = new Set();
    let GetProcessList = lookNameList([Name]);
    if (GetProcessList.length) {
        for (const ProcessID of GetProcessList) {
            let FilePath = getPidFilePath(ProcessID);
            FilePath && FilePathSetList.add(FilePath);
        }
    }
    return [...FilePathSetList]
}
/**
 * 打开exe软件
 * @param AppPath 
 * @param Command 
 * @param cwd 
 */
export function OpenApp(AppPath: string, Command?: string[] | string | null, cwd?: string | null, hide?: boolean | null): boolean {
    if (!AppPath) {
        throw new Error("AppPath is Not")
    }
    if (!Command) Command = "";
    if (!cwd) cwd = null;
    if (Array.isArray(Command)) {
        let command_ToFlag = "";
        for (const Flag of Command) {
            command_ToFlag += (`"${Flag}" `);
        }
        Command = command_ToFlag.replace(/ $/, '');
    }
    return HMC.openApp(String(AppPath), String(Command), String(cwd) || path.parse(path.resolve(AppPath)).dir, hide ? true : false);
}

/**
 * 打开exe软件
 * @param AppPath 
 * @param Command 
 * @param cwd 
 */
export function OpenAppToUAC(AppPath: string, Command?: string[] | string | null, cwd?: string | null, hide?: boolean | null): boolean {
    if (!AppPath) {
        throw new Error("AppPath is Not")
    }
    if (!Command) Command = "";
    if (!cwd) cwd = null;
    if (Array.isArray(Command)) {
        let command_ToFlag = "";
        for (const Flag of Command) {
            command_ToFlag += (`"${Flag}"`);
        }
        Command = command_ToFlag;
    }
    return HMC.openAppToUAC(String(AppPath), String(Command), String(cwd) || path.parse(path.resolve(AppPath)).dir, hide ? true : false);
}

/**
*搜索进程
*/
export function lookNameKill(lookName: string) {
    HMC.killProcessByName(String(lookName));
    if (!String(lookName).match(/.exe/i)) {
        HMC.killProcessByName(String(lookName) + ".exe");
    }
    return;
}

/**
*搜索进程
*/
export function lookProcessPidList(lookName: string): lookProcessListInfo {
    let C_lookInfo: number[] = HMC.lookProcessByName(String(lookName));
    let lookInfo: NotKillFun_lookProcessListInfo = [];
    lookInfo.push(...C_lookInfo);
    AddToDefineProperty(lookInfo, "Kill", function (this: Array<any>) { for (let pid of this) HMC.killProcess(pid) })

    // @ts-expect-error
    return lookInfo;
}
/**
*是否存在该进程
*/
export function isProcess(ProcessName: string) {
    return lookProcessPidList(ProcessName).length > 0;
}
/**
*系统空闲时间
*/
export function getSystemIdleTime(): number {
    return HMC.getSystemIdleTime();
}

/***
 * 获取所有进程名称+pid
 */
export function getWin32ApiProcessList(): Win32ApiProcessList {
    return HMC.getProcessList();
}

/**
 * 获取注册表里的键值对
 */
export function getStringRegKey(HKEY: HKEY, Path: string, Name: string): string {
    try {
        return HMC.getStringRegKey(HKEY, Path, Name);
    } catch (error) {
        return "";
    }
}



/**
 * 关闭显示器
 */
export function shutMonitors(): void {
    HMC.shutMonitors();
}

/**
 * 打开显示器
 */
export function showMonitors(): void {
    HMC.showMonitors();
}
/**
 * 电源
 */
export let power = {
    /**
     * 关机
     */
    off() { HMC.win32Judge(1001); },
    /**
     * 重启
     */
    reboot() { HMC.win32Judge(1002); },
    /**
    * 注销用户
    */
    logout() { HMC.win32Judge(1003); },
    /**
 * 锁定电脑
 */
    Lock() { HMC.win32Judge(1005); },
    showMonitors,
    shutMonitors,
    /**
     * 操作显示器是否显示
     * @param Need 
     * @returns 
     */
    Monitors(Need: boolean) {
        if (Need) {
            showMonitors();
            return;
        }
        shutMonitors();
    }
}

/**
 * 通过进程名过滤出匹配的进程
 * @param NameList 
 * @returns 
 */
export function lookNameList(NameList: Set<string | RegExp> | Array<string | RegExp>) {
    let Win32ApiProcessList = getWin32ApiProcessList();
    let KillProcessIdList = new Set<number>();

    for (let FindProcessName of NameList) {
        if (FindProcessName) for (const Win32ApiProcessIterator of Win32ApiProcessList) {
            if (Win32ApiProcessIterator.name?.match(FindProcessName)) {
                KillProcessIdList.add(Win32ApiProcessIterator.pid);
            }
        }
    }
    let lookInfo = [...KillProcessIdList];
    AddToDefineProperty(lookInfo, "Kill", function (this: Array<any>) { for (let pid of this) HMC.killProcess(pid) })
    return lookInfo;
}

/**
 * 使用进程名数组 结束匹配的进程
 */
export function KillNameList(NameList: Set<string | RegExp> | Array<string | RegExp>) {
    let KillProcessIdList = lookNameList(NameList);
    let info = 0;
    for (let pid of KillProcessIdList) info += HMC.killProcess(pid);
    return info == KillProcessIdList.length
}


// 追求最快速度使用HMC.isProcessByName(Name);  6ms 左右但是不支持 
/**
 * 判断是否存在该进程
 * @param Name 
 * @returns 
 */
export function isProcessByName(Name: string | RegExp | Set<string | RegExp> | Array<string | RegExp>): boolean {
    if (Name instanceof Set || Array.isArray(Name)) {
        let KillProcessIdList = lookNameList(Name);
        return KillProcessIdList.length !== 0;
    }
    let KillProcessIdList = lookNameList([Name]);
    return KillProcessIdList.length !== 0;
}
let win32_STARTUPINFO = {
    /**隐藏窗口并激活另一个窗口。 */
    SW_HIDE: 0,
    /**激活并显示一个窗口。如果窗口被最小化或最大化，系统会将其恢复到原来的大小和位置。应用程序应在第一次显示窗口时指定此标志 */
    SW_SHOWNORMAL: 1,
    /**激活并显示一个窗口。如果窗口被最小化或最大化，系统会将其恢复到原来的大小和位置。应用程序应在第一次显示窗口时指定此标志 */
    SW_NORMAL: 1,
    /**激活窗口并将其显示为最小化窗口。 */
    SW_SHOWMINIMIZED: 2,
    /**激活窗口并将其显示为最大化窗口。 */
    SW_SHOWMAXIMIZED: 3,
    /**激活窗口并将其显示为最大化窗口。 */
    SW_MAXIMIZE: 3,
    /**以最近的大小和位置显示窗口。这个值类似于SW_SHOWNORMAL，除了窗口没有被激活。 */
    SW_SHOWNOACTIVATE: 4,
    /**激活窗口并以其当前大小和位置显示它。 */
    SW_SHOW: 5,
    /**最小化指定窗口并激活 Z 顺序中的下一个顶级窗口。 */
    SW_MINIMIZE: 6,
    /**将窗口显示为最小化窗口。这个值类似于SW_SHOWMINIMIZED，除了窗口没有被激活 */
    SW_SHOWMINNOACTIVE: 7,
    /**以当前大小和位置显示窗口。这个值类似于SW_SHOW，除了窗口没有被激活。 */
    SW_SHOWNA: 8,
    /**激活并显示窗口。如果窗口被最小化或最大化，系统会将其恢复到原来的大小和位置。应用程序在恢复最小化窗口时应指定此标志 */
    SW_RESTORE: 9,
    /**根据启动应用程序的程序传递给CreateProcess函数的STARTUPINFO结构中指定的SW_值设置显示状态。 */
    SW_SHOWDEFAULT: 10,
    /**最小化一个窗口，即使拥有该窗口的线程没有响应。只有在最小化来自不同线程的窗口时才应使用此标志 */
    SW_FORCEMINIMIZE: 11,
}
export type nCmdShow = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | true | false | keyof typeof win32_STARTUPINFO;
/**
 * 通过句柄显示窗口  https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-showwindow
 * @param HWND 句柄
 * @param nCmdShow 操作内容
 *  - "SW_HIDE" | 0 隐藏窗口并激活另一个窗口。
 *  - "SW_SHOWNORMAL" | 1 激活并显示一个窗口。如果窗口被最小化或最大化，系统会将其恢复到原来的大小和位置。应用程序应在第一次显示窗口时指定此标志
 *  - "SW_SHOWMINIMIZED" | 2 激活窗口并将其显示为最小化窗口
 *  - "SW_SHOWMAXIMIZED" | "SW_MAXIMIZE" | 3 激活窗口并将其显示为最大化窗口
 *  - "SW_SHOWNOACTIVATE" | 4 以最近的大小和位置显示窗口。这个值类似于SW_SHOWNORMAL，除了窗口没有被激活
 *  - "SW_SHOW" | 5  激活窗口并以其当前大小和位置显示它
 *  - "SW_MINIMIZE" | 6 最小化指定窗口并激活 Z 顺序中的下一个顶级窗口
 *  - "SW_SHOWMINNOACTIVE" | 7 将窗口显示为最小化窗口。这个值类似于SW_SHOWMINIMIZED，除了窗口没有被激活
 *  - "SW_SHOWNA" | 8 以当前大小和位置显示窗口。这个值类似于SW_SHOW，除了窗口没有被激活
 *  - "SW_RESTORE" | 9 激活并显示窗口。如果窗口被最小化或最大化，系统会将其恢复到原来的大小和位置。应用程序在恢复最小化窗口时应指定此标志
 *  - "SW_SHOWDEFAULT" | 10 据启动应用程序的程序传递给CreateProcess函数的STARTUPINFO结构中指定的SW_值设置显示状态。
 *  - "SW_FORCEMINIMIZE" | 11 最小化一个窗口，即使拥有该窗口的线程没有响应。只有在最小化来自不同线程的窗口时才应使用此标志
 * @returns 
 */
export function handleShowWindow(HWND: number, nCmdShow: nCmdShow) {
    if (typeof HWND != 'number') return false;
    if (!["string", "number", "boolean"].includes(typeof nCmdShow)) return false;
    if (typeof nCmdShow == "boolean") nCmdShow = nCmdShow ? 9 : 0;
    if (typeof nCmdShow == "number" && !(nCmdShow >= 0 && nCmdShow <= 11)) return false;
    if (typeof nCmdShow == "string") {
        let _nCmdShow = win32_STARTUPINFO[nCmdShow];
        if (_nCmdShow === undefined) return false;
    }
    return HMC.handleShowWindow(HWND, nCmdShow)
}

/**
 * 通过句柄显示窗口  https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-showwindow
 * @param ProcessID 进程id
 * @param nCmdShow 操作内容
 *  - "SW_HIDE" | 0 隐藏窗口并激活另一个窗口。
 *  - "SW_SHOWNORMAL" | 1 激活并显示一个窗口。如果窗口被最小化或最大化，系统会将其恢复到原来的大小和位置。应用程序应在第一次显示窗口时指定此标志
 *  - "SW_SHOWMINIMIZED" | 2 激活窗口并将其显示为最小化窗口
 *  - "SW_SHOWMAXIMIZED" | "SW_MAXIMIZE" | 3 激活窗口并将其显示为最大化窗口
 *  - "SW_SHOWNOACTIVATE" | 4 以最近的大小和位置显示窗口。这个值类似于SW_SHOWNORMAL，除了窗口没有被激活
 *  - "SW_SHOW" | 5  激活窗口并以其当前大小和位置显示它
 *  - "SW_MINIMIZE" | 6 最小化指定窗口并激活 Z 顺序中的下一个顶级窗口
 *  - "SW_SHOWMINNOACTIVE" | 7 将窗口显示为最小化窗口。这个值类似于SW_SHOWMINIMIZED，除了窗口没有被激活
 *  - "SW_SHOWNA" | 8 以当前大小和位置显示窗口。这个值类似于SW_SHOW，除了窗口没有被激活
 *  - "SW_RESTORE" | 9 激活并显示窗口。如果窗口被最小化或最大化，系统会将其恢复到原来的大小和位置。应用程序在恢复最小化窗口时应指定此标志
 *  - "SW_SHOWDEFAULT" | 10 据启动应用程序的程序传递给CreateProcess函数的STARTUPINFO结构中指定的SW_值设置显示状态。
 *  - "SW_FORCEMINIMIZE" | 11 最小化一个窗口，即使拥有该窗口的线程没有响应。只有在最小化来自不同线程的窗口时才应使用此标志
 * @returns 
 */
export function ProcessIDShowWindow(ProcessID: number, nCmdShow: nCmdShow) {
    let HWND = getProcessHandle(ProcessID);
    return handleShowWindow(HWND, nCmdShow)
}
/**
 * 通过句柄获取窗口可见性
 * @param Handle 
 * @returns 
 */
export function isHandleWindowVisible(Handle: number): boolean {
    if (!Handle) return false;
    return HMC.isHandleWindowVisible(Handle);
}
/**
 * 通过进程id获取窗口可见性
 * @param ProcessID 
 * @returns 
 */
export function isProcessIDWindowVisible(ProcessID: number): boolean {
    let HWND = getProcessHandle(ProcessID);
    return isHandleWindowVisible(HWND)
}

/**
 * 通过句柄关闭窗口(非结束进程)
 * @param Handle 
 * @returns 
 */
export function handleCloseWindow(Handle: number): boolean {
    if (!Handle) return false;
    return HMC.handleCloseWindow(Handle);
}
/**
 * 通过进程id关闭窗口(非结束进程)
 * @param ProcessID 
 * @returns 
 */
export function ProcessCloseWindow(ProcessID: number): boolean {
    let HWND = getProcessHandle(ProcessID);
    return handleCloseWindow(HWND)
}
/**
 * 通过句柄获取窗口标题
 * @param Handle 
 * @returns 
 */
export function handleWindowGetTitle(Handle: number) {
    return HMC.handleGetTitle(Handle)
}

/**
 * 通过句柄获取进程id
 * @param Handle 
 * @returns 
 */
export function handleWindowGetProcessID(Handle: number) {
    return HMC.handleGetProcessID(Handle)
}
/**
 * 通过进程id获取窗口标题
 * @param ProcessID 
 * @returns 
 */
export function ProcessWindowGetTitle(ProcessID: number) {
    let HWND = getProcessHandle(ProcessID);
    return handleWindowGetTitle(HWND)
}
/**
 * 通过句柄设置窗口标题
 * @param Handle 
 * @returns 
 */
export function handleWindowSetTitle(Handle: number) {
    return HMC.handleSetTitle(Handle)
}
/**
 * 通过进程id设置窗口标题
 * @param ProcessID 
 * @returns 
 */
export function ProcessWindowSetTitle(ProcessID: number) {
    let HWND = getProcessHandle(ProcessID);
    return handleWindowSetTitle(HWND)
}
let UINT = {
    /**消息框包含三个按钮：终止、重试和忽略。 */
    MB_ABORTRETRYIGNORE: "0x00000002L",
    /**消息框包含三个按钮：取消、重试、继续。使用此消息框类型而不是 MB_ABORTRETRYIGNORE。 */
    MB_CANCELTRYCONTINUE: "0x00000006L",
    /**向消息框 添加帮助按钮。当用户单击帮助按钮或按 F1 时，系统会向所有者 发送WM_HELP消息。 */
    MB_HELP: "0x00004000L",
    /**消息框包含一个按钮：确定。这是默认设置。 */
    MB_OK: "0x00000000L",
    /**消息框包含两个按钮：确定和取消。 */
    MB_YESNOCANCEL: "0x00000001L",
    /**消息框包含两个按钮：是和否。 */
    MB_YESNO: "0x00000004L",
    // 消息框包含两个按钮：OK和Cancel。
    MB_OKCANCEL: "0x00000001L",
    /**消息框包含两个按钮：OK和Cancel。 */
    MB_RETRYCANCEL: "0x00000001L",
    // 消息框包含三个按钮：Yes、No和Cancel。
    // 一个停止标志图标出现在消息框中。
    MB_ICONERROR: "0x00000010L",
    // 一个停止标志图标出现在消息框中。
    MB_ICONSTOP: "0x00000010L",
    // 问号图标出现在消息框中。不再推荐使用问号消息图标，因为它不能清楚地表示特定类型的消息，并且作为问题的消息措辞可能适用于任何消息类型。此外，用户可能会将消息符号问号与帮助信息混淆。因此，请勿在消息框中使用此问号消息符号。系统继续支持它的包含只是为了向后兼容。
    MB_ICONQUESTION: "0x00000030L",
    // 一个由圆圈中的小写字母i组成的图标出现在消息框中。
    MB_ICONASTERISK: "0x00000040L",
    // 一个由圆圈中的小写字母i组成的图标出现在消息框中。
    MB_ICONINFORMATION: "0x00000040L",
    // 消息框中会出现一个感叹号图标。
    MB_ICONEXCLAMATION: "0x00000030L",
    // 消息框中会出现一个感叹号图标。
    MB_ICONWARNING: "0x00000030L",
    // 以下也是被支持的具体请查看 https://docs.microsoft.com/zh-cn/windows/win32/api/winuser/nf-winuser-messageboxa
    MB_TOPMOST: "",
    MB_SETFOREGROUND: "",
    MB_RTLREADING: "",
    MB_RIGHT: "",
    MB_DEFAULT_DESKTOP_ONLY: "",
    MB_TASKMODAL: "",
    MB_SYSTEMMODAL: "",
    MB_APPLMODAL: "",
    MB_DEFBUTTON4: "",
    MB_DEFBUTTON3: "",
    MB_DEFBUTTON2: "",
    MB_ICONHAND: "",
    MB_DEFBUTTON1: "",

}

/**
 * 显示win32的消息窗口
 * @param lpText 内容
 * @param lpCaption 标题
 * @param UINT_String 显示类型
 */
export function messageBox(lpText: string, lpCaption?: string, UINT_String?: keyof typeof UINT): 3 | 2 | 11 | 5 | 7 | 1 | 4 | 10 | 6 {
    if (!lpCaption) lpCaption = "来自神奇口袋的消息";
    return HMC.messageBox(String(lpText), String(lpCaption), (!UINT_String || "MB_OK") || String(UINT_String))
}

/**
 * 显示win32的消息窗口
 * @param lpText 内容
 * @param lpCaption 标题
 */
export function alert(lpText: string, lpCaption?: string) {
    HMC.messageBox(String(lpText), String(lpCaption), "MB_OK");
}

/**
* 显示win32的消息窗口
* @param lpText 内容
* @param lpCaption 标题
*/
export function confirm(lpText: string, lpCaption?: string): boolean {
    let confirm_Info = HMC.messageBox(String(lpText), String(lpCaption), "MB_OKCANCEL");
    return confirm_Info == 1 || confirm_Info == 6
}
export type NotKillFun_lookProcessListInfo = number[] & {
    Kill?: () => void;
}

export type lookProcessListInfo = number[] & {
    Kill: () => void;
}
export type classifyProcessList = {
    [key: string]: number[]
}
/**
 * 搜索该进程的句柄
 * @param ProcessName 
 * @returns 
 */
export function getProcessHandleList(ProcessName: string): number[] {
    let GetProcessHandleList_data: number[] = [];
    for (let pid of lookProcessPidList(ProcessName)) {
        let Handle = getProcessHandle(pid);
        Handle && GetProcessHandleList_data.push(Handle)
    }
    return GetProcessHandleList_data
}

export function SystemInfo(CmdStr: string | string[],Configure?:SpawnOptionsWithStdioTuple<StdioPipe, StdioPipe, StdioPipe>|SpawnOptionsWithoutStdio): Promise<string> {
    if (Array.isArray(CmdStr)) {
        let Str = "";
        for (let ForString of CmdStr) Str += ForString;
        CmdStr = Str;
    }
    return new Promise((resolve, reject) => {
        let SystemInfo = "";
        let GetSystemChildBuffer: Set<Buffer> = new Set();
        let cmd_ChildProcess = child_process.spawn("cmd", [`/C chcp 65001>nul && ${CmdStr}`], Object.assign({
            windowsHide: true ,
            cwd:process.cwd(),
        },Configure||{}));
        cmd_ChildProcess.stdout.on('data', (data) => GetSystemChildBuffer.add(data));
        cmd_ChildProcess.stdout.once("close", function () {
            let size = 0;
            for (const Buff of GetSystemChildBuffer) size += Buff.byteLength;
            let BuffConcat = Buffer.concat([...GetSystemChildBuffer], size);
            SystemInfo = BuffConcat.toString("utf-8").replace(/(\n\r|\r\n)/g,"\n");
            resolve(SystemInfo);
        });
        cmd_ChildProcess.once("error", function (error) {
            reject(error);
        });
    });
}




/**
 * 进程列表
 */
export type ProcessList = ProcessCont[];
export type ProcessCont = {
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

export type ProcessInfo = {
    /**
     * 进程列表
     */
    ProcessList: ProcessList
    /**pid列表 */
    pidList: number[]
    /**CPU每秒频率 */
    cpu: 0,
    /**使用的内存 */
    memory: 0
    /**查找到的数量 */
    length: 0
    /**关闭查找到的所有APP */
    Kill(): void
}
/**
 * 
 */
export type Win32ApiProcessList = {
    name: string;
    pid: number;
}[];

type HKEY = "HKEY_CURRENT_CONFIG" | "HKEY_USERS" | "HKEY_CLASSES_ROOT" | "HKEY_LOCAL_MACHINE" | "HKEY_CURRENT_USER";


export default {
    CallHMC,
    isAdmin,
    Sleep,
    KillProcess,
    getProcessList,
    getWin32DetailsProcessList,
    getSystemMenu,
    getProcessHandle,
    getForegroundWindow,
    getPidFilePath,
    getProcessNameFilePath,
    OpenApp,
    OpenAppToUAC,
    lookNameKill,
    lookProcessPidList,
    isProcess,
    getSystemIdleTime,
    getWin32ApiProcessList,
    getStringRegKey,
    shutMonitors,
    showMonitors,
    power,
    lookNameList,
    KillNameList,
    isProcessByName,
    handleShowWindow,
    ProcessIDShowWindow,
    isHandleWindowVisible,
    isProcessIDWindowVisible,
    handleCloseWindow,
    ProcessCloseWindow,
    handleWindowGetTitle,
    ProcessWindowGetTitle,
    handleWindowSetTitle,
    ProcessWindowSetTitle,
    messageBox,
    alert,
    confirm,
    getProcessHandleList,
    handleWindowGetProcessID
};
