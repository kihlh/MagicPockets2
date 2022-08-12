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
/*
 * @Author: your name
 * @Date: 2022-04-20 22:16:39
 * @LastEditTime: 2022-07-11 01:10:10
 * @LastEditors: your name
 * @Description:
 * @FilePath: \resources\app\preload\AllPreload.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
/// <reference types="node" />
const StoreRenderer_1 = require("../modules/Core/StoreRenderer");
const cmd = require("../modules/cmd");
const GoalUtil = require("../modules/Object@util");
const download_1 = require("../modules/download");
const shake = require("../modules/shake");
const clip_1 = __importDefault(require("../modules/_NapiModules/clip"));
const GainPath_1 = __importDefault(require("../modules/GainPath"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const open_1 = __importDefault(require("open"));
const path_1 = __importDefault(require("path"));
const electron_1 = __importStar(require("electron"));
const ipcMainRendererRemoteFunction_1 = require("../modules/Core/ipcMainRendererRemoteFunction");
let ipcRendererRemoteAPI = new ipcMainRendererRemoteFunction_1.ipcRendererAPI();
const electron_2 = require("electron");
// import win32api, { Sleep, ffi } from '../modules/_NapiModules/win32api/index';
window.ipcRenderer = electron_2.ipcRenderer;
let GainPath = new GainPath_1.default.GainPath;
let Store = new StoreRenderer_1.store();
const _7zip = require("../modules/7-zip");
const walk = require("@nodelib/fs.walk");
const index_1 = __importDefault(require("../modules/_NapiModules/fswin/index"));
const HMC = __importStar(require("../modules/_NapiModules/HMC"));
class startShell {
    constructor() { }
    get beep() { return electron_1.shell.beep; }
    get openExternal() { return electron_1.shell.openExternal; }
    get openPath() { return electron_1.shell.openPath; }
    get readShortcutLink() { return electron_1.shell.readShortcutLink; }
    get writeShortcutLink() { return electron_1.shell.writeShortcutLink; }
    get trashItem() { return electron_1.shell.trashItem; }
    get showItemInFolder() { return electron_1.shell.showItemInFolder; }
    get openApp() { return this.#openApp; }
    /**
     * 打开app
     * @param Path 路径
     * @param configure 配置 / 命令行
     */
    #openApp(Path, configure) {
        if (typeof configure === "string") {
            let Arguments = [configure];
            configure = {
                arguments: Arguments
            };
        }
        if (Array.isArray(configure)) {
            let Arguments = configure;
            configure = {
                arguments: Arguments
            };
        }
        if (!configure) {
            configure = {
                arguments: [Path]
            };
        }
        // @ts-expect-error
        if (!configure.arguments)
            configure.arguments = [Path];
        return open_1.default.openApp(Path, configure);
    }
}
class HM_API {
    #_ = {};
    /**
     * 获取一串随机字符
     * @returns
     */
    ID() { return (Date.now().toString(36) + Math.random().toString(36).slice(2, 7)).toUpperCase(); }
    constructor() { }
}
// @这里面所有的函数内容都会暴露到全局中
let SetGlobalWindowList = {
    exports: Function,
    Store: Store,
    cmd: cmd,
    shake: shake,
    download: download_1.download,
    downloadAll: download_1.downloadAll,
    axios: download_1.axios,
    GainPath: GainPath,
    clip: clip_1.default,
    GoalUtil: GoalUtil,
    raw: String.raw,
    fs: fs_extra_1.default,
    _7zip: _7zip,
    path: path_1.default,
    electron: electron_1.default,
    ipcRenderer: electron_2.ipcRenderer,
    ipcRendererRemoteAPI,
    Sleep: HMC.Sleep,
    shell: new startShell(),
    walk,
    fswin: index_1.default,
    _api: new HM_API,
    HMC
};
for (const key in SetGlobalWindowList)
    GoalUtil.Set(window, key, GoalUtil.Get(SetGlobalWindowList, key));
//# sourceMappingURL=AllPreload.js.map