"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fswin = void 0;
const fswin_1 = __importDefault(require("./fswin"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
if (!fswin_1.default)
    throw new Error("The current environment cannot complete the initialization");
let _fswin = fswin_1.default;
/**
 * fswin 的二次构建
 */
class StructureFswin {
    size(Path, CallBack) {
        if (!CallBack)
            return new Promise(function (resolve, reject) {
                _fswin.getAttributes(Path, function (Attributes) {
                    resolve(Attributes?.SIZE || 0);
                });
            });
        _fswin.getAttributes(Path, function (Attributes) {
            CallBack(Attributes?.SIZE || 0);
        });
    }
    /**
    * 文件大小字节
    * @param Path 路径
    */
    sizeSync(Path) {
        return _fswin.getAttributesSync(Path)?.SIZE || 0;
    }
    /**
     * 监听文件夹/文件 文件变化
     * @param Path 路径
     * @param callback 回调函数
     * @param Options 配置
     */
    dirWatcher(Path, callback, Options) {
        let BackUP = Path + "";
        let Attributes = _fswin.getAttributesSync(Path);
        if (!Attributes) {
            throw new Error("The path submitted does not exist \n Path: " + Path);
        }
        Path = path_1.default.resolve(Path);
        let options = Object.assign({
            WATCH_SUB_DIRECTORIES: true,
            CHANGE_FILE_SIZE: true,
            CHANGE_LAST_WRITE: true,
            CHANGE_LAST_ACCESS: false,
            CHANGE_CREATION: false,
            CHANGE_ATTRIBUTES: false,
            CHANGE_SECUTITY: false
        }, Options || {});
        if (!Attributes.IS_DIRECTORY) {
            let HigherPath = path_1.default.resolve(Path, "..");
            if (!_fswin.getAttributesSync(path_1.default.resolve(Path, ".."))?.IS_DIRECTORY) {
                throw new Error(`Not a catalog : ${Path}\nNot a catalog :${HigherPath}\n If the watch file will be allowed (done using directory listening)\n but the path submitted is not a directory at the previous level`);
            }
            else
                Path = HigherPath;
        }
        let StartFileWatcher = new _fswin.dirWatcher(Path, function (Events, Message) {
            let dir = Path;
            let SetQuickApi;
            if (Events == "ADDED" || Events == "MODIFIED")
                SetQuickApi = new QuickApi(path_1.default.join(Path, String(Message)));
            else if ((Events == "RENAMED" || Events == "MOVED") && typeof Message == "object")
                SetQuickApi = new QuickApi(path_1.default.join(Path, String(Message.NEW_NAME)));
            callback.apply(StartFileWatcher, [Events, Message, SetQuickApi, dir]);
        }, options);
        return { close() { return StartFileWatcher.close(); } };
    }
    /**
     * 获取原始文件特性常量  异步
     * @param Path 路径
     * @param CallBack  回调
     * @returns
     */
    getAttributes(Path, CallBack) {
        if (!CallBack)
            return new Promise(function (resolve, reject) {
                _fswin.getAttributes(Path, function (Attributes) {
                    resolve(Attributes);
                });
            });
        _fswin.getAttributes(Path, function (Attributes) {
            CallBack(Attributes);
        });
    }
    /**
    * 获取原始文件特性常量  同步
    * @param Path 路径
    * @returns
    */
    getAttributesSync = _fswin.getAttributesSync;
    exists(Path, CallBack) {
        if (!CallBack)
            return new Promise(function (resolve, reject) {
                _fswin.getAttributes(Path, function (Attributes) {
                    resolve(Attributes ? true : false);
                });
            });
    }
    /**
     * 判断该文件是否存在
     * @param Path 路径
     * @returns
     */
    existsSync(Path) {
        return _fswin.getAttributesSync(Path) ? true : false;
    }
    /**
     * 异步：格式化操作系统支持的短链接恢复为正常链接（并判断文件是否存在）
     * @param pathToConvert 获取的路径
     * @param CallBack 回调函数|是否格式化
     * @param Resolve 是否格式化
     * @returns ConvertResult
     * - 文件存在：string
     * - 文件不存在：null
     */
    convertPath(pathToConvert, CallBack, Resolve) {
        if (typeof CallBack == "boolean") {
            Resolve = CallBack;
            CallBack = undefined;
        }
        // 我不知道不传入会不会CallBack出现Resolve没被声明 所以在这边错误做个处理
        if (typeof CallBack == undefined) {
            CallBack = undefined;
            if (typeof Resolve == undefined) {
                Resolve = false;
            }
        }
        if (!CallBack)
            return new Promise(function (resolve, reject) {
                _fswin.convertPath(pathToConvert, function (_ResolveData) {
                    resolve(_ResolveData);
                }, Resolve || false);
            });
        _fswin.convertPath(pathToConvert, function (_ResolveData) {
            CallBack && CallBack(_ResolveData);
        }, Resolve || false);
    }
    /**
     * 同步：格式化操作系统支持的短链接恢复为正常链接（并判断文件是否存在）
     * @param pathToConvert 获取的路径
     * @param Resolve 是否格式化
     * @returns ConvertResult
     * - 文件存在：string
     * - 文件不存在：null
     */
    convertPathSync = _fswin.convertPathSync;
    /**
     * 获取所有磁盘号和设备类型  异步
     * @param CallBack 回调
     * @returns
     */
    getLogicalDriveList(CallBack) {
        if (!CallBack)
            return new Promise(function (resolve, reject) {
                _fswin.getLogicalDriveList(function (LogicalDriveList) {
                    resolve(LogicalDriveList);
                });
            });
        _fswin.getLogicalDriveList(function (LogicalDriveList) {
            CallBack(LogicalDriveList);
        });
    }
    /**
     * 获取所有磁盘号和设备类型  同步
     * @returns
     */
    getLogicalDriveListSync = _fswin.getLogicalDriveListSync;
    /**
    * 获取设备驱动ID 异步
    * @param id 盘号
    * @param CallBack  回调
    */
    getDriveDevice(id, CallBack) {
        if (!CallBack)
            return new Promise(function (resolve, reject) {
                _fswin.getDriveDevice(id, function (DriveDevice) {
                    resolve(DriveDevice);
                });
            });
        _fswin.getDriveDevice(id, function (DriveDevice) {
            CallBack(DriveDevice);
        });
    }
    /**
     * 获取设备驱动ID 同步
     * @param id 盘号
     */
    getDriveDeviceSync = _fswin.getDriveDeviceSync;
    /**
     * 获取存储设备驱动信息 异步
     * @param id 盘号/设备ID
     * @param Callback 回调
     */
    getDeviceCapabilities = _fswin.getDeviceCapabilities;
    /**
     * 获取存储设备驱动信息 同步
     * @param id 盘号/设备ID
     */
    getDeviceCapabilitiesSync = _fswin.getDeviceCapabilitiesSync;
    /**
     * 版本号
     */
    version = _fswin.version;
    /**
     * 分割路径
     * @param Path 路径
     */
    splitPath = _fswin.splitPath;
    /**
     * 搜索文件 异步
     * https://docs.microsoft.com/zh-cn/windows/win32/fileio/searching-for-one-or-more-files
     * @param pathToFind 路径+通配符
     * @param Callback 回调函数
     * @param isProgressiveMode 是否使用渐进式模式（每次回调）
     * ```ts
     *
     * //使用渐进式
     * fswin.Find('c:\\windows\\system32\\*',(event: FindEvent, message: FindSystemFileAttributesW)=>{
     * },true)
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
    find = _fswin.find;
    /**
     * 搜索文件
     * https://docs.microsoft.com/zh-cn/windows/win32/fileio/searching-for-one-or-more-files
     * @param pathToFind 路径+通配符
     * ```ts
     * let FindData:FindSystemFileAttributesW[] = fswin.findSync('c:\\windows\\system32\\*')
     *
     * let FindData:number = fswin.findSync('c:\\windows\\system32\\*',(message:FindSystemFileAttributesW)=>{})
     * ```
     */
    findSync = _fswin.findSync;
    /**
     * 通过驱动id获取驱动器的属性(超详细) 异步
     * @param id 盘号/设备ID
     * @param Callback 回调
     */
    getStorageProperties = _fswin.getStorageProperties;
    /**
     * 通过驱动id获取驱动器的属性(超详细) 同步
     * @param id 盘号/设备ID
     */
    getStoragePropertiesSync = _fswin.getStoragePropertiesSync;
    /**
     *  获取磁盘基础信息 异步
     *  @param Path 根目录
     *  @param CallBack 回调
     */
    getVolumeInformation = _fswin.getVolumeInformation;
    /**
     *获取磁盘基础信息 同步
     *  @param Path 根目录
     */
    getVolumeInformationSync = _fswin.getVolumeInformationSync;
    /**
     * 获取存储使用情况（字节） 异步
     * @param path 根目录
     * @param CallBack  回调
     */
    getVolumeSpace = _fswin.getVolumeSpace;
    /**
     * 获取存储使用情况（字节）同步
     * @param path 根目录
     */
    getVolumeSpaceSync = _fswin.getVolumeSpaceSync;
    /**
     * 设置卷名
     * @param path 路径
     * @param label 标记卷的字符串
     * @param callback 回调
     */
    setVolumeLabel = _fswin.setVolumeLabel;
    /**
     * 设置卷名
     * @param path 路径
     * @param label 标记卷的字符串
     */
    setVolumeLabelSync = _fswin.setVolumeLabelSync;
    /**
     *设置原始文件特性常量  异步
     * @param pathToFileOrDir 路径
     * @param attributes 原始文件特性常量
     * @returns
     */
    setAttributes = _fswin.setAttributes;
    /**
     *设置原始文件特性常量  同步
     * @param pathToFileOrDir 路径
     * @param attributes 原始文件特性常量
     * @returns
     */
    setAttributesSync = _fswin.setAttributesSync;
    /**
     * 弹出可移动磁盘 异步
     * @param letter 盘符
     * @param method 弹出方法
     * - 0 一般方法 调用的DeviceIoControl. 这种方法很简单，并且在 cdrom 上效果很好。
     * - 1 适用于可移动磁盘  调用的是：用CM_Request_Device_EjectW或CM_Query_And_Remove_SubTreeW
     * - 2 使用程序调用弹出  调用的是：HotPlug.dll的HotPlugEjectDevice
     * @param callback   回调
     */
    ejectDrive = _fswin.ejectDrive;
    /**
     * 弹出可移动磁盘 异步
     * @param letter 盘符
     * @param method 弹出方法
     * - 0 一般方法 调用的DeviceIoControl. 这种方法很简单，并且在 cdrom 上效果很好。
     * - 1 适用于可移动磁盘  调用的是：用CM_Request_Device_EjectW或CM_Query_And_Remove_SubTreeW
     * - 2 使用程序调用弹出  调用的是：HotPlug.dll的HotPlugEjectDevice
     */
    ejectDriveSync = _fswin.ejectDriveSync;
    /**
     * 只支持NTFS文件系统操作
     */
    ntfs = {
        /**
           * 设置/删除短名称 (需要管理员权限)
           * @param pathToSet 路径
           * @param newShortName 新的名称
           * @param callback 回调
           */
        setShortName: _fswin.ntfs.setShortName,
        /**
         * 设置/删除短名称 (需要管理员权限)
         * @param pathToSet 路径
         * @param newShortName 新的名称
         */
        setShortNameSync: _fswin.ntfs.setShortNameSync,
        /**
         * 获取NTFS压缩文件后的在磁盘大小 如果不存在或者没有此文件将返回0  如果一致将返回相同的值
         * @param Path 路径
         * @param CallBack 回调
         */
        getCompressedSize: _fswin.ntfs.getCompressedSize,
        /**
         * 获取NTFS压缩文件后的在磁盘大小 如果不存在或者没有此文件将返回0  如果一致将返回相同的值
         * @param Path 路径
         */
        getCompressedSizeSync: _fswin.ntfs.getCompressedSizeSync,
        /**
         * 压缩或解压缩 NTFS 卷上的文件或目录。  异步
         * @param fileOrDir 路径
         * @param callback 回调
         * @param compress 压缩还是解压缩
         * @param create 不存在时是否创建新文件
         */
        setCompression: _fswin.ntfs.setCompression,
        /**
         * 压缩或解压缩 NTFS 卷上的文件或目录。  同步
         * @param fileOrDir 路径
         * @param compress 压缩还是解压缩
         * @param create 不存在时是否创建新文件
         */
        setCompressionSync: _fswin.ntfs.setCompressionSync,
        /**
         * 向 NTFS 卷上的文件添加稀疏属性  异步
         * @param file 路径
         * @param callback 回调
         * @param create 没有该文件是否新建
         */
        setSparse: _fswin.ntfs.setSparse,
        /**
         * 向 NTFS 卷上的文件添加稀疏属性  异步
         * @param file 路径
         * @param create 没有该文件是否新建
         */
        setSparseSync: _fswin.ntfs.setSparseSync,
    };
}
let fswin = new StructureFswin();
exports.fswin = fswin;
exports.default = fswin;
class FileSystemQuickApi {
    __QuickApi;
    __Path;
    constructor(QuickApi) {
        this.__QuickApi = QuickApi;
        this.__Path = QuickApi.path;
    }
    /**获取文件大小 */
    size(callback) {
        if (callback) {
            fswin.size(this.__Path, callback);
            return;
        }
        return fswin.size(this.__Path);
    }
    /**
      * 删除此文件
      * @param callback
      * @returns
      */
    remove(callback) {
        return fs_extra_1.default.remove(this.__Path, callback || undefined);
    }
}
class QuickApi {
    _Path = "";
    _FileSystemFast;
    NotFile;
    /**获取当前操作的路径 */
    get path() {
        return this._Path;
    }
    /**获取文件名 不包含后缀 */
    get name() {
        return path_1.default.parse(this._Path).name;
    }
    /**获取文件全名 例: name.cpp */
    get base() {
        return path_1.default.basename(this._Path);
    }
    /**获取文件夹 */
    get dir() {
        return path_1.default.parse(this._Path).dir;
    }
    /**获取后缀(包含.) 例: .jpg */
    get ext() {
        return path_1.default.extname(this._Path);
    }
    /**返回格式化后的文件 */
    get resolve() {
        return path_1.default.resolve(this._Path);
    }
    /**对比输入的路径和此文件路径是否一致 */
    diff(Path) {
        return path_1.default.resolve(Path) == path_1.default.resolve(this._Path);
    }
    /**文件快速操作的API */
    get fs() {
        if (this.NotFile == true)
            return undefined;
        if (!this._FileSystemFast)
            this._FileSystemFast = new FileSystemQuickApi(this);
        return this._FileSystemFast;
    }
    /**获取文件大小 */
    get size() {
        return fswin.sizeSync(this._Path);
    }
    constructor(Path) {
        this._Path = Path || "";
        _fswin.getAttributes(Path, (Attributes) => {
            if (!Attributes)
                this.NotFile = true;
            else
                this.NotFile = false;
        });
    }
}
//# sourceMappingURL=index.js.map