declare let fswin: FileSystemWin32Api | null;
export { fswin };
export default fswin;
declare type FileSystemWin32Api = {
    /**
     * 监听文件夹中的变化
     * @param dirToWatch 观察链接/文件夹
     * @param callback 回调
     * @param options 配置
     */
    dirWatcher: typeof FileSystemWin32Apis.dirWatcher;
} & typeof FileSystemWin32Apis;
export declare namespace FileSystemWin32Apis {
    class dirWatcher {
        /**
         * 监听文件夹中的变化
         * @param dirToWatch 观察链接/文件夹
         * @param callback 回调
         * @param options 配置
         */
        constructor(dirToWatch: string, callback: (Events: DirWatcherEventName, Message: DirWatcherMessage) => void | dirWatcherCallBackList, options: DirWatcherOptions);
        /**移除观察器 */
        close(): boolean;
    }
    /**
     * 版本号
     */
    const version: string;
    /**分割路径 */
    function splitPath(Path: string): {
        NAME: string;
        PARENT: string;
    };
    /**
     * 异步：格式化操作系统支持的短链接恢复为正常链接（并判断文件是否存在）
     * @param pathToConvert 获取的路径
     * @param CallBack 回调函数
     * @param Resolve 是否格式化
     * @returns ConvertResult
     * - 文件存在：string
     * - 文件不存在：null
     */
    function convertPath(pathToConvert: string, CallBack: (Mess: ConvertResult | null) => void, Resolve: boolean): void;
    /**
     * 同步：格式化操作系统支持的短链接恢复为正常链接（并判断文件是否存在）
     * @param pathToConvert 获取的路径
     * @param Resolve 是否格式化
     * @returns ConvertResult
     * - 文件存在：string
     * - 文件不存在：null
     */
    function convertPathSync(pathToConvert: string, Resolve: boolean): ConvertResult | null;
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
    function find(pathToFind: string, Callback: (event: FindEvent, message: FindSystemFileAttributesW) => void, isProgressiveMode: true): any;
    function find(pathToFind: string, Callback: (message: FindSystemFileAttributesW[]) => void, isProgressiveMode?: boolean): any;
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
    function findSync(pathToFind: string): string[];
    function findSync(pathToFind: string, Callback: () => void): number;
    function findSync(pathToFind: string, Callback?: () => void): number | string[];
    /**
     * 获取所有磁盘号和设备类型  异步
     * @param CallBack 回调
     * @returns
     */
    function getLogicalDriveList(CallBack: (Data: LogicalDriveList) => void): void;
    /**
     * 获取所有磁盘号和设备类型  同步
     * @returns
     */
    function getLogicalDriveListSync(): LogicalDriveList;
    /**
     * 获取设备驱动ID 异步
     * @param id 盘号
     * @param CallBack  回调
     */
    function getDriveDevice(id: EjectDrive_Letter, CallBack: (DriveStDevice: DriveStDevice | null) => void): void;
    /**
     * 获取设备驱动ID 同步
     * @param id 盘号
     */
    function getDriveDeviceSync(id: EjectDrive_Letter): DriveStDevice | null;
    /**
     * 获取存储设备驱动信息 异步
     * @param id 盘号/设备ID
     * @param Callback 回调
     */
    function getDeviceCapabilities(id: GetStorageProperties_ID, Callback: (CM_DEVCAP: CM_DEVCAP | null) => void): void;
    /**
     * 获取存储设备驱动信息 同步
     * @param id 盘号/设备ID
     */
    function getDeviceCapabilitiesSync(id: GetStorageProperties_ID): CM_DEVCAP | null;
    /**
     * 通过驱动id获取驱动器的属性(超详细) 异步
     * @param id 盘号/设备ID
     * @param Callback 回调
     */
    function getStorageProperties(id: GetStorageProperties_ID, Callback: (CM_DEVCAP: StoragePropertiesData | null) => void): void;
    /**
     * 通过驱动id获取驱动器的属性(超详细) 同步
     * @param id 盘号/设备ID
     */
    function getStoragePropertiesSync(id: GetStorageProperties_ID): StoragePropertiesData | null;
    /**
     *  获取磁盘基础信息 异步
     *  @param Path 根目录
     *  @param CallBack 回调
     */
    function getVolumeInformation(Path: string, CallBack: (VolumeInformation: VolumeInformation | null) => void): void;
    /**
     *获取磁盘基础信息 同步
     *  @param Path 根目录
     */
    function getVolumeInformationSync(Path: string): VolumeInformation | null;
    /**
     * 获取存储使用情况（字节） 异步
     * @param path 根目录
     * @param CallBack  回调
     */
    function getVolumeSpace(path: string, CallBack: (VolumeSpace: VolumeSpace | null) => void): void;
    /**
     * 获取存储使用情况（字节）同步
     * @param path 根目录
     */
    function getVolumeSpaceSync(path: string): VolumeSpace | null;
    /**
     * 设置卷名
     * @param path 路径
     * @param label 标记卷的字符串
     * @param callback 回调
     */
    function setVolumeLabel(path: string, label: string, callback: (result: boolean) => void): void;
    /**
     * 设置卷名
     * @param path 路径
     * @param label 标记卷的字符串
     */
    function setVolumeLabelSync(path: string, label: string): boolean;
    /**
     * 获取原始文件特性常量  异步
     * @param Path 路径
     * @param CallBack  回调
     * @returns
     */
    function getAttributes(Path: string, CallBack: (Attributes: SystemFileAttributesW | null) => void): void;
    /**
     * 获取原始文件特性常量  同步
     * @param Path 路径
     * @returns
     */
    function getAttributesSync(Path: string): SystemFileAttributesW | null;
    /**
     *设置原始文件特性常量  异步
     * @param pathToFileOrDir 路径
     * @param attributes 原始文件特性常量
     * @returns
     */
    function setAttributes(pathToFileOrDir: string, attributes: SystemFileAttributesW, callback: (info: boolean) => void): any;
    /**
     *设置原始文件特性常量  同步
     * @param pathToFileOrDir 路径
     * @param attributes 原始文件特性常量
     * @returns
     */
    function setAttributesSync(pathToFileOrDir: string, attributes: SystemFileAttributesW): any;
    /**
     * 弹出可移动磁盘 异步
     * @param letter 盘符
     * @param method 弹出方法
     * - 0 一般方法 调用的DeviceIoControl. 这种方法很简单，并且在 cdrom 上效果很好。
     * - 1 适用于可移动磁盘  调用的是：用CM_Request_Device_EjectW或CM_Query_And_Remove_SubTreeW
     * - 2 使用程序调用弹出  调用的是：HotPlug.dll的HotPlugEjectDevice
     * @param callback   回调
     */
    function ejectDrive(letter: EjectDrive_Letter, method: 0 | 1 | 2, callback: (info: boolean) => void): void;
    /**
     * 弹出可移动磁盘 异步
     * @param letter 盘符
     * @param method 弹出方法
     * - 0 一般方法 调用的DeviceIoControl. 这种方法很简单，并且在 cdrom 上效果很好。
     * - 1 适用于可移动磁盘  调用的是：用CM_Request_Device_EjectW或CM_Query_And_Remove_SubTreeW
     * - 2 使用程序调用弹出  调用的是：HotPlug.dll的HotPlugEjectDevice
     */
    function ejectDriveSync(letter: EjectDrive_Letter, method: 0 | 1 | 2): any;
    /**
     * 只支持NTFS文件系统操作
     */
    const ntfs: {
        /**
         * 设置/删除短名称 (需要管理员权限)
         * @param pathToSet 路径
         * @param newShortName 新的名称
         * @param callback 回调
         */
        setShortName(pathToSet: string, newShortName?: string, callback?: (succeeded: boolean) => void): void;
        /**
         * 设置/删除短名称 (需要管理员权限)
         * @param pathToSet 路径
         * @param newShortName 新的名称
         */
        setShortNameSync(pathToSet: string, newShortName?: string): boolean;
        /**
         * 获取NTFS压缩文件后的在磁盘大小 如果不存在或者没有此文件将返回0  如果一致将返回相同的值
         * @param Path 路径
         * @param CallBack 回调
         */
        getCompressedSize(Path: string, CallBack: (CompressedSizeInfo: number) => void): void;
        /**
         * 获取NTFS压缩文件后的在磁盘大小 如果不存在或者没有此文件将返回0  如果一致将返回相同的值
         * @param Path 路径
         */
        getCompressedSizeSync(Path: string): number;
        /**
         * 压缩或解压缩 NTFS 卷上的文件或目录。  异步
         * @param fileOrDir 路径
         * @param callback 回调
         * @param compress 压缩还是解压缩
         * @param create 不存在时是否创建新文件
         */
        setCompression(fileOrDir: string, callback: (succeeded: boolean) => void, compress?: boolean, create?: boolean): void;
        /**
         * 压缩或解压缩 NTFS 卷上的文件或目录。  同步
         * @param fileOrDir 路径
         * @param compress 压缩还是解压缩
         * @param create 不存在时是否创建新文件
         */
        setCompressionSync(fileOrDir: string, compress?: boolean, create?: boolean): boolean;
        /**
         * 向 NTFS 卷上的文件添加稀疏属性  异步
         * @param file 路径
         * @param callback 回调
         * @param create 没有该文件是否新建
         */
        setSparse(file: string, callback: (succeeded: boolean) => void, create?: boolean): void;
        /**
         * 向 NTFS 卷上的文件添加稀疏属性  异步
         * @param file 路径
         * @param create 没有该文件是否新建
         */
        setSparseSync(file: string, create?: boolean): boolean;
    };
    /**
     * 磁盘驱动名称
     */
    type GetStorageProperties_ID = "\\\\?\\PhysicalDrive0" | "\\\\?\\PhysicalDrive1" | "\\\\?\\PhysicalDrive2" | "\\\\?\\PhysicalDrive3" | "\\\\?\\PhysicalDrive4" | "\\\\?\\PhysicalDrive5" | "\\\\?\\PhysicalDrive6" | "\\\\?\\PhysicalDrive7" | "\\\\?\\PhysicalDrive8" | "\\\\?\\PhysicalDrive9" | "\\\\?\\PhysicalDrive10" | "\\\\?\\PhysicalDrive11" | "\\\\?\\PhysicalDrive13" | "\\\\?\\PhysicalDrive12" | string;
    /**
     * @key 磁盘盘号
     * @value 类型
     * - "REMOVABLE" 可移动设备
     * - "FIXED"  磁盘
     */
    type LogicalDriveList = {
        [K in Uppercase<EjectDrive_Letter>]: "FIXED" | "REMOVABLE";
    }[];
    /**盘号 */
    type EjectDrive_Letter = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "J" | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" | "T" | "U" | "V" | "W" | "X" | "Y" | "Z" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "j" | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t" | "u" | "v" | "w" | "x" | "y" | "z";
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
    type DirWatcherRenamedMessage = {
        NEW_NAME: string;
        OLD_NAME: string;
    };
    /**
     * 文件系统观察器可选配置
     */
    type DirWatcherOptions = {
        /**深度监听目录树 */
        WATCH_SUB_DIRECTORIES?: boolean;
        /**观察文件大小更改 */
        CHANGE_FILE_SIZE?: boolean;
        /**观察文件修改时间(文件修改时间变更了) */
        CHANGE_LAST_WRITE?: boolean;
        /**观察文件查看时间(文件查看时间变更了) */
        CHANGE_LAST_ACCESS?: boolean;
        /**观察文件创建时间更改 */
        CHANGE_CREATION?: boolean;
        /**观察文件属性更改 */
        CHANGE_ATTRIBUTES?: boolean;
        /**监视安全组(security)更改 */
        CHANGE_SECUTITY?: boolean;
    };
    /**
     * 磁盘内存情况
     */
    type VolumeSpace = {
        /**可用(字节) */
        FREE: number;
        /**已用(字节)  */
        TOTAL: number;
    } | null;
    type VolumeInformation = {
        /**标签 */
        LABEL: string;
        /**文件系统 */
        FILESYSTEM: "NTFS" | "FAT" | "exFAT" | "Ext2" | "Ext3";
        /**由制造商分配的号来识别物理介质 */
        SERIALNUMBER: number;
        /**RAW 标记 */
        RAW_FLAGS: number;
        /**大小写敏感的搜索 */
        CASE_SENSITIVE_SEARCH: boolean;
        /**保留大小写的名称 */
        CASE_PRESERVED_NAMES: boolean;
        /**磁盘上存在unicode字符 */
        UNICODE_ON_DISK: boolean;
        /**持久性数据 */
        PERSISTENT_ACLS: boolean;
        /**文件压缩 */
        FILE_COMPRESSION: boolean;
        /**卷配额*/
        VOLUME_QUOTAS: boolean;
        /**返回清理结果信息 */
        RETURNS_CLEANUP_RESULT_INFO: boolean;
        /**体积被压缩 */
        VOLUME_IS_COMPRESSED: boolean;
        /**是否支持命名流 */
        NAMED_STREAMS: boolean;
        /**只读卷|(写保护) */
        READ_ONLY_VOLUME: boolean;
        /**顺序编写 */
        SEQUENTIAL_WRITE_ONCE: boolean;
        /**DAX卷 */
        DAX_VOLUME: boolean;
        /**支持稀疏文件 */
        SUPPORTS_SPARSE_FILES: boolean;
        /**支持重新解析点 */
        SUPPORTS_REPARSE_POINTS: boolean;
        /**支持远程存储 */
        SUPPORTS_REMOTE_STORAGE: boolean;
        /**支持posix解除链接重命名 */
        SUPPORTS_POSIX_UNLINK_RENAME: boolean;
        /**支持绕过IO */
        SUPPORTS_BYPASS_IO: boolean;
        /**支持对象id */
        SUPPORTS_OBJECT_IDS: boolean;
        /**支持加密 */
        SUPPORTS_ENCRYPTION: boolean;
        /**支持事务处理 */
        SUPPORTS_TRANSACTIONS: boolean;
        /**支持硬链接 */
        SUPPORTS_HARD_LINKS: boolean;
        /**支持扩展属性 */
        SUPPORTS_EXTENDED_ATTRIBUTES: boolean;
        /**支持按文件id打开 */
        SUPPORTS_OPEN_BY_FILE_ID: boolean;
        /**支持USN日志 */
        SUPPORTS_USN_JOURNAL: boolean;
        /**支持完整的流 */
        SUPPORTS_INTEGRITY_STREAMS: boolean;
        /**文件支持块重新计数 */
        SUPPORTS_BLOCK_REFCOUNTING: boolean;
        /**支持稀疏文件高频数据链 */
        SUPPORTS_SPARSE_VDL: boolean;
        /**支持镜像映射 */
        SUPPORTS_GHOSTING: boolean;
    } | null;
    type DriveStDevice = {
        /**指示此设备的数量。 对于表示 MPIO 磁盘的物理路径的磁盘，此值设置为 0xFFFFFFFF (-1) */
        deviceNumber: number;
        /**设备路径(设备信息的路径) */
        devicePath: string;
        /**设备ID */
        deviceId: string;
        /**此设备的父设备 ID  */
        parentDeviceId: string;
    };
    /**
     * 获取磁盘设备信息
     * https://docs.microsoft.com/zh-cn/windows/win32/api/setupapi/nf-setupapi-setupdigetdeviceregistrypropertya
     */
    type CM_DEVCAP = {
        /**设备是否支持锁定 */
        LOCK_SUPPORTED: boolean;
        /**支持弹出 */
        EJECT_SUPPORTED: boolean;
        /**可删除设备(U盘 不包含可移动硬盘) */
        REMOVABLE: boolean;
        /**设备是否支持悬挂 */
        DOCK_DEVICE: boolean;
        /**设备的实例 ID 在系统范围内是否唯一 */
        UNIQUE_ID: boolean;
        /**静默安装 */
        SILENT_INSTALL: boolean;
        /**没有功能驱动程序(例如,SCSI 设备处于通路模式) */
        RAW_DEVICE_OK: boolean;
        /**是否支持突然拔出(热拔出) */
        SURPRISE_REMOVAL_OK: boolean;
        /**硬件是否是屏蔽的 */
        HARDWARE_DISABLED: boolean;
        /**留待将来使用 */
        NON_DYNAMIC: boolean;
    };
    /**
     * 存储属性数据
     */
    type StoragePropertiesData = {
        /**访问对齐属性 */
        accessAlignmentProperty: {
            /**每条缓存线字节数 */
            bytesPerCacheLine: number;
            /**字节偏移缓存对齐 */
            bytesOffsetForCacheAlignment: number;
            /**每个逻辑扇区字节数*/
            bytesPerLogicalSector: number;
            /**每个物理扇区的字节数 */
            bytesPerPhysicalSector: number;
            /**扇区对齐的字节偏移量 */
            bytesOffsetForSectorAlignment: number;
        };
        /**适配器属性 */
        adapterProperty: {
            /**最大传输长度 */
            maximumTransferLength: number;
            /**最大物理页 */
            maximumPhysicalPages: number;
            /**定位标记 */
            alignmentMask: number;
            /**适配器使用Pio */
            adapterUsesPio: boolean;
            /**适配器扫描 */
            adapterScansDown: boolean;
            /**指令队列 */
            commandQueueing: boolean;
            /**快速移动 */
            acceleratedTransfer: boolean;
            /**总线主版本 */
            busMajorVersion: number;
            /**总线次要版本 */
            busMinorVersion: number;
            /**总线类型 */
            busType: "SATA" | "NVMe" | "USB";
            /**srb类型 */
            srbType: string;
            /**地址类型 */
            addressType: string;
        };
        /**适配器Rpmb属性 */
        adapterRpmbProperty: {
            /**大小（以字节为单位） */
            sizeInBytes: number;
            /**最大可靠写入大小（以字节为单位） */
            maxReliableWriteSizeInBytes: number;
            /**帧格式 */
            frameFormat: number;
        };
        /**设备副本卸载属性 */
        deviceCopyOffloadProperty: {
            /**默认令牌生存期 */
            defaultTokenLifetime: number;
            /**最大数据描述符 */
            maximumDataDescriptors: number;
            /**最大令牌生存期 */
            maximumTokenLifetime: number;
            /**每个描述符的最大传输长度 */
            maximumTransferLengthPerDescriptor: number;
            /**最大传输大小 */
            maximumTransferSize: bigint;
            /**最佳转移计数 */
            optimalTransferCount: bigint;
            /**最佳传输长度粒度 */
            optimalTransferLengthGranularity: number;
            /**最佳传输长度描述符 */
            optimalTransferLengthPerDescriptor: number;
        };
        /**设备Io能力属性 */
        deviceIoCapabilityProperty: {
            /**lun最大Io计数 */
            lunMaxIoCount: number;
            /**适配器最大Io计数 */
            adapterMaxIoCount: number;
        };
        /**设备LB配置属性 */
        deviceLBProvisioningProperty: {
            /**固定支持 */
            anchorSupported: boolean;
            /**获得支持的可用空间 */
            getFreeSpaceSupported: boolean;
            /**映射支持 */
            mapSupported: boolean;
            /**max取消映射块描述符计数 */
            maxUnmapBlockDescriptorCount: number;
            /**最大取消映射Lba计数 */
            maxUnmapLbaCount: number;
            /**最优映射粒度 */
            optimalUnmapGranularity: bigint;
            /**启用精简资源调配 */
            thinProvisioningEnabled: boolean;
            /**精简配置读取零 */
            thinProvisioningReadZeros: boolean;
            /**取消映射粒度对齐 */
            unmapGranularityAlignment: bigint;
            /**取消映射粒度对齐有效 */
            unmapGranularityAlignmentValid: boolean;
        };
        /**设备介质产品类型 */
        deviceMediumProductType: number;
        /**设备电源属性 */
        devicePowerProperty: {
            /**支持的设备关注 */
            deviceAttentionSupported: boolean;
            /**支持异步通知 */
            asynchronousNotificationSupported: boolean;
            idlePowerManagementEnabled: boolean;
            /**d3冷启动 */
            d3ColdEnabled: boolean;
            /**d3冷支持 */
            d3ColdSupported: boolean;
            /**闲置功率期间无验证 */
            noVerifyDuringIdlePower: boolean;
            /**空闲时间 */
            idleTimeoutInMS: number;
        };
        /**设备属性 */
        deviceProperty: {
            /**设备类型 */
            deviceType: number;
            /**设备类型修改器 */
            deviceTypeModifier: number;
            /**设备连接类型 */
            busType: "SATA" | "NVMe" | "USB";
            /**指令队列 */
            commandQueueing: boolean;
            /**可移除设备 */
            removableMedia: boolean;
            /**产品ID */
            productId: string;
            /**产品修订版本 */
            productRevision: string;
            /**序列号 */
            serialNumber: string;
        };
        /**设备拦截搜索 */
        deviceSeekPenalty: boolean;
        /**设备微调 */
        deviceTrim: boolean;
        /**设备写缓存属性 */
        deviceWriteCacheProperty: {
            /**类型 */
            type: string;
            /**已启用 */
            isEnabled: string;
            /**可以变更 */
            isChangeable: string;
            /**支持直写 */
            isWriteThroughSupported: string;
            /**支持刷新缓存 */
            flushCacheSupported: boolean;
            /**用户定义的电源保护 */
            userDefinedPowerProtection: boolean;
            /**NV缓存已启用 */
            NVCacheEnabled: boolean;
        };
    };
    /**
     * 文件特性常量
     * https://docs.microsoft.com/en-us/windows/win32/fileio/file-attribute-constants
     */
    type SystemFileAttributesW = {
        /**创建时间*/
        CREATION_TIME: "2022-04-12T05:45:45.469Z" | string;
        /**上次访问时间*/
        LAST_ACCESS_TIME: "2022-05-24T16:48:35.685Z" | string;
        /**上次写入时间*/
        LAST_WRITE_TIME: "2022-05-24T14:18:02.948Z" | string;
        /**文件大小字节*/
        SIZE: number;
        /**软硬链接数*/
        LINK_COUNT: number;
        /**原始属性数 */
        RAW_ATTRIBUTES: number;
        /**是否存档 */
        IS_ARCHIVED: boolean;
        /**是否启用压缩  例如NTFS压缩*/
        IS_COMPRESSED: boolean;
        /**是否是设备 */
        IS_DEVICE: boolean;
        /**是否是目录 */
        IS_DIRECTORY: boolean;
        /**是否启用加密 */
        IS_ENCRYPTED: boolean;
        /**文件被隐藏 */
        IS_HIDDEN: boolean;
        /**未编制内容索引 */
        IS_NOT_CONTENT_INDEXED: boolean;
        /**是否脱机 */
        IS_OFFLINE: boolean;
        /**是否为只读 */
        IS_READ_ONLY: boolean;
        /**稀疏文件(申明需要的大小 实际已用大小未达到此数量) */
        IS_SPARSE_FILE: boolean;
        /**是否归属于系统 */
        IS_SYSTEM: boolean;
        /**是否是临时文件 */
        IS_TEMPORARY: boolean;
        /**完整性的流 */
        IS_INTEGRITY_STREAM: boolean;
        /**没有被完整的数据 被完整性测试所排查 */
        IS_NO_SCRUB_DATA: boolean;
        /**该文件并不完全存在，有可能无法访问 或者该数据在远程位置 */
        IS_RECALL_ON_DATA_ACCESS: boolean;
        /**此属性仅在目录枚举类 */
        IS_RECALL_ON_OPEN: boolean;
        /**此值保留供系统使用 */
        IS_VIRTUAL: boolean;
        /**#define FILE_ATTRIBUTE_EA                   0x00040000 */
        IS_EA: boolean;
        /**该文件被锁定 */
        IS_PINNED: boolean;
        /**该文件取消锁定 */
        IS_UNPINNED: boolean;
        /**具有关联的重新分析点的文件或目录，或作为符号链接的文件 */
        IS_REPARSE_POINT: boolean;
    };
    /**
     * Find函数回调文件特性常量
     * https://docs.microsoft.com/en-us/windows/win32/fileio/file-attribute-constants
     */
    type FindSystemFileAttributesW = {
        /**文件名(含后缀) */
        LONG_NAME: string;
        /**简称 例如：C:\\PROGRA~1 */
        SHORT_NAME: string;
        /**重新分析点标记 */
        REPARSE_POINT_TAG: string;
    } & SystemFileAttributesW & {
        /**软硬链接数(不存在)*/
        LINK_COUNT?: number;
        /**具有关联的重新分析点的文件或目录，或作为符号链接的文件(不存在) */
        IS_REPARSE_POINT?: boolean;
    };
    /**
     * 搜索时候产生的事件名
     * - FOUND 已找到
     * - SUCCEEDED 成功(完成)
     * - FAILED 失败
     * - INTERRUPTED 中断
     */
    type FindEvent = "FOUND" | "SUCCEEDED" | "FAILED" | "INTERRUPTED";
    /**格式化短链接返回 */
    type ConvertResult = null | string;
    type dirWatcherCallBackList = ((event: "ERROR", message: DirWatcherErrorMessage) => void) | ((event: "RENAMED", message: DirWatcherRenamedMessage) => void) | ((event: "ENDED", message: string) => void) | ((event: "MODIFIED", message: string) => void) | ((event: "REMOVED", message: string) => void) | ((event: "ADDED", message: string) => void) | ((event: "MOVED", message: DirWatcherRenamedMessage) => void) | ((event: "STARTED", message: string) => void);
}
export declare let version: string, dirWatcher: typeof FileSystemWin32Apis.dirWatcher, splitPath: typeof FileSystemWin32Apis.splitPath, convertPath: typeof FileSystemWin32Apis.convertPath, convertPathSync: typeof FileSystemWin32Apis.convertPathSync, find: typeof FileSystemWin32Apis.find, findSync: typeof FileSystemWin32Apis.findSync, getLogicalDriveList: typeof FileSystemWin32Apis.getLogicalDriveList, getLogicalDriveListSync: typeof FileSystemWin32Apis.getLogicalDriveListSync, getDriveDevice: typeof FileSystemWin32Apis.getDriveDevice, getDriveDeviceSync: typeof FileSystemWin32Apis.getDriveDeviceSync, getDeviceCapabilities: typeof FileSystemWin32Apis.getDeviceCapabilities, getDeviceCapabilitiesSync: typeof FileSystemWin32Apis.getDeviceCapabilitiesSync, getStorageProperties: typeof FileSystemWin32Apis.getStorageProperties, getStoragePropertiesSync: typeof FileSystemWin32Apis.getStoragePropertiesSync, getVolumeInformation: typeof FileSystemWin32Apis.getVolumeInformation, getVolumeInformationSync: typeof FileSystemWin32Apis.getVolumeInformationSync, getVolumeSpace: typeof FileSystemWin32Apis.getVolumeSpace, getVolumeSpaceSync: typeof FileSystemWin32Apis.getVolumeSpaceSync, setVolumeLabel: typeof FileSystemWin32Apis.setVolumeLabel, setVolumeLabelSync: typeof FileSystemWin32Apis.setVolumeLabelSync, getAttributes: typeof FileSystemWin32Apis.getAttributes, getAttributesSync: typeof FileSystemWin32Apis.getAttributesSync, setAttributes: typeof FileSystemWin32Apis.setAttributes, setAttributesSync: typeof FileSystemWin32Apis.setAttributesSync, ejectDrive: typeof FileSystemWin32Apis.ejectDrive, ejectDriveSync: typeof FileSystemWin32Apis.ejectDriveSync, ntfs: {
    /**
     * 设置/删除短名称 (需要管理员权限)
     * @param pathToSet 路径
     * @param newShortName 新的名称
     * @param callback 回调
     */
    setShortName(pathToSet: string, newShortName?: string, callback?: (succeeded: boolean) => void): void;
    /**
     * 设置/删除短名称 (需要管理员权限)
     * @param pathToSet 路径
     * @param newShortName 新的名称
     */
    setShortNameSync(pathToSet: string, newShortName?: string): boolean;
    /**
     * 获取NTFS压缩文件后的在磁盘大小 如果不存在或者没有此文件将返回0  如果一致将返回相同的值
     * @param Path 路径
     * @param CallBack 回调
     */
    getCompressedSize(Path: string, CallBack: (CompressedSizeInfo: number) => void): void;
    /**
     * 获取NTFS压缩文件后的在磁盘大小 如果不存在或者没有此文件将返回0  如果一致将返回相同的值
     * @param Path 路径
     */
    getCompressedSizeSync(Path: string): number;
    /**
     * 压缩或解压缩 NTFS 卷上的文件或目录。  异步
     * @param fileOrDir 路径
     * @param callback 回调
     * @param compress 压缩还是解压缩
     * @param create 不存在时是否创建新文件
     */
    setCompression(fileOrDir: string, callback: (succeeded: boolean) => void, compress?: boolean, create?: boolean): void;
    /**
     * 压缩或解压缩 NTFS 卷上的文件或目录。  同步
     * @param fileOrDir 路径
     * @param compress 压缩还是解压缩
     * @param create 不存在时是否创建新文件
     */
    setCompressionSync(fileOrDir: string, compress?: boolean, create?: boolean): boolean;
    /**
     * 向 NTFS 卷上的文件添加稀疏属性  异步
     * @param file 路径
     * @param callback 回调
     * @param create 没有该文件是否新建
     */
    setSparse(file: string, callback: (succeeded: boolean) => void, create?: boolean): void;
    /**
     * 向 NTFS 卷上的文件添加稀疏属性  异步
     * @param file 路径
     * @param create 没有该文件是否新建
     */
    setSparseSync(file: string, create?: boolean): boolean;
};
