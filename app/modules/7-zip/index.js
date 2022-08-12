"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Set7zipPath = exports.ready = exports.GetHash = exports.GetCRC32 = exports.Getsha256 = exports.GetSHA1 = exports.GetCRC64 = exports.GetBLAKE2sp = exports.ToZip = exports.Totar = exports.To7z = exports.GetDirCRC32 = exports.UndoArchive = exports.remove = exports.cmd = void 0;
// import { run, runSync, SetDecode,spawn,execFile } from "../cmd";
const cmd_1 = require("../cmd");
const path_1 = __importDefault(require("path"));
const GainPath_1 = __importDefault(require("../GainPath"));
const fs_extra_1 = require("fs-extra");
let GainPath = new GainPath_1.default.GainPath();
let CommandReturnInputRegList = {
    CRC32: {
        loock: /^CRC32(?:[\s\t ]+)?for(?:[\s\t ]+)?data:(?:[\s\t ]+)(.+)/img,
        replace: [/.+?data:(?:[\s\t ]+)/i, '']
    },
    size: {
        loock: /^Size:(?:[\s\t ]+)\d+/img,
        replace: [/^.+?(\d+)(?:[\s\t ]+)?$/i, '$1']
    },
    CRC64: {
        loock: /^CRC64(?:[\s\t ]+)?for(?:[\s\t ]+)?data:(?:[\s\t ]+)(.+)/img,
        replace: [/.+?data:(?:[\s\t ]+)/i, '']
    },
    SHA256: {
        loock: /^SHA256(?:[\s\t ]+)?for(?:[\s\t ]+)?data:(?:[\s\t ]+)(.+)/img,
        replace: [/.+?data:(?:[\s\t ]+)/i, '']
    },
    SHA1: {
        loock: /^SHA1(?:[\s\t ]+)?for(?:[\s\t ]+)?data:(?:[\s\t ]+)(.+)/img,
        replace: [/.+?data:(?:[\s\t ]+)/i, '']
    },
    BLAKE2sp: {
        loock: /^BLAKE2sp(?:[\s\t ]+)?for(?:[\s\t ]+)?data:(?:[\s\t ]+)(.+)/img,
        replace: [/.+?data:(?:[\s\t ]+)/i, '']
    },
    MD5: {
        loock: /^MD5(?:[\s\t ]+)?for(?:[\s\t ]+)?data:(?:[\s\t ]+)(.+)/img,
        replace: [/.+?data:(?:[\s\t ]+)/i, '']
    }
};
/**
 *判断是否是文件夹
 * @param Path
 */
function IsFolders(Path) {
    return new Promise(async function (resolve, reject) {
        try {
            let Stat = await (0, fs_extra_1.stat)(Path);
            if (Stat.isDirectory())
                resolve(true);
        }
        catch (error) {
            resolve(false);
        }
    });
}
let _7zipPath = path_1.default.join(GainPath.exe, "7z.exe");
function GetInfoData(InfoData, Path) {
    const RunData = {};
    for (const key in CommandReturnInputRegList) {
        if (Object.hasOwnProperty.call(CommandReturnInputRegList, key)) {
            // @ts-expect-error
            const Reg = CommandReturnInputRegList[key];
            const Datas = InfoData.match(Reg.loock);
            if (Datas) {
                // @ts-expect-error
                RunData[key] = Datas[0].replace(Reg.replace[0], Reg.replace[1]);
            }
        }
    }
    RunData.path = path_1.default.resolve(Path);
    const parse = path_1.default.parse(Path);
    if (RunData.size)
        RunData.size = RunData.size * 1;
    RunData.name = parse.name;
    RunData.base = parse.base;
    RunData.dir = parse.dir;
    RunData.ext = parse.ext;
    return RunData;
}
function ParseCommand_7zipRaiseDirValidity(ReturnDetail, DirPath) {
    let ReturnParseValidity = {
        type: null,
        List: [],
        Result: "",
        ResultAddName: "",
        Files: 0,
        Size: 0,
        Folders: 0
    };
    let RaiseDirValidityList = ReturnDetail.split('\n');
    if (!RaiseDirValidityList.length || (ReturnDetail.length < 25 && ReturnDetail.includes("WARNINGS") && ReturnDetail.includes("00000000-00000000")))
        return ReturnParseValidity;
    // 到达数据体了开始检索数据
    let StartDataSearching = false;
    for (let index = 0; index < RaiseDirValidityList.length; index++) {
        let RaiseContent = RaiseDirValidityList[index];
        if (!RaiseContent)
            continue;
        //数据头 4:"CRC32             Size  Name"
        if (index < 8 && RaiseContent.match(/Size +Name/i)) {
            if (RaiseContent.indexOf("CRC32") == 0)
                ReturnParseValidity.type = "CRC32";
            else if (RaiseContent.indexOf("CRC64") == 0)
                ReturnParseValidity.type = "CRC64";
            else if (RaiseContent.indexOf("SHA256") == 0)
                ReturnParseValidity.type = "SHA256";
            else if (RaiseContent.indexOf("BLAKE2sp") == 0)
                ReturnParseValidity.type = "BLAKE2sp";
            if (!ReturnParseValidity.type)
                return ReturnParseValidity;
        }
        if (StartDataSearching) {
            // 判断文件夹
            let IsFolder = RaiseContent.match(/^  +/) && RaiseContent.match(/[\\\/]$/);
            if (IsFolder) {
                ReturnParseValidity.List.push({
                    Type: "folder",
                    SHA: "",
                    Size: Infinity,
                    //                        AppWebCache\117\s1.url.cn\
                    // 7zip 规范是24个空格
                    Path: path_1.default.resolve(DirPath, RaiseContent.replace(/^ {24}/, "") || "") + "\\",
                });
            }
            else {
                let MatchData = RaiseContent.match(/^([0-9a-z]+?) +(\d+)  (.+)/i);
                if (MatchData?.length !== 4)
                    continue;
                let Data = {
                    Type: "file",
                    SHA: String(MatchData[1] || ""),
                    Size: Number(MatchData[2] || 0),
                    Path: path_1.default.resolve(DirPath, String(MatchData[3] || "")),
                };
                ReturnParseValidity.List.push(Data);
            }
        }
        if (index < 8 && RaiseContent.match(/^----+/i))
            StartDataSearching = true;
        /**
        -------- -------------  ------------
061EE2FA-00000020       2802528
Folders: 40
Files: 64
Size: 2802528
CRC32  for data:              061EE2FA-00000020
CRC32  for data and names:    179417A8-00000037
Everything is Ok

         */
        if (index >= RaiseDirValidityList.length - 9) {
            StartDataSearching = false;
            break;
        }
    }
    let ForIndex = RaiseDirValidityList.length;
    for (let index = 0; index < RaiseDirValidityList.length; index++) {
        ForIndex -= 1;
        let RaiseContent = RaiseDirValidityList[ForIndex];
        if (!RaiseContent)
            continue;
        if (RaiseContent.includes("--------"))
            break;
        if (RaiseContent.match(/for data and names:/)) {
            let GetSha = RaiseContent.replace(/^.+?and names: +(.+)$/, '$1') || "";
            ReturnParseValidity.ResultAddName = GetSha;
            continue;
        }
        if (RaiseContent.match(/ for data:/)) {
            let GetSha = RaiseContent.replace(/^.+?for data: +(.+)$/, '$1') || "";
            ReturnParseValidity.Result = GetSha;
            continue;
        }
        if (RaiseContent.match(/Size:/)) {
            let Size = RaiseContent.replace(/^.+(\d+)$/, '$1') || "0";
            ReturnParseValidity.Size = Number(Size);
            continue;
        }
        if (RaiseContent.match(/Files:/)) {
            let Files = RaiseContent.replace(/^.+(\d+)$/, '$1') || "0";
            ReturnParseValidity.Files = Number(Files);
            continue;
        }
        if (RaiseContent.match(/Folders:/)) {
            let Folders = RaiseContent.replace(/^.+(\d+)$/, '$1') || "0";
            ReturnParseValidity.Folders = Number(Folders);
            continue;
        }
    }
    return ReturnParseValidity;
}
class Class_7zip {
    ___ready = (0, fs_extra_1.existsSync)(_7zipPath);
    constructor() { }
    Set7zipPath(Path) {
        if (!Path)
            throw new Error("Not 7-zipPath");
        if (!(0, fs_extra_1.existsSync)(Path))
            throw new Error("Not 7-zipPath ExE");
        _7zipPath = Path;
        this.___ready = true;
    }
    get ready() {
        return this.___ready;
    }
    /**
     * 获取文件的各种哈希信息
     * @param Path
     * @returns
    */
    async GetHash(Path) {
        if (await IsFolders(Path))
            throw new Error("The path is a folder,Call GetDir..()");
        if (!(0, fs_extra_1.existsSync)(Path))
            throw new Error("exists Not Path");
        const Data = GetInfoData(await (0, cmd_1.spawn)(_7zipPath, ["h", "-scrc*", Path]), Path);
        return Data;
    }
    /**
     * 获取文件的CRC32
     * @param Path
     * @returns
    */
    async GetCRC32(Path) {
        if (await IsFolders(Path))
            throw new Error("The path is a folder,Call GetDir..()");
        if (!(0, fs_extra_1.existsSync)(Path))
            throw new Error("exists Not Path");
        const Data = GetInfoData(await (0, cmd_1.spawn)(_7zipPath, ["h", "-scrcCRC32", Path]), Path);
        return Data;
    }
    /**
     * 获取文件的Sha256
     * @param Path
     * @returns
    */
    async Getsha256(Path) {
        if (await IsFolders(Path))
            throw new Error("The path is a folder,Call GetDir..()");
        if (!(0, fs_extra_1.existsSync)(Path))
            throw new Error("exists Not Path");
        const Data = GetInfoData(await (0, cmd_1.spawn)(_7zipPath, ["h", "-scrcsha256", Path]), Path);
        return Data;
    }
    /**
     * 获取文件的Sha1
     * @param Path
     * @returns
    */
    async GetSHA1(Path) {
        if (await IsFolders(Path))
            throw new Error("The path is a folder,Call GetDir..()");
        if (!(0, fs_extra_1.existsSync)(Path))
            throw new Error("exists Not Path");
        const Data = GetInfoData(await (0, cmd_1.spawn)(_7zipPath, ["h", "-scrcSHA1", Path]), Path);
        return Data;
    }
    /**
    * 获取文件的CRC64
    * @param Path
    * @returns
   */
    async GetCRC64(Path) {
        if (await IsFolders(Path))
            throw new Error("The path is a folder,Call GetDir..()");
        if (!(0, fs_extra_1.existsSync)(Path))
            throw new Error("exists Not Path");
        const Data = GetInfoData(await (0, cmd_1.spawn)(_7zipPath, ["h", "-scrcCRC64", Path]), Path);
        return Data;
    }
    /**
    * 获取文件的BLAKE2sp
    * @param Path
    * @returns
   */
    async GetBLAKE2sp(Path) {
        if (await IsFolders(Path))
            throw new Error("The path is a folder,Call GetDir..()");
        if (!(0, fs_extra_1.existsSync)(Path))
            throw new Error("exists Not Path");
        const Data = GetInfoData(await (0, cmd_1.spawn)(_7zipPath, ["h", "-scrcBLAKE2sp", Path]), Path);
        return Data;
    }
    /**
     * 压缩为zip格式
     * @param InputZipPath 输入内容
     * @param SavePath 保存到
     * @param mx 压缩度 [0 | 1 | 3 | 5 | 7 | 9]
     * @returns
     */
    async ToZip(InputZipPath, SavePath, mx) {
        await (0, cmd_1.spawn)(_7zipPath, ["-tzip", "a", SavePath, `-mx=${mx || 5}`, InputZipPath]);
        return SavePath;
    }
    /**
    * 压缩为tar格式
    * @param InputZipPath 输入内容
    * @param SavePath 保存到
    * @param mx 压缩度 [0 | 1 | 3 | 5 | 7 | 9]
    * @returns
    */
    async Totar(InputZipPath, SavePath, mx) {
        await (0, cmd_1.spawn)(_7zipPath, ["-ttar", "a", SavePath, `-mx=${mx || 5}`, InputZipPath]);
        return SavePath;
    }
    /**
    * 压缩为7z格式
    * @param InputZipPath 输入内容
    * @param SavePath 保存到
    * @param mx 压缩度 [0 | 1 | 3 | 5 | 7 | 9]
    * @returns
    */
    async To7z(InputZipPath, SavePath, mx) {
        await (0, cmd_1.spawn)(_7zipPath, ["-t7z", "a", SavePath, `-mx=${mx || 5}`, InputZipPath]);
        return SavePath;
    }
    /**
     * 获取文件夹的SHA1
     * @param Dir
     * @returns
    */
    async GetDirSHA1(Dir) {
        const Data = await (0, cmd_1.spawn)(_7zipPath, ['h', "-scrcSHA1", Dir.replace(/[\\\/]/g, '/')]);
        return ParseCommand_7zipRaiseDirValidity(Data, Dir);
    }
    /**
     * 获取文件夹的sha256
     * @param Dir
     * @returns
    */
    async GetDirsha256(Dir) {
        const Data = await (0, cmd_1.spawn)(_7zipPath, ['h', "-scrcsha256", Dir.replace(/[\\\/]/g, '/')]);
        return ParseCommand_7zipRaiseDirValidity(Data, Dir);
    }
    /**
     * 获取文件夹的CRC64
     * @param Dir
     * @returns
    */
    async GetDirCRC64(Dir) {
        const Data = await (0, cmd_1.spawn)(_7zipPath, ['h', "-scrcCRC64", Dir.replace(/[\\\/]/g, '/')]);
        return ParseCommand_7zipRaiseDirValidity(Data, Dir);
    }
    /**
     * 获取文件夹的BLAKE2sp
     * @param Dir
     * @returns
    */
    async GetDirBLAKE2sp(Dir) {
        const Data = await (0, cmd_1.spawn)(_7zipPath, ['h', "-scrcBLAKE2sp", Dir.replace(/[\\\/]/g, '/')]);
        return ParseCommand_7zipRaiseDirValidity(Data, Dir);
    }
    /**
     * 获取文件夹的CRC32
     * @param Dir
     * @returns
    */
    async GetDirCRC32(Dir) {
        const Data = await (0, cmd_1.spawn)(_7zipPath, ['h', "-CRC32", Dir.replace(/[\\\/]/g, '/')]);
        return ParseCommand_7zipRaiseDirValidity(Data, Dir);
    }
    /**
     * 解压
     * @param InputPath 待解压文件
     * @param SaveDirPath 文件夹路径
     * @param Password 密码
     * @returns
     */
    async UndoArchive(InputPath, SaveDirPath, Password) {
        return new Promise(async function (resolve, reject) {
            if (!InputPath || !SaveDirPath)
                throw new Error("Not InputFile Path or Savefolder Path");
            let isToSetPasswordText = Password ? `-p "${Password}" ` : " ";
            let Temp_cmd_01 = `x "${InputPath}" -y -o ${isToSetPasswordText}"${SaveDirPath}"`.replace(/[\\\/]/g, '/');
            await (0, cmd_1.run)(Temp_cmd_01).then(resolve).catch(reject);
        });
    }
    /**
     * 删除压缩文件中该文件名
     * @param InputPath 输入的压缩包
     * @param Look 搜索名
     * @returns
     */
    async remove(InputPath, Look) {
        return new Promise(async function (resolve, reject) {
            if (!InputPath || !Look)
                throw new Error("Not InputFile Path or LookName");
            let FlagList = ["d", InputPath, "-o", Look, "-r",];
            (0, cmd_1.spawn)(_7zipPath, FlagList).then(resolve).catch(reject);
        });
    }
    /**
     * 使用7zip执行命令行
     * @param InputPath 文件路径|命令数组
     * @param FlagList 命令数组
     * @returns
     */
    async cmd(InputPath, FlagList) {
        return new Promise(async function (resolve, reject) {
            if (!Array.isArray(InputPath) && !FlagList?.length)
                throw new Error("Not FlagList");
            let FlagLists = [];
            if (typeof InputPath == "string")
                FlagLists.push(InputPath);
            if (Array.isArray(InputPath))
                FlagLists = FlagLists.concat(InputPath);
            if (Array.isArray(FlagList))
                FlagLists = FlagLists.concat(FlagList);
            (0, cmd_1.spawn)(_7zipPath, FlagLists).then(resolve).catch(reject);
        });
    }
}
let _7zip = new Class_7zip();
exports.cmd = _7zip.cmd, exports.remove = _7zip.remove, exports.UndoArchive = _7zip.UndoArchive, exports.GetDirCRC32 = _7zip.GetDirCRC32, exports.To7z = _7zip.To7z, exports.Totar = _7zip.Totar, exports.ToZip = _7zip.ToZip, exports.GetBLAKE2sp = _7zip.GetBLAKE2sp, exports.GetCRC64 = _7zip.GetCRC64, exports.GetSHA1 = _7zip.GetSHA1, exports.Getsha256 = _7zip.Getsha256, exports.GetCRC32 = _7zip.GetCRC32, exports.GetHash = _7zip.GetHash, exports.ready = _7zip.ready, exports.Set7zipPath = _7zip.Set7zipPath;
exports = _7zip;
//# sourceMappingURL=index.js.map