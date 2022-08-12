
export let system_error_codes = [
    {
        "code": 0,
        "code_bin": "0x0",
        "name": "ERROR_SUCCESS",
        "info": "The operation completed successfully.",
        "info_zh_cn": "操作已成功完成。"
    },
    {
        "code": 1,
        "code_bin": "0x1",
        "name": "ERROR_INVALID_FUNCTION",
        "info": "Incorrect function.",
        "info_zh_cn": "函数不正确。"
    },
    {
        "code": 2,
        "code_bin": "0x2",
        "name": "ERROR_FILE_NOT_FOUND",
        "info": "The system cannot find the file specified.",
        "info_zh_cn": "系统找不到指定的文件。"
    },
    {
        "code": 3,
        "code_bin": "0x3",
        "name": "ERROR_PATH_NOT_FOUND",
        "info": "The system cannot find the path specified.",
        "info_zh_cn": "系统找不到指定的路径。"
    },
    {
        "code": 4,
        "code_bin": "0x4",
        "name": "ERROR_TOO_MANY_OPEN_FILES",
        "info": "The system cannot open the file.",
        "info_zh_cn": "系统无法打开该文件。"
    },
    {
        "code": 5,
        "code_bin": "0x5",
        "name": "ERROR_ACCESS_DENIED",
        "info": "Access is denied.",
        "info_zh_cn": "拒绝访问。"
    },
    {
        "code": 6,
        "code_bin": "0x6",
        "name": "ERROR_INVALID_HANDLE",
        "info": "The handle is invalid.",
        "info_zh_cn": "该句柄无效。"
    },
    {
        "code": 7,
        "code_bin": "0x7",
        "name": "ERROR_ARENA_TRASHED",
        "info": "The storage control blocks were destroyed.",
        "info_zh_cn": "存储控制块被销毁。"
    },
    {
        "code": 8,
        "code_bin": "0x8",
        "name": "ERROR_NOT_ENOUGH_MEMORY",
        "info": "Not enough memory resources are available to process this command.",
        "info_zh_cn": "内存资源不足，无法处理此命令。"
    },
    {
        "code": 9,
        "code_bin": "0x9",
        "name": "ERROR_INVALID_BLOCK",
        "info": "The storage control block address is invalid.",
        "info_zh_cn": "存储控制块地址无效。"
    },
    {
        "code": 10,
        "code_bin": "0xA",
        "name": "ERROR_BAD_ENVIRONMENT",
        "info": "The environment is incorrect.",
        "info_zh_cn": "环境不正确。"
    },
    {
        "code": 11,
        "code_bin": "0xB",
        "name": "ERROR_BAD_FORMAT",
        "info": "An attempt was made to load a program with an incorrect format.",
        "info_zh_cn": "试图加载的程序的格式不正确。"
    },
    {
        "code": 12,
        "code_bin": "0xC",
        "name": "ERROR_INVALID_ACCESS",
        "info": "The access code is invalid.",
        "info_zh_cn": "访问代码无效。"
    },
    {
        "code": 13,
        "code_bin": "0xD",
        "name": "ERROR_INVALID_DATA",
        "info": "The data is invalid.",
        "info_zh_cn": "数据无效。"
    },
    {
        "code": 14,
        "code_bin": "0xE",
        "name": "ERROR_OUTOFMEMORY",
        "info": "Not enough storage is available to complete this operation.",
        "info_zh_cn": "没有足够的存储空间来完成此操作。"
    },
    {
        "code": 15,
        "code_bin": "0xF",
        "name": "ERROR_INVALID_DRIVE",
        "info": "The system cannot find the drive specified.",
        "info_zh_cn": "系统找不到指定的驱动器。"
    },
    {
        "code": 16,
        "code_bin": "0x10",
        "name": "ERROR_CURRENT_DIRECTORY",
        "info": "The directory cannot be removed.",
        "info_zh_cn": "无法删除目录。"
    },
    {
        "code": 17,
        "code_bin": "0x11",
        "name": "ERROR_NOT_SAME_DEVICE",
        "info": "The system cannot move the file to a different disk drive.",
        "info_zh_cn": "系统无法将文件移动到其他磁盘驱动器。"
    },
    {
        "code": 18,
        "code_bin": "0x12",
        "name": "ERROR_NO_MORE_FILES",
        "info": "There are no more files.",
        "info_zh_cn": "没有更多文件。"
    },
    {
        "code": 19,
        "code_bin": "0x13",
        "name": "ERROR_WRITE_PROTECT",
        "info": "The media is write protected.",
        "info_zh_cn": "媒体受写入保护。"
    },
    {
        "code": 20,
        "code_bin": "0x14",
        "name": "ERROR_BAD_UNIT",
        "info": "The system cannot find the device specified.",
        "info_zh_cn": "系统找不到指定的设备。"
    },
    {
        "code": 21,
        "code_bin": "0x15",
        "name": "ERROR_NOT_READY",
        "info": "The device is not ready.",
        "info_zh_cn": "设备未准备就绪。"
    },
    {
        "code": 22,
        "code_bin": "0x16",
        "name": "ERROR_BAD_COMMAND",
        "info": "The device does not recognize the command.",
        "info_zh_cn": "设备无法识别命令。"
    },
    {
        "code": 23,
        "code_bin": "0x17",
        "name": "ERROR_CRC",
        "info": "Data error (cyclic redundancy check).",
        "info_zh_cn": "数据错误 (循环冗余检查) 。"
    },
    {
        "code": 24,
        "code_bin": "0x18",
        "name": "ERROR_BAD_LENGTH",
        "info": "The program issued a command but the command length is incorrect.",
        "info_zh_cn": "程序发出命令，但命令长度不正确。"
    },
    {
        "code": 25,
        "code_bin": "0x19",
        "name": "ERROR_SEEK",
        "info": "The drive cannot locate a specific area or track on the disk.",
        "info_zh_cn": "驱动器找不到磁盘上的特定区域或轨道。"
    },
    {
        "code": 26,
        "code_bin": "0x1A",
        "name": "ERROR_NOT_DOS_DISK",
        "info": "The specified disk or diskette cannot be accessed.",
        "info_zh_cn": "无法访问指定的磁盘或磁盘。"
    },
    {
        "code": 27,
        "code_bin": "0x1B",
        "name": "ERROR_SECTOR_NOT_FOUND",
        "info": "The drive cannot find the sector requested.",
        "info_zh_cn": "驱动器找不到请求的扇区。"
    },
    {
        "code": 28,
        "code_bin": "0x1C",
        "name": "ERROR_OUT_OF_PAPER",
        "info": "The printer is out of paper.",
        "info_zh_cn": "打印机缺纸。"
    },
    {
        "code": 29,
        "code_bin": "0x1D",
        "name": "ERROR_WRITE_FAULT",
        "info": "The system cannot write to the specified device.",
        "info_zh_cn": "系统无法写入指定的设备。"
    },
    {
        "code": 30,
        "code_bin": "0x1E",
        "name": "ERROR_READ_FAULT",
        "info": "The system cannot read from the specified device.",
        "info_zh_cn": "系统无法从指定的设备读取。"
    },
    {
        "code": 31,
        "code_bin": "0x1F",
        "name": "ERROR_GEN_FAILURE",
        "info": "A device attached to the system is not functioning.",
        "info_zh_cn": "附加到系统的设备无法正常工作。"
    },
    {
        "code": 32,
        "code_bin": "0x20",
        "name": "ERROR_SHARING_VIOLATION",
        "info": "The process cannot access the file because it is being used by another process.",
        "info_zh_cn": "进程无法访问该文件，因为它正在被另一个进程使用。"
    },
    {
        "code": 33,
        "code_bin": "0x21",
        "name": "ERROR_LOCK_VIOLATION",
        "info": "The process cannot access the file because another process has locked a portion of the file.",
        "info_zh_cn": "另一个进程已锁定了文件的一部分，因此进程无法访问该文件。"
    },
    {
        "code": 34,
        "code_bin": "0x22",
        "name": "ERROR_WRONG_DISK",
        "info": "The wrong diskette is in the drive. Insert %2 (Volume Serial Number: %3) into drive %1.",
        "info_zh_cn": "驱动器中存在错误的磁盘。 将 %2 (卷序列号插入 %3) 驱动器 %1。"
    },
    {
        "code": 36,
        "code_bin": "0x24",
        "name": "ERROR_SHARING_BUFFER_EXCEEDED",
        "info": "Too many files opened for sharing.",
        "info_zh_cn": "打开的文件太多，无法共享。"
    },
    {
        "code": 38,
        "code_bin": "0x26",
        "name": "ERROR_HANDLE_EOF",
        "info": "Reached the end of the file.",
        "info_zh_cn": "到达文件的末尾。"
    },
    {
        "code": 39,
        "code_bin": "0x27",
        "name": "ERROR_HANDLE_DISK_FULL",
        "info": "The disk is full.",
        "info_zh_cn": "磁盘已满。"
    },
    {
        "code": 50,
        "code_bin": "0x32",
        "name": "ERROR_NOT_SUPPORTED",
        "info": "The request is not supported.",
        "info_zh_cn": "不支持该请求。"
    },
    {
        "code": 51,
        "code_bin": "0x33",
        "name": "ERROR_REM_NOT_LIST",
        "info": "Windows cannot find the network path. Verify that the network path is correct and the destination computer is not busy or turned off. If Windows still cannot find the network path, contact your network administrator.",
        "info_zh_cn": "Windows找不到网络路径。 验证网络路径是否正确，目标计算机未忙或已关闭。 如果Windows仍找不到网络路径，请与网络管理员联系。"
    },
    {
        "code": 52,
        "code_bin": "0x34",
        "name": "ERROR_DUP_NAME",
        "info": "You were not connected because a duplicate name exists on the network. If joining a domain, go to System in Control Panel to change the computer name and try again. If joining a workgroup, choose another workgroup name.",
        "info_zh_cn": "由于网络上存在重复的名称，因此未连接。 如果加入域，请转到控制面板中的系统更改计算机名称，然后重试。 如果加入工作组，请选择另一个工作组名称。"
    },
    {
        "code": 53,
        "code_bin": "0x35",
        "name": "ERROR_BAD_NETPATH",
        "info": "The network path was not found.",
        "info_zh_cn": "找不到网络路径。"
    },
    {
        "code": 54,
        "code_bin": "0x36",
        "name": "ERROR_NETWORK_BUSY",
        "info": "The network is busy.",
        "info_zh_cn": "网络正忙。"
    },
    {
        "code": 55,
        "code_bin": "0x37",
        "name": "ERROR_DEV_NOT_EXIST",
        "info": "The specified network resource or device is no longer available.",
        "info_zh_cn": "指定的网络资源或设备不再可用。"
    },
    {
        "code": 56,
        "code_bin": "0x38",
        "name": "ERROR_TOO_MANY_CMDS",
        "info": "The network BIOS command limit has been reached.",
        "info_zh_cn": "已达到网络 BIOS 命令限制。"
    },
    {
        "code": 57,
        "code_bin": "0x39",
        "name": "ERROR_ADAP_HDW_ERR",
        "info": "A network adapter hardware error occurred.",
        "info_zh_cn": "发生网络适配器硬件错误。"
    },
    {
        "code": 58,
        "code_bin": "0x3A",
        "name": "ERROR_BAD_NET_RESP",
        "info": "The specified server cannot perform the requested operation.",
        "info_zh_cn": "指定的服务器无法执行所请求的操作。"
    },
    {
        "code": 59,
        "code_bin": "0x3B",
        "name": "ERROR_UNEXP_NET_ERR",
        "info": "An unexpected network error occurred.",
        "info_zh_cn": "发生了意外的网络错误。"
    },
    {
        "code": 60,
        "code_bin": "0x3C",
        "name": "ERROR_BAD_REM_ADAP",
        "info": "The remote adapter is not compatible.",
        "info_zh_cn": "远程适配器不兼容。"
    },
    {
        "code": 61,
        "code_bin": "0x3D",
        "name": "ERROR_PRINTQ_FULL",
        "info": "The printer queue is full.",
        "info_zh_cn": "打印机队列已满。"
    },
    {
        "code": 62,
        "code_bin": "0x3E",
        "name": "ERROR_NO_SPOOL_SPACE",
        "info": "Space to store the file waiting to be printed is not available on the server.",
        "info_zh_cn": "存储等待打印的文件的空间在服务器上不可用。"
    },
    {
        "code": 63,
        "code_bin": "0x3F",
        "name": "ERROR_PRINT_CANCELLED",
        "info": "Your file waiting to be printed was deleted.",
        "info_zh_cn": "正在等待打印的文件已被删除。"
    },
    {
        "code": 64,
        "code_bin": "0x40",
        "name": "ERROR_NETNAME_DELETED",
        "info": "The specified network name is no longer available.",
        "info_zh_cn": "指定的网络名称不再可用。"
    },
    {
        "code": 65,
        "code_bin": "0x41",
        "name": "ERROR_NETWORK_ACCESS_DENIED",
        "info": "Network access is denied.",
        "info_zh_cn": "网络访问被拒绝。"
    },
    {
        "code": 66,
        "code_bin": "0x42",
        "name": "ERROR_BAD_DEV_TYPE",
        "info": "The network resource type is not correct.",
        "info_zh_cn": "网络资源类型不正确。"
    },
    {
        "code": 67,
        "code_bin": "0x43",
        "name": "ERROR_BAD_NET_NAME",
        "info": "The network name cannot be found.",
        "info_zh_cn": "找不到网络名称。"
    },
    {
        "code": 68,
        "code_bin": "0x44",
        "name": "ERROR_TOO_MANY_NAMES",
        "info": "The name limit for the local computer network adapter card was exceeded.",
        "info_zh_cn": "超出了本地计算机网络适配器卡的名称限制。"
    },
    {
        "code": 69,
        "code_bin": "0x45",
        "name": "ERROR_TOO_MANY_SESS",
        "info": "The network BIOS session limit was exceeded.",
        "info_zh_cn": "超过网络 BIOS 会话限制。"
    },
    {
        "code": 70,
        "code_bin": "0x46",
        "name": "ERROR_SHARING_PAUSED",
        "info": "The remote server has been paused or is in the process of being started.",
        "info_zh_cn": "远程服务器已暂停或正在启动。"
    },
    {
        "code": 71,
        "code_bin": "0x47",
        "name": "ERROR_REQ_NOT_ACCEP",
        "info": "No more connections can be made to this remote computer at this time because there are already as many connections as the computer can accept.",
        "info_zh_cn": "目前无法再连接到此远程计算机，因为计算机可以接受的连接数已经多达一样多。"
    },
    {
        "code": 72,
        "code_bin": "0x48",
        "name": "ERROR_REDIR_PAUSED",
        "info": "The specified printer or disk device has been paused.",
        "info_zh_cn": "指定的打印机或磁盘设备已暂停。"
    },
    {
        "code": 80,
        "code_bin": "0x50",
        "name": "ERROR_FILE_EXISTS",
        "info": "The file exists.",
        "info_zh_cn": "文件已存在。"
    },
    {
        "code": 82,
        "code_bin": "0x52",
        "name": "ERROR_CANNOT_MAKE",
        "info": "The directory or file cannot be created.",
        "info_zh_cn": "无法创建目录或文件。"
    },
    {
        "code": 83,
        "code_bin": "0x53",
        "name": "ERROR_FAIL_I24",
        "info": "Fail on INT 24.",
        "info_zh_cn": "INT 24 失败。"
    },
    {
        "code": 84,
        "code_bin": "0x54",
        "name": "ERROR_OUT_OF_STRUCTURES",
        "info": "Storage to process this request is not available.",
        "info_zh_cn": "无法存储处理此请求。"
    },
    {
        "code": 85,
        "code_bin": "0x55",
        "name": "ERROR_ALREADY_ASSIGNED",
        "info": "The local device name is already in use.",
        "info_zh_cn": "本地设备名称已在使用中。"
    },
    {
        "code": 86,
        "code_bin": "0x56",
        "name": "ERROR_INVALID_PASSWORD",
        "info": "The specified network password is not correct.",
        "info_zh_cn": "指定的网络密码不正确。"
    },
    {
        "code": 87,
        "code_bin": "0x57",
        "name": "ERROR_INVALID_PARAMETER",
        "info": "The parameter is incorrect.",
        "info_zh_cn": "参数不正确。"
    },
    {
        "code": 88,
        "code_bin": "0x58",
        "name": "ERROR_NET_WRITE_FAULT",
        "info": "A write fault occurred on the network.",
        "info_zh_cn": "网络上发生了写入错误。"
    },
    {
        "code": 89,
        "code_bin": "0x59",
        "name": "ERROR_NO_PROC_SLOTS",
        "info": "The system cannot start another process at this time.",
        "info_zh_cn": "系统目前无法启动另一个进程。"
    },
    {
        "code": 100,
        "code_bin": "0x64",
        "name": "ERROR_TOO_MANY_SEMAPHORES",
        "info": "Cannot create another system semaphore.",
        "info_zh_cn": "无法创建另一个系统信号灯。"
    },
    {
        "code": 101,
        "code_bin": "0x65",
        "name": "ERROR_EXCL_SEM_ALREADY_OWNED",
        "info": "The exclusive semaphore is owned by another process.",
        "info_zh_cn": "独占信号灯由另一个进程拥有。"
    },
    {
        "code": 102,
        "code_bin": "0x66",
        "name": "ERROR_SEM_IS_SET",
        "info": "The semaphore is set and cannot be closed.",
        "info_zh_cn": "信号灯已设置且无法关闭。"
    },
    {
        "code": 103,
        "code_bin": "0x67",
        "name": "ERROR_TOO_MANY_SEM_REQUESTS",
        "info": "The semaphore cannot be set again.",
        "info_zh_cn": "无法再次设置信号灯。"
    },
    {
        "code": 104,
        "code_bin": "0x68",
        "name": "ERROR_INVALID_AT_INTERRUPT_TIME",
        "info": "Cannot request exclusive semaphores at interrupt time.",
        "info_zh_cn": "无法在中断时请求排他信号灯。"
    },
    {
        "code": 105,
        "code_bin": "0x69",
        "name": "ERROR_SEM_OWNER_DIED",
        "info": "The previous ownership of this semaphore has ended.",
        "info_zh_cn": "此信号灯的先前所有权已结束。"
    },
    {
        "code": 106,
        "code_bin": "0x6A",
        "name": "ERROR_SEM_USER_LIMIT",
        "info": "Insert the diskette for drive %1.",
        "info_zh_cn": "插入驱动器 %1 的磁盘。"
    },
    {
        "code": 107,
        "code_bin": "0x6B",
        "name": "ERROR_DISK_CHANGE",
        "info": "The program stopped because an alternate diskette was not inserted.",
        "info_zh_cn": "程序由于未插入备用磁盘而停止。"
    },
    {
        "code": 108,
        "code_bin": "0x6C",
        "name": "ERROR_DRIVE_LOCKED",
        "info": "The disk is in use or locked by another process.",
        "info_zh_cn": "磁盘正在使用或被另一进程锁定。"
    },
    {
        "code": 109,
        "code_bin": "0x6D",
        "name": "ERROR_BROKEN_PIPE",
        "info": "The pipe has been ended.",
        "info_zh_cn": "管道已结束。"
    },
    {
        "code": 110,
        "code_bin": "0x6E",
        "name": "ERROR_OPEN_FAILED",
        "info": "The system cannot open the device or file specified.",
        "info_zh_cn": "系统无法打开指定的设备或文件。"
    },
    {
        "code": 111,
        "code_bin": "0x6F",
        "name": "ERROR_BUFFER_OVERFLOW",
        "info": "The file name is too long.",
        "info_zh_cn": "文件名太长。"
    },
    {
        "code": 112,
        "code_bin": "0x70",
        "name": "ERROR_DISK_FULL",
        "info": "There is not enough space on the disk.",
        "info_zh_cn": "磁盘上没有足够的空间。"
    },
    {
        "code": 113,
        "code_bin": "0x71",
        "name": "ERROR_NO_MORE_SEARCH_HANDLES",
        "info": "No more internal file identifiers available.",
        "info_zh_cn": "没有其他可用的内部文件标识符。"
    },
    {
        "code": 114,
        "code_bin": "0x72",
        "name": "ERROR_INVALID_TARGET_HANDLE",
        "info": "The target internal file identifier is incorrect.",
        "info_zh_cn": "目标内部文件标识符不正确。"
    },
    {
        "code": 117,
        "code_bin": "0x75",
        "name": "ERROR_INVALID_CATEGORY",
        "info": "The IOCTL call made by the application program is not correct.",
        "info_zh_cn": "应用程序程序发出的 IOCTL 调用不正确。"
    },
    {
        "code": 118,
        "code_bin": "0x76",
        "name": "ERROR_INVALID_VERIFY_SWITCH",
        "info": "The verify-on-write switch parameter value is not correct.",
        "info_zh_cn": "写时验证开关参数值不正确。"
    },
    {
        "code": 119,
        "code_bin": "0x77",
        "name": "ERROR_BAD_DRIVER_LEVEL",
        "info": "The system does not support the command requested.",
        "info_zh_cn": "系统不支持所请求的命令。"
    },
    {
        "code": 120,
        "code_bin": "0x78",
        "name": "ERROR_CALL_NOT_IMPLEMENTED",
        "info": "This function is not supported on this system.",
        "info_zh_cn": "此系统上不支持此函数。"
    },
    {
        "code": 121,
        "code_bin": "0x79",
        "name": "ERROR_SEM_TIMEOUT",
        "info": "The semaphore timeout period has expired.",
        "info_zh_cn": "信号灯超时期限已过期。"
    },
    {
        "code": 122,
        "code_bin": "0x7A",
        "name": "ERROR_INSUFFICIENT_BUFFER",
        "info": "The data area passed to a system call is too small.",
        "info_zh_cn": "传递给系统调用的数据区域太小。"
    },
    {
        "code": 123,
        "code_bin": "0x7B",
        "name": "ERROR_INVALID_NAME",
        "info": "The filename, directory name, or volume label syntax is incorrect.",
        "info_zh_cn": "文件名、目录名称或卷标签语法不正确。"
    },
    {
        "code": 124,
        "code_bin": "0x7C",
        "name": "ERROR_INVALID_LEVEL",
        "info": "The system call level is not correct.",
        "info_zh_cn": "系统调用级别不正确。"
    },
    {
        "code": 125,
        "code_bin": "0x7D",
        "name": "ERROR_NO_VOLUME_LABEL",
        "info": "The disk has no volume label.",
        "info_zh_cn": "磁盘没有卷标签。"
    },
    {
        "code": 126,
        "code_bin": "0x7E",
        "name": "ERROR_MOD_NOT_FOUND",
        "info": "The specified module could not be found.",
        "info_zh_cn": "找不到指定的模块。"
    },
    {
        "code": 127,
        "code_bin": "0x7F",
        "name": "ERROR_PROC_NOT_FOUND",
        "info": "The specified procedure could not be found.",
        "info_zh_cn": "找不到指定的过程。"
    },
    {
        "code": 128,
        "code_bin": "0x80",
        "name": "ERROR_WAIT_NO_CHILDREN",
        "info": "There are no child processes to wait for.",
        "info_zh_cn": "没有要等待的子进程。"
    },
    {
        "code": 129,
        "code_bin": "0x81",
        "name": "ERROR_CHILD_NOT_COMPLETE",
        "info": "The %1 application cannot be run in Win32 mode.",
        "info_zh_cn": "%1 应用程序无法在 Win32 模式下运行。"
    },
    {
        "code": 130,
        "code_bin": "0x82",
        "name": "ERROR_DIRECT_ACCESS_HANDLE",
        "info": "Attempt to use a file handle to an open disk partition for an operation other than raw disk I/O.",
        "info_zh_cn": "尝试对原始磁盘 I/O 以外的操作使用文件句柄打开磁盘分区。"
    },
    {
        "code": 131,
        "code_bin": "0x83",
        "name": "ERROR_NEGATIVE_SEEK",
        "info": "An attempt was made to move the file pointer before the beginning of the file.",
        "info_zh_cn": "尝试在文件开头之前移动文件指针。"
    },
    {
        "code": 132,
        "code_bin": "0x84",
        "name": "ERROR_SEEK_ON_DEVICE",
        "info": "The file pointer cannot be set on the specified device or file.",
        "info_zh_cn": "不能在指定的设备或文件上设置文件指针。"
    },
    {
        "code": 133,
        "code_bin": "0x85",
        "name": "ERROR_IS_JOIN_TARGET",
        "info": "A JOIN or SUBST command cannot be used for a drive that contains previously joined drives.",
        "info_zh_cn": "JOIN 或 SUBST 命令不能用于包含以前加入的驱动器的驱动器。"
    },
    {
        "code": 134,
        "code_bin": "0x86",
        "name": "ERROR_IS_JOINED",
        "info": "An attempt was made to use a JOIN or SUBST command on a drive that has already been joined.",
        "info_zh_cn": "尝试在已加入的驱动器上使用 JOIN 或 SUBST 命令。"
    },
    {
        "code": 135,
        "code_bin": "0x87",
        "name": "ERROR_IS_SUBSTED",
        "info": "An attempt was made to use a JOIN or SUBST command on a drive that has already been substituted.",
        "info_zh_cn": "尝试在已替换的驱动器上使用 JOIN 或 SUBST 命令。"
    },
    {
        "code": 136,
        "code_bin": "0x88",
        "name": "ERROR_NOT_JOINED",
        "info": "The system tried to delete the JOIN of a drive that is not joined.",
        "info_zh_cn": "系统尝试删除未加入的驱动器的 JOIN。"
    },
    {
        "code": 137,
        "code_bin": "0x89",
        "name": "ERROR_NOT_SUBSTED",
        "info": "The system tried to delete the substitution of a drive that is not substituted.",
        "info_zh_cn": "系统尝试删除未替换的驱动器的替换。"
    },
    {
        "code": 138,
        "code_bin": "0x8A",
        "name": "ERROR_JOIN_TO_JOIN",
        "info": "The system tried to join a drive to a directory on a joined drive.",
        "info_zh_cn": "系统尝试将驱动器加入到已加入驱动器上的目录。"
    },
    {
        "code": 139,
        "code_bin": "0x8B",
        "name": "ERROR_SUBST_TO_SUBST",
        "info": "The system tried to substitute a drive to a directory on a substituted drive.",
        "info_zh_cn": "系统尝试将驱动器替换为已替换驱动器上的目录。"
    },
    {
        "code": 140,
        "code_bin": "0x8C",
        "name": "ERROR_JOIN_TO_SUBST",
        "info": "The system tried to join a drive to a directory on a substituted drive.",
        "info_zh_cn": "系统尝试将驱动器加入替换驱动器上的目录。"
    },
    {
        "code": 141,
        "code_bin": "0x8D",
        "name": "ERROR_SUBST_TO_JOIN",
        "info": "The system tried to SUBST a drive to a directory on a joined drive.",
        "info_zh_cn": "系统尝试将驱动器 SUBST 到联接驱动器上的目录。"
    },
    {
        "code": 142,
        "code_bin": "0x8E",
        "name": "ERROR_BUSY_DRIVE",
        "info": "The system cannot perform a JOIN or SUBST at this time.",
        "info_zh_cn": "系统目前无法执行 JOIN 或 SUBST。"
    },
    {
        "code": 143,
        "code_bin": "0x8F",
        "name": "ERROR_SAME_DRIVE",
        "info": "The system cannot join or substitute a drive to or for a directory on the same drive.",
        "info_zh_cn": "系统无法加入或替换同一驱动器上的目录或替换驱动器。"
    },
    {
        "code": 144,
        "code_bin": "0x90",
        "name": "ERROR_DIR_NOT_ROOT",
        "info": "The directory is not a subdirectory of the root directory.",
        "info_zh_cn": "目录不是根目录的子目录。"
    },
    {
        "code": 145,
        "code_bin": "0x91",
        "name": "ERROR_DIR_NOT_EMPTY",
        "info": "The directory is not empty.",
        "info_zh_cn": "目录不为空。"
    },
    {
        "code": 146,
        "code_bin": "0x92",
        "name": "ERROR_IS_SUBST_PATH",
        "info": "The path specified is being used in a substitute.",
        "info_zh_cn": "指定的路径正在替换中使用。"
    },
    {
        "code": 147,
        "code_bin": "0x93",
        "name": "ERROR_IS_JOIN_PATH",
        "info": "Not enough resources are available to process this command.",
        "info_zh_cn": "没有足够的资源可用于处理此命令。"
    },
    {
        "code": 148,
        "code_bin": "0x94",
        "name": "ERROR_PATH_BUSY",
        "info": "The path specified cannot be used at this time.",
        "info_zh_cn": "目前无法使用指定的路径。"
    },
    {
        "code": 149,
        "code_bin": "0x95",
        "name": "ERROR_IS_SUBST_TARGET",
        "info": "An attempt was made to join or substitute a drive for which a directory on the drive is the target of a previous substitute.",
        "info_zh_cn": "尝试加入或替换驱动器上的目录是上一个替换项的目标驱动器。"
    },
    {
        "code": 150,
        "code_bin": "0x96",
        "name": "ERROR_SYSTEM_TRACE",
        "info": "System trace information was not specified in your CONFIG.SYS file, or tracing is disallowed.",
        "info_zh_cn": "CONFIG.SYS文件中未指定系统跟踪信息，或者不允许跟踪。"
    },
    {
        "code": 151,
        "code_bin": "0x97",
        "name": "ERROR_INVALID_EVENT_COUNT",
        "info": "The number of specified semaphore events for DosMuxSemWait is not correct.",
        "info_zh_cn": "DosMuxSemWait 的指定信号灯事件数不正确。"
    },
    {
        "code": 152,
        "code_bin": "0x98",
        "name": "ERROR_TOO_MANY_MUXWAITERS",
        "info": "DosMuxSemWait did not execute; too many semaphores are already set.",
        "info_zh_cn": "DosMuxSemWait 未执行;已设置过多信号灯。"
    },
    {
        "code": 153,
        "code_bin": "0x99",
        "name": "ERROR_INVALID_LIST_FORMAT",
        "info": "The DosMuxSemWait list is not correct.",
        "info_zh_cn": "DosMuxSemWait 列表不正确。"
    },
    {
        "code": 154,
        "code_bin": "0x9A",
        "name": "ERROR_LABEL_TOO_LONG",
        "info": "The volume label you entered exceeds the label character limit of the target file system.",
        "info_zh_cn": "输入的卷标签超出了目标文件系统的标签字符限制。"
    },
    {
        "code": 155,
        "code_bin": "0x9B",
        "name": "ERROR_TOO_MANY_TCBS",
        "info": "Cannot create another thread.",
        "info_zh_cn": "无法创建另一个线程。"
    },
    {
        "code": 156,
        "code_bin": "0x9C",
        "name": "ERROR_SIGNAL_REFUSED",
        "info": "The recipient process has refused the signal.",
        "info_zh_cn": "接收方进程拒绝了信号。"
    },
    {
        "code": 157,
        "code_bin": "0x9D",
        "name": "ERROR_DISCARDED",
        "info": "The segment is already discarded and cannot be locked.",
        "info_zh_cn": "段已被丢弃，无法锁定。"
    },
    {
        "code": 158,
        "code_bin": "0x9E",
        "name": "ERROR_NOT_LOCKED",
        "info": "The segment is already unlocked.",
        "info_zh_cn": "该段已解锁。"
    },
    {
        "code": 159,
        "code_bin": "0x9F",
        "name": "ERROR_BAD_THREADID_ADDR",
        "info": "The address for the thread ID is not correct.",
        "info_zh_cn": "线程 ID 的地址不正确。"
    },
    {
        "code": 160,
        "code_bin": "0xA0",
        "name": "ERROR_BAD_ARGUMENTS",
        "info": "One or more arguments are not correct.",
        "info_zh_cn": "一个或多个参数不正确。"
    },
    {
        "code": 161,
        "code_bin": "0xA1",
        "name": "ERROR_BAD_PATHNAME",
        "info": "The specified path is invalid.",
        "info_zh_cn": "指定路径无效。"
    },
    {
        "code": 162,
        "code_bin": "0xA2",
        "name": "ERROR_SIGNAL_PENDING",
        "info": "A signal is already pending.",
        "info_zh_cn": "信号已挂起。"
    },
    {
        "code": 164,
        "code_bin": "0xA4",
        "name": "ERROR_MAX_THRDS_REACHED",
        "info": "No more threads can be created in the system.",
        "info_zh_cn": "无法在系统中创建更多线程。"
    },
    {
        "code": 167,
        "code_bin": "0xA7",
        "name": "ERROR_LOCK_FAILED",
        "info": "Unable to lock a region of a file.",
        "info_zh_cn": "无法锁定文件的某个区域。"
    },
    {
        "code": 170,
        "code_bin": "0xAA",
        "name": "ERROR_BUSY",
        "info": "The requested resource is in use.",
        "info_zh_cn": "请求的资源已被使用。"
    },
    {
        "code": 171,
        "code_bin": "0xAB",
        "name": "ERROR_DEVICE_SUPPORT_IN_PROGRESS",
        "info": "Device's command support detection is in progress.",
        "info_zh_cn": "设备的命令支持检测正在进行中。"
    },
    {
        "code": 173,
        "code_bin": "0xAD",
        "name": "ERROR_CANCEL_VIOLATION",
        "info": "A lock request was not outstanding for the supplied cancel region.",
        "info_zh_cn": "提供的取消区域未完成锁定请求。"
    },
    {
        "code": 174,
        "code_bin": "0xAE",
        "name": "ERROR_ATOMIC_LOCKS_NOT_SUPPORTED",
        "info": "The file system does not support atomic changes to the lock type.",
        "info_zh_cn": "文件系统不支持对锁类型的原子更改。"
    },
    {
        "code": 180,
        "code_bin": "0xB4",
        "name": "ERROR_INVALID_SEGMENT_NUMBER",
        "info": "The system detected a segment number that was not correct.",
        "info_zh_cn": "系统检测到段号不正确。"
    },
    {
        "code": 182,
        "code_bin": "0xB6",
        "name": "ERROR_INVALID_ORDINAL",
        "info": "The operating system cannot run %1.",
        "info_zh_cn": "操作系统无法运行 %1。"
    },
    {
        "code": 183,
        "code_bin": "0xB7",
        "name": "ERROR_ALREADY_EXISTS",
        "info": "Cannot create a file when that file already exists.",
        "info_zh_cn": "在文件已存在时无法创建该文件。"
    },
    {
        "code": 186,
        "code_bin": "0xBA",
        "name": "ERROR_INVALID_FLAG_NUMBER",
        "info": "The flag passed is not correct.",
        "info_zh_cn": "传递的标志不正确。"
    },
    {
        "code": 187,
        "code_bin": "0xBB",
        "name": "ERROR_SEM_NOT_FOUND",
        "info": "The specified system semaphore name was not found.",
        "info_zh_cn": "找不到指定的系统信号灯名称。"
    },
    {
        "code": 188,
        "code_bin": "0xBC",
        "name": "ERROR_INVALID_STARTING_CODESEG",
        "info": "The operating system cannot run %1.",
        "info_zh_cn": "操作系统无法运行 %1。"
    },
    {
        "code": 189,
        "code_bin": "0xBD",
        "name": "ERROR_INVALID_STACKSEG",
        "info": "The operating system cannot run %1.",
        "info_zh_cn": "操作系统无法运行 %1。"
    },
    {
        "code": 190,
        "code_bin": "0xBE",
        "name": "ERROR_INVALID_MODULETYPE",
        "info": "The operating system cannot run %1.",
        "info_zh_cn": "操作系统无法运行 %1。"
    },
    {
        "code": 191,
        "code_bin": "0xBF",
        "name": "ERROR_INVALID_EXE_SIGNATURE",
        "info": "Cannot run %1 in Win32 mode.",
        "info_zh_cn": "无法在 Win32 模式下运行 %1。"
    },
    {
        "code": 192,
        "code_bin": "0xC0",
        "name": "ERROR_EXE_MARKED_INVALID",
        "info": "The operating system cannot run %1.",
        "info_zh_cn": "操作系统无法运行 %1。"
    },
    {
        "code": 193,
        "code_bin": "0xC1",
        "name": "ERROR_BAD_EXE_FORMAT",
        "info": "%1 is not a valid Win32 application.",
        "info_zh_cn": "%1 不是有效的 Win32 应用程序。"
    },
    {
        "code": 194,
        "code_bin": "0xC2",
        "name": "ERROR_ITERATED_DATA_EXCEEDS_64k",
        "info": "The operating system cannot run %1.",
        "info_zh_cn": "操作系统无法运行 %1。"
    },
    {
        "code": 195,
        "code_bin": "0xC3",
        "name": "ERROR_INVALID_MINALLOCSIZE",
        "info": "The operating system cannot run %1.",
        "info_zh_cn": "操作系统无法运行 %1。"
    },
    {
        "code": 196,
        "code_bin": "0xC4",
        "name": "ERROR_DYNLINK_FROM_INVALID_RING",
        "info": "The operating system cannot run this application program.",
        "info_zh_cn": "操作系统无法运行此应用程序程序。"
    },
    {
        "code": 197,
        "code_bin": "0xC5",
        "name": "ERROR_IOPL_NOT_ENABLED",
        "info": "The operating system is not presently configured to run this application.",
        "info_zh_cn": "操作系统当前未配置为运行此应用程序。"
    },
    {
        "code": 198,
        "code_bin": "0xC6",
        "name": "ERROR_INVALID_SEGDPL",
        "info": "The operating system cannot run %1.",
        "info_zh_cn": "操作系统无法运行 %1。"
    },
    {
        "code": 199,
        "code_bin": "0xC7",
        "name": "ERROR_AUTODATASEG_EXCEEDS_64k",
        "info": "The operating system cannot run this application program.",
        "info_zh_cn": "操作系统无法运行此应用程序程序。"
    },
    {
        "code": 200,
        "code_bin": "0xC8",
        "name": "ERROR_RING2SEG_MUST_BE_MOVABLE",
        "info": "The code segment cannot be greater than or equal to 64K.",
        "info_zh_cn": "代码段不能大于或等于 64K。"
    },
    {
        "code": 201,
        "code_bin": "0xC9",
        "name": "ERROR_RELOC_CHAIN_XEEDS_SEGLIM",
        "info": "The operating system cannot run %1.",
        "info_zh_cn": "操作系统无法运行 %1。"
    },
    {
        "code": 202,
        "code_bin": "0xCA",
        "name": "ERROR_INFLOOP_IN_RELOC_CHAIN",
        "info": "The operating system cannot run %1.",
        "info_zh_cn": "操作系统无法运行 %1。"
    },
    {
        "code": 203,
        "code_bin": "0xCB",
        "name": "ERROR_ENVVAR_NOT_FOUND",
        "info": "The system could not find the environment option that was entered.",
        "info_zh_cn": "系统找不到输入的环境选项。"
    },
    {
        "code": 205,
        "code_bin": "0xCD",
        "name": "ERROR_NO_SIGNAL_SENT",
        "info": "No process in the command subtree has a signal handler.",
        "info_zh_cn": "命令子树中没有任何进程具有信号处理程序。"
    },
    {
        "code": 206,
        "code_bin": "0xCE",
        "name": "ERROR_FILENAME_EXCED_RANGE",
        "info": "The filename or extension is too long.",
        "info_zh_cn": "文件名或扩展名太长。"
    },
    {
        "code": 207,
        "code_bin": "0xCF",
        "name": "ERROR_RING2_STACK_IN_USE",
        "info": "The ring 2 stack is in use.",
        "info_zh_cn": "环 2 堆栈正在使用中。"
    },
    {
        "code": 208,
        "code_bin": "0xD0",
        "name": "ERROR_META_EXPANSION_TOO_LONG",
        "info": "The global filename characters, * or ?, are entered incorrectly or too many global filename characters are specified.",
        "info_zh_cn": "全局文件名字符 *或 ？，输入错误或指定过多的全局文件名字符。"
    },
    {
        "code": 209,
        "code_bin": "0xD1",
        "name": "ERROR_INVALID_SIGNAL_NUMBER",
        "info": "The signal being posted is not correct.",
        "info_zh_cn": "正在发布的信号不正确。"
    },
    {
        "code": 210,
        "code_bin": "0xD2",
        "name": "ERROR_THREAD_1_INACTIVE",
        "info": "The signal handler cannot be set.",
        "info_zh_cn": "无法设置信号处理程序。"
    },
    {
        "code": 212,
        "code_bin": "0xD4",
        "name": "ERROR_LOCKED",
        "info": "The segment is locked and cannot be reallocated.",
        "info_zh_cn": "段已锁定，无法重新分配。"
    },
    {
        "code": 214,
        "code_bin": "0xD6",
        "name": "ERROR_TOO_MANY_MODULES",
        "info": "Too many dynamic-link modules are attached to this program or dynamic-link module.",
        "info_zh_cn": "附加到此程序或动态链接模块的动态链接模块过多。"
    },
    {
        "code": 215,
        "code_bin": "0xD7",
        "name": "ERROR_NESTING_NOT_ALLOWED",
        "info": "Cannot nest calls to LoadModule.",
        "info_zh_cn": "无法嵌套对 LoadModule 的调用。"
    },
    {
        "code": 216,
        "code_bin": "0xD8",
        "name": "ERROR_EXE_MACHINE_TYPE_MISMATCH",
        "info": "This version of %1 is not compatible with the version of Windows you're running. Check your computer's system information and then contact the software publisher.",
        "info_zh_cn": "此版本的 %1 与运行的Windows版本不兼容。 检查计算机的系统信息，然后联系软件发布者。"
    },
    {
        "code": 217,
        "code_bin": "0xD9",
        "name": "ERROR_EXE_CANNOT_MODIFY_SIGNED_BINARY",
        "info": "The image file %1 is signed, unable to modify.",
        "info_zh_cn": "映像文件 %1 已签名，无法修改。"
    },
    {
        "code": 218,
        "code_bin": "0xDA",
        "name": "ERROR_EXE_CANNOT_MODIFY_STRONG_SIGNED_BINARY",
        "info": "The image file %1 is strong signed, unable to modify.",
        "info_zh_cn": "映像文件 %1 是强签名的，无法修改。"
    },
    {
        "code": 220,
        "code_bin": "0xDC",
        "name": "ERROR_FILE_CHECKED_OUT",
        "info": "This file is checked out or locked for editing by another user.",
        "info_zh_cn": "此文件已签出或锁定，供其他用户编辑。"
    },
    {
        "code": 221,
        "code_bin": "0xDD",
        "name": "ERROR_CHECKOUT_REQUIRED",
        "info": "The file must be checked out before saving changes.",
        "info_zh_cn": "保存更改之前，必须签出该文件。"
    },
    {
        "code": 222,
        "code_bin": "0xDE",
        "name": "ERROR_BAD_FILE_TYPE",
        "info": "The file type being saved or retrieved has been blocked.",
        "info_zh_cn": "保存或检索的文件类型已被阻止。"
    },
    {
        "code": 223,
        "code_bin": "0xDF",
        "name": "ERROR_FILE_TOO_LARGE",
        "info": "The file size exceeds the limit allowed and cannot be saved.",
        "info_zh_cn": "文件大小超过允许的限制，无法保存。"
    },
    {
        "code": 224,
        "code_bin": "0xE0",
        "name": "ERROR_FORMS_AUTH_REQUIRED",
        "info": "Access Denied. Before opening files in this location, you must first add the web site to your trusted sites list, browse to the web site, and select the option to login automatically.",
        "info_zh_cn": "拒绝访问。 在打开此位置的文件之前，必须先将网站添加到受信任的网站列表中，浏览到网站，然后选择自动登录的选项。"
    },
    {
        "code": 225,
        "code_bin": "0xE1",
        "name": "ERROR_VIRUS_INFECTED",
        "info": "Operation did not complete successfully because the file contains a virus or potentially unwanted software.",
        "info_zh_cn": "操作未成功完成，因为该文件包含病毒或可能不需要的软件。"
    },
    {
        "code": 226,
        "code_bin": "0xE2",
        "name": "ERROR_VIRUS_DELETED",
        "info": "This file contains a virus or potentially unwanted software and cannot be opened. Due to the nature of this virus or potentially unwanted software, the file has been removed from this location.",
        "info_zh_cn": "此文件包含病毒或可能不需要的软件，无法打开。 由于此病毒的性质或可能不需要的软件，文件已从此位置中删除。"
    },
    {
        "code": 229,
        "code_bin": "0xE5",
        "name": "ERROR_PIPE_LOCAL",
        "info": "The pipe is local.",
        "info_zh_cn": "管道是本地管道。"
    },
    {
        "code": 230,
        "code_bin": "0xE6",
        "name": "ERROR_BAD_PIPE",
        "info": "The pipe state is invalid.",
        "info_zh_cn": "管道状态无效。"
    },
    {
        "code": 231,
        "code_bin": "0xE7",
        "name": "ERROR_PIPE_BUSY",
        "info": "All pipe instances are busy.",
        "info_zh_cn": "所有管道实例都繁忙。"
    },
    {
        "code": 232,
        "code_bin": "0xE8",
        "name": "ERROR_NO_DATA",
        "info": "The pipe is being closed.",
        "info_zh_cn": "管道正在关闭。"
    },
    {
        "code": 233,
        "code_bin": "0xE9",
        "name": "ERROR_PIPE_NOT_CONNECTED",
        "info": "No process is on the other end of the pipe.",
        "info_zh_cn": "管道的另一端没有进程。"
    },
    {
        "code": 234,
        "code_bin": "0xEA",
        "name": "ERROR_MORE_DATA",
        "info": "More data is available.",
        "info_zh_cn": "更多数据可用。"
    },
    {
        "code": 240,
        "code_bin": "0xF0",
        "name": "ERROR_VC_DISCONNECTED",
        "info": "The session was canceled.",
        "info_zh_cn": "会话已取消。"
    },
    {
        "code": 254,
        "code_bin": "0xFE",
        "name": "ERROR_INVALID_EA_NAME",
        "info": "The specified extended attribute name was invalid.",
        "info_zh_cn": "指定的扩展属性名称无效。"
    },
    {
        "code": 255,
        "code_bin": "0xFF",
        "name": "ERROR_EA_LIST_INCONSISTENT",
        "info": "The extended attributes are inconsistent.",
        "info_zh_cn": "扩展属性不一致。"
    },
    {
        "code": 258,
        "code_bin": "0x102",
        "name": "WAIT_TIMEOUT",
        "info": "The wait operation timed out.",
        "info_zh_cn": "等待操作超时。"
    },
    {
        "code": 259,
        "code_bin": "0x103",
        "name": "ERROR_NO_MORE_ITEMS",
        "info": "No more data is available.",
        "info_zh_cn": "没有更多可用数据。"
    },
    {
        "code": 266,
        "code_bin": "0x10A",
        "name": "ERROR_CANNOT_COPY",
        "info": "The copy functions cannot be used.",
        "info_zh_cn": "不能使用复制函数。"
    },
    {
        "code": 267,
        "code_bin": "0x10B",
        "name": "ERROR_DIRECTORY",
        "info": "The directory name is invalid.",
        "info_zh_cn": "目录名称无效。"
    },
    {
        "code": 275,
        "code_bin": "0x113",
        "name": "ERROR_EAS_DIDNT_FIT",
        "info": "The extended attributes did not fit in the buffer.",
        "info_zh_cn": "扩展属性不适合缓冲区。"
    },
    {
        "code": 276,
        "code_bin": "0x114",
        "name": "ERROR_EA_FILE_CORRUPT",
        "info": "The extended attribute file on the mounted file system is corrupt.",
        "info_zh_cn": "装载文件系统上的扩展属性文件已损坏。"
    },
    {
        "code": 277,
        "code_bin": "0x115",
        "name": "ERROR_EA_TABLE_FULL",
        "info": "The extended attribute table file is full.",
        "info_zh_cn": "扩展属性表文件已满。"
    },
    {
        "code": 278,
        "code_bin": "0x116",
        "name": "ERROR_INVALID_EA_HANDLE",
        "info": "The specified extended attribute handle is invalid.",
        "info_zh_cn": "指定的扩展属性句柄无效。"
    },
    {
        "code": 282,
        "code_bin": "0x11A",
        "name": "ERROR_EAS_NOT_SUPPORTED",
        "info": "The mounted file system does not support extended attributes.",
        "info_zh_cn": "装载的文件系统不支持扩展属性。"
    },
    {
        "code": 288,
        "code_bin": "0x120",
        "name": "ERROR_NOT_OWNER",
        "info": "Attempt to release mutex not owned by caller.",
        "info_zh_cn": "尝试释放调用方不拥有的互斥体。"
    },
    {
        "code": 298,
        "code_bin": "0x12A",
        "name": "ERROR_TOO_MANY_POSTS",
        "info": "Too many posts were made to a semaphore.",
        "info_zh_cn": "信号灯的帖子太多。"
    },
    {
        "code": 299,
        "code_bin": "0x12B",
        "name": "ERROR_PARTIAL_COPY",
        "info": "Only part of a ReadProcessMemory or WriteProcessMemory request was completed.",
        "info_zh_cn": "已完成 ReadProcessMemory 或 WriteProcessMemory 请求的一部分。"
    },
    {
        "code": 300,
        "code_bin": "0x12C",
        "name": "ERROR_OPLOCK_NOT_GRANTED",
        "info": "The oplock request is denied.",
        "info_zh_cn": "操作锁请求被拒绝。"
    },
    {
        "code": 301,
        "code_bin": "0x12D",
        "name": "ERROR_INVALID_OPLOCK_PROTOCOL",
        "info": "An invalid oplock acknowledgment was received by the system.",
        "info_zh_cn": "系统收到无效的 oplock 确认。"
    },
    {
        "code": 302,
        "code_bin": "0x12E",
        "name": "ERROR_DISK_TOO_FRAGMENTED",
        "info": "The volume is too fragmented to complete this operation.",
        "info_zh_cn": "卷过于碎片，无法完成此操作。"
    },
    {
        "code": 303,
        "code_bin": "0x12F",
        "name": "ERROR_DELETE_PENDING",
        "info": "The file cannot be opened because it is in the process of being deleted.",
        "info_zh_cn": "无法打开该文件，因为它正在删除。"
    },
    {
        "code": 304,
        "code_bin": "0x130",
        "name": "ERROR_INCOMPATIBLE_WITH_GLOBAL_SHORT_NAME_REGISTRY_SETTING",
        "info": "Short name settings may not be changed on this volume due to the global registry setting.",
        "info_zh_cn": "由于全局注册表设置，此卷上可能不会更改短名称设置。"
    },
    {
        "code": 305,
        "code_bin": "0x131",
        "name": "ERROR_SHORT_NAMES_NOT_ENABLED_ON_VOLUME",
        "info": "Short names are not enabled on this volume.",
        "info_zh_cn": "此卷上未启用短名称。"
    },
    {
        "code": 306,
        "code_bin": "0x132",
        "name": "ERROR_SECURITY_STREAM_IS_INCONSISTENT",
        "info": "The security stream for the given volume is in an inconsistent state. Please run CHKDSK on the volume.",
        "info_zh_cn": "给定卷的安全流处于不一致状态。 请在卷上运行 CHKDSK。"
    },
    {
        "code": 307,
        "code_bin": "0x133",
        "name": "ERROR_INVALID_LOCK_RANGE",
        "info": "A requested file lock operation cannot be processed due to an invalid byte range.",
        "info_zh_cn": "由于字节范围无效，无法处理请求的文件锁定操作。"
    },
    {
        "code": 308,
        "code_bin": "0x134",
        "name": "ERROR_IMAGE_SUBSYSTEM_NOT_PRESENT",
        "info": "The subsystem needed to support the image type is not present.",
        "info_zh_cn": "不支持映像类型的子系统不存在。"
    },
    {
        "code": 309,
        "code_bin": "0x135",
        "name": "ERROR_NOTIFICATION_GUID_ALREADY_DEFINED",
        "info": "The specified file already has a notification GUID associated with it.",
        "info_zh_cn": "指定的文件已具有与其关联的通知 GUID。"
    },
    {
        "code": 310,
        "code_bin": "0x136",
        "name": "ERROR_INVALID_EXCEPTION_HANDLER",
        "info": "An invalid exception handler routine has been detected.",
        "info_zh_cn": "检测到无效的异常处理程序例程。"
    },
    {
        "code": 311,
        "code_bin": "0x137",
        "name": "ERROR_DUPLICATE_PRIVILEGES",
        "info": "Duplicate privileges were specified for the token.",
        "info_zh_cn": "为令牌指定了重复的权限。"
    },
    {
        "code": 312,
        "code_bin": "0x138",
        "name": "ERROR_NO_RANGES_PROCESSED",
        "info": "No ranges for the specified operation were able to be processed.",
        "info_zh_cn": "无法处理指定操作的范围。"
    },
    {
        "code": 313,
        "code_bin": "0x139",
        "name": "ERROR_NOT_ALLOWED_ON_SYSTEM_FILE",
        "info": "Operation is not allowed on a file system internal file.",
        "info_zh_cn": "不允许对文件系统内部文件执行操作。"
    },
    {
        "code": 314,
        "code_bin": "0x13A",
        "name": "ERROR_DISK_RESOURCES_EXHAUSTED",
        "info": "The physical resources of this disk have been exhausted.",
        "info_zh_cn": "此磁盘的物理资源已耗尽。"
    },
    {
        "code": 315,
        "code_bin": "0x13B",
        "name": "ERROR_INVALID_TOKEN",
        "info": "The token representing the data is invalid.",
        "info_zh_cn": "表示数据的令牌无效。"
    },
    {
        "code": 316,
        "code_bin": "0x13C",
        "name": "ERROR_DEVICE_FEATURE_NOT_SUPPORTED",
        "info": "The device does not support the command feature.",
        "info_zh_cn": "设备不支持命令功能。"
    },
    {
        "code": 317,
        "code_bin": "0x13D",
        "name": "ERROR_MR_MID_NOT_FOUND",
        "info": "The system cannot find message text for message number 0x%1 in the message file for %2.",
        "info_zh_cn": "系统在 %2 的消息文件中找不到消息编号 0x%1 的消息文本。"
    },
    {
        "code": 318,
        "code_bin": "0x13E",
        "name": "ERROR_SCOPE_NOT_FOUND",
        "info": "The scope specified was not found.",
        "info_zh_cn": "找不到指定的范围。"
    },
    {
        "code": 319,
        "code_bin": "0x13F",
        "name": "ERROR_UNDEFINED_SCOPE",
        "info": "The Central Access Policy specified is not defined on the target machine.",
        "info_zh_cn": "未在目标计算机上定义指定的中央访问策略。"
    },
    {
        "code": 320,
        "code_bin": "0x140",
        "name": "ERROR_INVALID_CAP",
        "info": "The Central Access Policy obtained from Active Directory is invalid.",
        "info_zh_cn": "从 Active Directory 获取的中央访问策略无效。"
    },
    {
        "code": 321,
        "code_bin": "0x141",
        "name": "ERROR_DEVICE_UNREACHABLE",
        "info": "The device is unreachable.",
        "info_zh_cn": "设备无法访问。"
    },
    {
        "code": 322,
        "code_bin": "0x142",
        "name": "ERROR_DEVICE_NO_RESOURCES",
        "info": "The target device has insufficient resources to complete the operation.",
        "info_zh_cn": "目标设备没有足够的资源来完成操作。"
    },
    {
        "code": 323,
        "code_bin": "0x143",
        "name": "ERROR_DATA_CHECKSUM_ERROR",
        "info": "A data integrity checksum error occurred. Data in the file stream is corrupt.",
        "info_zh_cn": "发生数据完整性校验和错误。 文件流中的数据已损坏。"
    },
    {
        "code": 324,
        "code_bin": "0x144",
        "name": "ERROR_INTERMIXED_KERNEL_EA_OPERATION",
        "info": "An attempt was made to modify both a KERNEL and normal Extended Attribute (EA) in the same operation.",
        "info_zh_cn": "尝试在同一操作中同时修改 KERNEL 和正常的扩展属性 (EA) 。"
    },
    {
        "code": 326,
        "code_bin": "0x146",
        "name": "ERROR_FILE_LEVEL_TRIM_NOT_SUPPORTED",
        "info": "Device does not support file-level TRIM.",
        "info_zh_cn": "设备不支持文件级 TRIM。"
    },
    {
        "code": 327,
        "code_bin": "0x147",
        "name": "ERROR_OFFSET_ALIGNMENT_VIOLATION",
        "info": "The command specified a data offset that does not align to the device's granularity/alignment.",
        "info_zh_cn": "该命令指定了与设备粒度/对齐不一致的数据偏移量。"
    },
    {
        "code": 328,
        "code_bin": "0x148",
        "name": "ERROR_INVALID_FIELD_IN_PARAMETER_LIST",
        "info": "The command specified an invalid field in its parameter list.",
        "info_zh_cn": "该命令在其参数列表中指定了无效字段。"
    },
    {
        "code": 329,
        "code_bin": "0x149",
        "name": "ERROR_OPERATION_IN_PROGRESS",
        "info": "An operation is currently in progress with the device.",
        "info_zh_cn": "设备当前正在进行操作。"
    },
    {
        "code": 330,
        "code_bin": "0x14A",
        "name": "ERROR_BAD_DEVICE_PATH",
        "info": "An attempt was made to send down the command via an invalid path to the target device.",
        "info_zh_cn": "尝试通过指向目标设备的无效路径发送命令。"
    },
    {
        "code": 331,
        "code_bin": "0x14B",
        "name": "ERROR_TOO_MANY_DESCRIPTORS",
        "info": "The command specified a number of descriptors that exceeded the maximum supported by the device.",
        "info_zh_cn": "该命令指定了多个描述符，这些描述符超过了设备支持的最大数量。"
    },
    {
        "code": 332,
        "code_bin": "0x14C",
        "name": "ERROR_SCRUB_DATA_DISABLED",
        "info": "Scrub is disabled on the specified file.",
        "info_zh_cn": "擦除在指定文件上处于禁用状态。"
    },
    {
        "code": 333,
        "code_bin": "0x14D",
        "name": "ERROR_NOT_REDUNDANT_STORAGE",
        "info": "The storage device does not provide redundancy.",
        "info_zh_cn": "存储设备不提供冗余。"
    },
    {
        "code": 334,
        "code_bin": "0x14E",
        "name": "ERROR_RESIDENT_FILE_NOT_SUPPORTED",
        "info": "An operation is not supported on a resident file.",
        "info_zh_cn": "居民文件不支持操作。"
    },
    {
        "code": 335,
        "code_bin": "0x14F",
        "name": "ERROR_COMPRESSED_FILE_NOT_SUPPORTED",
        "info": "An operation is not supported on a compressed file.",
        "info_zh_cn": "压缩文件不支持操作。"
    },
    {
        "code": 336,
        "code_bin": "0x150",
        "name": "ERROR_DIRECTORY_NOT_SUPPORTED",
        "info": "An operation is not supported on a directory.",
        "info_zh_cn": "目录不支持操作。"
    },
    {
        "code": 337,
        "code_bin": "0x151",
        "name": "ERROR_NOT_READ_FROM_COPY",
        "info": "The specified copy of the requested data could not be read.",
        "info_zh_cn": "无法读取所请求数据的指定副本。"
    },
    {
        "code": 350,
        "code_bin": "0x15E",
        "name": "ERROR_FAIL_NOACTION_REBOOT",
        "info": "No action was taken as a system reboot is required.",
        "info_zh_cn": "不需要执行任何操作，因为系统重新启动。"
    },
    {
        "code": 351,
        "code_bin": "0x15F",
        "name": "ERROR_FAIL_SHUTDOWN",
        "info": "The shutdown operation failed.",
        "info_zh_cn": "关闭操作失败。"
    },
    {
        "code": 352,
        "code_bin": "0x160",
        "name": "ERROR_FAIL_RESTART",
        "info": "The restart operation failed.",
        "info_zh_cn": "重启操作失败。"
    },
    {
        "code": 353,
        "code_bin": "0x161",
        "name": "ERROR_MAX_SESSIONS_REACHED",
        "info": "The maximum number of sessions has been reached.",
        "info_zh_cn": "已达到最大会话数。"
    },
    {
        "code": 400,
        "code_bin": "0x190",
        "name": "ERROR_THREAD_MODE_ALREADY_BACKGROUND",
        "info": "The thread is already in background processing mode.",
        "info_zh_cn": "线程已处于后台处理模式。"
    },
    {
        "code": 401,
        "code_bin": "0x191",
        "name": "ERROR_THREAD_MODE_NOT_BACKGROUND",
        "info": "The thread is not in background processing mode.",
        "info_zh_cn": "线程不在后台处理模式下。"
    },
    {
        "code": 402,
        "code_bin": "0x192",
        "name": "ERROR_PROCESS_MODE_ALREADY_BACKGROUND",
        "info": "The process is already in background processing mode.",
        "info_zh_cn": "该过程已在后台处理模式下。"
    },
    {
        "code": 403,
        "code_bin": "0x193",
        "name": "ERROR_PROCESS_MODE_NOT_BACKGROUND",
        "info": "The process is not in background processing mode.",
        "info_zh_cn": "进程不在后台处理模式下。"
    },
    {
        "code": 487,
        "code_bin": "0x1E7",
        "name": "ERROR_INVALID_ADDRESS",
        "info": "Attempt to access invalid address.",
        "info_zh_cn": "尝试访问无效地址。"
    },
    {
        "code": 500,
        "code_bin": "0x1F4",
        "name": "ERROR_USER_PROFILE_LOAD",
        "info": "User profile cannot be loaded.",
        "info_zh_cn": "无法加载用户配置文件。"
    },
    {
        "code": 534,
        "code_bin": "0x216",
        "name": "ERROR_ARITHMETIC_OVERFLOW",
        "info": "Arithmetic result exceeded 32 bits.",
        "info_zh_cn": "算术结果超过 32 位。"
    },
    {
        "code": 535,
        "code_bin": "0x217",
        "name": "ERROR_PIPE_CONNECTED",
        "info": "There is a process on other end of the pipe.",
        "info_zh_cn": "管道的另一端有一个进程。"
    },
    {
        "code": 536,
        "code_bin": "0x218",
        "name": "ERROR_PIPE_LISTENING",
        "info": "Waiting for a process to open the other end of the pipe.",
        "info_zh_cn": "等待进程打开管道的另一端。"
    },
    {
        "code": 537,
        "code_bin": "0x219",
        "name": "ERROR_VERIFIER_STOP",
        "info": "Application verifier has found an error in the current process.",
        "info_zh_cn": "应用程序验证程序在当前进程中发现了错误。"
    },
    {
        "code": 538,
        "code_bin": "0x21A",
        "name": "ERROR_ABIOS_ERROR",
        "info": "An error occurred in the ABIOS subsystem.",
        "info_zh_cn": "ABIOS 子系统中出现错误。"
    },
    {
        "code": 539,
        "code_bin": "0x21B",
        "name": "ERROR_WX86_WARNING",
        "info": "A warning occurred in the WX86 subsystem.",
        "info_zh_cn": "WX86 子系统中出现警告。"
    },
    {
        "code": 540,
        "code_bin": "0x21C",
        "name": "ERROR_WX86_ERROR",
        "info": "An error occurred in the WX86 subsystem.",
        "info_zh_cn": "WX86 子系统中出错。"
    },
    {
        "code": 541,
        "code_bin": "0x21D",
        "name": "ERROR_TIMER_NOT_CANCELED",
        "info": "An attempt was made to cancel or set a timer that has an associated APC and the subject thread is not the thread that originally set the timer with an associated APC routine.",
        "info_zh_cn": "尝试取消或设置具有关联 APC 的计时器，主题线程不是最初使用关联的 APC 例程设置计时器的线程。"
    },
    {
        "code": 542,
        "code_bin": "0x21E",
        "name": "ERROR_UNWIND",
        "info": "Unwind exception code.",
        "info_zh_cn": "展开异常代码。"
    },
    {
        "code": 543,
        "code_bin": "0x21F",
        "name": "ERROR_BAD_STACK",
        "info": "An invalid or unaligned stack was encountered during an unwind operation.",
        "info_zh_cn": "展开操作期间遇到无效或未对齐的堆栈。"
    },
    {
        "code": 544,
        "code_bin": "0x220",
        "name": "ERROR_INVALID_UNWIND_TARGET",
        "info": "An invalid unwind target was encountered during an unwind operation.",
        "info_zh_cn": "展开操作期间遇到无效的展开目标。"
    },
    {
        "code": 545,
        "code_bin": "0x221",
        "name": "ERROR_INVALID_PORT_ATTRIBUTES",
        "info": "Invalid Object Attributes specified to NtCreatePort or invalid Port Attributes specified to NtConnectPort",
        "info_zh_cn": "为 NtCreatePort 指定的对象属性无效或为 NtConnectPort 指定的端口属性无效"
    },
    {
        "code": 546,
        "code_bin": "0x222",
        "name": "ERROR_PORT_MESSAGE_TOO_LONG",
        "info": "Length of message passed to NtRequestPort or NtRequestWaitReplyPort was longer than the maximum message allowed by the port.",
        "info_zh_cn": "传递给 NtRequestPort 或 NtRequestWaitReplyPort 的消息长度比端口允许的最大消息长。"
    },
    {
        "code": 547,
        "code_bin": "0x223",
        "name": "ERROR_INVALID_QUOTA_LOWER",
        "info": "An attempt was made to lower a quota limit below the current usage.",
        "info_zh_cn": "尝试降低配额限制低于当前使用情况。"
    },
    {
        "code": 548,
        "code_bin": "0x224",
        "name": "ERROR_DEVICE_ALREADY_ATTACHED",
        "info": "An attempt was made to attach to a device that was already attached to another device.",
        "info_zh_cn": "尝试附加到已附加到另一台设备的设备。"
    },
    {
        "code": 549,
        "code_bin": "0x225",
        "name": "ERROR_INSTRUCTION_MISALIGNMENT",
        "info": "An attempt was made to execute an instruction at an unaligned address and the host system does not support unaligned instruction references.",
        "info_zh_cn": "尝试在未对齐的地址执行指令，主机系统不支持未对齐的指令引用。"
    },
    {
        "code": 550,
        "code_bin": "0x226",
        "name": "ERROR_PROFILING_NOT_STARTED",
        "info": "Profiling not started.",
        "info_zh_cn": "分析未启动。"
    },
    {
        "code": 551,
        "code_bin": "0x227",
        "name": "ERROR_PROFILING_NOT_STOPPED",
        "info": "Profiling not stopped.",
        "info_zh_cn": "分析未停止。"
    },
    {
        "code": 552,
        "code_bin": "0x228",
        "name": "ERROR_COULD_NOT_INTERPRET",
        "info": "The passed ACL did not contain the minimum required information.",
        "info_zh_cn": "传递的 ACL 不包含所需的最小信息。"
    },
    {
        "code": 553,
        "code_bin": "0x229",
        "name": "ERROR_PROFILING_AT_LIMIT",
        "info": "The number of active profiling objects is at the maximum and no more may be started.",
        "info_zh_cn": "活动分析对象的数量最大，可能不再启动。"
    },
    {
        "code": 554,
        "code_bin": "0x22A",
        "name": "ERROR_CANT_WAIT",
        "info": "Used to indicate that an operation cannot continue without blocking for I/O.",
        "info_zh_cn": "用于指示在 I/O 无法阻止的情况下继续操作。"
    },
    {
        "code": 555,
        "code_bin": "0x22B",
        "name": "ERROR_CANT_TERMINATE_SELF",
        "info": "Indicates that a thread attempted to terminate itself by default (called NtTerminateThread with **NULL**) and it was the last thread in the current process.",
        "info_zh_cn": "指示线程在默认情况下尝试终止自身， (名为 NtTerminateThread 且 **NULL**) ，它是当前进程中的最后一个线程。"
    },
    {
        "code": 556,
        "code_bin": "0x22C",
        "name": "ERROR_UNEXPECTED_MM_CREATE_ERR",
        "info": "If an MM error is returned which is not defined in the standard FsRtl filter, it is converted to one of the following errors which is guaranteed to be in the filter. In this case information is lost, however, the filter correctly handles the exception.",
        "info_zh_cn": "如果返回未在标准 FsRtl 筛选器中定义的 MM 错误，则会将其转换为保证在筛选器中的以下错误之一。 但是，在这种情况下，筛选器会正确处理异常。"
    },
    {
        "code": 557,
        "code_bin": "0x22D",
        "name": "ERROR_UNEXPECTED_MM_MAP_ERROR",
        "info": "If an MM error is returned which is not defined in the standard FsRtl filter, it is converted to one of the following errors which is guaranteed to be in the filter. In this case information is lost, however, the filter correctly handles the exception.",
        "info_zh_cn": "如果返回未在标准 FsRtl 筛选器中定义的 MM 错误，则会将其转换为保证在筛选器中的以下错误之一。 但是，在这种情况下，筛选器会正确处理异常。"
    },
    {
        "code": 558,
        "code_bin": "0x22E",
        "name": "ERROR_UNEXPECTED_MM_EXTEND_ERR",
        "info": "If an MM error is returned which is not defined in the standard FsRtl filter, it is converted to one of the following errors which is guaranteed to be in the filter. In this case information is lost, however, the filter correctly handles the exception.",
        "info_zh_cn": "如果返回未在标准 FsRtl 筛选器中定义的 MM 错误，则会将其转换为保证在筛选器中的以下错误之一。 但是，在这种情况下，筛选器会正确处理异常。"
    },
    {
        "code": 559,
        "code_bin": "0x22F",
        "name": "ERROR_BAD_FUNCTION_TABLE",
        "info": "A malformed function table was encountered during an unwind operation.",
        "info_zh_cn": "展开操作期间遇到格式不正确的函数表。"
    },
    {
        "code": 560,
        "code_bin": "0x230",
        "name": "ERROR_NO_GUID_TRANSLATION",
        "info": "Indicates that an attempt was made to assign protection to a file system file or directory and one of the SIDs in the security descriptor could not be translated into a GUID that could be stored by the file system. This causes the protection attempt to fail, which may cause a file creation attempt to fail.",
        "info_zh_cn": "指示尝试将保护分配给文件系统文件或目录，安全描述符中的一个 SID 无法转换为可由文件系统存储的 GUID。 这会导致保护尝试失败，这可能会导致文件创建尝试失败。"
    },
    {
        "code": 561,
        "code_bin": "0x231",
        "name": "ERROR_INVALID_LDT_SIZE",
        "info": "Indicates that an attempt was made to grow an LDT by setting its size, or that the size was not an even number of selectors.",
        "info_zh_cn": "指示尝试通过设置其大小来增大 LDT，或者大小不是偶数选择器。"
    },
    {
        "code": 563,
        "code_bin": "0x233",
        "name": "ERROR_INVALID_LDT_OFFSET",
        "info": "Indicates that the starting value for the LDT information was not an integral multiple of the selector size.",
        "info_zh_cn": "指示 LDT 信息的起始值不是选择器大小的整数倍数。"
    },
    {
        "code": 564,
        "code_bin": "0x234",
        "name": "ERROR_INVALID_LDT_DESCRIPTOR",
        "info": "Indicates that the user supplied an invalid descriptor when trying to set up Ldt descriptors.",
        "info_zh_cn": "指示用户在尝试设置 Ldt 描述符时提供了无效的描述符。"
    },
    {
        "code": 565,
        "code_bin": "0x235",
        "name": "ERROR_TOO_MANY_THREADS",
        "info": "Indicates a process has too many threads to perform the requested action. For example, assignment of a primary token may only be performed when a process has zero or one threads.",
        "info_zh_cn": "指示进程有太多线程无法执行请求的操作。 例如，仅当进程具有零个或一个线程时，才能执行主令牌分配。"
    },
    {
        "code": 566,
        "code_bin": "0x236",
        "name": "ERROR_THREAD_NOT_IN_PROCESS",
        "info": "An attempt was made to operate on a thread within a specific process, but the thread specified is not in the process specified.",
        "info_zh_cn": "尝试在特定进程中对线程进行操作，但指定的线程不在指定的进程中。"
    },
    {
        "code": 567,
        "code_bin": "0x237",
        "name": "ERROR_PAGEFILE_QUOTA_EXCEEDED",
        "info": "Page file quota was exceeded.",
        "info_zh_cn": "超出页面文件配额。"
    },
    {
        "code": 568,
        "code_bin": "0x238",
        "name": "ERROR_LOGON_SERVER_CONFLICT",
        "info": "The Netlogon service cannot start because another Netlogon service running in the domain conflicts with the specified role.",
        "info_zh_cn": "Netlogon 服务无法启动，因为域中运行的另一个 Netlogon 服务与指定角色冲突。"
    },
    {
        "code": 569,
        "code_bin": "0x239",
        "name": "ERROR_SYNCHRONIZATION_REQUIRED",
        "info": "The SAM database on a Windows Server is significantly out of synchronization with the copy on the Domain Controller. A complete synchronization is required.",
        "info_zh_cn": "Windows服务器上的 SAM 数据库与域控制器上的副本明显同步。 需要完成同步。"
    },
    {
        "code": 570,
        "code_bin": "0x23A",
        "name": "ERROR_NET_OPEN_FAILED",
        "info": "The NtCreateFile API failed. This error should never be returned to an application, it is a place holder for the Windows Lan Manager Redirector to use in its internal error mapping routines.",
        "info_zh_cn": "NtCreateFile API 失败。 不应将此错误返回到应用程序，这是Windows Lan Manager 重定向器在其内部错误映射例程中使用的位置持有者。"
    },
    {
        "code": 571,
        "code_bin": "0x23B",
        "name": "ERROR_IO_PRIVILEGE_FAILED",
        "info": "{Privilege Failed} The I/O permissions for the process could not be changed.",
        "info_zh_cn": "{Privilege Failed}无法更改进程的 I/O 权限。"
    },
    {
        "code": 572,
        "code_bin": "0x23C",
        "name": "ERROR_CONTROL_C_EXIT",
        "info": "{Application Exit by CTRL+C} The application terminated as a result of a CTRL+C.",
        "info_zh_cn": "{Application Exit by CTRL+C}应用程序因 CTRL+C 而终止。"
    },
    {
        "code": 573,
        "code_bin": "0x23D",
        "name": "ERROR_MISSING_SYSTEMFILE",
        "info": "{Missing System File} The required system file %hs is bad or missing.",
        "info_zh_cn": "{缺少系统文件}所需的系统文件 %hs 不正确或缺失。"
    },
    {
        "code": 574,
        "code_bin": "0x23E",
        "name": "ERROR_UNHANDLED_EXCEPTION",
        "info": "{Application Error} The exception %s (0x%08lx) occurred in the application at location 0x%08lx.",
        "info_zh_cn": "{应用程序错误}异常 %s (0x%08lx) 发生在应用程序的位置 0x%08lx。"
    },
    {
        "code": 575,
        "code_bin": "0x23F",
        "name": "ERROR_APP_INIT_FAILURE",
        "info": "{Application Error} The application was unable to start correctly (0x%lx). Click OK to close the application.",
        "info_zh_cn": "{应用程序错误}应用程序无法正确启动， (0x%lx) 。 单击“确定”关闭应用程序。"
    },
    {
        "code": 576,
        "code_bin": "0x240",
        "name": "ERROR_PAGEFILE_CREATE_FAILED",
        "info": "{Unable to Create Paging File} The creation of the paging file %hs failed (%lx). The requested size was %ld.",
        "info_zh_cn": "{无法创建分页文件}创建分页文件 %hs 失败， (%lx) 。 请求的大小为 %ld。"
    },
    {
        "code": 577,
        "code_bin": "0x241",
        "name": "ERROR_INVALID_IMAGE_HASH",
        "info": "Windows cannot verify the digital signature for this file. A recent hardware or software change might have installed a file that is signed incorrectly or damaged, or that might be malicious software from an unknown source.",
        "info_zh_cn": "Windows无法验证此文件的数字签名。 最近的硬件或软件更改可能已安装已错误或损坏的文件，或者可能是来自未知源的恶意软件。"
    },
    {
        "code": 578,
        "code_bin": "0x242",
        "name": "ERROR_NO_PAGEFILE",
        "info": "{No Paging File Specified} No paging file was specified in the system configuration.",
        "info_zh_cn": "{未指定分页文件}系统配置中未指定分页文件。"
    },
    {
        "code": 579,
        "code_bin": "0x243",
        "name": "ERROR_ILLEGAL_FLOAT_CONTEXT",
        "info": "{EXCEPTION} A real-mode application issued a floating-point instruction and floating-point hardware is not present.",
        "info_zh_cn": "{EXCEPTION}实际模式应用程序发出浮点指令和浮点硬件不存在。"
    },
    {
        "code": 580,
        "code_bin": "0x244",
        "name": "ERROR_NO_EVENT_PAIR",
        "info": "An event pair synchronization operation was performed using the thread specific client/server event pair object, but no event pair object was associated with the thread.",
        "info_zh_cn": "使用线程特定的客户端/服务器事件对对象执行事件对同步操作，但没有与线程关联的事件对对象。"
    },
    {
        "code": 581,
        "code_bin": "0x245",
        "name": "ERROR_DOMAIN_CTRLR_CONFIG_ERROR",
        "info": "A Windows Server has an incorrect configuration.",
        "info_zh_cn": "Windows服务器配置不正确。"
    },
    {
        "code": 582,
        "code_bin": "0x246",
        "name": "ERROR_ILLEGAL_CHARACTER",
        "info": "An illegal character was encountered. For a multi-byte character set this includes a lead byte without a succeeding trail byte. For the Unicode character set this includes the characters 0xFFFF and 0xFFFE.",
        "info_zh_cn": "遇到非法字符。 对于多字节字符集，这包括没有成功的尾随字节的领先字节。 对于 Unicode 字符集，这包括字符0xFFFF和0xFFFE。"
    },
    {
        "code": 583,
        "code_bin": "0x247",
        "name": "ERROR_UNDEFINED_CHARACTER",
        "info": "The Unicode character is not defined in the Unicode character set installed on the system.",
        "info_zh_cn": "未在系统上安装的 Unicode 字符集中定义 Unicode 字符。"
    },
    {
        "code": 584,
        "code_bin": "0x248",
        "name": "ERROR_FLOPPY_VOLUME",
        "info": "The paging file cannot be created on a floppy diskette.",
        "info_zh_cn": "无法在软盘磁盘上创建分页文件。"
    },
    {
        "code": 585,
        "code_bin": "0x249",
        "name": "ERROR_BIOS_FAILED_TO_CONNECT_INTERRUPT",
        "info": "The system BIOS failed to connect a system interrupt to the device or bus for which the device is connected.",
        "info_zh_cn": "系统 BIOS 无法将系统中断连接到连接到设备的设备或总线。"
    },
    {
        "code": 586,
        "code_bin": "0x24A",
        "name": "ERROR_BACKUP_CONTROLLER",
        "info": "This operation is only allowed for the Primary Domain Controller of the domain.",
        "info_zh_cn": "仅允许域的主域控制器执行此操作。"
    },
    {
        "code": 587,
        "code_bin": "0x24B",
        "name": "ERROR_MUTANT_LIMIT_EXCEEDED",
        "info": "An attempt was made to acquire a mutant such that its maximum count would have been exceeded.",
        "info_zh_cn": "尝试获取可变体，以便超出其最大计数。"
    },
    {
        "code": 588,
        "code_bin": "0x24C",
        "name": "ERROR_FS_DRIVER_REQUIRED",
        "info": "A volume has been accessed for which a file system driver is required that has not yet been loaded.",
        "info_zh_cn": "访问了尚未加载文件系统驱动程序的卷。"
    },
    {
        "code": 589,
        "code_bin": "0x24D",
        "name": "ERROR_CANNOT_LOAD_REGISTRY_FILE",
        "info": "{Registry File Failure} The registry cannot load the hive (file): %hs or its log or alternate. It is corrupt, absent, or not writable.",
        "info_zh_cn": "{注册表文件失败}注册表无法加载 hive (文件) ： %hs 或其日志或备用文件。 它已损坏、缺席或不可写。"
    },
    {
        "code": 590,
        "code_bin": "0x24E",
        "name": "ERROR_DEBUG_ATTACH_FAILED",
        "info": "{Unexpected Failure in [**DebugActiveProcess**](https://docs.microsoft.com/en-us/windows/win32/api/debugapi/nf-debugapi-debugactiveprocess)} An unexpected failure occurred while processing a **DebugActiveProcess** API request. You may choose OK to terminate the process, or Cancel to ignore the error.",
        "info_zh_cn": "{ [**DebugActiveProcess**](https://docs.microsoft.com/zh-CN/windows/win32/api/debugapi/nf-debugapi-debugactiveprocess) 中的意外失败}处理 **DebugActiveProcess** API 请求时发生意外失败。 可以选择“确定”终止进程，或取消以忽略错误。"
    },
    {
        "code": 591,
        "code_bin": "0x24F",
        "name": "ERROR_SYSTEM_PROCESS_TERMINATED",
        "info": "{Fatal System Error} The %hs system process terminated unexpectedly with a status of 0x%08x (0x%08x 0x%08x). The system has been shut down.",
        "info_zh_cn": "{致命系统错误}%hs 系统进程意外终止，状态为 0x%08x (0x%08x 08x 08x) 。 系统已关闭。"
    },
    {
        "code": 592,
        "code_bin": "0x250",
        "name": "ERROR_DATA_NOT_ACCEPTED",
        "info": "{Data Not Accepted} The TDI client could not handle the data received during an indication.",
        "info_zh_cn": "{Data Not Accepted}TDI 客户端无法处理在指示期间收到的数据。"
    },
    {
        "code": 593,
        "code_bin": "0x251",
        "name": "ERROR_VDM_HARD_ERROR",
        "info": "NTVDM encountered a hard error.",
        "info_zh_cn": "NTVDM 遇到硬错误。"
    },
    {
        "code": 594,
        "code_bin": "0x252",
        "name": "ERROR_DRIVER_CANCEL_TIMEOUT",
        "info": "{Cancel Timeout} The driver %hs failed to complete a cancelled I/O request in the allotted time.",
        "info_zh_cn": "{Cancel Timeout}驱动程序 %hs 未能在分配的时间内完成已取消的 I/O 请求。"
    },
    {
        "code": 595,
        "code_bin": "0x253",
        "name": "ERROR_REPLY_MESSAGE_MISMATCH",
        "info": "{Reply Message Mismatch} An attempt was made to reply to an LPC message, but the thread specified by the client ID in the message was not waiting on that message.",
        "info_zh_cn": "{回复消息不匹配}尝试答复 LPC 消息，但消息中客户端 ID 指定的线程未等待该消息。"
    },
    {
        "code": 596,
        "code_bin": "0x254",
        "name": "ERROR_LOST_WRITEBEHIND_DATA",
        "info": "{Delayed Write Failed} Windows was unable to save all the data for the file %hs. The data has been lost. This error may be caused by a failure of your computer hardware or network connection. Please try to save this file elsewhere.",
        "info_zh_cn": "{延迟写入失败}Windows无法保存文件 %hs 的所有数据。 数据已丢失。 此错误可能是计算机硬件或网络连接失败造成的。 请尝试将此文件保存到其他位置。"
    },
    {
        "code": 597,
        "code_bin": "0x255",
        "name": "ERROR_CLIENT_SERVER_PARAMETERS_INVALID",
        "info": "The parameter(s) passed to the server in the client/server shared memory window were invalid. Too much data may have been put in the shared memory window.",
        "info_zh_cn": "参数 (传递到客户端/服务器共享内存窗口中的服务器) 无效。 可能已将过多数据放入共享内存窗口中。"
    },
    {
        "code": 598,
        "code_bin": "0x256",
        "name": "ERROR_NOT_TINY_STREAM",
        "info": "The stream is not a tiny stream.",
        "info_zh_cn": "流不是一个小流。"
    },
    {
        "code": 599,
        "code_bin": "0x257",
        "name": "ERROR_STACK_OVERFLOW_READ",
        "info": "The request must be handled by the stack overflow code.",
        "info_zh_cn": "请求必须由堆栈溢出代码处理。"
    },
    {
        "code": 600,
        "code_bin": "0x258",
        "name": "ERROR_CONVERT_TO_LARGE",
        "info": "Internal OFS status codes indicating how an allocation operation is handled. Either it is retried after the containing onode is moved or the extent stream is converted to a large stream.",
        "info_zh_cn": "内部 OFS 状态代码，指示如何处理分配操作。 移动包含 onode 后重试，或者盘区流转换为大型流。"
    },
    {
        "code": 601,
        "code_bin": "0x259",
        "name": "ERROR_FOUND_OUT_OF_SCOPE",
        "info": "The attempt to find the object found an object matching by ID on the volume but it is out of the scope of the handle used for the operation.",
        "info_zh_cn": "尝试查找对象时，该对象在卷上按 ID 找到匹配的对象，但它不是用于操作的句柄的范围。"
    },
    {
        "code": 602,
        "code_bin": "0x25A",
        "name": "ERROR_ALLOCATE_BUCKET",
        "info": "The bucket array must be grown. Retry transaction after doing so.",
        "info_zh_cn": "存储桶数组必须增长。 执行此操作后重试事务。"
    },
    {
        "code": 603,
        "code_bin": "0x25B",
        "name": "ERROR_MARSHALL_OVERFLOW",
        "info": "The user/kernel marshalling buffer has overflowed.",
        "info_zh_cn": "用户/内核封送缓冲区已溢出。"
    },
    {
        "code": 604,
        "code_bin": "0x25C",
        "name": "ERROR_INVALID_VARIANT",
        "info": "The supplied variant structure contains invalid data.",
        "info_zh_cn": "提供的变体结构包含无效的数据。"
    },
    {
        "code": 605,
        "code_bin": "0x25D",
        "name": "ERROR_BAD_COMPRESSION_BUFFER",
        "info": "The specified buffer contains ill-formed data.",
        "info_zh_cn": "指定的缓冲区包含格式不正确的数据。"
    },
    {
        "code": 606,
        "code_bin": "0x25E",
        "name": "ERROR_AUDIT_FAILED",
        "info": "{Audit Failed} An attempt to generate a security audit failed.",
        "info_zh_cn": "{Audit Failed}尝试生成安全审核失败。"
    },
    {
        "code": 607,
        "code_bin": "0x25F",
        "name": "ERROR_TIMER_RESOLUTION_NOT_SET",
        "info": "The timer resolution was not previously set by the current process.",
        "info_zh_cn": "计时器分辨率以前未由当前进程设置。"
    },
    {
        "code": 608,
        "code_bin": "0x260",
        "name": "ERROR_INSUFFICIENT_LOGON_INFO",
        "info": "There is insufficient account information to log you on.",
        "info_zh_cn": "帐户信息不足，无法登录。"
    },
    {
        "code": 609,
        "code_bin": "0x261",
        "name": "ERROR_BAD_DLL_ENTRYPOINT",
        "info": "{Invalid DLL Entrypoint} The dynamic link library %hs is not written correctly. The stack pointer has been left in an inconsistent state. The entrypoint should be declared as WINAPI or STDCALL. Select YES to fail the DLL load. Select NO to continue execution. Selecting NO may cause the application to operate incorrectly.",
        "info_zh_cn": "{DLL 条目点无效}动态链接库 %hs 未正确写入。 堆栈指针处于不一致状态。 入口点应声明为 WINAPI 或 STDCALL。 选择“是”以使 DLL 加载失败。 选择“否”以继续执行。 选择 NO 可能会导致应用程序运行错误。"
    },
    {
        "code": 610,
        "code_bin": "0x262",
        "name": "ERROR_BAD_SERVICE_ENTRYPOINT",
        "info": "{Invalid Service Callback Entrypoint} The %hs service is not written correctly. The stack pointer has been left in an inconsistent state. The callback entrypoint should be declared as WINAPI or STDCALL. Selecting OK will cause the service to continue operation. However, the service process may operate incorrectly.",
        "info_zh_cn": "{服务回调入口点无效}%hs 服务未正确写入。 堆栈指针处于不一致状态。 回调入口点应声明为 WINAPI 或 STDCALL。 选择“确定”将导致服务继续操作。 但是，服务进程可能运行不正确。"
    },
    {
        "code": 611,
        "code_bin": "0x263",
        "name": "ERROR_IP_ADDRESS_CONFLICT1",
        "info": "There is an IP address conflict with another system on the network.",
        "info_zh_cn": "网络上的另一个系统存在 IP 地址冲突。"
    },
    {
        "code": 612,
        "code_bin": "0x264",
        "name": "ERROR_IP_ADDRESS_CONFLICT2",
        "info": "There is an IP address conflict with another system on the network.",
        "info_zh_cn": "网络上的另一个系统存在 IP 地址冲突。"
    },
    {
        "code": 613,
        "code_bin": "0x265",
        "name": "ERROR_REGISTRY_QUOTA_LIMIT",
        "info": "{Low On Registry Space} The system has reached the maximum size allowed for the system part of the registry. Additional storage requests will be ignored.",
        "info_zh_cn": "{注册表空间不足}系统已达到注册表的系统部分允许的最大大小。 将忽略其他存储请求。"
    },
    {
        "code": 614,
        "code_bin": "0x266",
        "name": "ERROR_NO_CALLBACK_ACTIVE",
        "info": "A callback return system service cannot be executed when no callback is active.",
        "info_zh_cn": "当没有活动回调时，无法执行回调返回系统服务。"
    },
    {
        "code": 615,
        "code_bin": "0x267",
        "name": "ERROR_PWD_TOO_SHORT",
        "info": "The password provided is too short to meet the policy of your user account. Please choose a longer password.",
        "info_zh_cn": "提供的密码太短，无法满足用户帐户的策略。 请选择更长的密码。"
    },
    {
        "code": 616,
        "code_bin": "0x268",
        "name": "ERROR_PWD_TOO_RECENT",
        "info": "The policy of your user account does not allow you to change passwords too frequently. This is done to prevent users from changing back to a familiar, but potentially discovered, password. If you feel your password has been compromised then please contact your administrator immediately to have a new one assigned.",
        "info_zh_cn": "用户帐户的策略不允许你过于频繁地更改密码。 这样做是为了防止用户更改回熟悉但可能发现的密码。 如果你觉得密码已泄露，请立即与管理员联系，以分配一个新密码。"
    },
    {
        "code": 617,
        "code_bin": "0x269",
        "name": "ERROR_PWD_HISTORY_CONFLICT",
        "info": "You have attempted to change your password to one that you have used in the past. The policy of your user account does not allow this. Please select a password that you have not previously used.",
        "info_zh_cn": "您尝试将密码更改为过去使用的密码。 用户帐户的策略不允许这样做。 请选择以前未使用的密码。"
    },
    {
        "code": 618,
        "code_bin": "0x26A",
        "name": "ERROR_UNSUPPORTED_COMPRESSION",
        "info": "The specified compression format is unsupported.",
        "info_zh_cn": "不支持指定的压缩格式。"
    },
    {
        "code": 619,
        "code_bin": "0x26B",
        "name": "ERROR_INVALID_HW_PROFILE",
        "info": "The specified hardware profile configuration is invalid.",
        "info_zh_cn": "指定的硬件配置文件配置无效。"
    },
    {
        "code": 620,
        "code_bin": "0x26C",
        "name": "ERROR_INVALID_PLUGPLAY_DEVICE_PATH",
        "info": "The specified Plug and Play registry device path is invalid.",
        "info_zh_cn": "指定的即插即用注册表设备路径无效。"
    },
    {
        "code": 621,
        "code_bin": "0x26D",
        "name": "ERROR_QUOTA_LIST_INCONSISTENT",
        "info": "The specified quota list is internally inconsistent with its descriptor.",
        "info_zh_cn": "指定的配额列表在内部与描述符不一致。"
    },
    {
        "code": 622,
        "code_bin": "0x26E",
        "name": "ERROR_EVALUATION_EXPIRATION",
        "info": "{Windows Evaluation Notification} The evaluation period for this installation of Windows has expired. This system will shutdown in 1 hour. To restore access to this installation of Windows, please upgrade this installation using a licensed distribution of this product.",
        "info_zh_cn": "{Windows 评估通知} 此安装Windows的评估期已过期。 此系统将在 1 小时内关闭。 若要还原对此安装Windows的访问权限，请使用此产品的许可分发升级此安装。"
    },
    {
        "code": 623,
        "code_bin": "0x26F",
        "name": "ERROR_ILLEGAL_DLL_RELOCATION",
        "info": "{Illegal System DLL Relocation} The system DLL %hs was relocated in memory. The application will not run properly. The relocation occurred because the DLL %hs occupied an address range reserved for Windows system DLLs. The vendor supplying the DLL should be contacted for a new DLL.",
        "info_zh_cn": "{非法系统 DLL 重定位}系统 DLL %hs 在内存中重定位。 应用程序无法正常运行。 由于 DLL %hs 占用了为Windows系统 DLL 保留的地址范围，因此发生了重定位。 应联系提供 DLL 的供应商以获取新的 DLL。"
    },
    {
        "code": 624,
        "code_bin": "0x270",
        "name": "ERROR_DLL_INIT_FAILED_LOGOFF",
        "info": "{DLL Initialization Failed} The application failed to initialize because the window station is shutting down.",
        "info_zh_cn": "{DLL 初始化失败}由于窗口工作站正在关闭，应用程序无法初始化。"
    },
    {
        "code": 625,
        "code_bin": "0x271",
        "name": "ERROR_VALIDATE_CONTINUE",
        "info": "The validation process needs to continue on to the next step.",
        "info_zh_cn": "验证过程需要继续执行下一步。"
    },
    {
        "code": 626,
        "code_bin": "0x272",
        "name": "ERROR_NO_MORE_MATCHES",
        "info": "There are no more matches for the current index enumeration.",
        "info_zh_cn": "当前索引枚举没有更多匹配项。"
    },
    {
        "code": 627,
        "code_bin": "0x273",
        "name": "ERROR_RANGE_LIST_CONFLICT",
        "info": "The range could not be added to the range list because of a conflict.",
        "info_zh_cn": "由于冲突，无法将范围添加到范围列表中。"
    },
    {
        "code": 628,
        "code_bin": "0x274",
        "name": "ERROR_SERVER_SID_MISMATCH",
        "info": "The server process is running under a SID different than that required by client.",
        "info_zh_cn": "服务器进程在不同于客户端所需的 SID 下运行。"
    },
    {
        "code": 629,
        "code_bin": "0x275",
        "name": "ERROR_CANT_ENABLE_DENY_ONLY",
        "info": "A group marked use for deny only cannot be enabled.",
        "info_zh_cn": "只能启用标记为“拒绝”的组。"
    },
    {
        "code": 630,
        "code_bin": "0x276",
        "name": "ERROR_FLOAT_MULTIPLE_FAULTS",
        "info": "{EXCEPTION} Multiple floating point faults.",
        "info_zh_cn": "{EXCEPTION}多个浮点错误。"
    },
    {
        "code": 631,
        "code_bin": "0x277",
        "name": "ERROR_FLOAT_MULTIPLE_TRAPS",
        "info": "{EXCEPTION} Multiple floating point traps.",
        "info_zh_cn": "{EXCEPTION}多个浮点陷阱。"
    },
    {
        "code": 632,
        "code_bin": "0x278",
        "name": "ERROR_NOINTERFACE",
        "info": "The requested interface is not supported.",
        "info_zh_cn": "不支持请求的接口。"
    },
    {
        "code": 633,
        "code_bin": "0x279",
        "name": "ERROR_DRIVER_FAILED_SLEEP",
        "info": "{System Standby Failed} The driver %hs does not support standby mode. Updating this driver may allow the system to go to standby mode.",
        "info_zh_cn": "{系统待机失败}驱动程序 %hs 不支持备用模式。 更新此驱动程序可能允许系统进入备用模式。"
    },
    {
        "code": 634,
        "code_bin": "0x27A",
        "name": "ERROR_CORRUPT_SYSTEM_FILE",
        "info": "The system file %1 has become corrupt and has been replaced.",
        "info_zh_cn": "系统文件 %1 已损坏并已被替换。"
    },
    {
        "code": 635,
        "code_bin": "0x27B",
        "name": "ERROR_COMMITMENT_MINIMUM",
        "info": "{Virtual Memory Minimum Too Low} Your system is low on virtual memory. Windows is increasing the size of your virtual memory paging file. During this process, memory requests for some applications may be denied. For more information, see Help.",
        "info_zh_cn": "{虚拟内存最小值太低}你的系统在虚拟内存上较低。 Windows正在增加虚拟内存分页文件的大小。 在此过程中，可能会拒绝某些应用程序的内存请求。 有关详细信息，请参阅帮助。"
    },
    {
        "code": 636,
        "code_bin": "0x27C",
        "name": "ERROR_PNP_RESTART_ENUMERATION",
        "info": "A device was removed so enumeration must be restarted.",
        "info_zh_cn": "删除了设备，因此必须重新启动枚举。"
    },
    {
        "code": 637,
        "code_bin": "0x27D",
        "name": "ERROR_SYSTEM_IMAGE_BAD_SIGNATURE",
        "info": "{Fatal System Error} The system image %s is not properly signed. The file has been replaced with the signed file. The system has been shut down.",
        "info_zh_cn": "{致命系统错误}系统映像 %s 未正确签名。 该文件已替换为已签名的文件。 系统已关闭。"
    },
    {
        "code": 638,
        "code_bin": "0x27E",
        "name": "ERROR_PNP_REBOOT_REQUIRED",
        "info": "Device will not start without a reboot.",
        "info_zh_cn": "设备不会在重新启动的情况下启动。"
    },
    {
        "code": 639,
        "code_bin": "0x27F",
        "name": "ERROR_INSUFFICIENT_POWER",
        "info": "There is not enough power to complete the requested operation.",
        "info_zh_cn": "没有足够的能力来完成请求的操作。"
    },
    {
        "code": 640,
        "code_bin": "0x280",
        "name": "ERROR_MULTIPLE_FAULT_VIOLATION",
        "info": "ERROR_MULTIPLE_FAULT_VIOLATION",
        "info_zh_cn": "ERROR_MULTIPLE_FAULT_VIOLATION"
    },
    {
        "code": 641,
        "code_bin": "0x281",
        "name": "ERROR_SYSTEM_SHUTDOWN",
        "info": "The system is in the process of shutting down.",
        "info_zh_cn": "系统正在关闭。"
    },
    {
        "code": 642,
        "code_bin": "0x282",
        "name": "ERROR_PORT_NOT_SET",
        "info": "An attempt to remove a processes DebugPort was made, but a port was not already associated with the process.",
        "info_zh_cn": "尝试删除 DebugPort 的进程，但端口尚未与进程关联。"
    },
    {
        "code": 643,
        "code_bin": "0x283",
        "name": "ERROR_DS_VERSION_CHECK_FAILURE",
        "info": "This version of Windows is not compatible with the behavior version of directory forest, domain or domain controller.",
        "info_zh_cn": "此版本的Windows与目录林、域或域控制器的行为版本不兼容。"
    },
    {
        "code": 644,
        "code_bin": "0x284",
        "name": "ERROR_RANGE_NOT_FOUND",
        "info": "The specified range could not be found in the range list.",
        "info_zh_cn": "在范围列表中找不到指定的范围。"
    },
    {
        "code": 646,
        "code_bin": "0x286",
        "name": "ERROR_NOT_SAFE_MODE_DRIVER",
        "info": "The driver was not loaded because the system is booting into safe mode.",
        "info_zh_cn": "驱动程序未加载，因为系统正在启动到安全模式。"
    },
    {
        "code": 647,
        "code_bin": "0x287",
        "name": "ERROR_FAILED_DRIVER_ENTRY",
        "info": "The driver was not loaded because it failed its initialization call.",
        "info_zh_cn": "驱动程序未加载，因为它未能初始化调用。"
    },
    {
        "code": 648,
        "code_bin": "0x288",
        "name": "ERROR_DEVICE_ENUMERATION_ERROR",
        "info": "The \"%hs\" encountered an error while applying power or reading the device configuration. This may be caused by a failure of your hardware or by a poor connection.",
        "info_zh_cn": "在应用电源配置或读取设备配置时“%hs”遇到错误。 此错误可能硬件故障或不良的连接造成的。"
    },
    {
        "code": 649,
        "code_bin": "0x289",
        "name": "ERROR_MOUNT_POINT_NOT_RESOLVED",
        "info": "The create operation failed because the name contained at least one mount point which resolves to a volume to which the specified device object is not attached.",
        "info_zh_cn": "创建操作失败，因为名称包含至少一个装入点，该装入点解析为未附加指定设备对象的卷。"
    },
    {
        "code": 650,
        "code_bin": "0x28A",
        "name": "ERROR_INVALID_DEVICE_OBJECT_PARAMETER",
        "info": "The device object parameter is either not a valid device object or is not attached to the volume specified by the file name.",
        "info_zh_cn": "设备对象参数不是有效的设备对象，也不是附加到文件名指定的卷。"
    },
    {
        "code": 651,
        "code_bin": "0x28B",
        "name": "ERROR_MCA_OCCURED",
        "info": "A Machine Check Error has occurred. Please check the system eventlog for additional information.",
        "info_zh_cn": "发生计算机检查错误。 请检查系统事件日志以获取其他信息。"
    },
    {
        "code": 652,
        "code_bin": "0x28C",
        "name": "ERROR_DRIVER_DATABASE_ERROR",
        "info": "There was error [%2] processing the driver database.",
        "info_zh_cn": "处理驱动程序数据库时出错 [%2]。"
    },
    {
        "code": 653,
        "code_bin": "0x28D",
        "name": "ERROR_SYSTEM_HIVE_TOO_LARGE",
        "info": "System hive size has exceeded its limit.",
        "info_zh_cn": "系统 Hive 大小已超过其限制。"
    },
    {
        "code": 654,
        "code_bin": "0x28E",
        "name": "ERROR_DRIVER_FAILED_PRIOR_UNLOAD",
        "info": "The driver could not be loaded because a previous version of the driver is still in memory.",
        "info_zh_cn": "无法加载驱动程序，因为早期版本的驱动程序仍在内存中。"
    },
    {
        "code": 655,
        "code_bin": "0x28F",
        "name": "ERROR_VOLSNAP_PREPARE_HIBERNATE",
        "info": "{Volume Shadow Copy Service} Please wait while the Volume Shadow Copy Service prepares volume %hs for hibernation.",
        "info_zh_cn": "{卷影复制服务}请等待卷影复制服务准备卷 %hs 进行休眠。"
    },
    {
        "code": 656,
        "code_bin": "0x290",
        "name": "ERROR_HIBERNATION_FAILURE",
        "info": "The system has failed to hibernate (The error code is %hs). Hibernation will be disabled until the system is restarted.",
        "info_zh_cn": "系统无法休眠 (错误代码为 %hs) 。 在重新启动系统之前，将禁用休眠。"
    },
    {
        "code": 657,
        "code_bin": "0x291",
        "name": "ERROR_PWD_TOO_LONG",
        "info": "The password provided is too long to meet the policy of your user account. Please choose a shorter password.",
        "info_zh_cn": "提供的密码太长，无法满足用户帐户的策略。 请选择较短的密码。"
    },
    {
        "code": 665,
        "code_bin": "0x299",
        "name": "ERROR_FILE_SYSTEM_LIMITATION",
        "info": "The requested operation could not be completed due to a file system limitation.",
        "info_zh_cn": "因文件系统限制而无法完成请求的操作。"
    },
    {
        "code": 668,
        "code_bin": "0x29C",
        "name": "ERROR_ASSERTION_FAILURE",
        "info": "An assertion failure has occurred.",
        "info_zh_cn": "断言失败。"
    },
    {
        "code": 669,
        "code_bin": "0x29D",
        "name": "ERROR_ACPI_ERROR",
        "info": "An error occurred in the ACPI subsystem.",
        "info_zh_cn": "ACPI 子系统中出错。"
    },
    {
        "code": 670,
        "code_bin": "0x29E",
        "name": "ERROR_WOW_ASSERTION",
        "info": "WOW Assertion Error.",
        "info_zh_cn": "WOW 断言错误。"
    },
    {
        "code": 671,
        "code_bin": "0x29F",
        "name": "ERROR_PNP_BAD_MPS_TABLE",
        "info": "A device is missing in the system BIOS MPS table. This device will not be used. Please contact your system vendor for system BIOS update.",
        "info_zh_cn": "系统 BIOS MPS 表中缺少设备。 不会使用此设备。 请联系系统供应商获取系统 BIOS 更新。"
    },
    {
        "code": 672,
        "code_bin": "0x2A0",
        "name": "ERROR_PNP_TRANSLATION_FAILED",
        "info": "A translator failed to translate resources.",
        "info_zh_cn": "翻译器无法翻译资源。"
    },
    {
        "code": 673,
        "code_bin": "0x2A1",
        "name": "ERROR_PNP_IRQ_TRANSLATION_FAILED",
        "info": "A IRQ translator failed to translate resources.",
        "info_zh_cn": "IRQ 翻译器无法翻译资源。"
    },
    {
        "code": 674,
        "code_bin": "0x2A2",
        "name": "ERROR_PNP_INVALID_ID",
        "info": "Driver %2 returned invalid ID for a child device (%3).",
        "info_zh_cn": "驱动程序 %2 返回了子设备 (%3) 的无效 ID。"
    },
    {
        "code": 675,
        "code_bin": "0x2A3",
        "name": "ERROR_WAKE_SYSTEM_DEBUGGER",
        "info": "{Kernel Debugger Awakened} the system debugger was awakened by an interrupt.",
        "info_zh_cn": "{Kernel Debugger Awakened} 系统调试器被中断唤醒。"
    },
    {
        "code": 676,
        "code_bin": "0x2A4",
        "name": "ERROR_HANDLES_CLOSED",
        "info": "{Handles Closed} Handles to objects have been automatically closed as a result of the requested operation.",
        "info_zh_cn": "{句柄已关闭}由于请求的操作，对象句柄已自动关闭。"
    },
    {
        "code": 677,
        "code_bin": "0x2A5",
        "name": "ERROR_EXTRANEOUS_INFORMATION",
        "info": "{Too Much Information} The specified access control list (ACL) contained more information than was expected.",
        "info_zh_cn": "{信息过多}指定的访问控制列表 (ACL) 包含的信息多于预期。"
    },
    {
        "code": 678,
        "code_bin": "0x2A6",
        "name": "ERROR_RXACT_COMMIT_NECESSARY",
        "info": "This warning level status indicates that the transaction state already exists for the registry sub-tree, but that a transaction commit was previously aborted. The commit has NOT been completed, but has not been rolled back either (so it may still be committed if desired).",
        "info_zh_cn": "此警告级别状态指示注册表子树已存在事务状态，但以前中止了事务提交。 提交尚未完成，但尚未回滚 (，因此，如果需要) ，它仍可能提交。"
    },
    {
        "code": 679,
        "code_bin": "0x2A7",
        "name": "ERROR_MEDIA_CHECK",
        "info": "{Media Changed} The media may have changed.",
        "info_zh_cn": "{Media Changed}媒体可能已更改。"
    },
    {
        "code": 680,
        "code_bin": "0x2A8",
        "name": "ERROR_GUID_SUBSTITUTION_MADE",
        "info": "{GUID Substitution} During the translation of a global identifier (GUID) to a Windows security ID (SID), no administratively-defined GUID prefix was found. A substitute prefix was used, which will not compromise system security. However, this may provide a more restrictive access than intended.",
        "info_zh_cn": "{GUID 替换}在将全局标识符 (GUID) 转换为Windows安全 ID (SID) 期间，未找到管理定义的 GUID 前缀。 使用了替换前缀，这不会损害系统安全性。 但是，这可以提供比预期更严格的访问。"
    },
    {
        "code": 681,
        "code_bin": "0x2A9",
        "name": "ERROR_STOPPED_ON_SYMLINK",
        "info": "The create operation stopped after reaching a symbolic link.",
        "info_zh_cn": "创建操作在到达符号链接后停止。"
    },
    {
        "code": 682,
        "code_bin": "0x2AA",
        "name": "ERROR_LONGJUMP",
        "info": "A long jump has been executed.",
        "info_zh_cn": "已执行长跳。"
    },
    {
        "code": 683,
        "code_bin": "0x2AB",
        "name": "ERROR_PLUGPLAY_QUERY_VETOED",
        "info": "The Plug and Play query operation was not successful.",
        "info_zh_cn": "即插即用查询操作未成功。"
    },
    {
        "code": 684,
        "code_bin": "0x2AC",
        "name": "ERROR_UNWIND_CONSOLIDATE",
        "info": "A frame consolidation has been executed.",
        "info_zh_cn": "已执行帧合并。"
    },
    {
        "code": 685,
        "code_bin": "0x2AD",
        "name": "ERROR_REGISTRY_HIVE_RECOVERED",
        "info": "{Registry Hive Recovered} Registry hive (file): %hs was corrupted and it has been recovered. Some data might have been lost.",
        "info_zh_cn": "{Registry Hive Recovered}注册表 hive (文件) ：%hs 已损坏，并且已恢复。 某些数据可能已丢失。"
    },
    {
        "code": 686,
        "code_bin": "0x2AE",
        "name": "ERROR_DLL_MIGHT_BE_INSECURE",
        "info": "The application is attempting to run executable code from the module %hs. This may be insecure. An alternative, %hs, is available. Should the application use the secure module %hs?",
        "info_zh_cn": "应用程序正尝试从模块 %hs 运行可执行代码。 这可能是不安全的。 可选选项 %hs 可用。 应用程序是否应使用安全模块 %hs？"
    },
    {
        "code": 687,
        "code_bin": "0x2AF",
        "name": "ERROR_DLL_MIGHT_BE_INCOMPATIBLE",
        "info": "The application is loading executable code from the module %hs. This is secure, but may be incompatible with previous releases of the operating system. An alternative, %hs, is available. Should the application use the secure module %hs?",
        "info_zh_cn": "应用程序正在从模块 %hs 加载可执行代码。 这是安全的，但可能与以前版本的操作系统不兼容。 备用项 %hs 可用。 应用程序是否应使用安全模块 %hs？"
    },
    {
        "code": 688,
        "code_bin": "0x2B0",
        "name": "ERROR_DBG_EXCEPTION_NOT_HANDLED",
        "info": "Debugger did not handle the exception.",
        "info_zh_cn": "调试器未处理异常。"
    },
    {
        "code": 689,
        "code_bin": "0x2B1",
        "name": "ERROR_DBG_REPLY_LATER",
        "info": "Debugger will reply later.",
        "info_zh_cn": "调试器稍后将答复。"
    },
    {
        "code": 690,
        "code_bin": "0x2B2",
        "name": "ERROR_DBG_UNABLE_TO_PROVIDE_HANDLE",
        "info": "Debugger cannot provide handle.",
        "info_zh_cn": "调试器无法提供句柄。"
    },
    {
        "code": 691,
        "code_bin": "0x2B3",
        "name": "ERROR_DBG_TERMINATE_THREAD",
        "info": "Debugger terminated thread.",
        "info_zh_cn": "调试器终止的线程。"
    },
    {
        "code": 692,
        "code_bin": "0x2B4",
        "name": "ERROR_DBG_TERMINATE_PROCESS",
        "info": "Debugger terminated process.",
        "info_zh_cn": "调试器终止的进程。"
    },
    {
        "code": 693,
        "code_bin": "0x2B5",
        "name": "ERROR_DBG_CONTROL_C",
        "info": "Debugger got control C.",
        "info_zh_cn": "调试器获得控制 C。"
    },
    {
        "code": 694,
        "code_bin": "0x2B6",
        "name": "ERROR_DBG_PRINTEXCEPTION_C",
        "info": "Debugger printed exception on control C.",
        "info_zh_cn": "控件 C 上的调试器打印异常。"
    },
    {
        "code": 695,
        "code_bin": "0x2B7",
        "name": "ERROR_DBG_RIPEXCEPTION",
        "info": "Debugger received RIP exception.",
        "info_zh_cn": "调试器收到 RIP 异常。"
    },
    {
        "code": 696,
        "code_bin": "0x2B8",
        "name": "ERROR_DBG_CONTROL_BREAK",
        "info": "Debugger received control break.",
        "info_zh_cn": "调试器收到控制中断。"
    },
    {
        "code": 697,
        "code_bin": "0x2B9",
        "name": "ERROR_DBG_COMMAND_EXCEPTION",
        "info": "Debugger command communication exception.",
        "info_zh_cn": "调试器命令通信异常。"
    },
    {
        "code": 698,
        "code_bin": "0x2BA",
        "name": "ERROR_OBJECT_NAME_EXISTS",
        "info": "{Object Exists} An attempt was made to create an object and the object name already existed.",
        "info_zh_cn": "{Object Exists}尝试创建对象并已存在对象名称。"
    },
    {
        "code": 699,
        "code_bin": "0x2BB",
        "name": "ERROR_THREAD_WAS_SUSPENDED",
        "info": "{Thread Suspended} A thread termination occurred while the thread was suspended. The thread was resumed, and termination proceeded.",
        "info_zh_cn": "{Thread Suspended}线程挂起时发生线程终止。 线程已恢复，并继续进行终止。"
    },
    {
        "code": 700,
        "code_bin": "0x2BC",
        "name": "ERROR_IMAGE_NOT_AT_BASE",
        "info": "{Image Relocated} An image file could not be mapped at the address specified in the image file. Local fixups must be performed on this image.",
        "info_zh_cn": "{Image Relocated}图像文件无法映射到映像文件中指定的地址。 必须在此映像上执行本地修复。"
    },
    {
        "code": 701,
        "code_bin": "0x2BD",
        "name": "ERROR_RXACT_STATE_CREATED",
        "info": "This informational level status indicates that a specified registry sub-tree transaction state did not yet exist and had to be created.",
        "info_zh_cn": "此信息级别状态指示指定的注册表子树事务状态尚不存在，必须创建。"
    },
    {
        "code": 702,
        "code_bin": "0x2BE",
        "name": "ERROR_SEGMENT_NOTIFICATION",
        "info": "{Segment Load} A virtual DOS machine (VDM) is loading, unloading, or moving an MS-DOS or Win16 program segment image. An exception is raised so a debugger can load, unload or track symbols and breakpoints within these 16-bit segments.",
        "info_zh_cn": "{Segment Load}虚拟 DOS 计算机 (VDM) 正在加载、卸载或移动 MS-DOS 或 Win16 程序段映像。 引发异常，以便调试器可以在这些 16 位段内加载、卸载或跟踪符号和断点。"
    },
    {
        "code": 703,
        "code_bin": "0x2BF",
        "name": "ERROR_BAD_CURRENT_DIRECTORY",
        "info": "{Invalid Current Directory} The process cannot switch to the startup current directory %hs. Select OK to set current directory to %hs, or select CANCEL to exit.",
        "info_zh_cn": "{当前目录无效}进程无法切换到启动当前目录 %hs。 选择“确定”以将当前目录设置为 %hs，或选择“取消”退出。"
    },
    {
        "code": 704,
        "code_bin": "0x2C0",
        "name": "ERROR_FT_READ_RECOVERY_FROM_BACKUP",
        "info": "{Redundant Read} To satisfy a read request, the NT fault-tolerant file system successfully read the requested data from a redundant copy. This was done because the file system encountered a failure on a member of the fault-tolerant volume, but was unable to reassign the failing area of the device.",
        "info_zh_cn": "{冗余读取}为了满足读取请求，NT 容错文件系统从冗余副本成功读取请求的数据。 这样做是因为文件系统在容错卷的成员上遇到故障，但无法重新分配设备的故障区域。"
    },
    {
        "code": 705,
        "code_bin": "0x2C1",
        "name": "ERROR_FT_WRITE_RECOVERY",
        "info": "{Redundant Write} To satisfy a write request, the NT fault-tolerant file system successfully wrote a redundant copy of the information. This was done because the file system encountered a failure on a member of the fault-tolerant volume, but was not able to reassign the failing area of the device.",
        "info_zh_cn": "{冗余写入}为了满足写入请求，NT 容错文件系统成功编写了信息的冗余副本。 这样做是因为文件系统在容错卷的成员上遇到故障，但无法重新分配设备的故障区域。"
    },
    {
        "code": 706,
        "code_bin": "0x2C2",
        "name": "ERROR_IMAGE_MACHINE_TYPE_MISMATCH",
        "info": "{Machine Type Mismatch} The image file %hs is valid, but is for a machine type other than the current machine. Select OK to continue, or CANCEL to fail the DLL load.",
        "info_zh_cn": "{计算机类型不匹配}映像文件 %hs 有效，但适用于当前计算机以外的计算机类型。 选择“确定”以继续，或取消以失败 DLL 加载。"
    },
    {
        "code": 707,
        "code_bin": "0x2C3",
        "name": "ERROR_RECEIVE_PARTIAL",
        "info": "{Partial Data Received} The network transport returned partial data to its client. The remaining data will be sent later.",
        "info_zh_cn": "{已接收部分数据}网络传输将部分数据返回到其客户端。 其余数据稍后将发送。"
    },
    {
        "code": 708,
        "code_bin": "0x2C4",
        "name": "ERROR_RECEIVE_EXPEDITED",
        "info": "{Expedited Data Received} The network transport returned data to its client that was marked as expedited by the remote system.",
        "info_zh_cn": "{已接收加速数据}网络传输将数据返回到标记为远程系统加速的客户端。"
    },
    {
        "code": 709,
        "code_bin": "0x2C5",
        "name": "ERROR_RECEIVE_PARTIAL_EXPEDITED",
        "info": "{Partial Expedited Data Received} The network transport returned partial data to its client and this data was marked as expedited by the remote system. The remaining data will be sent later.",
        "info_zh_cn": "{已接收部分加速数据}网络传输将部分数据返回到其客户端，并且此数据被远程系统标记为加速。 其余数据稍后将发送。"
    },
    {
        "code": 710,
        "code_bin": "0x2C6",
        "name": "ERROR_EVENT_DONE",
        "info": "{TDI Event Done} The TDI indication has completed successfully.",
        "info_zh_cn": "{TDI 事件完成}TDI 指示已成功完成。"
    },
    {
        "code": 711,
        "code_bin": "0x2C7",
        "name": "ERROR_EVENT_PENDING",
        "info": "{TDI Event Pending} The TDI indication has entered the pending state.",
        "info_zh_cn": "{TDI 事件挂起}TDI 指示已进入挂起状态。"
    },
    {
        "code": 712,
        "code_bin": "0x2C8",
        "name": "ERROR_CHECKING_FILE_SYSTEM",
        "info": "Checking file system on %wZ.",
        "info_zh_cn": "检查 %wZ 上的文件系统。"
    },
    {
        "code": 713,
        "code_bin": "0x2C9",
        "name": "ERROR_FATAL_APP_EXIT",
        "info": "{Fatal Application Exit} %hs.",
        "info_zh_cn": "{致命应用程序退出} %hs。"
    },
    {
        "code": 714,
        "code_bin": "0x2CA",
        "name": "ERROR_PREDEFINED_HANDLE",
        "info": "The specified registry key is referenced by a predefined handle.",
        "info_zh_cn": "指定的注册表项由预定义句柄引用。"
    },
    {
        "code": 715,
        "code_bin": "0x2CB",
        "name": "ERROR_WAS_UNLOCKED",
        "info": "{Page Unlocked} The page protection of a locked page was changed to 'No Access' and the page was unlocked from memory and from the process.",
        "info_zh_cn": "{Page Unlocked}锁定页面的页面保护已更改为“无访问权限”，页面已从内存和进程解锁。"
    },
    {
        "code": 716,
        "code_bin": "0x2CC",
        "name": "ERROR_SERVICE_NOTIFICATION",
        "info": "%hs",
        "info_zh_cn": "%hs"
    },
    {
        "code": 717,
        "code_bin": "0x2CD",
        "name": "ERROR_WAS_LOCKED",
        "info": "{Page Locked} One of the pages to lock was already locked.",
        "info_zh_cn": "{Page Locked}要锁定的其中一个页面已被锁定。"
    },
    {
        "code": 718,
        "code_bin": "0x2CE",
        "name": "ERROR_LOG_HARD_ERROR",
        "info": "Application popup: %1 : %2",
        "info_zh_cn": "应用程序弹出窗口： %1： %2"
    },
    {
        "code": 719,
        "code_bin": "0x2CF",
        "name": "ERROR_ALREADY_WIN32",
        "info": "ERROR_ALREADY_WIN32",
        "info_zh_cn": "ERROR_ALREADY_WIN32"
    },
    {
        "code": 720,
        "code_bin": "0x2D0",
        "name": "ERROR_IMAGE_MACHINE_TYPE_MISMATCH_EXE",
        "info": "{Machine Type Mismatch} The image file %hs is valid, but is for a machine type other than the current machine.",
        "info_zh_cn": "{计算机类型不匹配}映像文件 %hs 有效，但适用于当前计算机以外的计算机类型。"
    },
    {
        "code": 721,
        "code_bin": "0x2D1",
        "name": "ERROR_NO_YIELD_PERFORMED",
        "info": "A yield execution was performed and no thread was available to run.",
        "info_zh_cn": "已执行收益率执行，并且没有线程可供运行。"
    },
    {
        "code": 722,
        "code_bin": "0x2D2",
        "name": "ERROR_TIMER_RESUME_IGNORED",
        "info": "The resumable flag to a timer API was ignored.",
        "info_zh_cn": "已忽略计时器 API 的可恢复标志。"
    },
    {
        "code": 723,
        "code_bin": "0x2D3",
        "name": "ERROR_ARBITRATION_UNHANDLED",
        "info": "The arbiter has deferred arbitration of these resources to its parent.",
        "info_zh_cn": "仲裁程序已将这些资源的仲裁推迟到其父资源。"
    },
    {
        "code": 724,
        "code_bin": "0x2D4",
        "name": "ERROR_CARDBUS_NOT_SUPPORTED",
        "info": "The inserted CardBus device cannot be started because of a configuration error on \"%hs\".",
        "info_zh_cn": "由于“%hs”上的配置错误，无法启动插入的 CardBus 设备。"
    },
    {
        "code": 725,
        "code_bin": "0x2D5",
        "name": "ERROR_MP_PROCESSOR_MISMATCH",
        "info": "The CPUs in this multiprocessor system are not all the same revision level. To use all processors the operating system restricts itself to the features of the least capable processor in the system. Should problems occur with this system, contact the CPU manufacturer to see if this mix of processors is supported.",
        "info_zh_cn": "此多处理器系统中的 CPU 不是相同的修订级别。 若要使用所有处理器，操作系统将自身限制为系统中支持最少的处理器的功能。 如果此系统出现问题，请联系 CPU 制造商，查看是否支持这种处理器组合。"
    },
    {
        "code": 726,
        "code_bin": "0x2D6",
        "name": "ERROR_HIBERNATED",
        "info": "The system was put into hibernation.",
        "info_zh_cn": "系统进入休眠状态。"
    },
    {
        "code": 727,
        "code_bin": "0x2D7",
        "name": "ERROR_RESUME_HIBERNATION",
        "info": "The system was resumed from hibernation.",
        "info_zh_cn": "系统已从休眠状态恢复。"
    },
    {
        "code": 728,
        "code_bin": "0x2D8",
        "name": "ERROR_FIRMWARE_UPDATED",
        "info": "Windows has detected that the system firmware (BIOS) was updated [previous firmware date = %2, current firmware date %3].",
        "info_zh_cn": "Windows检测到系统固件 (BIOS) 已更新[以前的固件日期 = %2，当前固件日期 %3]。"
    },
    {
        "code": 729,
        "code_bin": "0x2D9",
        "name": "ERROR_DRIVERS_LEAKING_LOCKED_PAGES",
        "info": "A device driver is leaking locked I/O pages causing system degradation. The system has automatically enabled tracking code in order to try and catch the culprit.",
        "info_zh_cn": "设备驱动程序正在泄漏锁定的 I/O 页，导致系统降级。 系统已自动启用跟踪代码，以便尝试并捕获罪魁祸首。"
    },
    {
        "code": 730,
        "code_bin": "0x2DA",
        "name": "ERROR_WAKE_SYSTEM",
        "info": "The system has awoken.",
        "info_zh_cn": "系统已唤醒。"
    },
    {
        "code": 731,
        "code_bin": "0x2DB",
        "name": "ERROR_WAIT_1",
        "info": "ERROR_WAIT_1",
        "info_zh_cn": "ERROR_WAIT_1"
    },
    {
        "code": 732,
        "code_bin": "0x2DC",
        "name": "ERROR_WAIT_2",
        "info": "ERROR_WAIT_2",
        "info_zh_cn": "ERROR_WAIT_2"
    },
    {
        "code": 733,
        "code_bin": "0x2DD",
        "name": "ERROR_WAIT_3",
        "info": "ERROR_WAIT_3",
        "info_zh_cn": "ERROR_WAIT_3"
    },
    {
        "code": 734,
        "code_bin": "0x2DE",
        "name": "ERROR_WAIT_63",
        "info": "ERROR_WAIT_63",
        "info_zh_cn": "ERROR_WAIT_63"
    },
    {
        "code": 735,
        "code_bin": "0x2DF",
        "name": "ERROR_ABANDONED_WAIT_0",
        "info": "ERROR_ABANDONED_WAIT_0",
        "info_zh_cn": "ERROR_ABANDONED_WAIT_0"
    },
    {
        "code": 736,
        "code_bin": "0x2E0",
        "name": "ERROR_ABANDONED_WAIT_63",
        "info": "ERROR_ABANDONED_WAIT_63",
        "info_zh_cn": "ERROR_ABANDONED_WAIT_63"
    },
    {
        "code": 737,
        "code_bin": "0x2E1",
        "name": "ERROR_USER_APC",
        "info": "ERROR_USER_APC",
        "info_zh_cn": "ERROR_USER_APC"
    },
    {
        "code": 738,
        "code_bin": "0x2E2",
        "name": "ERROR_KERNEL_APC",
        "info": "ERROR_KERNEL_APC",
        "info_zh_cn": "ERROR_KERNEL_APC"
    },
    {
        "code": 739,
        "code_bin": "0x2E3",
        "name": "ERROR_ALERTED",
        "info": "ERROR_ALERTED",
        "info_zh_cn": "ERROR_ALERTED"
    },
    {
        "code": 740,
        "code_bin": "0x2E4",
        "name": "ERROR_ELEVATION_REQUIRED",
        "info": "The requested operation requires elevation.",
        "info_zh_cn": "请求的操作需要提升。"
    },
    {
        "code": 741,
        "code_bin": "0x2E5",
        "name": "ERROR_REPARSE",
        "info": "A reparse should be performed by the Object Manager since the name of the file resulted in a symbolic link.",
        "info_zh_cn": "对象管理器应执行重新分析，因为文件的名称导致符号链接。"
    },
    {
        "code": 742,
        "code_bin": "0x2E6",
        "name": "ERROR_OPLOCK_BREAK_IN_PROGRESS",
        "info": "An open/create operation completed while an oplock break is underway.",
        "info_zh_cn": "在操作锁中断期间完成打开/创建操作。"
    },
    {
        "code": 743,
        "code_bin": "0x2E7",
        "name": "ERROR_VOLUME_MOUNTED",
        "info": "A new volume has been mounted by a file system.",
        "info_zh_cn": "文件系统已装载新卷。"
    },
    {
        "code": 744,
        "code_bin": "0x2E8",
        "name": "ERROR_RXACT_COMMITTED",
        "info": "This success level status indicates that the transaction state already exists for the registry sub-tree, but that a transaction commit was previously aborted. The commit has now been completed.",
        "info_zh_cn": "此成功级别状态表示注册表子树已存在事务状态，但以前中止了事务提交。 提交现已完成。"
    },
    {
        "code": 745,
        "code_bin": "0x2E9",
        "name": "ERROR_NOTIFY_CLEANUP",
        "info": "This indicates that a notify change request has been completed due to closing the handle which made the notify change request.",
        "info_zh_cn": "这表示由于关闭发出通知更改请求的句柄而已完成通知更改请求。"
    },
    {
        "code": 746,
        "code_bin": "0x2EA",
        "name": "ERROR_PRIMARY_TRANSPORT_CONNECT_FAILED",
        "info": "{Connect Failure on Primary Transport} An attempt was made to connect to the remote server %hs on the primary transport, but the connection failed. The computer WAS able to connect on a secondary transport.",
        "info_zh_cn": "{主传输上的连接失败} 尝试连接到主传输上的远程服务器 %hs，但连接失败。 计算机 WAS 能够连接到辅助传输。"
    },
    {
        "code": 747,
        "code_bin": "0x2EB",
        "name": "ERROR_PAGE_FAULT_TRANSITION",
        "info": "Page fault was a transition fault.",
        "info_zh_cn": "页面错误是转换错误。"
    },
    {
        "code": 748,
        "code_bin": "0x2EC",
        "name": "ERROR_PAGE_FAULT_DEMAND_ZERO",
        "info": "Page fault was a demand zero fault.",
        "info_zh_cn": "页面错误是需求零故障。"
    },
    {
        "code": 749,
        "code_bin": "0x2ED",
        "name": "ERROR_PAGE_FAULT_COPY_ON_WRITE",
        "info": "Page fault was a demand zero fault.",
        "info_zh_cn": "页面错误是需求零故障。"
    },
    {
        "code": 750,
        "code_bin": "0x2EE",
        "name": "ERROR_PAGE_FAULT_GUARD_PAGE",
        "info": "Page fault was a demand zero fault.",
        "info_zh_cn": "页面错误是需求零故障。"
    },
    {
        "code": 751,
        "code_bin": "0x2EF",
        "name": "ERROR_PAGE_FAULT_PAGING_FILE",
        "info": "Page fault was satisfied by reading from a secondary storage device.",
        "info_zh_cn": "通过从辅助存储设备读取来满足页面错误。"
    },
    {
        "code": 752,
        "code_bin": "0x2F0",
        "name": "ERROR_CACHE_PAGE_LOCKED",
        "info": "Cached page was locked during operation.",
        "info_zh_cn": "操作期间已锁定缓存页。"
    },
    {
        "code": 753,
        "code_bin": "0x2F1",
        "name": "ERROR_CRASH_DUMP",
        "info": "Crash dump exists in paging file.",
        "info_zh_cn": "分页文件中存在故障转储。"
    },
    {
        "code": 754,
        "code_bin": "0x2F2",
        "name": "ERROR_BUFFER_ALL_ZEROS",
        "info": "Specified buffer contains all zeros.",
        "info_zh_cn": "指定的缓冲区包含所有零。"
    },
    {
        "code": 755,
        "code_bin": "0x2F3",
        "name": "ERROR_REPARSE_OBJECT",
        "info": "A reparse should be performed by the Object Manager since the name of the file resulted in a symbolic link.",
        "info_zh_cn": "对象管理器应执行重新分析，因为文件的名称导致了符号链接。"
    },
    {
        "code": 756,
        "code_bin": "0x2F4",
        "name": "ERROR_RESOURCE_REQUIREMENTS_CHANGED",
        "info": "The device has succeeded a query-stop and its resource requirements have changed.",
        "info_zh_cn": "设备已成功执行查询停止，其资源要求已更改。"
    },
    {
        "code": 757,
        "code_bin": "0x2F5",
        "name": "ERROR_TRANSLATION_COMPLETE",
        "info": "The translator has translated these resources into the global space and no further translations should be performed.",
        "info_zh_cn": "翻译器已将这些资源转换为全局空间，不应执行进一步的翻译。"
    },
    {
        "code": 758,
        "code_bin": "0x2F6",
        "name": "ERROR_NOTHING_TO_TERMINATE",
        "info": "A process being terminated has no threads to terminate.",
        "info_zh_cn": "正在终止的进程没有要终止的线程。"
    },
    {
        "code": 759,
        "code_bin": "0x2F7",
        "name": "ERROR_PROCESS_NOT_IN_JOB",
        "info": "The specified process is not part of a job.",
        "info_zh_cn": "指定的进程不是作业的一部分。"
    },
    {
        "code": 760,
        "code_bin": "0x2F8",
        "name": "ERROR_PROCESS_IN_JOB",
        "info": "The specified process is part of a job.",
        "info_zh_cn": "指定的进程是作业的一部分。"
    },
    {
        "code": 761,
        "code_bin": "0x2F9",
        "name": "ERROR_VOLSNAP_HIBERNATE_READY",
        "info": "{Volume Shadow Copy Service} The system is now ready for hibernation.",
        "info_zh_cn": "{卷影复制服务}系统现在已准备好进行休眠。"
    },
    {
        "code": 762,
        "code_bin": "0x2FA",
        "name": "ERROR_FSFILTER_OP_COMPLETED_SUCCESSFULLY",
        "info": "A file system or file system filter driver has successfully completed an FsFilter operation.",
        "info_zh_cn": "文件系统或文件系统筛选器驱动程序已成功完成 FsFilter 操作。"
    },
    {
        "code": 763,
        "code_bin": "0x2FB",
        "name": "ERROR_INTERRUPT_VECTOR_ALREADY_CONNECTED",
        "info": "The specified interrupt vector was already connected.",
        "info_zh_cn": "指定的中断向量已连接。"
    },
    {
        "code": 764,
        "code_bin": "0x2FC",
        "name": "ERROR_INTERRUPT_STILL_CONNECTED",
        "info": "The specified interrupt vector is still connected.",
        "info_zh_cn": "指定的中断向量仍已连接。"
    },
    {
        "code": 765,
        "code_bin": "0x2FD",
        "name": "ERROR_WAIT_FOR_OPLOCK",
        "info": "An operation is blocked waiting for an oplock.",
        "info_zh_cn": "操作被阻止等待 oplock。"
    },
    {
        "code": 766,
        "code_bin": "0x2FE",
        "name": "ERROR_DBG_EXCEPTION_HANDLED",
        "info": "Debugger handled exception.",
        "info_zh_cn": "调试器处理异常。"
    },
    {
        "code": 767,
        "code_bin": "0x2FF",
        "name": "ERROR_DBG_CONTINUE",
        "info": "Debugger continued.",
        "info_zh_cn": "调试器继续。"
    },
    {
        "code": 768,
        "code_bin": "0x300",
        "name": "ERROR_CALLBACK_POP_STACK",
        "info": "An exception occurred in a user mode callback and the kernel callback frame should be removed.",
        "info_zh_cn": "用户模式回调中发生异常，应删除内核回调帧。"
    },
    {
        "code": 769,
        "code_bin": "0x301",
        "name": "ERROR_COMPRESSION_DISABLED",
        "info": "Compression is disabled for this volume.",
        "info_zh_cn": "为此卷禁用压缩。"
    },
    {
        "code": 770,
        "code_bin": "0x302",
        "name": "ERROR_CANTFETCHBACKWARDS",
        "info": "The data provider cannot fetch backwards through a result set.",
        "info_zh_cn": "数据提供程序无法通过结果集向后提取。"
    },
    {
        "code": 771,
        "code_bin": "0x303",
        "name": "ERROR_CANTSCROLLBACKWARDS",
        "info": "The data provider cannot scroll backwards through a result set.",
        "info_zh_cn": "数据提供程序无法向后滚动到结果集。"
    },
    {
        "code": 772,
        "code_bin": "0x304",
        "name": "ERROR_ROWSNOTRELEASED",
        "info": "The data provider requires that previously fetched data is released before asking for more data.",
        "info_zh_cn": "数据访问接口要求在请求更多数据之前发布以前提取的数据。"
    },
    {
        "code": 773,
        "code_bin": "0x305",
        "name": "ERROR_BAD_ACCESSOR_FLAGS",
        "info": "The data provider was not able to interpret the flags set for a column binding in an accessor.",
        "info_zh_cn": "数据提供程序无法解释访问器中为列绑定设置的标志。"
    },
    {
        "code": 774,
        "code_bin": "0x306",
        "name": "ERROR_ERRORS_ENCOUNTERED",
        "info": "One or more errors occurred while processing the request.",
        "info_zh_cn": "处理请求时发生了一个或多个错误。"
    },
    {
        "code": 775,
        "code_bin": "0x307",
        "name": "ERROR_NOT_CAPABLE",
        "info": "The implementation is not capable of performing the request.",
        "info_zh_cn": "实现无法执行请求。"
    },
    {
        "code": 776,
        "code_bin": "0x308",
        "name": "ERROR_REQUEST_OUT_OF_SEQUENCE",
        "info": "The client of a component requested an operation which is not valid given the state of the component instance.",
        "info_zh_cn": "组件的客户端请求了一个操作，该操作在组件实例的状态无效。"
    },
    {
        "code": 777,
        "code_bin": "0x309",
        "name": "ERROR_VERSION_PARSE_ERROR",
        "info": "A version number could not be parsed.",
        "info_zh_cn": "无法分析版本号。"
    },
    {
        "code": 778,
        "code_bin": "0x30A",
        "name": "ERROR_BADSTARTPOSITION",
        "info": "The iterator's start position is invalid.",
        "info_zh_cn": "迭代器的起始位置无效。"
    },
    {
        "code": 779,
        "code_bin": "0x30B",
        "name": "ERROR_MEMORY_HARDWARE",
        "info": "The hardware has reported an uncorrectable memory error.",
        "info_zh_cn": "硬件报告了不可更正的内存错误。"
    },
    {
        "code": 780,
        "code_bin": "0x30C",
        "name": "ERROR_DISK_REPAIR_DISABLED",
        "info": "The attempted operation required self healing to be enabled.",
        "info_zh_cn": "尝试的操作需要启用自我修复。"
    },
    {
        "code": 781,
        "code_bin": "0x30D",
        "name": "ERROR_INSUFFICIENT_RESOURCE_FOR_SPECIFIED_SHARED_SECTION_SIZE",
        "info": "The Desktop heap encountered an error while allocating session memory. There is more information in the system event log.",
        "info_zh_cn": "分配会话内存时，桌面堆遇到错误。 系统事件日志中还有其他信息。"
    },
    {
        "code": 782,
        "code_bin": "0x30E",
        "name": "ERROR_SYSTEM_POWERSTATE_TRANSITION",
        "info": "The system power state is transitioning from %2 to %3.",
        "info_zh_cn": "系统电源状态正在从 %2 转换为 %3。"
    },
    {
        "code": 783,
        "code_bin": "0x30F",
        "name": "ERROR_SYSTEM_POWERSTATE_COMPLEX_TRANSITION",
        "info": "The system power state is transitioning from %2 to %3 but could enter %4.",
        "info_zh_cn": "系统电源状态正在从 %2 转换为 %3，但可能进入 %4。"
    },
    {
        "code": 784,
        "code_bin": "0x310",
        "name": "ERROR_MCA_EXCEPTION",
        "info": "A thread is getting dispatched with MCA EXCEPTION because of MCA.",
        "info_zh_cn": "由于 MCA，线程正随 MCA 异常一起调度。"
    },
    {
        "code": 785,
        "code_bin": "0x311",
        "name": "ERROR_ACCESS_AUDIT_BY_POLICY",
        "info": "Access to %1 is monitored by policy rule %2.",
        "info_zh_cn": "对 %1 的访问由策略规则 %2 监视。"
    },
    {
        "code": 786,
        "code_bin": "0x312",
        "name": "ERROR_ACCESS_DISABLED_NO_SAFER_UI_BY_POLICY",
        "info": "Access to %1 has been restricted by your Administrator by policy rule %2.",
        "info_zh_cn": "策略规则 %2 已限制对 %1 的访问。"
    },
    {
        "code": 787,
        "code_bin": "0x313",
        "name": "ERROR_ABANDON_HIBERFILE",
        "info": "A valid hibernation file has been invalidated and should be abandoned.",
        "info_zh_cn": "有效的休眠文件已失效，应将其放弃。"
    },
    {
        "code": 788,
        "code_bin": "0x314",
        "name": "ERROR_LOST_WRITEBEHIND_DATA_NETWORK_DISCONNECTED",
        "info": "{Delayed Write Failed} Windows was unable to save all the data for the file %hs; the data has been lost. This error may be caused by network connectivity issues. Please try to save this file elsewhere.",
        "info_zh_cn": "{延迟写入失败}Windows无法保存文件 %hs 的所有数据;数据已丢失。 此错误可能是网络连接问题导致的。 请尝试将此文件保存到其他位置。"
    },
    {
        "code": 789,
        "code_bin": "0x315",
        "name": "ERROR_LOST_WRITEBEHIND_DATA_NETWORK_SERVER_ERROR",
        "info": "{Delayed Write Failed} Windows was unable to save all the data for the file %hs; the data has been lost. This error was returned by the server on which the file exists. Please try to save this file elsewhere.",
        "info_zh_cn": "{延迟写入失败}Windows无法保存文件 %hs 的所有数据;数据已丢失。 此错误由文件所在的服务器返回。 请尝试将此文件保存到其他位置。"
    },
    {
        "code": 790,
        "code_bin": "0x316",
        "name": "ERROR_LOST_WRITEBEHIND_DATA_LOCAL_DISK_ERROR",
        "info": "{Delayed Write Failed} Windows was unable to save all the data for the file %hs; the data has been lost. This error may be caused if the device has been removed or the media is write-protected.",
        "info_zh_cn": "{延迟写入失败}Windows无法保存文件 %hs 的所有数据;数据已丢失。 如果设备已删除或媒体受写保护，则可能导致此错误。"
    },
    {
        "code": 791,
        "code_bin": "0x317",
        "name": "ERROR_BAD_MCFG_TABLE",
        "info": "The resources required for this device conflict with the MCFG table.",
        "info_zh_cn": "此设备所需的资源与 MCFG 表冲突。"
    },
    {
        "code": 792,
        "code_bin": "0x318",
        "name": "ERROR_DISK_REPAIR_REDIRECTED",
        "info": "The volume repair could not be performed while it is online. Please schedule to take the volume offline so that it can be repaired.",
        "info_zh_cn": "在卷修复处于联机状态时无法执行。 请计划使卷脱机，以便可以修复卷。"
    },
    {
        "code": 793,
        "code_bin": "0x319",
        "name": "ERROR_DISK_REPAIR_UNSUCCESSFUL",
        "info": "The volume repair was not successful.",
        "info_zh_cn": "卷修复未成功。"
    },
    {
        "code": 794,
        "code_bin": "0x31A",
        "name": "ERROR_CORRUPT_LOG_OVERFULL",
        "info": "One of the volume corruption logs is full. Further corruptions that may be detected won't be logged.",
        "info_zh_cn": "卷损坏日志之一已满。 不会记录可能检测到的进一步损坏。"
    },
    {
        "code": 795,
        "code_bin": "0x31B",
        "name": "ERROR_CORRUPT_LOG_CORRUPTED",
        "info": "One of the volume corruption logs is internally corrupted and needs to be recreated. The volume may contain undetected corruptions and must be scanned.",
        "info_zh_cn": "卷损坏日志之一在内部损坏，需要重新创建。 卷可能包含未检测到的损坏，必须扫描。"
    },
    {
        "code": 796,
        "code_bin": "0x31C",
        "name": "ERROR_CORRUPT_LOG_UNAVAILABLE",
        "info": "One of the volume corruption logs is unavailable for being operated on.",
        "info_zh_cn": "卷损坏日志之一无法运行。"
    },
    {
        "code": 797,
        "code_bin": "0x31D",
        "name": "ERROR_CORRUPT_LOG_DELETED_FULL",
        "info": "One of the volume corruption logs was deleted while still having corruption records in them. The volume contains detected corruptions and must be scanned.",
        "info_zh_cn": "删除了其中一个卷损坏日志，同时仍包含损坏记录。 卷包含检测到的损坏，必须扫描。"
    },
    {
        "code": 798,
        "code_bin": "0x31E",
        "name": "ERROR_CORRUPT_LOG_CLEARED",
        "info": "One of the volume corruption logs was cleared by chkdsk and no longer contains real corruptions.",
        "info_zh_cn": "其中一个卷损坏日志已被 chkdsk 清除，不再包含真正的损坏。"
    },
    {
        "code": 799,
        "code_bin": "0x31F",
        "name": "ERROR_ORPHAN_NAME_EXHAUSTED",
        "info": "Orphaned files exist on the volume but could not be recovered because no more new names could be created in the recovery directory. Files must be moved from the recovery directory.",
        "info_zh_cn": "卷上存在孤立文件，但无法恢复，因为无法再在恢复目录中创建新名称。 必须从恢复目录移动文件。"
    },
    {
        "code": 800,
        "code_bin": "0x320",
        "name": "ERROR_OPLOCK_SWITCHED_TO_NEW_HANDLE",
        "info": "The oplock that was associated with this handle is now associated with a different handle.",
        "info_zh_cn": "与此句柄关联的 oplock 现在与另一个句柄相关联。"
    },
    {
        "code": 801,
        "code_bin": "0x321",
        "name": "ERROR_CANNOT_GRANT_REQUESTED_OPLOCK",
        "info": "An oplock of the requested level cannot be granted. An oplock of a lower level may be available.",
        "info_zh_cn": "无法授予所请求级别的操作锁。 较低级别的操作锁可能可用。"
    },
    {
        "code": 802,
        "code_bin": "0x322",
        "name": "ERROR_CANNOT_BREAK_OPLOCK",
        "info": "The operation did not complete successfully because it would cause an oplock to be broken. The caller has requested that existing oplocks not be broken.",
        "info_zh_cn": "该操作未成功完成，因为它会导致操作锁断开。 调用方已请求现有 oplock 未中断。"
    },
    {
        "code": 803,
        "code_bin": "0x323",
        "name": "ERROR_OPLOCK_HANDLE_CLOSED",
        "info": "The handle with which this oplock was associated has been closed. The oplock is now broken.",
        "info_zh_cn": "与此 oplock 关联的句柄已关闭。 操作锁现在已损坏。"
    },
    {
        "code": 804,
        "code_bin": "0x324",
        "name": "ERROR_NO_ACE_CONDITION",
        "info": "The specified access control entry (ACE) does not contain a condition.",
        "info_zh_cn": "(ACE) 指定的访问控制项不包含条件。"
    },
    {
        "code": 805,
        "code_bin": "0x325",
        "name": "ERROR_INVALID_ACE_CONDITION",
        "info": "The specified access control entry (ACE) contains an invalid condition.",
        "info_zh_cn": "(ACE) 指定的访问控制项包含无效条件。"
    },
    {
        "code": 806,
        "code_bin": "0x326",
        "name": "ERROR_FILE_HANDLE_REVOKED",
        "info": "Access to the specified file handle has been revoked.",
        "info_zh_cn": "已撤销对指定文件句柄的访问权限。"
    },
    {
        "code": 807,
        "code_bin": "0x327",
        "name": "ERROR_IMAGE_AT_DIFFERENT_BASE",
        "info": "An image file was mapped at a different address from the one specified in the image file but fixups will still be automatically performed on the image.",
        "info_zh_cn": "图像文件在图像文件中指定的地址上映射，但仍会在图像上自动执行修复。"
    },
    {
        "code": 994,
        "code_bin": "0x3E2",
        "name": "ERROR_EA_ACCESS_DENIED",
        "info": "Access to the extended attribute was denied.",
        "info_zh_cn": "拒绝访问扩展属性。"
    },
    {
        "code": 995,
        "code_bin": "0x3E3",
        "name": "ERROR_OPERATION_ABORTED",
        "info": "The I/O operation has been aborted because of either a thread exit or an application request.",
        "info_zh_cn": "由于线程退出或应用程序请求，I/O 操作已中止。"
    },
    {
        "code": 996,
        "code_bin": "0x3E4",
        "name": "ERROR_IO_INCOMPLETE",
        "info": "Overlapped I/O event is not in a signaled state.",
        "info_zh_cn": "重叠的 I/O 事件未处于信号状态。"
    },
    {
        "code": 997,
        "code_bin": "0x3E5",
        "name": "ERROR_IO_PENDING",
        "info": "Overlapped I/O operation is in progress.",
        "info_zh_cn": "正在进行重叠的 I/O 操作。"
    },
    {
        "code": 998,
        "code_bin": "0x3E6",
        "name": "ERROR_NOACCESS",
        "info": "Invalid access to memory location.",
        "info_zh_cn": "对内存位置的访问无效。"
    },
    {
        "code": 999,
        "code_bin": "0x3E7",
        "name": "ERROR_SWAPERROR",
        "info": "Error performing inpage operation.",
        "info_zh_cn": "执行页中操作时出错。"
    }
]

export let system_error_codes_Link_obj:system_error_codes_Link_obj = {};
for (let system_error_contain of system_error_codes ) {
    const {code}=system_error_contain;
    system_error_codes_Link_obj[code]=system_error_contain;
}

export type SystemErrorCodesContain = {
    code: number
    code_bin:string
    info: string
    info_zh_cn: string
    name: string
}
export interface system_error_codes_Link_obj  {
    [key:SystemErrorCodesContain["code"] ]:SystemErrorCodesContain|undefined;
}

export function getSystemErrorCodes(Code:SystemErrorCodesContain["code"]):SystemErrorCodesContain|undefined{
   return  system_error_codes_Link_obj[Code];
}