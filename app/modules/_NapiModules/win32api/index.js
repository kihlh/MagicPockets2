"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProcessList = exports.KillProcess = exports.confirm = exports.Sleep = exports.HMC = exports.win32Text = exports.ffi = void 0;
const iconv = require("iconv-lite");
const ffi_cross_1 = __importStar(require("../ffi-cross"));
exports.ffi = ffi_cross_1.default;
const path_1 = __importDefault(require("path"));
const cmd_1 = __importDefault(require("../../cmd"));
let { int, CString, charPtr, bool } = ffi_cross_1.types;
function win32Text(Text) {
    return iconv.encode(Text + "\0", 'utf16le');
}
exports.win32Text = win32Text;
exports.HMC = new ffi_cross_1.Library(path_1.default.join(process.resourcesPath, "bin", "Dll1.dll"), {
    'confirm': [
        int, [charPtr, charPtr]
    ],
    "KillProcess": [
        bool, [int]
    ],
    "sleep": [
        int, [int]
    ]
});
/**
 * 线程/进程 阻塞
 * @param ms
 * @param Sync
 * @returns
 */
function Sleep(ms, Sync) {
    if (Sync)
        return exports.HMC.sleep(isNaN(Number(ms)) ? 150 : Number(ms)), void 0;
    return new Promise(resolve => setTimeout(resolve, Number(ms)));
}
exports.Sleep = Sleep;
/**
 * 消息窗口
 * @param tile
 * @param message
 * @returns
 */
function confirm(tile, message) {
    if (typeof message == 'string')
        message = win32Text(message);
    if (typeof tile == 'string')
        tile = win32Text(tile);
    return !!exports.HMC.confirm(message, tile);
}
exports.confirm = confirm;
/**
 * 结束该ID的进程
 * @param Pid
 * @returns
 */
function KillProcess(Pid) {
    return !!exports.HMC.KillProcess(Pid);
}
exports.KillProcess = KillProcess;
/**
 * 获取进程列表
 * @returns
 */
function getProcessList() {
    return new Promise(async function (resolve, reject) {
        try {
            let GetProcessList = new Set();
            let ps2_GetProcess = await cmd_1.default.spawn("PowerShell", ["Get-Process"]);
            for (let Process of ps2_GetProcess?.split(/[\r\n]+/) || [])
                if (Process && !Process?.match(/^[\s\t ]+$/))
                    GetProcessList.add(Process);
            let ProcessList = [];
            let index = 0;
            let Hade = ["Handles", "NPM(K)", "PM(K)", "WS(K)", "CPU(s)", "PID", "SI", "ProcessName"];
            for (let Process of GetProcessList) {
                if (index != 0 && index != 1) {
                    let matchProcess = Process?.match(/^ +([\d\.]+) +([\d\.]+) +([\d\.]+) +([\d\.]+) +([\d\.]+) +([\d\.]+) +([\d\.]+) (.+?) +$/i) || [];
                    let ProcessCont = {};
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
            resolve(ProcessList);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.getProcessList = getProcessList;
exports.default = {
    getProcessList,
    KillProcess,
    confirm,
    Sleep,
    HMC: exports.HMC,
    ffi: ffi_cross_1.default,
    win32Text
};
//# sourceMappingURL=index.js.map