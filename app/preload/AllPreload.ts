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
import { store } from "../modules/Core/StoreRenderer"
import cmd = require("../modules/cmd");
import GoalUtil = require("../modules/Object@util");
import { download, downloadAll, axios } from "../modules/download"
import shake = require('../modules/shake');
import clip from "../modules/_NapiModules/clip";
import StartGainPath from "../modules/GainPath";
import fs from "fs-extra";
import open from "open";
import path from "path";
import electron,{shell} from "electron";
import { ipcRendererAPI } from "../modules/Core/ipcMainRendererRemoteFunction";
let ipcRendererRemoteAPI = new ipcRendererAPI();
import { ipcRenderer } from "electron";
// import win32api, { Sleep, ffi } from '../modules/_NapiModules/win32api/index';
window.ipcRenderer = ipcRenderer;
let GainPath = new StartGainPath.GainPath;
let Store = new store();
import _7zip = require("../modules/7-zip");
import walk = require("@nodelib/fs.walk");
import fswin from "../modules/_NapiModules/fswin/index"
import * as HMC from "../modules/_NapiModules/HMC";

class startShell {
  constructor() { }
   get beep() { return shell.beep }
   get openExternal() { return shell.openExternal }
   get openPath() { return shell.openPath }
   get readShortcutLink() { return shell.readShortcutLink }
   get writeShortcutLink() { return shell.writeShortcutLink }
   get trashItem() { return shell.trashItem }
   get showItemInFolder() { return shell.showItemInFolder }
   get openApp (){ return this.#openApp}
  /**
   * 打开app 
   * @param Path 路径 
   * @param configure 配置 / 命令行
   */
    #openApp(Path: string, configure?: open.OpenAppOptions | undefined | Array<string> | string) {
    if (typeof configure === "string") {
      let Arguments = [configure];
      configure = {
        arguments: Arguments
      }
    }
    if (Array.isArray(configure)) {
      let Arguments = configure;
      configure = {
        arguments: Arguments
      }
    }
    if (!configure) {
      configure = {
        arguments: [Path]
      }
    }
    // @ts-expect-error
    if (!configure.arguments) configure.arguments = [Path]
    return open.openApp(Path, configure)
  }
}

class HM_API{
  #_={};
  /**
   * 获取一串随机字符
   * @returns 
   */
  ID() { return (Date.now().toString(36) + Math.random().toString(36).slice(2, 7)).toUpperCase() }
  
  constructor(){}
}



// @这里面所有的函数内容都会暴露到全局中
let SetGlobalWindowList = {
  exports: Function,
  Store: Store,
  cmd: cmd,
  shake: shake,
  download: download,
  downloadAll: downloadAll,
  axios: axios,
  GainPath: GainPath,
  clip: clip,
  GoalUtil: GoalUtil,
  raw: String.raw,
  fs: fs,
  _7zip: _7zip,
  path: path,
  electron: electron,
  ipcRenderer: ipcRenderer,
  ipcRendererRemoteAPI,
  Sleep:HMC.Sleep,
  shell: new startShell(),
  walk,
  fswin,
  _api:new HM_API,
  HMC
}





for (const key in SetGlobalWindowList) GoalUtil.Set(window, key, GoalUtil.Get(SetGlobalWindowList, key));
declare var window: Window & typeof globalThis & SetGlobalWindowListType;
type SetGlobalWindowListType = typeof SetGlobalWindowList;
export { SetGlobalWindowListType }
export type shell = startShell

