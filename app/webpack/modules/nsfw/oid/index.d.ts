/*
 * @Author: your name
 * @Date: 2022-01-10 23:29:13
 * @LastEditTime: 2022-04-26 00:46:21
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \app\modules\nsfw\oid\index.d.ts
 */
import { NSFW } from "nsfw";
import "../nsfw";

/**重命名事件 */
type rename = "rename";
/**全部事件 */
type all = "all";
/**文件被新建 */
type add = "add";
/**文件被更新 */
type change = "change";
/**文件被删除 */
type unlink = "unlink";
/**该函数独有的fs.Stats数据体 */
type HM__StatsData = {};
/**该函数独有的path.Parse数据体 */
type HM__ParseData = {};
/**事件 */
type events = ""
/**发送了什么事件 */
export type oneven = all | add | change | rename | unlink
/**
 * 监听文件
 * @param Path 文件名/文件夹名
 * @param Callback 回调函数
 * - change  (events,Path,Stats,Parse)=>{}
 * - add     (events,Path,Stats,Parse)=>{}
 * - unlink     (vents,Path,Parse)=>{}
 * - rename     (events,Path,NewPath,Parse)=>{}
 * @param oneven 
 * @param filter 
 */
export function watcher(Path: string, Callback:Function, oneven: oneven, filter?: RegExp): Promise<NSFW>

