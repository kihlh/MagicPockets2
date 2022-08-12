// import { run, runSync, SetDecode,spawn,execFile } from "../cmd";
import { spawn, StartSpawn, run, NodeCmdReturnResult } from "../cmd";
import path from "path";
import _GainPath from "../GainPath";
import { existsSync, stat } from "fs-extra";
import GoalUtil from "../Object@util";
let GainPath = new _GainPath.GainPath();

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
}
/**
 *判断是否是文件夹
 * @param Path 
 */
function IsFolders(Path: string) {
    return new Promise(async function (resolve, reject) {
        try {
            let Stat = await stat(Path);
            if (Stat.isDirectory()) resolve(true);
        } catch (error) {
            resolve(false)
        }
    })
}

let _7zipPath = path.join(GainPath.exe, "7z.exe");


function GetInfoData(InfoData: string, Path: string) {
    const RunData: GetInfoDataInfoData = {};
    for (const key in CommandReturnInputRegList) {
        if (Object.hasOwnProperty.call(CommandReturnInputRegList, key)) {
            // @ts-expect-error
            const Reg = CommandReturnInputRegList[key];
            const Datas = InfoData.match(Reg.loock);
            if (Datas) {
                // @ts-expect-error
                RunData[key] = Datas[0].replace(Reg.replace[0], Reg.replace[1])
            }
        }
    }
    RunData.path = path.resolve(Path);
    const parse = path.parse(Path);
    if (RunData.size) RunData.size = RunData.size * 1;
    RunData.name = parse.name;
    RunData.base = parse.base;
    RunData.dir = parse.dir;
    RunData.ext = parse.ext;
    return RunData
}

function ParseCommand_7zipRaiseDirValidity(ReturnDetail: string, DirPath: string): ReturnParseValidity {
    let ReturnParseValidity: ReturnParseValidity = {
        type: null,
        List: [],
        Result: "",
        ResultAddName: "",
        Files: 0,
        Size: 0,
        Folders: 0
    }
    let RaiseDirValidityList = ReturnDetail.split('\n');
    if (!RaiseDirValidityList.length || (ReturnDetail.length < 25 && ReturnDetail.includes("WARNINGS") && ReturnDetail.includes("00000000-00000000"))) return ReturnParseValidity;
    // 到达数据体了开始检索数据
    let StartDataSearching: boolean = false;
    for (let index = 0; index < RaiseDirValidityList.length; index++) {
        let RaiseContent = RaiseDirValidityList[index];
        if (!RaiseContent) continue;
        //数据头 4:"CRC32             Size  Name"
        if (index < 8 && RaiseContent.match(/Size +Name/i)) {
            if (RaiseContent.indexOf("CRC32") == 0) ReturnParseValidity.type = "CRC32"
            else
                if (RaiseContent.indexOf("CRC64") == 0) ReturnParseValidity.type = "CRC64"
                else
                    if (RaiseContent.indexOf("SHA256") == 0) ReturnParseValidity.type = "SHA256"
                    else
                        if (RaiseContent.indexOf("BLAKE2sp") == 0) ReturnParseValidity.type = "BLAKE2sp"
            if (!ReturnParseValidity.type) return ReturnParseValidity;
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
                    Path: path.resolve(DirPath, RaiseContent.replace(/^ {24}/, "") || "") + "\\",
                })
            } else {
                let MatchData = RaiseContent.match(/^([0-9a-z]+?) +(\d+)  (.+)/i);
                if (MatchData?.length !== 4) continue;
                let Data: ReturnParseValidity["List"][0] = {
                    Type: "file",
                    SHA: String(MatchData[1] || ""),
                    Size: Number(MatchData[2] || 0),
                    Path: path.resolve(DirPath, String(MatchData[3] || "")),
                }
                ReturnParseValidity.List.push(Data)
            }

        }
        if (index < 8 && RaiseContent.match(/^----+/i)) StartDataSearching = true;
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
        if (!RaiseContent) continue;
        if (RaiseContent.includes("--------")) break;
        if (RaiseContent.match(/for data and names:/)) {
            let GetSha = RaiseContent.replace(/^.+?and names: +(.+)$/, '$1') || "";
            ReturnParseValidity.ResultAddName = GetSha
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
    private ___ready = existsSync(_7zipPath)
    constructor() {}

    Set7zipPath(Path: string) {
        if (!Path) throw new Error("Not 7-zipPath");
        if (!existsSync(Path)) throw new Error("Not 7-zipPath ExE");
        _7zipPath = Path;
        this.___ready = true;
    }

    get ready() {
        return this.___ready
    }
    /**
     * 获取文件的各种哈希信息
     * @param Path 
     * @returns 
    */
    async GetHash(Path: string) {
        if (await IsFolders(Path)) throw new Error("The path is a folder,Call GetDir..()");
        if (!existsSync(Path)) throw new Error("exists Not Path");
        const Data = GetInfoData(await spawn(_7zipPath, ["h", "-scrc*", Path]), Path);
        return Data
    }
    /**
     * 获取文件的CRC32
     * @param Path 
     * @returns 
    */
    async GetCRC32(Path: string) {
        if (await IsFolders(Path)) throw new Error("The path is a folder,Call GetDir..()");
        if (!existsSync(Path)) throw new Error("exists Not Path");
        const Data = GetInfoData(await spawn(_7zipPath, ["h", "-scrcCRC32", Path]), Path);
        return Data
    }
    /**
     * 获取文件的Sha256
     * @param Path 
     * @returns 
    */
    async Getsha256(Path: string) {
        if (await IsFolders(Path)) throw new Error("The path is a folder,Call GetDir..()");
        if (!existsSync(Path)) throw new Error("exists Not Path");
        const Data = GetInfoData(await spawn(_7zipPath, ["h", "-scrcsha256", Path]), Path);
        return Data
    }
    /**
     * 获取文件的Sha1
     * @param Path 
     * @returns 
    */
    async GetSHA1(Path: string) {
        if (await IsFolders(Path)) throw new Error("The path is a folder,Call GetDir..()");
        if (!existsSync(Path)) throw new Error("exists Not Path");
        const Data = GetInfoData(await spawn(_7zipPath, ["h", "-scrcSHA1", Path]), Path);
        return Data
    }
    /**
    * 获取文件的CRC64
    * @param Path 
    * @returns 
   */
    async GetCRC64(Path: string) {
        if (await IsFolders(Path)) throw new Error("The path is a folder,Call GetDir..()");
        if (!existsSync(Path)) throw new Error("exists Not Path");
        const Data = GetInfoData(await spawn(_7zipPath, ["h", "-scrcCRC64", Path]), Path);
        return Data
    }
    /**
    * 获取文件的BLAKE2sp
    * @param Path 
    * @returns 
   */
    async GetBLAKE2sp(Path: string) {
        if (await IsFolders(Path)) throw new Error("The path is a folder,Call GetDir..()");
        if (!existsSync(Path)) throw new Error("exists Not Path");
        const Data = GetInfoData(await spawn(_7zipPath, ["h", "-scrcBLAKE2sp", Path]), Path);
        return Data
    }
    /**
     * 压缩为zip格式
     * @param InputZipPath 输入内容
     * @param SavePath 保存到
     * @param mx 压缩度 [0 | 1 | 3 | 5 | 7 | 9]
     * @returns 
     */
    async ToZip(InputZipPath: string, SavePath: string, mx: 0 | 1 | 3 | 5 | 7 | 9) {
        await spawn(_7zipPath, ["-tzip", "a", SavePath, `-mx=${mx || 5}`, InputZipPath])
        return SavePath
    }
    /**
    * 压缩为tar格式
    * @param InputZipPath 输入内容
    * @param SavePath 保存到
    * @param mx 压缩度 [0 | 1 | 3 | 5 | 7 | 9]
    * @returns 
    */
    async Totar(InputZipPath: string, SavePath: string, mx: 0 | 1 | 3 | 5 | 7 | 9) {
        await spawn(_7zipPath, ["-ttar", "a", SavePath, `-mx=${mx || 5}`, InputZipPath])
        return SavePath
    }
    /**
    * 压缩为7z格式
    * @param InputZipPath 输入内容
    * @param SavePath 保存到
    * @param mx 压缩度 [0 | 1 | 3 | 5 | 7 | 9]
    * @returns 
    */
    async To7z(InputZipPath: string, SavePath: string, mx: 0 | 1 | 3 | 5 | 7 | 9) {
        await spawn(_7zipPath, ["-t7z", "a", SavePath, `-mx=${mx || 5}`, InputZipPath])
        return SavePath
    }
    /**
     * 获取文件夹的SHA1
     * @param Dir 
     * @returns 
    */
    async GetDirSHA1(Dir: string) {
        const Data = await spawn(_7zipPath, ['h', "-scrcSHA1", Dir.replace(/[\\\/]/g, '/')],);
        return ParseCommand_7zipRaiseDirValidity(Data, Dir);
    }
    /**
     * 获取文件夹的sha256
     * @param Dir 
     * @returns 
    */
    async GetDirsha256(Dir: string) {
        const Data = await spawn(_7zipPath, ['h', "-scrcsha256", Dir.replace(/[\\\/]/g, '/')],);
        return ParseCommand_7zipRaiseDirValidity(Data, Dir);
    }
    /**
     * 获取文件夹的CRC64
     * @param Dir 
     * @returns 
    */
    async GetDirCRC64(Dir: string) {
        const Data = await spawn(_7zipPath, ['h', "-scrcCRC64", Dir.replace(/[\\\/]/g, '/')],);
        return ParseCommand_7zipRaiseDirValidity(Data, Dir);
    }
    /**
     * 获取文件夹的BLAKE2sp
     * @param Dir 
     * @returns 
    */
    async GetDirBLAKE2sp(Dir: string) {
        const Data = await spawn(_7zipPath, ['h', "-scrcBLAKE2sp", Dir.replace(/[\\\/]/g, '/')],);
        return ParseCommand_7zipRaiseDirValidity(Data, Dir);
    }
    /**
     * 获取文件夹的CRC32
     * @param Dir 
     * @returns 
    */
    async GetDirCRC32(Dir: string) {
        const Data = await spawn(_7zipPath, ['h', "-CRC32", Dir.replace(/[\\\/]/g, '/')],);
        return ParseCommand_7zipRaiseDirValidity(Data, Dir);
    }
    /**
     * 解压
     * @param InputPath 待解压文件
     * @param SaveDirPath 文件夹路径
     * @param Password 密码
     * @returns 
     */
    async UndoArchive(InputPath: string, SaveDirPath: string, Password?: string) {
        return new Promise(async function (resolve, reject) {
            if (!InputPath || !SaveDirPath) throw new Error("Not InputFile Path or Savefolder Path");
            let isToSetPasswordText=Password ? `-p "${Password}" ` : " ";
            let Temp_cmd_01 =`x "${InputPath}" -y -o ${isToSetPasswordText}"${SaveDirPath}"`.replace(/[\\\/]/g, '/');
            await run(Temp_cmd_01).then(resolve).catch(reject);
        })
    }
    /**
     * 删除压缩文件中该文件名
     * @param InputPath 输入的压缩包
     * @param Look 搜索名
     * @returns 
     */
    async remove(InputPath: string, Look: string) {
        return new Promise(async function (resolve, reject) {
            if (!InputPath || !Look) throw new Error("Not InputFile Path or LookName")
            let FlagList: string[] = ["d", InputPath, "-o", Look, "-r",];
            spawn(_7zipPath, FlagList).then(resolve).catch(reject);
        })
    }
    /**
     * 使用7zip执行命令行
     * @param InputPath 文件路径|命令数组
     * @param FlagList 命令数组
     * @returns 
     */
    async cmd(InputPath: string | string[], FlagList?: string[]) {
        return new Promise(async function (resolve, reject) {
            if (!Array.isArray(InputPath) && !FlagList?.length) throw new Error("Not FlagList")
            let FlagLists: string[] = [];
            if (typeof InputPath == "string") FlagLists.push(InputPath);
            if (Array.isArray(InputPath)) FlagLists = FlagLists.concat(InputPath);
            if (Array.isArray(FlagList)) FlagLists = FlagLists.concat(FlagList);
            spawn(_7zipPath, FlagLists).then(resolve).catch(reject);
        })
    }
}

let _7zip = new Class_7zip();
export let { cmd, remove, UndoArchive, GetDirCRC32, To7z, Totar, ToZip, GetBLAKE2sp, GetCRC64, GetSHA1, Getsha256, GetCRC32, GetHash, ready, Set7zipPath } = _7zip;

exports = _7zip
interface GetInfoDataInfoData {
    ext?: string
    dir?: string
    base?: string
    name?: string
    size?: number
    path?: string
}

type GetCRC32RunData = { "CRC32": string } & GetInfoDataInfoData
type GetBLAKE2spRunData = { "BLAKE2sp": string } & GetInfoDataInfoData
type GetCRC64RunData = { "CRC64": string } & GetInfoDataInfoData
type GetSHA256RunData = { "SHA256": string } & GetInfoDataInfoData

interface ReturnParseValidity {
    /**效验类型 */
    type: "CRC32" | "SHA256" | "CRC64" | "BLAKE2sp" | null,
    /**文件列表 */
    List: {
        /**类型 文件/文件夹 */
        Type: "file" | "folder",
        /**文件路径 */
        Path: string,
        /**文件字节 */
        Size: number
        /**效验值 */
        SHA: string
    }[],
    /**所有文件夹数量 */
    Folders: number
    /**所有文件大小 */
    Size: number
    /**所有文件数量 */
    Files: number
    /**效验值 加入文件名称 */
    ResultAddName: string
    /**所有文件效验值 不包含文件名*/
    Result: string
}