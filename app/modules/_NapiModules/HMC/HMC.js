"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemInfo = exports.getProcessHandleList = exports.confirm = exports.alert = exports.messageBox = exports.ProcessWindowSetTitle = exports.handleWindowSetTitle = exports.ProcessWindowGetTitle = exports.handleWindowGetProcessID = exports.handleWindowGetTitle = exports.ProcessCloseWindow = exports.handleCloseWindow = exports.isProcessIDWindowVisible = exports.isHandleWindowVisible = exports.ProcessIDShowWindow = exports.handleShowWindow = exports.isProcessByName = exports.KillNameList = exports.lookNameList = exports.power = exports.showMonitors = exports.shutMonitors = exports.getStringRegKey = exports.getWin32ApiProcessList = exports.getSystemIdleTime = exports.isProcess = exports.lookProcessPidList = exports.lookNameKill = exports.OpenAppToUAC = exports.OpenApp = exports.getProcessNameFilePath = exports.getPidFilePath = exports.getForegroundWindow = exports.getProcessHandle = exports.getSystemMenu = exports.getWin32DetailsProcessList = exports.getProcessList = exports.KillProcess = exports.Sleep = exports.isAdmin = exports.CallHMC = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const os = require("os");
const child_process_1 = __importDefault(require("child_process"));
const child_process_2 = require("child_process");
let HMC;
let _file_HMC_Path = path_1.default.join(__dirname, "HMC.node");
let _is_file_HMC__dirname_node = (0, fs_1.existsSync)(_file_HMC_Path);
let _electron_file_HMC_Path = path_1.default.join(process.resourcesPath || process.cwd() || "", "bin", "HMC.node");
let _is_electron_file_HMC_Path = (0, fs_1.existsSync)(_electron_file_HMC_Path);
if (_is_electron_file_HMC_Path) {
    HMC = require(_electron_file_HMC_Path);
}
else if (_is_file_HMC__dirname_node) {
    HMC = require(_file_HMC_Path);
}
else {
    throw new Error("HMC is not binary");
}
function AddToDefineProperty(Arrays, Name, Fun) {
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
exports.CallHMC = HMC;
/**
 * 判断是否拥有管理员权限
 * @returns
 */
function isAdmin() {
    return HMC.isAdmin();
}
exports.isAdmin = isAdmin;
/**
 * 线程/进程 阻塞
 * @param ms
 * @param Sync
 * @returns
 */
function Sleep(ms, Sync) {
    let FormatMs = isNaN(Number(ms)) ? 150 : Number(ms);
    if (Sync)
        return HMC.sleep(FormatMs), void 0;
    return new Promise(resolve => setTimeout(resolve, Number(FormatMs)));
}
exports.Sleep = Sleep;
/**
 * 结束该ID的进程
 * @param Pid
 * @returns
 */
function KillProcess(Pid) {
    if (isNaN(Number(Pid)))
        throw new Error("The parameter(PID) can only be a number");
    return HMC.killProcess(Number(Pid));
}
exports.KillProcess = KillProcess;
let BackLockProcessList = [];
/**
 * 获取进程列表
 * @returns
 */
function getProcessList() {
    return new Promise(async function (resolve, reject) {
        let cpuSpeedSize = 0;
        for (let cpu of os.cpus()) {
            cpuSpeedSize += cpu.speed;
        }
        try {
            let GetProcessList = new Set();
            function GetProcessListSystemText() {
                return new Promise((resolve, reject) => {
                    let ps2_GetProcess = "";
                    let ps2_GetProcess_Buff = new Set();
                    let cmd_ChildProcess = (0, child_process_2.spawn)("cmd", [`/C chcp 65001>nul && PowerShell Get-Process`], { windowsHide: true });
                    cmd_ChildProcess.stdout.on('data', (data) => ps2_GetProcess_Buff.add(data));
                    cmd_ChildProcess.stdout.once("close", function () {
                        let size = 0;
                        for (const Buff of ps2_GetProcess_Buff)
                            size += Buff.byteLength;
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
            for (let Process of ps2_GetProcess?.split(/[\r\n]+/) || [])
                if (Process && !Process?.match(/^[\s\t ]+$/))
                    GetProcessList.add(Process);
            let ProcessList = [];
            let index = 0;
            let Hade = ["Handles", "NPM(K)", "PM(K)", "WS(K)", "CPU(s)", "PID", "SI", "ProcessName"];
            for (let Process of GetProcessList) {
                if (index != 0 && index != 1) {
                    let match_Process = Process?.match(/^ +([,\d\.]+) +([,\d\.]+) +([,\d\.]+) +([,\d\.]+) +([,\d\.]+) +([,\d\.]+) +([,\d\.]+) (.+?) +$/i) || [];
                    let matchProcess = [...match_Process];
                    let ProcessCont = {};
                    for (let index = 0; index < matchProcess.length; index++) {
                        const element = matchProcess[index];
                        if (element.match(/^[,\d\.]+$/)) {
                            matchProcess[index] = element.replace(/[,]+/g, '');
                        }
                    }
                    if (matchProcess) {
                        for (let index = 1; index < matchProcess.length; index++) {
                            // @ts-expect-error 
                            ProcessCont[Hade[index - 1]] = matchProcess[index];
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
            resolve(ProcessList);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.getProcessList = getProcessList;
/**
 * 获取进程列表（Cpp）
 * @returns
 */
function getWin32DetailsProcessList() {
    return HMC.getWin32DetailsProcessList();
}
exports.getWin32DetailsProcessList = getWin32DetailsProcessList;
/**
 * 通过句柄设置系统右键是否可用(例如屏蔽默认右键)
 * @param HWND 句柄
 * @param bRevert 是否屏蔽
 * @returns
 */
function getSystemMenu(HWND, bRevert) {
    return HMC.getSystemMenu(HWND, bRevert);
}
exports.getSystemMenu = getSystemMenu;
/**
 * 通过进程id获取主窗口句柄
 * @param ProcessID 进程id
 * @returns
 */
function getProcessHandle(ProcessID) {
    return HMC.getProcessHandle(ProcessID);
}
exports.getProcessHandle = getProcessHandle;
/**
 * 获取活动窗口的句柄
 */
function getForegroundWindow() {
    return HMC.getForegroundWindow();
}
exports.getForegroundWindow = getForegroundWindow;
/**
 * 通过进程id查询进程镜像的路径
 * @param ProcessID
 * @returns
 */
function getPidFilePath(ProcessID) {
    return HMC.getPidFilePath(ProcessID);
}
exports.getPidFilePath = getPidFilePath;
/**
 * 按照进程名称获取所有执行文件的路径
 * @param Name
 * @returns
 */
function getProcessNameFilePath(Name) {
    let FilePathSetList = new Set();
    let GetProcessList = lookNameList([Name]);
    if (GetProcessList.length) {
        for (const ProcessID of GetProcessList) {
            let FilePath = getPidFilePath(ProcessID);
            FilePath && FilePathSetList.add(FilePath);
        }
    }
    return [...FilePathSetList];
}
exports.getProcessNameFilePath = getProcessNameFilePath;
/**
 * 打开exe软件
 * @param AppPath
 * @param Command
 * @param cwd
 */
function OpenApp(AppPath, Command, cwd, hide) {
    if (!AppPath) {
        throw new Error("AppPath is Not");
    }
    if (!Command)
        Command = "";
    if (!cwd)
        cwd = null;
    if (Array.isArray(Command)) {
        let command_ToFlag = "";
        for (const Flag of Command) {
            command_ToFlag += (`"${Flag}" `);
        }
        Command = command_ToFlag.replace(/ $/, '');
    }
    return HMC.openApp(String(AppPath), String(Command), String(cwd) || path_1.default.parse(path_1.default.resolve(AppPath)).dir, hide ? true : false);
}
exports.OpenApp = OpenApp;
/**
 * 打开exe软件
 * @param AppPath
 * @param Command
 * @param cwd
 */
function OpenAppToUAC(AppPath, Command, cwd, hide) {
    if (!AppPath) {
        throw new Error("AppPath is Not");
    }
    if (!Command)
        Command = "";
    if (!cwd)
        cwd = null;
    if (Array.isArray(Command)) {
        let command_ToFlag = "";
        for (const Flag of Command) {
            command_ToFlag += (`"${Flag}"`);
        }
        Command = command_ToFlag;
    }
    return HMC.openAppToUAC(String(AppPath), String(Command), String(cwd) || path_1.default.parse(path_1.default.resolve(AppPath)).dir, hide ? true : false);
}
exports.OpenAppToUAC = OpenAppToUAC;
/**
*搜索进程
*/
function lookNameKill(lookName) {
    HMC.killProcessByName(String(lookName));
    if (!String(lookName).match(/.exe/i)) {
        HMC.killProcessByName(String(lookName) + ".exe");
    }
    return;
}
exports.lookNameKill = lookNameKill;
/**
*搜索进程
*/
function lookProcessPidList(lookName) {
    let C_lookInfo = HMC.lookProcessByName(String(lookName));
    let lookInfo = [];
    lookInfo.push(...C_lookInfo);
    AddToDefineProperty(lookInfo, "Kill", function () { for (let pid of this)
        HMC.killProcess(pid); });
    // @ts-expect-error
    return lookInfo;
}
exports.lookProcessPidList = lookProcessPidList;
/**
*是否存在该进程
*/
function isProcess(ProcessName) {
    return lookProcessPidList(ProcessName).length > 0;
}
exports.isProcess = isProcess;
/**
*系统空闲时间
*/
function getSystemIdleTime() {
    return HMC.getSystemIdleTime();
}
exports.getSystemIdleTime = getSystemIdleTime;
/***
 * 获取所有进程名称+pid
 */
function getWin32ApiProcessList() {
    return HMC.getProcessList();
}
exports.getWin32ApiProcessList = getWin32ApiProcessList;
/**
 * 获取注册表里的键值对
 */
function getStringRegKey(HKEY, Path, Name) {
    try {
        return HMC.getStringRegKey(HKEY, Path, Name);
    }
    catch (error) {
        return "";
    }
}
exports.getStringRegKey = getStringRegKey;
/**
 * 关闭显示器
 */
function shutMonitors() {
    HMC.shutMonitors();
}
exports.shutMonitors = shutMonitors;
/**
 * 打开显示器
 */
function showMonitors() {
    HMC.showMonitors();
}
exports.showMonitors = showMonitors;
/**
 * 电源
 */
exports.power = {
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
    Monitors(Need) {
        if (Need) {
            showMonitors();
            return;
        }
        shutMonitors();
    }
};
/**
 * 通过进程名过滤出匹配的进程
 * @param NameList
 * @returns
 */
function lookNameList(NameList) {
    let Win32ApiProcessList = getWin32ApiProcessList();
    let KillProcessIdList = new Set();
    for (let FindProcessName of NameList) {
        if (FindProcessName)
            for (const Win32ApiProcessIterator of Win32ApiProcessList) {
                if (Win32ApiProcessIterator.name?.match(FindProcessName)) {
                    KillProcessIdList.add(Win32ApiProcessIterator.pid);
                }
            }
    }
    let lookInfo = [...KillProcessIdList];
    AddToDefineProperty(lookInfo, "Kill", function () { for (let pid of this)
        HMC.killProcess(pid); });
    return lookInfo;
}
exports.lookNameList = lookNameList;
/**
 * 使用进程名数组 结束匹配的进程
 */
function KillNameList(NameList) {
    let KillProcessIdList = lookNameList(NameList);
    let info = 0;
    for (let pid of KillProcessIdList)
        info += HMC.killProcess(pid);
    return info == KillProcessIdList.length;
}
exports.KillNameList = KillNameList;
// 追求最快速度使用HMC.isProcessByName(Name);  6ms 左右但是不支持 
/**
 * 判断是否存在该进程
 * @param Name
 * @returns
 */
function isProcessByName(Name) {
    if (Name instanceof Set || Array.isArray(Name)) {
        let KillProcessIdList = lookNameList(Name);
        return KillProcessIdList.length !== 0;
    }
    let KillProcessIdList = lookNameList([Name]);
    return KillProcessIdList.length !== 0;
}
exports.isProcessByName = isProcessByName;
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
};
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
function handleShowWindow(HWND, nCmdShow) {
    if (typeof HWND != 'number')
        return false;
    if (!["string", "number", "boolean"].includes(typeof nCmdShow))
        return false;
    if (typeof nCmdShow == "boolean")
        nCmdShow = nCmdShow ? 9 : 0;
    if (typeof nCmdShow == "number" && !(nCmdShow >= 0 && nCmdShow <= 11))
        return false;
    if (typeof nCmdShow == "string") {
        let _nCmdShow = win32_STARTUPINFO[nCmdShow];
        if (_nCmdShow === undefined)
            return false;
    }
    return HMC.handleShowWindow(HWND, nCmdShow);
}
exports.handleShowWindow = handleShowWindow;
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
function ProcessIDShowWindow(ProcessID, nCmdShow) {
    let HWND = getProcessHandle(ProcessID);
    return handleShowWindow(HWND, nCmdShow);
}
exports.ProcessIDShowWindow = ProcessIDShowWindow;
/**
 * 通过句柄获取窗口可见性
 * @param Handle
 * @returns
 */
function isHandleWindowVisible(Handle) {
    if (!Handle)
        return false;
    return HMC.isHandleWindowVisible(Handle);
}
exports.isHandleWindowVisible = isHandleWindowVisible;
/**
 * 通过进程id获取窗口可见性
 * @param ProcessID
 * @returns
 */
function isProcessIDWindowVisible(ProcessID) {
    let HWND = getProcessHandle(ProcessID);
    return isHandleWindowVisible(HWND);
}
exports.isProcessIDWindowVisible = isProcessIDWindowVisible;
/**
 * 通过句柄关闭窗口(非结束进程)
 * @param Handle
 * @returns
 */
function handleCloseWindow(Handle) {
    if (!Handle)
        return false;
    return HMC.handleCloseWindow(Handle);
}
exports.handleCloseWindow = handleCloseWindow;
/**
 * 通过进程id关闭窗口(非结束进程)
 * @param ProcessID
 * @returns
 */
function ProcessCloseWindow(ProcessID) {
    let HWND = getProcessHandle(ProcessID);
    return handleCloseWindow(HWND);
}
exports.ProcessCloseWindow = ProcessCloseWindow;
/**
 * 通过句柄获取窗口标题
 * @param Handle
 * @returns
 */
function handleWindowGetTitle(Handle) {
    return HMC.handleGetTitle(Handle);
}
exports.handleWindowGetTitle = handleWindowGetTitle;
/**
 * 通过句柄获取进程id
 * @param Handle
 * @returns
 */
function handleWindowGetProcessID(Handle) {
    return HMC.handleGetProcessID(Handle);
}
exports.handleWindowGetProcessID = handleWindowGetProcessID;
/**
 * 通过进程id获取窗口标题
 * @param ProcessID
 * @returns
 */
function ProcessWindowGetTitle(ProcessID) {
    let HWND = getProcessHandle(ProcessID);
    return handleWindowGetTitle(HWND);
}
exports.ProcessWindowGetTitle = ProcessWindowGetTitle;
/**
 * 通过句柄设置窗口标题
 * @param Handle
 * @returns
 */
function handleWindowSetTitle(Handle) {
    return HMC.handleSetTitle(Handle);
}
exports.handleWindowSetTitle = handleWindowSetTitle;
/**
 * 通过进程id设置窗口标题
 * @param ProcessID
 * @returns
 */
function ProcessWindowSetTitle(ProcessID) {
    let HWND = getProcessHandle(ProcessID);
    return handleWindowSetTitle(HWND);
}
exports.ProcessWindowSetTitle = ProcessWindowSetTitle;
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
};
/**
 * 显示win32的消息窗口
 * @param lpText 内容
 * @param lpCaption 标题
 * @param UINT_String 显示类型
 */
function messageBox(lpText, lpCaption, UINT_String) {
    if (!lpCaption)
        lpCaption = "来自神奇口袋的消息";
    return HMC.messageBox(String(lpText), String(lpCaption), (!UINT_String || "MB_OK") || String(UINT_String));
}
exports.messageBox = messageBox;
/**
 * 显示win32的消息窗口
 * @param lpText 内容
 * @param lpCaption 标题
 */
function alert(lpText, lpCaption) {
    HMC.messageBox(String(lpText), String(lpCaption), "MB_OK");
}
exports.alert = alert;
/**
* 显示win32的消息窗口
* @param lpText 内容
* @param lpCaption 标题
*/
function confirm(lpText, lpCaption) {
    let confirm_Info = HMC.messageBox(String(lpText), String(lpCaption), "MB_OKCANCEL");
    return confirm_Info == 1 || confirm_Info == 6;
}
exports.confirm = confirm;
/**
 * 搜索该进程的句柄
 * @param ProcessName
 * @returns
 */
function getProcessHandleList(ProcessName) {
    let GetProcessHandleList_data = [];
    for (let pid of lookProcessPidList(ProcessName)) {
        let Handle = getProcessHandle(pid);
        Handle && GetProcessHandleList_data.push(Handle);
    }
    return GetProcessHandleList_data;
}
exports.getProcessHandleList = getProcessHandleList;
function SystemInfo(CmdStr, Configure) {
    if (Array.isArray(CmdStr)) {
        let Str = "";
        for (let ForString of CmdStr)
            Str += ForString;
        CmdStr = Str;
    }
    return new Promise((resolve, reject) => {
        let SystemInfo = "";
        let GetSystemChildBuffer = new Set();
        let cmd_ChildProcess = child_process_1.default.spawn("cmd", [`/C chcp 65001>nul && ${CmdStr}`], Object.assign({
            windowsHide: true,
            cwd: process.cwd(),
        }, Configure || {}));
        cmd_ChildProcess.stdout.on('data', (data) => GetSystemChildBuffer.add(data));
        cmd_ChildProcess.stdout.once("close", function () {
            let size = 0;
            for (const Buff of GetSystemChildBuffer)
                size += Buff.byteLength;
            let BuffConcat = Buffer.concat([...GetSystemChildBuffer], size);
            SystemInfo = BuffConcat.toString("utf-8").replace(/(\n\r|\r\n)/g, "\n");
            resolve(SystemInfo);
        });
        cmd_ChildProcess.once("error", function (error) {
            reject(error);
        });
    });
}
exports.SystemInfo = SystemInfo;
exports.default = {
    CallHMC: exports.CallHMC,
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
    power: exports.power,
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
//# sourceMappingURL=HMC.js.map