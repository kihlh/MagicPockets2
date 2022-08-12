"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert = void 0;
const ToSpawn_1 = require("./ToSpawn");
const walk = require("@nodelib/fs.walk");
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../_NapiModules/fswin/index"));
const cmd_1 = require("../cmd");
class convert {
    _ = {
        ConvertPath: "",
        arge: []
    };
    /**
     * 执行器路径
     * @param ConvertCliPath
     */
    constructor(ConvertCliPath, useMagick) {
        if (!index_1.default.existsSync(ConvertCliPath))
            throw new Error("Not Cli Convert EXE");
        this.SetConvertCliPath(ConvertCliPath, useMagick);
    }
    /**
     * 设置执行器路径
     * @param ConvertCliPath
     */
    SetConvertCliPath(ConvertCliPath, useMagick) {
        if (ConvertCliPath && typeof ConvertCliPath === "string") {
            if (!index_1.default.existsSync(ConvertCliPath))
                throw new Error("Not Cli Convert EXE");
            this._.ConvertPath = ConvertCliPath.replace(/[\\\/]+/g, '/');
            if (useMagick || ConvertCliPath.match(/magick\.exe/i)) {
                this._.arge.push("convert");
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
    cli(...arge) {
        const Garge = this._.arge;
        return (0, ToSpawn_1.ToSpawn)(this._.ConvertPath, Garge.concat(arge));
    }
    /**
     * 获取图层信息 比如psd/gif/pdf 这些支持多层的东东
     * @param InputPath
     * @returns
     */
    GetLevelLength(InputPath) {
        const { ConvertPath: ConvertPath, arge: Garge } = this._;
        let ReturnLevelData = [];
        return new Promise(function (resolve, reject) {
            (0, ToSpawn_1.ToSpawn)(ConvertPath, Garge.concat([InputPath, "info:"])).then(data => {
                let MatchLevelList = data.match(/^.+?[\d+] /mig);
                let ForIndex = -1;
                for (const iterator of MatchLevelList || []) {
                    if (iterator) {
                        let PushData = {
                            type: "",
                            index: ForIndex += 1,
                            size: [0, 0],
                        };
                        let GetMatchSize = iterator.match(/(\d+)x(\d+) $/);
                        if (GetMatchSize)
                            PushData.size = [Number(GetMatchSize[1]), Number(GetMatchSize[2])];
                        let GetMatchType = iterator.match(/^.+?[\d+] (.+?) /mig);
                        if (GetMatchType)
                            PushData.type = GetMatchType[1];
                        ReturnLevelData.push(PushData);
                    }
                }
                resolve(ReturnLevelData);
            }).catch(reject);
        });
    }
    /**
     * 格式转换所有支持的图片和文件夹树(有Deep参数的话) （深度）
     * @param IputImagesList 路径(文件或文件夹)
     * @param SetExt 转换格式
     * @param Deep 是否深度遍历文件夹树
     * @param ProcessLimit 进程限制
     * @returns
     */
    async WilKFormat(IputImagesList, SetExt, Deep, ProcessLimit) {
        if (!ProcessLimit)
            ProcessLimit = Infinity;
        let { ConvertPath, arge: Garge } = this._;
        let HandleError = () => { };
        /**正在处理中
         * ?处理完成则移除
        */
        let ProcessingList = new Set();
        let MatchFormats = /[.](psd|psb|jpe?g|png|webp|gif|svg|ai)$/;
        let GotuSpawnList = [];
        // 没有内容
        if (!IputImagesList?.length)
            throw new Error("Not Iput Images Data");
        // 复制的是文件列表
        let HandleListComplete = new Set();
        //遍历所有路径 
        for (const Paths of IputImagesList) {
            let Stats = await index_1.default.getAttributes(Paths) || undefined;
            if (!Stats)
                continue;
            // 处理文件夹
            if (Stats.IS_DIRECTORY) {
                walk.walkStream(Paths).on("data", function (chunk) {
                    if (chunk.name.match(MatchFormats) && chunk.dirent.isFile() && ConvertPath) {
                        let Path = path_1.default.resolve(chunk.path);
                        if (!HandleListComplete.has(Path)) {
                            ProcessingList.add(Path);
                            let ToFormatsPath = Path.replace(MatchFormats, (".".concat(SetExt || ".png").replace(/[.]+([^.]+)/, ".$1")));
                            let IputPath = Path.match(/[.](psd|psb|gif|pdf|gif)$/) ? Path.concat('[0]') : Path;
                            GotuSpawnList.push((0, cmd_1.spawn)(ConvertPath, Garge.concat([IputPath, ToFormatsPath])).finally(() => ProcessingList.delete(Path)));
                            HandleListComplete.add(Path);
                        }
                    }
                });
            }
            // 处理文件
            else if (ConvertPath) {
                let Path = path_1.default.resolve(Paths);
                if (!HandleListComplete.has(Path)) {
                    ProcessingList.add(Path);
                    let ToFormatsPath = Path.replace(MatchFormats, (".".concat(SetExt || ".png").replace(/[.]+([^.]+)/, ".$1")));
                    let IputPath = Path.match(/[.](psd|psb|gif|pdf|gif)$/) ? Path.concat('[0]') : Path;
                    GotuSpawnList.push((0, cmd_1.spawn)(ConvertPath, Garge.concat([IputPath, ToFormatsPath])).finally(() => ProcessingList.delete(Path)));
                    HandleListComplete.add(Path);
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
exports.convert = convert;
//# sourceMappingURL=convert.js.map