const fswin: fswin = process.platform === 'win32' ? require('./' + process.arch + '/fswin.node') : null;
import { FileSystemWin32Apis} from "./fswin"
class FsWinNsfw {
    /**每个监听内容的处理方法 */
    private _HandleWatcher(event: DirWatcherEventName, message: DirWatcherMessage) {
        if (event === "RENAMED" && typeof message == "object") {
            message
        }
        if (typeof message == "string") {

        }
    }
    private _FswinNsfw: dirWatcher
    private _AddHandleWatcher(..._flag: string[]) {

    }
    /**
     * 初始化监听器
     * @param dirToWatch 观察的路径 
     * @param debounceMS (忽略该时间内的同样更新)|配置[可选]|是否深度监听
     * @param Options 配置[可选]
     */
    constructor(dirToWatch: string, debounceMS?: number | FswinNsfwOptions, Options?: FswinNsfwOptions) {
        if (!debounceMS) debounceMS = 500;
        if (typeof debounceMS == "object") { Options = debounceMS; debounceMS = 500 };
        let options: FswinNsfwOptions = Object.assign({
            WATCH_SUB_DIRECTORIES: true,
            CHANGE_FILE_SIZE: true,
            CHANGE_LAST_WRITE: true,
            CHANGE_LAST_ACCESS: false,
            CHANGE_CREATION: false,
            CHANGE_ATTRIBUTES: false,
            CHANGE_SECUTITY: false
        }, Options || {});
        // 不存在该文件
        if (!dirToWatch || !ExistResolvePathSync(dirToWatch)) throw Error("Exists Not Watch Path");
        this._FswinNsfw = new fswin.dirWatcher(dirToWatch, (event, message) => { this._HandleWatcher(event, message) }, options)
        // this.on = (...flag) => { this._AddHandleWatcher(flag) };
    }
    /**
     * 停止监听器
     */
    close() {
        this._FswinNsfw.close();
    }
}
interface FsWinNsfw {
    /**
     * 所有内容都监听不包含错误
     * @param Type 
     * @param CallBack 
     */
    on(Type: "all", CallBack: (this: any, Type: string, Path: string, dir: string, FileName: string, NewDir: string, OldFileName: string) => void): void
    /**
     * 发生了错误 如果有监听错误 则不会触发主动解除监听
     * @param Type 
     * @param CallBack 
     */
    on(Type: "error", CallBack: (error: Error) => void): void
    /**
     * 监听文件/文件夹 创建
     * @param Type 
     * @param CallBack 
     */
    on(Type: "add", CallBack: (this: any, Path: string, dir: string, FileName: string) => void): void
    /**
     * 监听文件/文件夹 被删除
     * @param Type 
     * @param CallBack 
     */
    on(Type: "remove", CallBack: (this: any, Path: string, dir: string, FileName: string) => void): void
    /**
   * 监听文件/文件夹 移动
   * @param Type 
   * @param CallBack 
   */
    on(Type: "move", CallBack: (this: any, Path: string, dir: string, FileName: string) => void): void
    /**
     * 监听文件/文件夹 变化
     * @param Type 
     * @param CallBack 
     */
    on(Type: "change", CallBack: (this: any, Path: string, dir: string, FileName: string) => void): void
    /**
     * 监听文件/文件夹 重命名
     * @param Type 
     * @param CallBack 
     */
    on(Type: "rename", CallBack: (this: any, Path: string, dir: string, FileName: string, NewDir: string, OldFileName: string) => void): void
    /**
     * 监听文件系统变化
     * @param Type 变更类型
     * @param CallBack 回调
     */
    on(Type: WatchEventType, CallBack: (this: any, Path: string, dir: string, FileName: string, NewDir: string, OldFileName: string) => void): void

}

class FsWinApi {
    /**
     * 异步：格式化操作系统支持的短链接恢复为正常链接（并判断文件是否存在）
     * @param pathToConvert 获取的路径
     * @param CallBack 是否格式化|回调函数
     * @param Resolve 是否格式化
     * @default Resolve true
     * @returns ConvertResult|Promise<string|null>
     * - 文件存在：string
     * - 文件不存在：null
     * - 没有回调函数 : 返回异步 在异步中包含信息
     */
    ExistResolvePath(pathToConvert: string, CallBack?: (result: string | null) => {} | boolean, Resolve?: boolean): Promise<ConvertResult> | void {
        if (typeof CallBack === "boolean") Resolve = CallBack, CallBack = void 0;
        if (typeof Resolve !== "boolean") Resolve = true;
        if (!CallBack) {
            return new Promise(async function (resolve, _reject) {
                fswin.convertPath(pathToConvert, function (Result: ConvertResult) {
                    resolve(Result);
                }, Resolve)
            })
        };
        fswin.convertPath(pathToConvert, function (Result: ConvertResult) { CallBack && CallBack(Result) }, Resolve);
    }
    /**
    * 同步：格式化操作系统支持的短链接恢复为正常链接（并判断文件是否存在）
    * @param pathToConvert 获取的路径
    * @param Resolve 是否格式化 
    * @default Resolve true
    * @returns ConvertResult
    * - 文件存在：string
    * - 文件不存在：null
    */
    ExistResolvePathSync(pathToConvert: string, Resolve?: boolean): ConvertResult {
        if (typeof Resolve !== "boolean") Resolve = true;
        var result = fswin.convertPathSync(pathToConvert, Resolve);
        return result
    }
    /**
     * 弹出可移动磁盘 异步
     * @param letter 盘符
     * @param method 弹出方法
     * - 0 一般方法 调用的DeviceIoControl. 这种方法很简单，并且在 cdrom 上效果很好。
     * - 1 适用于可移动磁盘  调用的是：用CM_Request_Device_EjectW或CM_Query_And_Remove_SubTreeW
     * - 2 使用程序调用弹出  调用的是：HotPlug.dll的HotPlugEjectDevice
     * @default 0
     * @param callback   回调|为空返回异步
     */
    EjectDrive(letter: EjectDrive_Letter, method?: 0 | 1 | 2 | ((info: boolean) => void), callback?: (info: boolean) => void): void | Promise<boolean> {
        let SetMethod = typeof method == "number" ? method : 0;
        if (typeof method === "function" || typeof callback === "function") {
            fswin.ejectDrive(letter, SetMethod, function (info: boolean) {
                if (typeof method === "function") method(info);
                else if (typeof callback === "function") callback(info);
            });
            return
        }
        return new Promise(async function (resolve, _reject) {
            fswin.ejectDrive(letter, SetMethod, function (info: boolean) {
                resolve(info);
            })
        })
    }
    /**
     *异步 比FS还要快的判断文件是否存在(实际是fs.Exist 原生实现)
     * - Exist 0.02ms  
     * - fs.exist 0.2ms
     * - ExistResolvePath 0.26ms
     * - fs.stat 0.89
     * @param Path 路径
     * @param CallBack   回调|为空返回异步
     * @returns 
     */
    Exist(Path: string, CallBack?: (ExistInfo: boolean) => void): void | Promise<boolean> {
        let { GetAttributes } = this;
        if (CallBack) return GetAttributes(Path, function (Attributes) {
            CallBack(Attributes ? true : false);
        }), void 0;
        return new Promise(async function (resolve, _reject) {
            GetAttributes(Path, function (Attributes) {
                resolve(Attributes ? true : false);
            })
        })
    }

    /**
     * 异步 获取原始文件特性常量
     * @param Path 路径
     * @param CallBack  回调|为空返回异步
     * @returns 
     */
    GetAttributes(Path: string, CallBack?: (Attributes: SystemFileAttributesW | null) => void): void | Promise<SystemFileAttributesW | null> {
        if (CallBack) return fswin.getAttributes(Path, function (Attributes: SystemFileAttributesW | null) {
            CallBack(Attributes);
        }), void 0;
        return new Promise(async function (resolve, _reject) {
            fswin.getAttributes(Path, function (Attributes: SystemFileAttributesW | null) {
                resolve(Attributes);
            })
        })
    }
    /**
    * 同步 获取原始文件特性常量
    * @param Path 路径
    * @returns 
    */
    GetAttributesSync: (Path: string) => SystemFileAttributesW | null = fswin.getAttributesSync;

    /**
     * 异步 获取NTFS压缩文件后的在磁盘大小 如果不存在或者没有此文件将返回0  如果一致将返回相同的值 
     * @param Path 路径
     * @param CallBack 回调
     */
    GetCompressedSize(Path: string, CallBack?: (CompressedSizeInfo: number) => void): void | Promise<number> {
        if (CallBack) return fswin.ntfs.getCompressedSize(Path, function (CompressedSizeInfo: number) {
            CallBack(CompressedSizeInfo);
        }), void 0;
        return new Promise(async function (resolve, _reject) {
            fswin.ntfs.getCompressedSize(Path, function (CompressedSizeInfo: number) {
                resolve(CompressedSizeInfo);
            })
        })
    }

    /**
    * 获取NTFS压缩文件后的在磁盘大小 如果不存在或者没有此文件将返回0  如果一致将返回相同的值
    * @param Path 路径
    */
    GetCompressedSizeSync: (Path: string) => number = fswin.ntfs.getCompressedSizeSync;
    constructor() {
        this.FindSync = fswin.findSync;
    }
    /**
 * 搜索文件 异步
 * https://docs.microsoft.com/zh-cn/windows/win32/fileio/searching-for-one-or-more-files
 * @param pathToFind 路径+通配符 
 * @param Callback 回调函数
 * @param isProgressiveMode 是否使用渐进式模式（每次回调）
 * ```ts
 * //不传入回调 返回异步
 * let FindSystemFileAttributesW[]=await fswin.Find('c:\\windows\\system32\\*');
 * fswin.Find('c:\\windows\\system32\\*').then((Attribute:FindSystemFileAttributesW[])=>{})
 * 
 * //使用渐进式
 * fswin.Find('c:\\windows\\system32\\*',(event: FindEvent, message: FindSystemFileAttributesW)=>{
 * },true);
 * 
 * console=> "FOUND"  {...FindSystemFileAttributesW}
 * console=> "SUCCEEDED"  {...FindSystemFileAttributesW}
 * console=> "FAILED"  {...FindSystemFileAttributesW}
 * 
 * //不使用渐进式
 * fswin.Find('c:\\windows\\system32\\*',(event: FindEvent, message: FindSystemFileAttributesW)=>{
 * },false);    
 *  
 * console=> [...{...FindSystemFileAttributesW}]
 * 
 * ```
 */
    Find(pathToFind: string, Callback?: Function, isProgressiveMode?: boolean) {
        if (!Callback) return new Promise((resolve, _reject) => {
            fswin.find(pathToFind, function (FindData: FindSystemFileAttributesW[]) {
                resolve(FindData)
            }, true)
        })
        if (pathToFind && Callback) return fswin.find(pathToFind, Callback, isProgressiveMode || false);
    }
    /**
     * 获取存储设备驱动信息 异步
     * @param id 盘号/设备ID
     * @param Callback 回调|没有则返回异步
     */
    GetDeviceCapabilities(id: EjectDrive_Letter | string, Callback?: (CM_DEVCAP: CM_DEVCAP | null) => void): Promise<CM_DEVCAP | null> | void {
        if (!Callback) {
            if (id.length == 1) {
                return new Promise((resolve, _reject) => {
                    fswin.getDriveDevice(id, function (id: string) {
                        fswin.getDeviceCapabilities(id, function (data: CM_DEVCAP | null) {
                            resolve(data)
                        })
                    })
                })
            }
            return new Promise((resolve, reject) => {
                if (!id?.length) return reject("Not Drive Id")
                fswin.getDeviceCapabilities(id, function (data: CM_DEVCAP | null) {
                    resolve(data)
                })
            })
        }
        if (id.length == 1) {
            fswin.getDriveDevice(id, function (id: string) {
                fswin.getDeviceCapabilities(id, function (data: CM_DEVCAP | null) {
                    Callback(data)
                })
            })
        }
        fswin.getDeviceCapabilities(id, function (data: CM_DEVCAP | null) {
            Callback(data)
        })
    }
    /**
    * 获取存储设备驱动信息 同步
    * @param id 盘号/设备ID
    */
    GetDeviceCapabilitiesSync(id: EjectDrive_Letter | string): CM_DEVCAP | null {
        // @ts-expect-error
        if (id && id.length == 1) id = this.GetDriveDeviceSync(id)?.parentDeviceId;
        return fswin.getDeviceCapabilitiesSync(id);
    }

    /**
     * 获取设备驱动ID 异步
     * @param id 盘号
     * @param CallBack  回调|没有则返回异步
     */
    GetDriveDevice(id: EjectDrive_Letter, CallBack?: (DriveStDevice: DriveStDevice | null) => void): void | Promise<DriveStDevice | null> {
        if (!CallBack) {
            return new Promise((resolve, _reject) => {
                fswin.getDeviceCapabilities(id, function (data: DriveStDevice | null) {
                    resolve(data)
                })
            })
        }
        fswin.getDeviceCapabilities(id, function (data: DriveStDevice | null) {
            CallBack(data)
        })
    }
    /**
     * 获取设备驱动ID 同步
     * @param id 盘号
     */
    GetDriveDeviceSync: (id: EjectDrive_Letter) => null | DriveStDevice = fswin.getDeviceCapabilitiesSync;
    /**
     * 异步 获取存储使用情况（字节）
     * @param path 根目录
     * @param CallBack  回调|没有则返回异步
     */
    GetVolumeSpace(path: string, CallBack?: (VolumeSpace: VolumeSpace | null) => void): void | Promise<VolumeSpace | null> {
        if (!CallBack) {
            return new Promise((resolve, _reject) => {
                fswin.getVolumeSpace(path, function (data: VolumeSpace | null) {
                    resolve(data)
                })
            })
        }
        fswin.getVolumeSpace(path, function (data: VolumeSpace | null) {
            CallBack(data)
        })
    }
    /**
     * 同步 获取存储使用情况（字节）
     * @param path 根目录
     */
    GetVolumeSpaceSync: (path: string) => VolumeSpace | null = fswin.getVolumeSpaceSync;
    /**
    *异步 获取磁盘基础信息 
    *  @param Path 根目录
    *  @param CallBack 回调|没有则返回异步
    */
    GetVolumeInformation(Path: string, CallBack?: (VolumeInformation: VolumeInformation | null) => void): void | Promise<VolumeInformation | null> {
        if (!CallBack) {
            return new Promise((resolve, _reject) => {
                fswin.getVolumeInformation(Path, function (data: VolumeInformation | null) {
                    resolve(data)
                })
            })
        }
        fswin.getVolumeInformation(Path, function (data: VolumeInformation | null) {
            CallBack(data)
        })
    }
    /**
     *同步 获取磁盘基础信息
     *  @param Path 根目录
     */
    GetVolumeInformationSync: (Path: string) => VolumeInformation | null = fswin.getVolumeInformationSync;
    /**
     * 同步 获取所有磁盘号和设备类型
     * @returns 
     */
    GetLogicalDriveListSync: () => LogicalDriveList = fswin.getLogicalDriveListSync
    /**
     * 异步 获取所有磁盘号和设备类型
     * @param CallBack 回调|没有则返回异步
     * @returns 
     */
    GetLogicalDriveList(CallBack?: (Data: LogicalDriveList) => void): void | Promise<LogicalDriveList> {
        if (!CallBack) {
            return new Promise((resolve, _reject) => {
                fswin.getLogicalDriveList(function (data: LogicalDriveList) {
                    resolve(data)
                })
            })
        }
        fswin.getLogicalDriveList(function (data: LogicalDriveList) {
            CallBack(data)
        })
    }
    private properties: StoragePropertiesConfigure = {
        deviceProperty: true,
        adapterProperty: true,
        deviceWriteCacheProperty: true,
        accessAlignmentProperty: true,
        deviceSeekPenalty: true,
        deviceTrim: true,
        deviceLBProvisioningProperty: true,
        devicePowerProperty: true,
        deviceCopyOffloadProperty: true,
        deviceMediumProductType: true,
        adapterRpmbProperty: true,
        deviceIoCapabilityProperty: true,
        adapterTemperatureProperty: true,
        deviceTemperatureProperty: true,
        adapterSerialNumber: true
    };
    /**
     * 通过驱动id获取驱动器的属性(超详细)
     * -  '\\\\?\\PhysicalDrive0'
     */
    GetStoragePropertiesSync(ID: GetStorageProperties_ID): StoragePropertiesData | null {
        if (typeof ID == "number") ID = `\\\\?\\PhysicalDrive${ID}`

        return fswin.getStoragePropertiesSync(ID, this.properties)
    }
    /**
     * 通过驱动id获取驱动器的属性(超详细)
     * -  '\\\\?\\PhysicalDrive0'
     * ```ts
     *  let StorageProperties:StoragePropertiesData|null = await GetStorageProperties('\\\\?\\PhysicalDrive0');
     * ```
     */
    GetStorageProperties(ID: GetStorageProperties_ID, CallBack?: (data: StoragePropertiesData | null) => void): Promise<StoragePropertiesData | null> | void {
        if (typeof ID == "number") ID = `\\\\?\\PhysicalDrive${ID}`
        if (!CallBack) {
            return new Promise((resolve, _reject) => {
                fswin.getStorageProperties(ID, this.properties, function (data: StoragePropertiesData | null) {
                    resolve(data)
                })
            })
        }
        fswin.getStorageProperties(ID, this.properties, function (data: StoragePropertiesData | null) {

            CallBack(data)
        })
    }

}
interface FsWinApi {
    /**
     * 搜索文件
     * https://docs.microsoft.com/zh-cn/windows/win32/fileio/searching-for-one-or-more-files
     * @param pathToFind 路径+通配符 
     * ```ts
     * let FindData:FindSystemFileAttributesW[] = fswin.findSync('c:\\windows\\system32\\*')
     * 
     * let FindData:number = fswin.findSync('c:\\windows\\system32\\*',(message:FindSystemFileAttributesW)=>{})
     * ```
     * @param Callback 
     */
    FindSync(pathToFind: string): string[]
    FindSync(pathToFind: string, Callback: () => void): number
    FindSync(pathToFind: string, Callback?: () => void): number | string[]
    Find(pathToFind: string): Promise<FindSystemFileAttributesW[]>
    Find(pathToFind: string, Callback: (message: FindSystemFileAttributesW[]) => void, isProgressiveMode: false): boolean | void
    Find(pathToFind: string, Callback: (message: FindSystemFileAttributesW[]) => void, isProgressiveMode?: boolean): boolean | void
    Find(pathToFind: string, Callback: (event: FindEvent, message: FindSystemFileAttributesW) => void, isProgressiveMode: true): boolean
    Find(pathToFind: string, Callback?: (event: FindEvent, message: FindSystemFileAttributesW) => void, isProgressiveMode?: boolean): void
    GetCompressedSize(Path: string): Promise<number>
    GetCompressedSize(Path: string, CallBack?: (CompressedSizeInfo: number) => void): void
    Exist(Path: string, CallBack?: ((ExistInfo: boolean) => void) | undefined): void | Promise<boolean>
    Exist(Path: string): Promise<boolean>
    Exist(Path: string, CallBack: ((ExistInfo: boolean) => void) | undefined): void
    EjectDrive(letter: EjectDrive_Letter, method?: 0 | 1 | 2 | ((info: boolean) => void), callback?: (info: boolean) => void): void | Promise<boolean>
    EjectDrive(letter: EjectDrive_Letter, method: 0 | 1 | 2 | ((info: boolean) => void), callback: (info: boolean) => void): void
    EjectDrive(letter: EjectDrive_Letter, method: ((info: boolean) => void)): void
    EjectDrive(letter: EjectDrive_Letter, method?: 0 | 1 | 2): Promise<boolean>
    GetAttributes(Path: string, CallBack?: (Attributes: SystemFileAttributesW | null) => void): void | Promise<SystemFileAttributesW | null>
    GetAttributes(Path: string): Promise<SystemFileAttributesW | null>
    GetAttributes(Path: string, CallBack: (Attributes: SystemFileAttributesW | null) => void): void
    ExistResolvePath(pathToConvert: string, CallBack?: (result: string | null) => {} | boolean, Resolve?: boolean): Promise<ConvertResult> | void
    ExistResolvePath(pathToConvert: string): Promise<ConvertResult>
    ExistResolvePath(pathToConvert: string, CallBack: (result: string | null) => {} | boolean, Resolve?: boolean): void
    GetDriveDevice(id: EjectDrive_Letter, CallBack?: (DriveStDevice: DriveStDevice | null) => void): void | Promise<DriveStDevice | null>
    GetDriveDevice(id: EjectDrive_Letter, CallBack: (DriveStDevice: DriveStDevice | null) => void): void
    GetDriveDevice(id: EjectDrive_Letter): Promise<DriveStDevice | null>
    GetDeviceCapabilities(id: EjectDrive_Letter | string, Callback?: (CM_DEVCAP: CM_DEVCAP | null) => void): Promise<CM_DEVCAP | null> | void
    GetDeviceCapabilities(id: EjectDrive_Letter | string): Promise<CM_DEVCAP | null>
    GetDeviceCapabilities(id: EjectDrive_Letter | string, Callback: (CM_DEVCAP: CM_DEVCAP | null) => void): void
    GetVolumeSpace(path: string, CallBack?: (VolumeSpace: VolumeSpace | null) => void): void | Promise<VolumeSpace | null>
    GetVolumeSpace(path: string): Promise<VolumeSpace | null>
    GetVolumeSpace(path: string, CallBack: (VolumeSpace: VolumeSpace | null) => void): void
}

type FindEvent = "FOUND" | "SUCCEEDED" | "FAILED" | "INTERRUPTED";
type ConvertResult = null | string

export let { ExistResolvePath, ExistResolvePathSync, EjectDrive, Exist, GetAttributes, GetAttributesSync, GetCompressedSize, GetCompressedSizeSync, Find, GetDeviceCapabilities, GetDeviceCapabilitiesSync, GetDriveDevice, GetDriveDeviceSync, GetVolumeSpace, GetVolumeSpaceSync, GetVolumeInformation, GetVolumeInformationSync, GetLogicalDriveListSync, GetLogicalDriveList, GetStorageProperties, GetStoragePropertiesSync, } = new FsWinApi();


type EjectDrive_Letter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z"
/**
 * 监听器事件类型
 * - ERROR 错误
 * - RENAMED 重命名
 * - STARTED 观察器开始
 * - MOVED 移动
 * - ADDED 创建
 * - MODIFIED 修改事件
 * - ENDED 结束观察器
 */
type DirWatcherEventName = "ERROR" | "RENAMED" | "STARTED" | "MOVED" | "ADDED" | "REMOVED" | "MODIFIED" | "ENDED";
type WatchEventType = "all" | "error" | "change" | "add" | "remove" | "rename" | "start" | "move"

/**
 *监听器消息类型 
 */
type DirWatcherMessage = string | DirWatcherRenamedMessage | DirWatcherErrorMessage;
/**
 * 错误类型
 * - UNABLE_TO_CONTINUE_WATCHING 无法继续观察
 * - UNABLE_TO_WATCH_SELF 无法返回信息到监听器
 * - INITIALIZATION_FAILED 初始化失败
 */
type DirWatcherErrorMessage = "UNABLE_TO_CONTINUE_WATCHING" | "UNABLE_TO_WATCH_SELF" | "INITIALIZATION_FAILED";
/**只有更新文件夹才会使用该方法 */
type DirWatcherRenamedMessage = { NEW_NAME: string, OLD_NAME: string };
class dirWatcher {
    /**
     * 监听文件夹中的变化
     * @param _dirToWatch 观察链接/文件夹
     * @param _callback 回调
     * @param _options 配置
     */
    constructor(_dirToWatch: string, _callback: (event: DirWatcherEventName, message: DirWatcherMessage) => void, _options: FswinNsfwOptions) { }
    /**移除观察器 */
    close() { }
}
/**
 * https://github.com/xxoo/node-fswin/wiki
 */
type fswin = {
    getLogicalDriveListSync: () => LogicalDriveList;
    getStorageProperties: any;
    getStoragePropertiesSync: any;
    getLogicalDriveList: any;
    getVolumeSpaceSync: (path: string) => VolumeSpace | null;
    getVolumeInformationSync: (Path: string) => VolumeInformation | null;
    getVolumeInformation: any;
    getVolumeSpace: any;
    getDeviceCapabilitiesSync: any;
    getDeviceCapabilities: any;
    getDriveDevice: any;
    find: any;
    findSync: any;
    ntfs: {
        getCompressedSize: any;
        getCompressedSizeSync: any;
    };
    getAttributesSync: any;
    getAttributes: any;
    /**弹出设备 */
    ejectDrive: any;
    /**弹出设备 */
    ejectDriveSync: any;
    convertPathSync: any;
    convertPath: any;
    dirWatcher: typeof dirWatcher
    setAttributesSync: any;
    setAttributes: any;
    setCompressionSync: any;
    setCompression: any;
    setVolumeLabel: any;
    setVolumeLabelSync: any;
    setSparseSync: any;
    setSparse: any;
    setShortName: any;
    setShortNameSync: any;
    /**
     * 分割路径
     */
    splitPath: (fullPath: string) => {/*文件名*/NAME: string,/*路径*/PARENT: string }
}

/**
 * 文件系统观察器可选配置
 */
type FswinNsfwOptions = {
    /**深度监听目录树 */
    WATCH_SUB_DIRECTORIES?: boolean,
    //? 以下如果为true 则会包含在文件修改("MODIFIED") 事件中
    /**观察文件大小更改 */
    CHANGE_FILE_SIZE?: boolean,
    /**观察文件修改时间(文件修改时间变更了) */
    CHANGE_LAST_WRITE?: boolean,
    /**观察文件查看时间(文件查看时间变更了) */
    CHANGE_LAST_ACCESS?: boolean,
    /**观察文件创建时间更改 */
    CHANGE_CREATION?: boolean,
    /**观察文件属性更改 */
    CHANGE_ATTRIBUTES?: boolean,
    /**监视安全组(security)更改 */
    CHANGE_SECUTITY?: boolean
}
/**
 * 文件特性常量
 * https://docs.microsoft.com/en-us/windows/win32/fileio/file-attribute-constants
 */
type SystemFileAttributesW = {
    /**创建时间*/
    CREATION_TIME: "2022-04-12T05:45:45.469Z" | string,
    /**上次访问时间*/
    LAST_ACCESS_TIME: "2022-05-24T16:48:35.685Z" | string,
    /**上次写入时间*/
    LAST_WRITE_TIME: "2022-05-24T14:18:02.948Z" | string,
    /**文件大小字节*/
    SIZE: number,
    /**软硬链接数*/
    LINK_COUNT: number,
    /**原始属性数 */
    RAW_ATTRIBUTES: number,
    /**是否存档 */
    IS_ARCHIVED: boolean,
    /**是否启用压缩  例如NTFS压缩*/
    IS_COMPRESSED: boolean,
    /**是否是设备 */
    IS_DEVICE: boolean,
    /**是否是目录 */
    IS_DIRECTORY: boolean,
    /**是否启用加密 */
    IS_ENCRYPTED: boolean,
    /**文件被隐藏 */
    IS_HIDDEN: boolean,
    /**未编制内容索引 */
    IS_NOT_CONTENT_INDEXED: boolean,
    /**是否脱机 */
    IS_OFFLINE: boolean,
    /**是否为只读 */
    IS_READ_ONLY: boolean,
    /**稀疏文件(申明需要的大小 实际已用大小未达到此数量) */
    IS_SPARSE_FILE: boolean,
    /**是否归属于系统 */
    IS_SYSTEM: boolean,
    /**是否是临时文件 */
    IS_TEMPORARY: boolean,
    /**完整性的流 */
    IS_INTEGRITY_STREAM: boolean,
    /**没有被完整的数据 被完整性测试所排查 */
    IS_NO_SCRUB_DATA: boolean,
    /**该文件并不完全存在，有可能无法访问 或者该数据在远程位置 */
    IS_RECALL_ON_DATA_ACCESS: boolean,
    /**此属性仅在目录枚举类 */
    IS_RECALL_ON_OPEN: boolean,
    /**此值保留供系统使用 */
    IS_VIRTUAL: boolean,
    /**#define FILE_ATTRIBUTE_EA                   0x00040000 */
    IS_EA: boolean,
    /**该文件被锁定 */
    IS_PINNED: boolean,
    /**该文件取消锁定 */
    IS_UNPINNED: boolean,
    /**具有关联的重新分析点的文件或目录，或作为符号链接的文件 */
    IS_REPARSE_POINT: boolean

}

/**
 * Find函数回调文件特性常量
 * https://docs.microsoft.com/en-us/windows/win32/fileio/file-attribute-constants
 */
type FindSystemFileAttributesW = {
    /**文件名(含后缀) */
    "LONG_NAME": string,
    /**简称 例如：C:\\PROGRA~1 */
    "SHORT_NAME": string,
    /**重新分析点标记 */
    "REPARSE_POINT_TAG": string
} & SystemFileAttributesW & {
    /**软硬链接数(不存在)*/
    LINK_COUNT?: number,
    /**具有关联的重新分析点的文件或目录，或作为符号链接的文件(不存在) */
    IS_REPARSE_POINT?: boolean
}

/**
 * 获取磁盘设备信息
 * https://docs.microsoft.com/zh-cn/windows/win32/api/setupapi/nf-setupapi-setupdigetdeviceregistrypropertya
 */
type CM_DEVCAP = {
    /**设备是否支持锁定 */
    LOCK_SUPPORTED: boolean,
    /**支持弹出 */
    EJECT_SUPPORTED: boolean,
    /**可删除设备(U盘 不包含可移动硬盘) */
    REMOVABLE: boolean,
    /**设备是否支持悬挂 */
    DOCK_DEVICE: boolean,
    /**设备的实例 ID 在系统范围内是否唯一 */
    UNIQUE_ID: boolean,
    /**静默安装 */
    SILENT_INSTALL: boolean,
    /**没有功能驱动程序(例如,SCSI 设备处于通路模式) */
    RAW_DEVICE_OK: boolean,
    /**是否支持突然拔出(热拔出) */
    SURPRISE_REMOVAL_OK: boolean,
    /**硬件是否是屏蔽的 */
    HARDWARE_DISABLED: boolean,
    /**留待将来使用 */
    NON_DYNAMIC: boolean
}


type DriveStDevice = {
    /**指示此设备的数量。 对于表示 MPIO 磁盘的物理路径的磁盘，此值设置为 0xFFFFFFFF (-1) */
    deviceNumber: number,
    /**设备路径(设备信息的路径) */
    devicePath: string,
    /**设备ID */
    deviceId: string,
    /**此设备的父设备 ID  */
    parentDeviceId: string
}
/**
 * 磁盘内存情况
 */
type VolumeSpace = {
    /**可用(字节) */
    FREE: number
    /**已用(字节)  */
    TOTAL: number
}
type VolumeInformation = {
    LABEL: string;
    FILESYSTEM: "NTFS" | "FAT" | "exFAT" | "Ext2" | "Ext3";
    SERIALNUMBER: number;
    RAW_FLAGS: number;
    CASE_SENSITIVE_SEARCH: boolean;
    CASE_PRESERVED_NAMES: boolean;
    UNICODE_ON_DISK: boolean;
    PERSISTENT_ACLS: boolean;
    FILE_COMPRESSION: boolean;
    VOLUME_QUOTAS: boolean;
    RETURNS_CLEANUP_RESULT_INFO: boolean;
    VOLUME_IS_COMPRESSED: boolean;
    NAMED_STREAMS: boolean;
    READ_ONLY_VOLUME: boolean;
    SEQUENTIAL_WRITE_ONCE: boolean;
    DAX_VOLUME: boolean;
    SUPPORTS_SPARSE_FILES: boolean;
    SUPPORTS_REPARSE_POINTS: boolean;
    SUPPORTS_REMOTE_STORAGE: boolean;
    SUPPORTS_POSIX_UNLINK_RENAME: boolean;
    SUPPORTS_BYPASS_IO: boolean;
    SUPPORTS_OBJECT_IDS: boolean;
    SUPPORTS_ENCRYPTION: boolean;
    SUPPORTS_TRANSACTIONS: boolean;
    SUPPORTS_HARD_LINKS: boolean;
    SUPPORTS_EXTENDED_ATTRIBUTES: boolean;
    SUPPORTS_OPEN_BY_FILE_ID: boolean;
    SUPPORTS_USN_JOURNAL: boolean;
    SUPPORTS_INTEGRITY_STREAMS: boolean;
    SUPPORTS_BLOCK_REFCOUNTING: boolean;
    SUPPORTS_SPARSE_VDL: boolean;
    SUPPORTS_GHOSTING: boolean;
}

type StoragePropertiesConfigure = {
    deviceProperty: boolean,
    adapterProperty: boolean,
    deviceWriteCacheProperty: boolean,
    accessAlignmentProperty: boolean,
    deviceSeekPenalty: boolean,
    deviceTrim: boolean,
    deviceLBProvisioningProperty: boolean,
    devicePowerProperty: boolean,
    deviceCopyOffloadProperty: boolean,
    deviceMediumProductType: boolean,
    adapterRpmbProperty: boolean,
    deviceIoCapabilityProperty: boolean,
    adapterTemperatureProperty: boolean,
    deviceTemperatureProperty: boolean,
    adapterSerialNumber: boolean
};
type StoragePropertiesData = {
    accessAlignmentProperty: {
        bytesPerCacheLine: number;
        bytesOffsetForCacheAlignment: number;
        bytesPerLogicalSector: number;
        bytesPerPhysicalSector: number;
        bytesOffsetForSectorAlignment: number;
    }
    adapterProperty: {
        maximumTransferLength: number;
        maximumPhysicalPages: number;
        alignmentMask: number;
        adapterUsesPio: boolean;
        adapterScansDown: boolean;
        commandQueueing: boolean;
        acceleratedTransfer: boolean;
        busMajorVersion: number;
        busMinorVersion: number;
        busType: "SATA" | 'NVMe' | 'USB';
        srbType: string;
        addressType: string;
    }
    adapterRpmbProperty: {
        sizeInBytes: number;
        maxReliableWriteSizeInBytes: number;
        frameFormat: number;
    }
    deviceCopyOffloadProperty: {
        defaultTokenLifetime: number
        maximumDataDescriptors: number
        maximumTokenLifetime: number
        maximumTransferLengthPerDescriptor: number
        maximumTransferSize: bigint
        optimalTransferCount: bigint
        optimalTransferLengthGranularity: number
        optimalTransferLengthPerDescriptor: number
    }
    deviceIoCapabilityProperty: {
        lunMaxIoCount: number;
        adapterMaxIoCount: number;
    }
    deviceLBProvisioningProperty: {
        anchorSupported: boolean
        getFreeSpaceSupported: boolean
        mapSupported: boolean
        maxUnmapBlockDescriptorCount: number
        maxUnmapLbaCount: number
        optimalUnmapGranularity: bigint
        thinProvisioningEnabled: boolean
        thinProvisioningReadZeros: boolean
        unmapGranularityAlignment: bigint
        unmapGranularityAlignmentValid: boolean
    }
    deviceMediumProductType: number
    devicePowerProperty: {
        deviceAttentionSupported: boolean;
        asynchronousNotificationSupported: boolean;
        idlePowerManagementEnabled: boolean;
        d3ColdEnabled: boolean;
        d3ColdSupported: boolean;
        noVerifyDuringIdlePower: boolean;
        idleTimeoutInMS: number;
    }
    deviceProperty: {
        deviceType: number,
        deviceTypeModifier: number,
        busType: "SATA" | 'NVMe' | 'USB',
        commandQueueing: boolean,
        removableMedia: boolean,
        productId: string
        productRevision: string
        serialNumber: string
    }
    deviceSeekPenalty: boolean
    deviceTrim: boolean
    deviceWriteCacheProperty: {
        type: string;
        isEnabled: string;
        isChangeable: string;
        isWriteThroughSupported: string;
        flushCacheSupported: boolean;
        userDefinedPowerProtection: boolean;
        NVCacheEnabled: boolean;
    }
}

type GetStorageProperties_ID = "\\\\?\\PhysicalDrive0" | "\\\\?\\PhysicalDrive1" | "\\\\?\\PhysicalDrive2" | "\\\\?\\PhysicalDrive3" | "\\\\?\\PhysicalDrive4" | "\\\\?\\PhysicalDrive5" | "\\\\?\\PhysicalDrive6" | "\\\\?\\PhysicalDrive7" | "\\\\?\\PhysicalDrive8" | "\\\\?\\PhysicalDrive9" | "\\\\?\\PhysicalDrive10" | "\\\\?\\PhysicalDrive11" | "\\\\?\\PhysicalDrive13" | "\\\\?\\PhysicalDrive12" | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13

type LogicalDriveList = FileSystemWin32Apis.LogicalDriveList