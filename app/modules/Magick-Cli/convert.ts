
import { ToSpawn, GetTemp, WaitArise } from "./ToSpawn";
import fs from "fs-extra";
import ProbeSize from "probe-image-size";
import { ProbeResult } from "probe-image-size";
import walk = require("@nodelib/fs.walk");
import path from "path";
import fswin from "../_NapiModules/fswin/index";
import { spawn } from "../cmd"
export class convert {
    _ = {
        ConvertPath: "" as string,
        arge: [] as string[]
    }
    /**
     * 执行器路径
     * @param ConvertCliPath 
     */
    constructor(ConvertCliPath: string, useMagick?: boolean) {
        if (!fswin.existsSync(ConvertCliPath)) throw new Error("Not Cli Convert EXE");

        this.SetConvertCliPath(ConvertCliPath, useMagick);
    }
    /**
     * 设置执行器路径
     * @param ConvertCliPath 
     */
    SetConvertCliPath(ConvertCliPath: string, useMagick?: boolean) {
        if (ConvertCliPath && typeof ConvertCliPath === "string") {
            if (!fswin.existsSync(ConvertCliPath)) throw new Error("Not Cli Convert EXE");
            this._.ConvertPath = ConvertCliPath.replace(/[\\\/]+/g, '/');
            if (useMagick || ConvertCliPath.match(/magick\.exe/i)) {
                this._.arge.push("convert")
            }
            return;
        }
        throw new Error("Not Cli Convert Path");
    }
    /**
     * 需要执行命令
     * @param arge 
     * @returns 
     */
    cli(...arge: string[]) {
        const Garge = this._.arge;
        return ToSpawn(this._.ConvertPath, Garge.concat(arge))
    }
    
    /**
     * 获取图层信息 比如psd/gif/pdf 这些支持多层的东东
     * @param InputPath 
     * @returns 
     */
    GetLevelLength(InputPath: string): Promise<ReturnLevelDataList> {
        const { ConvertPath: ConvertPath, arge: Garge } = this._;
        let ReturnLevelData: ReturnLevelDataList = [];
        return new Promise(function (resolve, reject) {
            ToSpawn(ConvertPath, Garge.concat([InputPath, "info:"])).then(data => {
                let MatchLevelList = data.match(/^.+?[\d+] /mig);
                let ForIndex = -1;
                for (const iterator of MatchLevelList || []) {
                    if (iterator) {
                        let PushData: ReturnLevelDataList[0] = {
                            type: "",
                            index: ForIndex += 1,
                            size: [0, 0],
                        };
                        let GetMatchSize = iterator.match(/(\d+)x(\d+) $/);
                        if (GetMatchSize) PushData.size = [Number(GetMatchSize[1]), Number(GetMatchSize[2])]
                        let GetMatchType = iterator.match(/^.+?[\d+] (.+?) /mig);
                        if (GetMatchType) PushData.type = GetMatchType[1];
                        ReturnLevelData.push(PushData);
                    }
                }
                resolve(ReturnLevelData)
            }).catch(reject)
        })
    }
    /**
     * 格式转换所有支持的图片和文件夹树(有Deep参数的话) （深度）
     * @param IputImagesList 路径(文件或文件夹)
     * @param SetExt 转换格式
     * @param Deep 是否深度遍历文件夹树
     * @param ProcessLimit 进程限制
     * @returns 
     */
    async WilKFormat(IputImagesList: string[], SetExt?: ".png" | ".jpg" | ".jpeg" | "png" | "jpeg" | "jpg", Deep?: boolean | number, ProcessLimit?: number) {
        if (!ProcessLimit) ProcessLimit = Infinity;
        let { ConvertPath, arge: Garge } = this._
        let HandleError = () => { };
        /**正在处理中 
         * ?处理完成则移除
        */
        let ProcessingList: Set<string> = new Set();
        let MatchFormats = /[.](psd|psb|jpe?g|png|webp|gif|svg|ai)$/;
        let GotuSpawnList: StartSpawn[] = [];
        // 没有内容
        if (!IputImagesList?.length) throw new Error("Not Iput Images Data");
        // 复制的是文件列表
        let HandleListComplete: Set<string> = new Set();
        //遍历所有路径 
        for (const Paths of IputImagesList) {
            let Stats =await fswin.getAttributes(Paths)|| undefined;
            if (!Stats) continue;
            // 处理文件夹
            if (Stats.IS_DIRECTORY) {
                walk.walkStream(Paths).on("data", function (chunk: walk.Entry) {
                    if (chunk.name.match(MatchFormats) && chunk.dirent.isFile() && ConvertPath) {
                        let Path = path.resolve(chunk.path);
                        if (!HandleListComplete.has(Path)) {
                            ProcessingList.add(Path);
                            let ToFormatsPath = Path.replace(MatchFormats, (".".concat(SetExt || ".png").replace(/[.]+([^.]+)/, ".$1")));
                            let IputPath = Path.match(/[.](psd|psb|gif|pdf|gif)$/) ? Path.concat('[0]') : Path;
                            GotuSpawnList.push(spawn(ConvertPath, Garge.concat([IputPath, ToFormatsPath])).finally(() => ProcessingList.delete(Path)));
                            HandleListComplete.add(Path)
                        }
                    }
                })
            }
            // 处理文件
            else if (ConvertPath) {
                let Path = path.resolve(Paths);
                if (!HandleListComplete.has(Path)) {
                    ProcessingList.add(Path);
                    let ToFormatsPath = Path.replace(MatchFormats, (".".concat(SetExt || ".png").replace(/[.]+([^.]+)/, ".$1")));
                    let IputPath = Path.match(/[.](psd|psb|gif|pdf|gif)$/) ? Path.concat('[0]') : Path;
                    GotuSpawnList.push(spawn(ConvertPath, Garge.concat([IputPath, ToFormatsPath])).finally(() => ProcessingList.delete(Path)));
                    HandleListComplete.add(Path)
                }

            }
            //  进程限制
            if (ProcessingList.size > ProcessLimit) {
                await Promise.allSettled(GotuSpawnList);
            }
        }
        return await Promise.allSettled(GotuSpawnList);
    }
}


type ReturnLevelDataList = {
    type: string,
    index: number,
    size: [number, number]
}[]

type FormatRunData = {
    /**输入文件 */
    InputPath: string
    /**输出路径或格式 */
    OutputPath: string
    /**输出的文件路径 */
    Path: string
    /**获取为内存 */
    GetBuffer: () => Promise<Buffer>;
    /**删除该文件 */
    remove: () => Promise<void>;
    /**获取属性 */
    stat: () => Promise<fs.Stats>;
    /**
     * 通过图像探针获取图像格式大小等信息
     */
    SizeInfo: () => Promise<ProbeResult>;
}

import { StartSpawn } from "../cmd";import { Stats } from 'fs-extra';
