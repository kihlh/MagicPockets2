/*
 * @Author: your name
 * @Date: 2022-04-20 22:16:11
 * @LastEditTime: 2022-06-04 18:52:56
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \app\preload\MainWindowPreload.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
require("./AllPreload");

import{SetGlobalWindowListType} from "./AllPreload"
declare var window: Window & typeof globalThis & SetGlobalWindowListType;