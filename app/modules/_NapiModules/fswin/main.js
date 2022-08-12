"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStoragePropertiesSync = exports.GetStorageProperties = exports.GetLogicalDriveList = exports.GetLogicalDriveListSync = exports.GetVolumeInformationSync = exports.GetVolumeInformation = exports.GetVolumeSpaceSync = exports.GetVolumeSpace = exports.GetDriveDeviceSync = exports.GetDriveDevice = exports.GetDeviceCapabilitiesSync = exports.GetDeviceCapabilities = exports.Find = exports.GetCompressedSizeSync = exports.GetCompressedSize = exports.GetAttributesSync = exports.GetAttributes = exports.Exist = exports.EjectDrive = exports.ExistResolvePathSync = exports.ExistResolvePath = void 0;
const fswin = process.platform === 'win32' ? require('./' + process.arch + '/fswin.node') : null;
class FsWinNsfw {
    /**每个监听内容的处理方法 */
    _HandleWatcher(event, message) {
        if (event === "RENAMED" && typeof message == "object") {
            message;
        }
        if (typeof message == "string") {
        }
    }
    _FswinNsfw;
    _AddHandleWatcher(..._flag) {
    }
    /**
     * 初始化监听器
     * @param dirToWatch 观察的路径
     * @param debounceMS (忽略该时间内的同样更新)|配置[可选]|是否深度监听
     * @param Options 配置[可选]
     */
    constructor(dirToWatch, debounceMS, Options) {
        if (!debounceMS)
            debounceMS = 500;
        if (typeof debounceMS == "object") {
            Options = debounceMS;
            debounceMS = 500;
        }
        ;
        let options = Object.assign({
            WATCH_SUB_DIRECTORIES: true,
            CHANGE_FILE_SIZE: true,
            CHANGE_LAST_WRITE: true,
            CHANGE_LAST_ACCESS: false,
            CHANGE_CREATION: false,
            CHANGE_ATTRIBUTES: false,
            CHANGE_SECUTITY: false
        }, Options || {});
        // 不存在该文件
        if (!dirToWatch || !(0, exports.ExistResolvePathSync)(dirToWatch))
            throw Error("Exists Not Watch Path");
        this._FswinNsfw = new fswin.dirWatcher(dirToWatch, (event, message) => { this._HandleWatcher(event, message); }, options);
        // this.on = (...flag) => { this._AddHandleWatcher(flag) };
    }
    /**
     * 停止监听器
     */
    close() {
        this._FswinNsfw.close();
    }
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
    ExistResolvePath(pathToConvert, CallBack, Resolve) {
        if (typeof CallBack === "boolean")
            Resolve = CallBack, CallBack = void 0;
        if (typeof Resolve !== "boolean")
            Resolve = true;
        if (!CallBack) {
            return new Promise(async function (resolve, _reject) {
                fswin.convertPath(pathToConvert, function (Result) {
                    resolve(Result);
                }, Resolve);
            });
        }
        ;
        fswin.convertPath(pathToConvert, function (Result) { CallBack && CallBack(Result); }, Resolve);
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
    ExistResolvePathSync(pathToConvert, Resolve) {
        if (typeof Resolve !== "boolean")
            Resolve = true;
        var result = fswin.convertPathSync(pathToConvert, Resolve);
        return result;
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
    EjectDrive(letter, method, callback) {
        let SetMethod = typeof method == "number" ? method : 0;
        if (typeof method === "function" || typeof callback === "function") {
            fswin.ejectDrive(letter, SetMethod, function (info) {
                if (typeof method === "function")
                    method(info);
                else if (typeof callback === "function")
                    callback(info);
            });
            return;
        }
        return new Promise(async function (resolve, _reject) {
            fswin.ejectDrive(letter, SetMethod, function (info) {
                resolve(info);
            });
        });
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
    Exist(Path, CallBack) {
        let { GetAttributes } = this;
        if (CallBack)
            return GetAttributes(Path, function (Attributes) {
                CallBack(Attributes ? true : false);
            }), void 0;
        return new Promise(async function (resolve, _reject) {
            GetAttributes(Path, function (Attributes) {
                resolve(Attributes ? true : false);
            });
        });
    }
    /**
     * 异步 获取原始文件特性常量
     * @param Path 路径
     * @param CallBack  回调|为空返回异步
     * @returns
     */
    GetAttributes(Path, CallBack) {
        if (CallBack)
            return fswin.getAttributes(Path, function (Attributes) {
                CallBack(Attributes);
            }), void 0;
        return new Promise(async function (resolve, _reject) {
            fswin.getAttributes(Path, function (Attributes) {
                resolve(Attributes);
            });
        });
    }
    /**
    * 同步 获取原始文件特性常量
    * @param Path 路径
    * @returns
    */
    GetAttributesSync = fswin.getAttributesSync;
    /**
     * 异步 获取NTFS压缩文件后的在磁盘大小 如果不存在或者没有此文件将返回0  如果一致将返回相同的值
     * @param Path 路径
     * @param CallBack 回调
     */
    GetCompressedSize(Path, CallBack) {
        if (CallBack)
            return fswin.ntfs.getCompressedSize(Path, function (CompressedSizeInfo) {
                CallBack(CompressedSizeInfo);
            }), void 0;
        return new Promise(async function (resolve, _reject) {
            fswin.ntfs.getCompressedSize(Path, function (CompressedSizeInfo) {
                resolve(CompressedSizeInfo);
            });
        });
    }
    /**
    * 获取NTFS压缩文件后的在磁盘大小 如果不存在或者没有此文件将返回0  如果一致将返回相同的值
    * @param Path 路径
    */
    GetCompressedSizeSync = fswin.ntfs.getCompressedSizeSync;
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
    Find(pathToFind, Callback, isProgressiveMode) {
        if (!Callback)
            return new Promise((resolve, _reject) => {
                fswin.find(pathToFind, function (FindData) {
                    resolve(FindData);
                }, true);
            });
        if (pathToFind && Callback)
            return fswin.find(pathToFind, Callback, isProgressiveMode || false);
    }
    /**
     * 获取存储设备驱动信息 异步
     * @param id 盘号/设备ID
     * @param Callback 回调|没有则返回异步
     */
    GetDeviceCapabilities(id, Callback) {
        if (!Callback) {
            if (id.length == 1) {
                return new Promise((resolve, _reject) => {
                    fswin.getDriveDevice(id, function (id) {
                        fswin.getDeviceCapabilities(id, function (data) {
                            resolve(data);
                        });
                    });
                });
            }
            return new Promise((resolve, reject) => {
                if (!id?.length)
                    return reject("Not Drive Id");
                fswin.getDeviceCapabilities(id, function (data) {
                    resolve(data);
                });
            });
        }
        if (id.length == 1) {
            fswin.getDriveDevice(id, function (id) {
                fswin.getDeviceCapabilities(id, function (data) {
                    Callback(data);
                });
            });
        }
        fswin.getDeviceCapabilities(id, function (data) {
            Callback(data);
        });
    }
    /**
    * 获取存储设备驱动信息 同步
    * @param id 盘号/设备ID
    */
    GetDeviceCapabilitiesSync(id) {
        // @ts-expect-error
        if (id && id.length == 1)
            id = this.GetDriveDeviceSync(id)?.parentDeviceId;
        return fswin.getDeviceCapabilitiesSync(id);
    }
    /**
     * 获取设备驱动ID 异步
     * @param id 盘号
     * @param CallBack  回调|没有则返回异步
     */
    GetDriveDevice(id, CallBack) {
        if (!CallBack) {
            return new Promise((resolve, _reject) => {
                fswin.getDeviceCapabilities(id, function (data) {
                    resolve(data);
                });
            });
        }
        fswin.getDeviceCapabilities(id, function (data) {
            CallBack(data);
        });
    }
    /**
     * 获取设备驱动ID 同步
     * @param id 盘号
     */
    GetDriveDeviceSync = fswin.getDeviceCapabilitiesSync;
    /**
     * 异步 获取存储使用情况（字节）
     * @param path 根目录
     * @param CallBack  回调|没有则返回异步
     */
    GetVolumeSpace(path, CallBack) {
        if (!CallBack) {
            return new Promise((resolve, _reject) => {
                fswin.getVolumeSpace(path, function (data) {
                    resolve(data);
                });
            });
        }
        fswin.getVolumeSpace(path, function (data) {
            CallBack(data);
        });
    }
    /**
     * 同步 获取存储使用情况（字节）
     * @param path 根目录
     */
    GetVolumeSpaceSync = fswin.getVolumeSpaceSync;
    /**
    *异步 获取磁盘基础信息
    *  @param Path 根目录
    *  @param CallBack 回调|没有则返回异步
    */
    GetVolumeInformation(Path, CallBack) {
        if (!CallBack) {
            return new Promise((resolve, _reject) => {
                fswin.getVolumeInformation(Path, function (data) {
                    resolve(data);
                });
            });
        }
        fswin.getVolumeInformation(Path, function (data) {
            CallBack(data);
        });
    }
    /**
     *同步 获取磁盘基础信息
     *  @param Path 根目录
     */
    GetVolumeInformationSync = fswin.getVolumeInformationSync;
    /**
     * 同步 获取所有磁盘号和设备类型
     * @returns
     */
    GetLogicalDriveListSync = fswin.getLogicalDriveListSync;
    /**
     * 异步 获取所有磁盘号和设备类型
     * @param CallBack 回调|没有则返回异步
     * @returns
     */
    GetLogicalDriveList(CallBack) {
        if (!CallBack) {
            return new Promise((resolve, _reject) => {
                fswin.getLogicalDriveList(function (data) {
                    resolve(data);
                });
            });
        }
        fswin.getLogicalDriveList(function (data) {
            CallBack(data);
        });
    }
    properties = {
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
    GetStoragePropertiesSync(ID) {
        if (typeof ID == "number")
            ID = `\\\\?\\PhysicalDrive${ID}`;
        return fswin.getStoragePropertiesSync(ID, this.properties);
    }
    /**
     * 通过驱动id获取驱动器的属性(超详细)
     * -  '\\\\?\\PhysicalDrive0'
     * ```ts
     *  let StorageProperties:StoragePropertiesData|null = await GetStorageProperties('\\\\?\\PhysicalDrive0');
     * ```
     */
    GetStorageProperties(ID, CallBack) {
        if (typeof ID == "number")
            ID = `\\\\?\\PhysicalDrive${ID}`;
        if (!CallBack) {
            return new Promise((resolve, _reject) => {
                fswin.getStorageProperties(ID, this.properties, function (data) {
                    resolve(data);
                });
            });
        }
        fswin.getStorageProperties(ID, this.properties, function (data) {
            CallBack(data);
        });
    }
}
_a = new FsWinApi(), exports.ExistResolvePath = _a.ExistResolvePath, exports.ExistResolvePathSync = _a.ExistResolvePathSync, exports.EjectDrive = _a.EjectDrive, exports.Exist = _a.Exist, exports.GetAttributes = _a.GetAttributes, exports.GetAttributesSync = _a.GetAttributesSync, exports.GetCompressedSize = _a.GetCompressedSize, exports.GetCompressedSizeSync = _a.GetCompressedSizeSync, exports.Find = _a.Find, exports.GetDeviceCapabilities = _a.GetDeviceCapabilities, exports.GetDeviceCapabilitiesSync = _a.GetDeviceCapabilitiesSync, exports.GetDriveDevice = _a.GetDriveDevice, exports.GetDriveDeviceSync = _a.GetDriveDeviceSync, exports.GetVolumeSpace = _a.GetVolumeSpace, exports.GetVolumeSpaceSync = _a.GetVolumeSpaceSync, exports.GetVolumeInformation = _a.GetVolumeInformation, exports.GetVolumeInformationSync = _a.GetVolumeInformationSync, exports.GetLogicalDriveListSync = _a.GetLogicalDriveListSync, exports.GetLogicalDriveList = _a.GetLogicalDriveList, exports.GetStorageProperties = _a.GetStorageProperties, exports.GetStoragePropertiesSync = _a.GetStoragePropertiesSync;
class dirWatcher {
    /**
     * 监听文件夹中的变化
     * @param _dirToWatch 观察链接/文件夹
     * @param _callback 回调
     * @param _options 配置
     */
    constructor(_dirToWatch, _callback, _options) { }
    /**移除观察器 */
    close() { }
}
//# sourceMappingURL=main.js.map