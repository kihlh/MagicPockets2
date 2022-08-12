/*
 * @Author: your name
 * @Date: 2022-04-20 18:30:39
 * @LastEditTime: 2022-05-06 23:00:52
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \app\@types\Main.d.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
/// <reference types="node" />
import Electron = require ("electron");
import Electron_Log = require ("electron-log");
import Electron_Store = require ("electron-store");

export interface HM_Setting {
    /**问候语 将替换用户名的问候 */
    GreetInfo: string|null
    /**用户名 */
    UsersName: string|null
    /**问候语 */
    AskHou: string
    /**一言出处 */
    AskHouFrom:string
    /**用户头像 */
    UsershotImg: string|null
    /**APP安装路径 */
    apppath: "ToolBox";
    /*系统信息*/
    system:{
        /*临时文件夹*/
        TEMP:string
    }
    app:{
    "userData":string,
    "temp": string,
    "cache":string,
    "logs": string,
    "downloads":string,
    "appData":string
}
    getwindow: {
        /**快捷键 */
        key: string;
        /**是否启用 */
        type: boolean;
        /**用途 */
        name: "显示窗口";
    };
    /**窗口上次大小  按照规范不会超过当前屏幕 或者低于可见位置*/
    window: {
        /**左边算起 */
        x: number;
        /**顶到下方 */
        y: number;
        /**宽 */
        width: number;
        /**高 */
        height: number;
    };
    /**用户唯一ID  将来会用于加密用户数据  或者用户允许后上传匿名软件错误日志*/
    UsersID: null | string;
    /**用户是否授权IP定位 */
    UsersIP_Grant: false;
    /**天气模板 */
    Temperature:KIIC_API_Detailed
    /**便签功能 */
    Note: {
        /**便签卡片 */
        NoteCard: {
            /**带黄角的鸡汤小卡片 */
            RemindCard: {
                /**标题 <15 */
                title: "所有美好正在奔赴而来...";
                /**内容 <35*/
                info: "没有接近提醒时间的事件，建议添加，比如下班小助手，点餐小助手";
            };
        };
    };
}

import {KIIC_API_Detailed} from "./WeathersAPI"