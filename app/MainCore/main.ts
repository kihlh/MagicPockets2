
/*
 * @Author:主进程脚本
 * @Date: 2021-12-21 20:00:16
 * @LastEditTime: 2022-07-25 21:55:46
 * @LastEditors: your name
 * @Description: 背景页用于所有窗口的调度 (模块能精简就尽量精简) 启动尽量快点
 * @FilePath: \app\MainCore\main.ts
 */
let StartTime: bigint = process.hrtime.bigint();
import HMC, { Sleep } from "../modules/_NapiModules/HMC";
import path = require('path');
import electron, { app, BrowserWindow, ipcMain, Menu, Tray, webContents, dialog } from "electron";
import cmd from "../modules/cmd";
import fs = require("fs-extra");
import shake from '../modules/shake'
import dayjs = require("dayjs");
import os = require("os")
import GoalUtil = require("../modules/Object@util");
import { download, downloadAll, axios } from "../modules/download";
const MainEnvFun: MainEnvFun = { AppSetup: false };
import log from "electron-log";
import store from "electron-store"
import { amap_com_v3_weatherInfo___ALL, amap_com_v5_ip_Get, temperatureInfoType, KIIC_API_Detailed } from '../@types/WeathersAPI';
import { HM_Setting } from '../@types/Main';
import GainPath from '../modules/GainPath';
import { openApp } from "open";
let apppath = path.join(app.getAppPath());
const StartWindowList: Set<Electron.BrowserWindow> = new Set();
let RootPath = path.join(app.getAppPath(), "..", "..");
const Store = new store({ name: "setting", fileExtension: "HM", cwd: path.join(RootPath, "UserData") })
require('@electron/remote/main').initialize();
function ID() { return (Date.now().toString(36) + Math.random().toString(36).slice(2, 7)).toUpperCase() }
import sharp = require("../modules/_NapiModules/sharp");
import fswin from "../modules/_NapiModules/fswin/index"


function NotFunction(...args: any[]) { }
/**需要使用定时器则放到这边 节省定时器性能消耗*/
let IntervalFunctionList: IntervalFunctionList = {
    _1s: [],
    _15s: [],
    _30s: [],
    _1min: [],
    _10min: [],
    _30min: [],
    _1Hours: [],
}
/**APP初始化*/
class ReadyAPP {
    Protocol = "HMMagicPocket"
    /**UA */
    UserAgent = `5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${process.versions.chrome} Safari/537.36`
    /**Chrome命令行 */
    Switch = [["--enable-transparent-visuals"], ["enable-features", "CSSColorSchemeUARendering, ImpulseScrollAnimations, ParallelDownloading"], ["--noerrdialogs"], ["--disable-system-font-check"]]
    constructor() {
        process.on('uncaughtException', AppPrintError);
        process.on('unhandledRejection', AppPrintError);
        dayjs.extend(require('dayjs/plugin/relativeTime')); require('dayjs/locale/zh-cn'); dayjs.locale("zh-cn");

        /**
         * 预设位置
         */
        const PresetPathList: PresetPathList = [

            {
                name: "userData",
                path: path.join(RootPath, 'userData', 'HMMagicPocket')
            }, {
                name: "temp",
                path: path.join(RootPath, 'userData', 'temp')
            }, {
                name: "cache",
                path: path.join(RootPath, 'userData', 'temp', "cache")
            }, {
                name: "logs",
                path: path.join(RootPath, 'userData', "logs")
            }, {
                name: "downloads",
                path: path.join(RootPath, 'userData', "downloads")
            },
            {
                name: "appData",
                path: path.join(RootPath, 'userData')
            },
        ];
        Store.set("system", {
            TEMP: os.tmpdir()
        });

        for (const Preset of PresetPathList) // 设置日志位置
            if (Preset.name == "logs") log.transports.file.resolvePath = () => path.join(app.getPath("logs"), "Main.log");

        // 强制设置用户数据到安装目录
        for (const Preset of PresetPathList) {
            if (!fs.pathExistsSync(Preset.path)) fs.mkdirSync(Preset.path);
            app.setPath(Preset.name, Preset.path);
            Store.set("app." + Preset.name, Preset.path);
        }

        // 初始化Store赋值
        fs.readJSON(path.join(apppath, "lib", "setting.HM")).then((data: HM_Setting) => {
            if (!Store.has("UsersID")) {
                Store.set("UsersID", ID())
                log.log(`[Store-UsersID]   ${Store.get("UsersID")}`)
                log.log(`[Users-initialize]   initialize}`)
            }
            for (const key in data) {
                if (!Store.has(key)) {
                    Store.set(key, GoalUtil.Get(data, key))
                    log.log(`[Store-set]   ${key}`)
                }
            }
        })

        /**
         * 打印错误
         * @param error 
         */
        function AppPrintError(error?: Error | string) {
            log.error("[main]   " + error || "UnknownError")
            setTimeout(function () {
                if (!BrowserWindow.getAllWindows().length) {
                    log.error("[main]   APP严重错误并且无窗口自行退出程序")
                    app.quit()
                }
            }, 5000)
        }

        //是否启动第二个实例
        if (!app.requestSingleInstanceLock()) {
            log.warn(`[Main]   APP重复启动 正在退出`)
            app.quit();
        }
        // Chrome命令
        const { appendSwitch } = app.commandLine;
        for (const CMDList of this.Switch) {
            appendSwitch(CMDList[0], (CMDList[1] || ""))
        }
        app.setLoginItemSettings({ args: ['--processStart', `"wqrd-hidden"`] })
        // 监听渲染进程奔溃
        app.on('render-process-gone', function (event, webContents, details) {
            AppPrintError("渲染进程崩溃")
            log.error("[Main]   渲染进程崩溃  =>  " + (details.reason || "未知") + "退出代码 => " + details.exitCode || "未知")
            log.error("[Main]   窗口" + webContents.getTitle() || "无标题" + "id=>" + webContents.id || "未知")
        })
        //@ts-expect-error 监听进程奔溃
        app.on('child-process-gone', function (event, details, exitCode, serviceName, name) {
            const { type, reason } = details;
            AppPrintError("进程崩溃")
            log.error(`[Main]   进程崩溃 => ${type}  错误代码=>  ${reason}  进程=> ${exitCode}  名称=>${name}`)
        })
        // UA
        app.userAgentFallback = this.UserAgent;
        //   移除所有快捷键
        app.on("will-quit", () => {
            electron.globalShortcut.unregisterAll();
        });
        //   退出窗口
        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                log.warn(`[Main]   NOT_window__app_quit`);
                app.quit();
            }
        })
        // 错误退出
        if (process.platform === "win32") {
            process.on("message", (data) => {
                if (data === "graceful-exit") {
                    log.warn(`[Main]   graceful-exit__app_quit`);
                    app.quit();
                }
            });
        } else {
            process.on("SIGTERM", () => {
                log.warn(`[Main]   SIGTERM__app_quit`);
                app.quit();
            });
        }

        //   注册启动协议 HMMagicPocket://
        app.setAsDefaultProtocolClient(this.Protocol)
        app.whenReady().then(() => this.Ready = true);
        log.log(`[Main]   APP_Ready`)
    }
    Ready = false
}
new ReadyAPP();
/**加载中的窗口...*/
class StartLoadingMainWindow {
    options: Electron.BrowserWindowConstructorOptions =
        {
            show: false,
            frame: false,
            center: true,
            width: 390,
            height: 260,
            skipTaskbar: true,/**不显示在状态栏 */
            backgroundColor: '#ffffff'/**背景色 */
        }
    MainWindow: Electron.BrowserWindow | null;
    constructor() {
        this.MainWindow = new BrowserWindow(this.options);
        let win = this.MainWindow;
        win.loadFile(path.join(apppath, "view", "loading", "index.html"));
        win.once("ready-to-show", function () {
            win.show();

        })

        win.setIcon(path.join(apppath, "lib", "src", 'ico.ico'))
        ipcMain.handle("loadingText", (Event, info: string) => {
            this.Print(info)
        });
        // 禁用默认菜单弹出
        // win.hookWindowMessage(0x0116,()=>{
        // win.setEnabled(false);
        // Sleep(225,true);
        // win.setEnabled(true);
        // });
    }
    close() {
        this.MainWindow?.close();
        this.MainWindow = null;

    }

    Print(info: string) {
        this.MainWindow?.webContents.executeJavaScript(`SetInfoText('${info}')`)
    }
}

/**主窗口 */
class StartMainWindow {
    URL = path.join(apppath, "view", "main", "app.html")
    MainWindow: Electron.BrowserWindow;
    options = {
        show: false,/**不提前显示 窗口加载完成被 MainWindow主窗口构造显示*/
        frame: false,/**不需要框架 */
        center: true,/**居中 */
        webPreferences: {/**Web安全性设置 */
            nodeIntegration: true,/**启用node */
            webSecurity: false,/**关闭跨域安全限制 */
            contextIsolation: false,/**是否上下文隔离 */
            spellcheck: false,/**拼写检查器 关闭后不会有input红线 */
            nodeIntegrationInWorker: true,/**是否集成node到渲染页面 */
            webviewTag: true,/**允许启用webview标签页*/
            preload: path.join(apppath, "builds", "PreloadMain.js"),/**上下文不隔离的背景页脚本 */
            plugins: true,/**允许启用插件 */
            backgroundThrottling: false,/**禁止窗口节流，休眠 */
        },
        minWidth: 850,/**最小窗口 */
        minHeight: 539,/**最小 */
        backgroundColor: '#ffffff'/**背景色 */
    }
    webContents: Electron.WebContents;
    capturePage: (Bounds: Electron.Rectangle) => Promise<Buffer>;
    SetCSS: (CSSCode: string) => void;
    show: () => void;
    load: (URL: string) => Error | undefined;
    constructor() {
        this.MainWindow = new BrowserWindow(this.options);
        this.HwInfo();
        this.webContents = this.MainWindow.webContents;
        const { MainWindow: win, webContents } = this;
        Store.set("apppath", apppath);
        let _this = this;
        /**数字合法验证 */
        function IsReSizeLegal(Num: number, Min: number, Max: number): boolean | number {
            if (Num > Min/**数字不低于最小限制 */) {
                if (Max + 1 > Num /**数字不大于最大限制 */) return Num
            }
            return false
        }
        /**获取合法的位置和窗口大小信息 */
        function BoundsInspect(Bounds: Electron.Rectangle): Electron.Rectangle {
            const Minwidth = _this.options.minWidth;
            const Minheight = _this.options.minHeight;
            if (!Bounds) Bounds = { x: 0, y: 0, width: Minwidth, height: Minheight };
            // 不记录不合法的数据
            const NewBounds = Object.assign(Bounds, {
                y: IsReSizeLegal(Bounds.y, 0, 800) || 0,
                x: IsReSizeLegal(Bounds.x, 0, 900) || 0,
                width: IsReSizeLegal(Bounds.width, Minwidth, 1920) || Minwidth,
                height: IsReSizeLegal(Bounds.height, Minheight, 1080) || Minheight,
            })
            return NewBounds
        }
        /**恢复窗口位置和大小 */
        if (Store.has("window.resize")) {
            // @ts-expect-error
            const Bounds: Electron.Rectangle = Store.get("window.resize");
            win.setBounds(BoundsInspect(Bounds));
        }
        require("@electron/remote/main").enable(win.webContents)
        // 记录窗口大小调整
        win.on("resized", function () {
            // 禁止夹带私货
            let Bounds = JSON.parse(JSON.stringify(win.getBounds()));
            Store.set("window.resize", BoundsInspect(Bounds));
            webContents.send("resized", Bounds);
        });
        win.on("maximize", function () {
            let Bounds = JSON.parse(JSON.stringify(win.getBounds()));
            Store.set("window.resize", BoundsInspect(Bounds));
            webContents.send("maximize", Bounds);
            webContents.send("resized", Bounds);
        })
        win.on("minimize", function () {
            let Bounds = JSON.parse(JSON.stringify(win.getBounds()));
            Store.set("window.resize", BoundsInspect(Bounds));
            webContents.send("minimize", Bounds);
            webContents.send("resized", Bounds);

        })
        // 记录移动窗口
        win.on('moved', function () {
            Store.set("window.resize", BoundsInspect(win.getBounds()))
        })
        // 运行第二个实例时,聚焦这个窗口
        app.on("second-instance", () => {
            if (win) {
                if (win.isMinimized()) {
                    win.restore();
                }
                win.focus();
            }
        });
        // 监听控制台错误
        win.webContents.on('console-message', function (event, level, message, line, sourceId) {
            let Name = "MainWindow"
            let fun = {
                0: function () { },
                1: function () {/**log.info(`[Render]  ${Name}`);log.info(message) */ },
                2: function () { log.warn(`[Render]  ${Name}`); log.warn(message) },
                3: function () { log.error(`[Render]  ${Name}`); log.error(message) },
            }
            GoalUtil.get(fun, level)()
        })
        // 截屏
        this.capturePage = function (Bounds: Electron.Rectangle): Promise<Buffer> {
            return new Promise(async function (resolve, reject) {
                try {
                    webContents.capturePage(Bounds).then(onfulfilled => {
                        if (onfulfilled.getSize().width) return reject("NOT_Images_Size")
                        resolve(onfulfilled.toPNG())
                    })
                } catch (error) { return reject(error) }
            })
        }
        this.show = function () { win.show(); log.log(`[Main]   MainWindow--show`) };
        // 将来可能会热调用 所以先做异常反馈
        this.load = function (URL: string) {
            try {
                if (!URL) {
                    const Typeinfo = "[Main]   MainWindow--OPEN--NOT--URL";
                    log.error(Typeinfo);
                    return new Error(Typeinfo)
                }
                if (URL.match(/^https?|^[/\\]{2}/)) {
                    win.loadURL(URL)
                } else {
                    win.loadFile(URL);
                }
            } catch (error) {
                log.error(`[Main]   MainWindow--OPEN--ERROR--URL：${URL}`)
                log.error("[Main]   " + error)
            }
        }
        this.SetCSS = function (CSSCode: string): void {
            win.webContents.insertCSS(CSSCode);
        }
        this.load(this.URL)
    }
    /**
     * 打印错误
     * @param error 
     */
    PrintError(error: Error) {
        log.error("[main]   " + error)
        let _this = this;
        // 检查是否无窗口 如果是则退出
        setTimeout(function () {
            const { BrowserWindow, app } = electron;
            if (!BrowserWindow.getAllWindows().length) {
                log.error("[main]   APP严重错误并且无窗口自行退出程序")
                _this.quit()
            }
        }, 5000)
    }
    /**
     * 退出app
     * @param Handler 发起人
     * @param Cause 
     */
    quit(Handler?: string, Cause?: string | Error) {
        if (Handler) log.error("[main]   ", Cause || "Quit")
        else log.info(`[main]   Quit`)
        app.quit()
    }
    /**
     * 重启软件
     * @param Type 原因
     */
    Restart(Type?: string) {
        log.log(`[Main]   Restart` + Type ? Type : "")
        app.relaunch({
            args: process.argv.slice(1).concat(['--relaunch'])
        });
        app.exit(0)
    }
    /**
     * 打印用户电脑信息
     */
    HwInfo() {
        const cpu = os.cpus();
        const CPU_0 = cpu[0];
        for (const iterator of [
            `[Main]   UsersID:${Store.get("UsersID") || "null"}`,
            `[Main]   OS:${os.type()}_${process.platform}_${process.arch}_${os.release()}`,
            `[Main]   CPU:` + `${CPU_0?.model} ${CPU_0?.speed} x ${cpu.length}`.replace(/([ \t\n])+/g, "$1"),
            `[Main]   Path:${process.execPath}`, `[Main]   Frame:${process.versions.electron}`,
            `[Main]   RAM:${(os.totalmem() / 1073741824).toFixed(1) + 'G'}`,
            `[Main]   FreeRAM:${(os.freemem() / 1073741824).toFixed(1) + 'G'}`,
            `[Main]   Uptime:${os.uptime() / 1000 / 10}s`,
            `[Main]   Asar:${__dirname.includes(".asar")}`,
            `[Main]   Version:${app.getVersion()}`,
            // `[Main]   BuildVersion:${PacKage?.BuildVersion}`,
            // `[Main]   API:${OS_SETUP?.port}`,
        ]) log.info(iterator)
    }
    async isDeveloper() {
        if (!Object.keys(MainEnvFun).includes("isDeveloper")) {
            MainEnvFun.isDeveloper = !(
                (await fs.pathExists(path.join(RootPath, "unins000.exe"))) ||
                (await fs.pathExists(path.join(RootPath, "unins000.dat"))) ||
                (await fs.pathExists(path.join(RootPath, "Uninstall.exe"))))
        }
        return MainEnvFun.isDeveloper
    }
}

/**托盘 */
class StartTray {
    Tray: Electron.Tray;
    constructor() {
        const ReadyAPPTray = new Tray(path.join(apppath, "lib", "src", "Newico", "ico19px.ico"));
        this.Tray = ReadyAPPTray
        const MainWindow = MainEnvFun.MainWindow?.MainWindow || BrowserWindow.fromId(1) || BrowserWindow.fromId(2) || BrowserWindow.fromId(3)
        const MenuList: Array<(Electron.MenuItemConstructorOptions)> = [{
            label: "显示窗口",
            visible: false,
            click: () => {
                contextMenu.items[0].visible = false;
                contextMenu.items[1].visible = true;
                MainWindow?.show()
            },
            accelerator: 'alt+q',
        }, {
            label: "隐藏窗口",
            visible: true,
            click: () => {
                contextMenu.items[0].visible = true;
                contextMenu.items[1].visible = false;
                MainWindow?.hide();
            },
            accelerator: 'alt+w',
        }, {
            label: "重启",
            click: () => MainEnvFun.MainWindow?.Restart(),
            visible: true,
            enabled: true,
            accelerator: 'ctrl+q',
        }, {
            label: "控制台",
            visible: true,
            click: () => {
                MainWindow?.webContents.openDevTools();
                log.log(`[Main]   openDevTools`)
            },
            accelerator: '',
        }, {
            label: "查看日志",
            visible: true,
            click: () => electron.shell.openPath(app.getPath("logs")),
            accelerator: '',
        }, {
            click() {
                if (HMC.OpenApp(path.join(apppath, "webpack", "Compiler.exe"), null, path.join(apppath, "webpack"), true)) {
                    let GetesBuildMenu = contextMenu.getMenuItemById("esBuild");
                    if (GetesBuildMenu) GetesBuildMenu.enabled = true;
                }

            },
            label: "esBuild",
            visible: false,
            enabled: true,
            id: "esBuild"
        }, {
            label: "退出应用",
            click: () => MainEnvFun.MainWindow?.quit(),
            visible: true,
            enabled: true,
            accelerator: 'ctrl+shift+w',
        }];

        const contextMenu = Menu.buildFromTemplate(MenuList);
        fs.pathExists(path.join(apppath, "webpack", "Compiler.exe")).then(Exist => {
            let GetesBuildMenu = contextMenu.getMenuItemById("esBuild");
            if (Exist && GetesBuildMenu) GetesBuildMenu.visible = true;
        }).catch(err => NotFunction)
        // 显示名称会影响win用户点击
        ReadyAPPTray.setToolTip(app.getName())
        ReadyAPPTray.setContextMenu(contextMenu)
        ReadyAPPTray.on('double-click', () => {
            if (MainWindow?.isVisible())
                MainWindow?.hide()
        })
        ReadyAPPTray.on('click', () => {
            if (!MainWindow?.isVisible() && !shake.isset("ClickTry", 500))
                MainWindow?.show()
        })
    }
}

/**IPC  子进程主进程交互*/
class StartIPCMAN {
    HandleList: any
    HandleOnceList: any
    OnceList: any
    OnList: any
    constructor() {
        class HMipcMain {
            /**
        * IPC 这边的被重新封装过 为了错误记录和不会弹出消息卡进程
        */
            constructor() {
                for (const key of Object.keys(ipcMain)) {
                    GoalUtil.set(this, key, GoalUtil.get(ipcMain, key))
                }
                // 全部发送方法
                this.sendAll = function (channel, ...args) {
                    if (!args) args = [];
                    const WinContentsList = webContents.getAllWebContents();
                    return new Promise(async function (resolve, reject) {
                        log.log(`[Main]   IPC_SendAll channel=> ${String(channel)}`)
                        for (const WinConten of WinContentsList) {
                            try {
                                WinConten.send(channel, ...args)
                            } catch (error) {
                                log.error(`[Main]   IPC_SendAll@webContentsID=>${WinConten.id}`, error)
                            }
                        }
                        resolve()
                    })

                }
                //  监听常规ipc消息
                this.on = function (channel, listener) {
                    if (listener instanceof Function) {
                        return ipcMain.on(channel, function (...args) {
                            try {
                                return listener(...args);
                            } catch (error) {
                                log.error(`[Main]   IPC_ON@=>${channel + ''}`, error)
                            }
                        })
                    }
                    return ipcMain.on(channel, listener)
                }
                //  监听常规ipc消息
                this.once = function once(channel, listener) {
                    if (listener instanceof Function) {
                        return ipcMain.once(channel, function (...args) {
                            try {
                                return listener(...args);
                            } catch (error) {
                                log.error(`[Main]   IPC_ON@=>${channel + ''} `, error)
                            }
                        })
                    }
                    return ipcMain.once(channel, listener)
                }
                // 移除处理
                this.handle =
                    function handle(channel: string, listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => (Promise<void>) | (any)) {
                        try {
                            if (listener instanceof Function) {
                                return ipcMain.handle(channel, function (...args) {
                                    return listener(...args)
                                })
                            }
                        } catch (error) {
                            log.error(`[Main]   IPC_handle@=>${channel + ''}`, error)
                        }
                        return ipcMain.handle(channel, listener)
                    }
                // 单次异步
                this.handleOnce =
                    function handleOnce(channel: string, listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => (Promise<void>) | (any)) {
                        try {
                            if (listener instanceof Function) {
                                return ipcMain.handleOnce(channel, function (...args) {
                                    return listener(...args)
                                })
                            }
                        } catch (error) {
                            log.error(`[Main]   IPC_handleOnce@=>${channel + ''}`, error)
                        }
                        return ipcMain.handleOnce(channel, listener)
                    }
                // 删除全部监听
                this.removeAllListeners =
                    function removeAllListeners(channel?: string) {
                        log.log(`[Main]   IPC_removeAllListeners `)
                        return ipcMain.removeAllListeners(channel)
                    }




            }
        }
        const IpcMain = new HMipcMain()
        const { handle, sendAll, on, handleOnce, once, removeHandler } = IpcMain;
        // 默认向所有窗口发送Store更新事件
        Store.onDidAnyChange(function (newValue, oldValue) {
            sendAll("StoreUpdate", newValue, oldValue, GetJSON(Store.store))
        })
        /**
         * 将JSON预处理一遍防止因为夹带私货而报错
         * @param input 
         * @returns 
         */
        function GetJSON(input: Object | Array<any> | Set<any>): Object | Array<any> {
            function ToJSONP(input: Object | Array<any>) {
                return JSON.parse(JSON.stringify(input));
            }
            if (input instanceof Set || input instanceof Array) {
                let NewData = new Array();
                for (const iterator of input) {
                    NewData.push(iterator)
                }
                return ToJSONP(NewData)
            }
            return ToJSONP(input);
        }
        /**获取主窗口ID */
        function Getwin(Event: Electron.IpcMainInvokeEvent): Electron.CrossProcessExports.BrowserWindow {
            // @ts-ignore
            return BrowserWindow.fromId(Event.sender.id) || Event.sender?.getOwnerBrowserWindow()
        }
        /**打开控制台 */
        function openDevTools(Event: Electron.IpcMainInvokeEvent) {
            Event.sender.openDevTools()
            log.log("[Render]   openDevTools")
        }
        /**获取保存到的路径 */
        async function Save(Event: Electron.IpcMainInvokeEvent, Name: string) {
            const Open = await dialog.showSaveDialog({
                defaultPath: Name
            })
            log.log(`[Render]   Open.filePath@:${Open.filePath}`)
            return Open.filePath
        }
        /**打开主界面的控制台 */
        function openMainDevTools(Event: Electron.IpcMainInvokeEvent) {
            const win = Getwin(Event);
            const BrowserViewsList = win.getBrowserViews();
            if (BrowserViewsList.length == 1) {
                BrowserViewsList[0].webContents.openDevTools();
                return 0
            }
            win.webContents.openDevTools();
            log.log("[Render]   openMainDevTools")
        }
        /**设置顶设或取消 */
        function SetTop(Event: Electron.IpcMainInvokeEvent) {
            const win = Getwin(Event);
            win.setAlwaysOnTop(!win.isAlwaysOnTop())
            return win.isAlwaysOnTop()
        }
        /**关闭窗口 */
        async function Close(Event: Electron.IpcMainInvokeEvent) {
            let win = Getwin(Event);
            win.close()
        }
        /**打开所有支持的图片文件 并返回路径 */
        async function OpenImagesPathList(Event: Electron.IpcMainInvokeEvent, Path: string) {
            const Open = await electron?.dialog.showOpenDialog({
                title: "请选择图片",
                defaultPath: Path || app.getPath("desktop"),
                properties: ['openFile', 'multiSelections'],
                filters: [{
                    name: '图片',
                    extensions: ['jpg', 'png', 'jpeg', 'wepb']
                }],
            })
            if (Open?.filePaths) return GetJSON(Open.filePaths)
        }
        /**获取该窗口大小 */
        function GetBounds(Event: Electron.IpcMainInvokeEvent) {
            return GetJSON(Getwin(Event).getBounds())
        }
        /**设置该窗口大小 */
        function SetBounds(Event: Electron.IpcMainInvokeEvent, Bounds: Electron.Rectangle) {
            const win = Getwin(Event);
            win.setBounds(Object.assign(
                win.getBounds(),
                Bounds || {}
            ))
            return true
        }
        /**截屏 */
        async function GetPage(Event: Electron.IpcMainInvokeEvent, Bounds: Electron.Rectangle | string | null, Path?: string) {
            /**
             * 创建文件夹并且写入文件 没有文件夹则分配到缓存路径
             * @param Path 路径
             * @param Data 
             */
            function writeTo(Path: string, Data: any) {
                return new Promise(async function (resolve, reject) {
                    try {
                        if (!Path.includes('/') && !Path.includes('\\')) {
                            Path = path.join(app.getPath("temp"), Path)
                        }
                        const { dir } = path.parse(Path)
                        await fs.pathExists(dir).then(is => {
                            if (!is) {
                                fs.mkdirs(dir)
                            }
                        }).catch(resolve)
                        fs.writeFile(Path, Data).then(reject).catch(resolve)
                    } catch (error) { return reject(error) }
                })

            }
            if (Bounds instanceof String) {
                Path = String(Bounds);
                Bounds = null;
            }
            // @ts-ignore
            if (!Bounds) Bounds = {};
            // @ts-ignore
            let onfulfilled = await Event.sender.capturePage(Bounds)
            const ImagesSize = onfulfilled.getSize()
            if (!ImagesSize.width || !ImagesSize.height) {
                throw new Error("Not Size Images")
            }
            const ImagesBuffer = onfulfilled.toPNG()
            if (!Path) return ImagesBuffer;
            // 有路径写入路径
            writeTo(Path, ImagesBuffer)
            return Path
        }
        /**在主进程运行代码
         * ! 高风险功能  */
        function MainEval(Event: Electron.IpcMainInvokeEvent, Code: string) {
            let FUN = new Function(Code);
            (function (require: any, app: any, BrowserWindow: any, electron: any, __dirname: any, __filename: any, exports: any, module: any, process: any, global: any, Buffer: any) {
                FUN.call(globalThis);
            }).call(globalThis, require, app, BrowserWindow, electron, __dirname, __filename, exports, module, process, global, Buffer);
        }
        /**对所有窗口发送一遍ipc消息 */
        function SendAllWin(Event: Electron.IpcMainInvokeEvent, info: string, ...Code: string[][]) {
            sendAll(info, ...Code)
        }
        /**最大化 ...恢复 */
        function LimitWindow(Event: Electron.IpcMainInvokeEvent) {
            const win = Getwin(Event);
            if (win.isMaximized()) {
                win.restore();
            } else {
                win.maximize();
            }
        }
        /**最小化 */
        function MinWindow(Event: Electron.IpcMainInvokeEvent) {
            const win = Getwin(Event);
            win.minimize();
        }
        /**显示窗口 */
        function show(Event: Electron.IpcMainInvokeEvent) {
            const win = Getwin(Event);
            if (!win) throw new Error("Not Win");
            win.show()
        }
        /**隐藏窗口 */
        function hide(Event: Electron.IpcMainInvokeEvent) {
            const win = Getwin(Event);
            if (!win) throw new Error("Not Win");
            win.hide()
        }
        /**窗口是否可见 */
        function isShow(Event: Electron.IpcMainInvokeEvent) {
            const win = Getwin(Event);
            if (!win) throw new Error("Not Win");
            return win.isVisible()
        }
        /**窗口是否顶设 */
        function isTop(Event: Electron.IpcMainInvokeEvent) {
            const win = Getwin(Event);
            if (!win) throw new Error("Not Win");
            return win.isAlwaysOnTop()
        }
        /**窗口是否最大化 */
        function isMax(Event: Electron.IpcMainInvokeEvent) {
            const win = Getwin(Event);
            if (!win) throw new Error("Not Win");
            return win.isMaximized()
        }
        /**窗口是否正常 */
        function isNormal(Event: Electron.IpcMainInvokeEvent) {
            const win = Getwin(Event);
            if (!win) throw new Error("Not Win");
            return win.isNormal()
        }
        /**获取窗口id */
        function GetId(Event: Electron.IpcMainInvokeEvent) {
            return Event.sender.id
        }
        /**聚焦窗口 */
        function Focus(Event: Electron.IpcMainInvokeEvent) {
            Event.sender.focus();
        }
        /**名称路径请求 */
        function GetPath(Event: Electron.IpcMainInvokeEvent, Name: PresetPathList[0]["name"]) {
            return app.getPath(Name)
        }
        /**关闭软件 */
        function Quit(Event: Electron.IpcMainInvokeEvent) {
            MainEnvFun.MainWindow?.quit("IPCMAIN_Quit")
        }
        /**重启软件 */
        function Relaunch(Event: Electron.IpcMainInvokeEvent) {
            MainEnvFun.MainWindow?.Restart("IPCMAIN_Restart")

        }
        /**判断是否在开发者模式下  -判断是否有卸载面板 */
        async function isDeveloper(Event: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent) {
            if (Object.keys(Event).includes("returnValue")) {
                Event.returnValue = await MainEnvFun.MainWindow?.isDeveloper()
            }
            return await MainEnvFun.MainWindow?.isDeveloper()
        }
        /**刷新 */
        function Refresh(Event: Electron.IpcMainInvokeEvent, ID?: number) {
            ID && electron.BrowserWindow.fromId(ID)?.reload()
            ID || Event.sender.reload();
            log.info(`[Render]   Refresh_ID:[${Event.sender.id}]Call@[${ID || Event.sender.id}]`)
        }
        /**名称路径请求 */
        async function getFileIcon(Event: Electron.IpcMainInvokeEvent, path: string, options?: Electron.FileIconOptions) {
            return await app.getFileIcon(path, options)
        }
        /**返回软件启动到现在的毫秒 */
        function DiffStartTime(Event: Electron.IpcMainInvokeEvent) {
            return (+new Date()) - (process.getCreationTime() || 0)
        }
        class StoreRenderer {
            data: Record<string, unknown>;
            Set(key: string | string[], value?: unknown | any) {
                Store.set(Array.isArray(key) ? key.join('.') : key, value || null);
            }

            Get(key: string | string[]) {
                if (!key) return GetJSON(Store.store);
                return Store.get(Array.isArray(key) ? key.join('.') : key);
            }

            Has(key: string | string[]) {
                return Store.has(Array.isArray(key) ? key.join('.') : key)
            }

            constructor() {
                this.data = Store.store;
                this.on = function (Type, CallBack) {
                    Store.onDidChange(Type, function (newValue: any, oldValue: any) {
                        // @ts-expect-error 
                        if (CallBack) CallBack.apply(Store.store, [newValue, oldValue, Type])
                    })
                }
            }

        }

        let IpcLinkStore = new StoreRenderer();
        /**Ipc StoreSet */
        function StoreSet(Event: Electron.IpcMainInvokeEvent, key: string, value?: unknown | any) {
            return IpcLinkStore.Set(key, value)
        }
        /**Ipc StoreHas */
        function StoreHas(Event: Electron.IpcMainInvokeEvent, key: string) {
            return IpcLinkStore.Has(key)
        }
        /**Ipc StoreGet */
        function StoreGet(Event: Electron.IpcMainInvokeEvent, key: string) {
            return IpcLinkStore.Get(key)
        }
        /**Ipc StoreON */
        function StoreON(Event: Electron.IpcMainInvokeEvent, key: string) {
            IpcLinkStore.on(key, function (newValue: any, oldValue: any, key: string) {
                sendAll(`StoreUpdateForKey_${key}`, newValue, oldValue, key, GetJSON(Store.store))
            })
            return true
        }
        /**Ipc 停止加载动画并显示主窗口 */
        function $nextTick(Event: Electron.IpcMainInvokeEvent) {
            MainEnvFun.$nextTick && MainEnvFun.$nextTick()
        }
        /**获取app是否已经关闭了启动动画并已就绪 */
        function IsAppSetup(Event: Electron.IpcMainInvokeEvent) {
            return !!MainEnvFun.AppSetup
        }

        /**创建窗口(不使用便签页) */
        function OpenBrowserWindow(Event: undefined | Electron.IpcMainInvokeEvent, URL: string, Configure?: Electron.BrowserWindowConstructorOptions | boolean) {
            let BrowserWindow = new StartWindow(URL, Configure);
            if (BrowserWindow.MainWindow) StartWindowList.add(BrowserWindow.MainWindow);
            return BrowserWindow.MainWindow?.id || -1;
        }
        /**拖拽**/
        async function DragFiles(Event: Electron.IpcMainInvokeEvent, Path: string | string[], icon?: string) {
            let ICON = path.join(apppath, "/lib/src/document-add.png");
            if (!Path) throw new Error("Not Path or PathArray");
            let Path_For01 = Array.isArray(Path) ? Path[0] : Path;
            let IsImages = Path_For01.match(/[.](jpe?g|png|webp|ico|svg|gif)$/);
            let FileIcon: string | Electron.NativeImage | undefined | void = icon;
            if (!icon && IsImages) {
                let To_temp_PNG_Path: string = path.join(app.getPath("temp"), ID() + ".png");
                await sharp(Path_For01).resize(50, null).toFile(To_temp_PNG_Path);
                FileIcon = To_temp_PNG_Path;
            }
            if (!FileIcon) FileIcon = ICON;

            if (Array.isArray(Path)) {
                Event.sender.startDrag({
                    files: Path,
                    icon: FileIcon,
                    file: ""
                })
            } else {
                Event.sender.startDrag({
                    icon: FileIcon,
                    file: Path
                })
            }

        }
        /**更新一言 */
        function UpdateAskHou() {
            MainEnvFun.MainInfo?.UpdateAskHou();
            log.log(`[main]   AskHou=>Update`)
        }
        /**输入框 */
        function _Prompt(Event: Electron.IpcMainInvokeEvent, Title: string, data: string, placeholder: string) {
            return new Promise<string>((resolve, reject) => {
                let isMessage = false;
                let promptSendData = {
                    id: ID(),
                    value: data || "",
                    title: Title || Event.sender.getTitle() || "HM神奇口袋",
                    placeholder: placeholder || "请输入..."
                }
                let win: Electron.BrowserWindow | null = new BrowserWindow({
                    "center": true,
                    "opacity": 100,
                    "webPreferences": {
                        "devTools": true,
                        "nodeIntegration": true,
                        "preload": path.join(apppath, "view", "prompt", "index.js"),
                    },
                    "width": 396,
                    "height": 180,
                    "frame": false,
                    "show": false,
                });
                ipcMain.handleOnce(promptSendData.id, function (Event, Data) {
                    isMessage = true;
                    promptSendData.value = Data;
                })
                win.loadFile(path.join(apppath, "view", "prompt", "index.html"));
                win.webContents.send("Prompt_Set_ID", promptSendData);
                win.once("ready-to-show", function () {
                    win?.show();
                });
                win.once("close", function () {
                    win?.removeAllListeners();
                    win = null;
                    // if(!isMessage)reject(new Error("Not ipc message"));
                    resolve(promptSendData.value)
                    ipcMain.removeHandler(promptSendData.id)

                });
                win.once("closed", function () {
                    win?.removeAllListeners();
                    win = null;
                    // if(!isMessage)reject(new Error("Not ipc message"));
                    resolve(promptSendData.value);
                    ipcMain.removeHandler(promptSendData.id)
                });
            })

        }
        async function Prompt(Event: Electron.IpcMainInvokeEvent, Title: string, data: string, placeholder: string) {
            return await _Prompt(Event, Title, data, placeholder);
        }
        function RmTempPath(StoreKey: string, key: string, value: any) {
            if (value.timeout <= 1000 * 60 * 30) setTimeout(async () => {
                if (await fswin.exists(value.path)) {
                    fs.remove(value.path).then(async () => {
                        if (! await fswin.exists(value.path)) {
                            log.info(`[Main]   [Temp @rm] =>  ${StoreKey}/${value?.name || ""}`)
                            TempStore.delete(StoreKey + "." + key);
                        }
                    }).catch((ERROR) => log.error(`[Main]   [Temp] =>  ${StoreKey}/${value?.name || ""}`, ERROR));
                } else {
                    TempStore.delete(StoreKey + "." + key);
                }
            }, value.Timeout);
        }
        /**
         * 直接写到系统缓存位置的临时文件路径
         * @param Event 
         * @param Ext 后缀
         * @param Timeout 超时(ms)
         * @returns 
         */
        function systemTempPath(Event: undefined | Electron.IpcMainInvokeEvent, Ext?: string, Timeout?: number) {
            if (!Ext) {
                Ext = ""
            } else Ext = Ext?.replace(/^(?:[.])?(.+)/, ".$1") || "";
            let TempID = "HM_Sack_" + ID();
            let Name = TempID + Ext || "";
            let Path = path.join(String(Store.get("system.TEMP")) || process?.env?.TEMP || app.getPath("temp"), Name);
            let PushData = {
                name: Name,
                path: Path,
                timeout: typeof Timeout === "number" ? Timeout : 1000 * 60 * 60 * 24 * 15,
                creationTime: +new Date(),
            };
            TempStore.set("systemTempPath." + TempID, PushData);
            RmTempPath("systemTempPath", TempID, PushData);
            return Path
        }
        /**
        * 直接写到自定义缓存位置的临时文件路径
        * @param Event 
        * @param Ext 后缀
        * @param Timeout 超时(ms)
        * @returns 
        */
        function TempPath(Event: undefined | Electron.IpcMainInvokeEvent, Ext?: string, Timeout?: number) {
            if (!Ext) {
                Ext = ""
            } else Ext = Ext?.replace(/^(?:[.])?(.+)/, ".$1")
            let TempID = "HM_Sack_" + ID();
            let Name = TempID + Ext;
            let Path = path.join(app.getPath("temp"), Name);
            let PushData = {
                name: Name,
                path: Path,
                timeout: typeof Timeout === "number" ? Timeout : 1000 * 60 * 60 * 24 * 15,
                creationTime: +new Date(),
            };
            TempStore.set("appTempPath." + TempID, PushData);
            RmTempPath("appTempPath", TempID, PushData);
            return Path
        }
        /**
         * 写入文件到系统临时文件里面
         * @param Event 
         * @param data 内容
         * @param Ext 后缀
         * @param Timeout 超时
         * @returns 
         */
        async function systemTempPathWrite(Event: undefined | Electron.IpcMainInvokeEvent, data: Buffer | string | Object | Array<any>, Ext?: string, Timeout?: number): Promise<string> {
            function ToSystemTempPath(): Promise<string> {
                return new Promise(async function (resolve, reject) {
                    let Path = systemTempPath(undefined, Ext, Timeout);
                    if (typeof data === "undefined") return reject("Not Data");
                    if (Buffer.isBuffer(data) || typeof data == "string") {
                        await fs.writeFile(Path, data).then(() => resolve(Path)).catch(reject);
                        Sleep(500).then(() => fs.pathExists(Path).then((Bool_Exist) => {

                        }).catch(reject));
                        return
                    }
                    if (Array.isArray(data) || data instanceof Object) {
                        await fs.writeJSON(Path, data).then(() => resolve(Path)).catch(reject);
                        return
                    }

                    reject(new Error("Errors of unknown data types"));
                })
            }
            return await ToSystemTempPath();

        }
        /**
         * 写入文件到自定义缓存位置临时文件里面
         * @param Event 
         * @param data 内容
         * @param Ext 后缀
         * @param Timeout 超时
         * @returns 
         */
        async function TempPathWrite(Event: undefined | Electron.IpcMainInvokeEvent, data: Buffer | string | Object | Array<any>, Ext?: string, Timeout?: number): Promise<string> {
            function ToTempPath(): Promise<string> {
                return new Promise(async function (resolve, reject) {
                    let Path = TempPath(undefined, Ext, Timeout);
                    if (typeof data === "undefined") return reject("Not Data");
                    if (Buffer.isBuffer(data) || typeof data == "string") {
                        await fs.writeFile(Path, data).then(() => resolve(Path)).catch(reject);
                        return
                    }
                    if (Array.isArray(data) || data instanceof Object) {
                        await fs.writeJSON(Path, data).then(() => resolve(Path)).catch(reject);
                        return
                    }

                    reject(new Error("Errors of unknown data types"));
                })
            }
            return await ToTempPath();

        };
        setTimeout(function () {
            let win = BrowserWindow.fromId(OpenBrowserWindow(undefined, path.join(String(Store.store?.apppath) || apppath, "view/PhotoshopCli/app.html"), {
                icon: path.join(process.resourcesPath, "bin", "lib", "PhotoshopCli.ico")
            }));
            const ret = electron.globalShortcut.register('Alt+P', () => {
                win?.show();
            })
        }, 2000);
        async function CodeEditor(Event: undefined | Electron.IpcMainInvokeEvent, data: EditorData) {
            return await (new Promise<string>((resolve, reject) => {
                let win: Electron.BrowserWindow | null = new BrowserWindow({
                    "opacity": 100,
                    height: 560,
                    width: 1000,
                    "show": false,
                    center: true,/**居中 */
                    webPreferences: {/**Web安全性设置 */
                        nodeIntegration: true,/**启用node */
                        webSecurity: false,/**关闭跨域安全限制 */
                        contextIsolation: false,/**是否上下文隔离 */
                        spellcheck: false,/**拼写检查器 关闭后不会有input红线 */
                        nodeIntegrationInWorker: true,/**是否集成node到渲染页面 */
                        webviewTag: true,/**允许启用webview标签页*/
                        preload: path.join(apppath, "builds", "PreloadMain.js"),/**上下文不隔离的背景页脚本 */
                        plugins: true,/**允许启用插件 */
                    },
                    backgroundColor: '#ffffff'/**背景色 */
                });
                win?.loadFile(path.join(apppath, "view", "CodeEditor", "index.html"));
                win.autoHideMenuBar = true;
                win.menuBarVisible = false;
                win.once("ready-to-show", () => {
                    win?.webContents.send("EditorCode", Object.assign({}, data || {}, {
                        id: id,
                    }));
                    win?.show()
                });
                let id = ID();
                ipcMain.handleOnce(id, function (e, data: string) {
                    resolve(data)
                });
            }));
        }

        this.HandleList = { CodeEditor, TempPathWrite, TempPath, systemTempPath, systemTempPathWrite, Prompt, UpdateAskHou, IsAppSetup, StoreON, StoreHas, StoreGet, StoreSet, SetTop, openDevTools, Save, openMainDevTools, Close, OpenImagesPathList, GetBounds, SetBounds, GetPage, MainEval, SendAllWin, LimitWindow, MinWindow, show, hide, isShow, isTop, isMax, isNormal, GetId, Focus, GetPath, Quit, Relaunch, isDeveloper, Refresh, getFileIcon, DiffStartTime, OpenBrowserWindow, DragFiles, }
        this.HandleOnceList = {
            $nextTick
        }
        for (const key in this.HandleList) handle(key, GoalUtil.get(this.HandleList, key));
        for (const key in this.HandleOnceList) handleOnce(key, GoalUtil.get(this.HandleOnceList, key));
        interface StoreRenderer {
            on(key: string, CallBack: (this: HM_Setting, newValue: any, oldValue: any, key: string) => void): void;
        }
        /**
         * IPC 这边的被重新封装过 为了错误记录和不会弹出消息卡进程
         */
        interface HMipcMain {
            addListener: typeof ipcMain.addListener
            off: typeof ipcMain.off
            setMaxListeners: typeof ipcMain.setMaxListeners
            getMaxListeners: typeof ipcMain.getMaxListeners
            listeners: typeof ipcMain.listeners
            rawListeners: typeof ipcMain.rawListeners
            emit: typeof ipcMain.emit
            listenerCount: typeof ipcMain.listenerCount
            prependListener: typeof ipcMain.prependListener
            prependOnceListener: typeof ipcMain.prependOnceListener
            eventNames: typeof ipcMain.eventNames
            /**
             * 全部发送
             */
            sendAll: (channel: string, ...args: any[]) => Promise<void>;
            /**
             * 监听常规ipc消息
             */
            on: typeof ipcMain.on;
            /**
             * 单次监听
             */
            once: typeof ipcMain.once
            /**
             * 删除监听
             */
            removeListener: typeof ipcMain.removeListener
            /**
             * 删除全部监听
             */
            removeAllListeners: typeof ipcMain.removeAllListeners
            /**
             * 删除异步监听
             */
            removeHandler: typeof ipcMain.removeHandler
            /**
             * 单次异步监听
             */
            handleOnce: typeof ipcMain.handleOnce
            /**
         * 异步监听
         */
            handle: typeof ipcMain.handle


        }
    }
}

/**天气和语句初始化更新都依赖于这里 */
class StartWeather {
    KotoWritingAPI = "https://v1.hitokoto.cn/?c=d&c=i&encode=json&lang=cn"
    API = "https://api.kiic.top/Weathers/detailed".concat("?UsersID=", String(Store.get("UsersID") || ""))
    constructor() {
        let _this = this;
        function StartGetWeather() {
            log.info(`[Main]   Weather@api =>StartGetWeather`);
            const reportDate = Store.get("Temperature.LaunchTime");
            // 启动后不处理10分钟内更新过的内容
            if (reportDate && dayjs(Number(reportDate)).diff(dayjs(), "minute") > -9.5) return;
            axios.get(_this.API).then(({ body }) => {
                let detailed: KIIC_API_Detailed = body;
                if (detailed) Store.set("Temperature", detailed)
                Store.set("Temperature.LaunchTime", + dayjs())
                log.info(`[Main]   Weather@api =>Request_INFO_DATA OKK`);
                // 更新问候语
                if (MainEnvFun.MainInfo) Store.set("GreetInfo", MainEnvFun.MainInfo.TimeGreetings)
            }).catch(error => log.error(`[Main]   Weather@apiError=>`, error))

        }
        IntervalFunctionList._10min.push(StartGetWeather);
        StartGetWeather();
        if (MainEnvFun?.MainInfo) MainEnvFun.MainInfo.UpdateAskHou();
    }
}

/**APP启动完成开始部署 */
app.whenReady().then(() => {
    /**
     * 从启动到现在花了多少毫秒
     * @returns 
     */
    function NowtartTime() {
        return Number(process.hrtime.bigint() - StartTime) / 1000000
    }
    //是否启动第二个实例
    if (!app.requestSingleInstanceLock()) return;
    MainEnvFun.MainWindow = new StartMainWindow();
    let Loading: StartLoadingMainWindow | undefined = new StartLoadingMainWindow();
    MainEnvFun.Tray = new StartTray();
    Store.set("GreetInfo", null);
    MainEnvFun.MainInfo = new StartMainInfo();
    MainEnvFun.IpcMain = new StartIPCMAN();
    MainEnvFun.$nextTick = async function () {
        // 最少需要已经渲染了2秒以上 不然突然显示会有黑框
        if (NowtartTime() < 2000) {
            log.log(`[main]   $nextTickFastTooTime=>  ${NowtartTime()}ms`)
            await Sleep(2000 - NowtartTime())
        }
        MainEnvFun.MainWindow?.MainWindow.show();
        Loading?.close();
        Loading = undefined;
        log.log(`[main]   $nextTickTime=>  ${NowtartTime()}ms`);
        if (MainEnvFun.MainWindow) {
            // MainEnvFun.MainChromeTabs = new StartMainChromeTabs(MainEnvFun.MainWindow.MainWindow);

        }
    }
    MainEnvFun.MainWindow?.MainWindow.once("ready-to-show", () => setTimeout(() => {
        Loading?.Print("主页面渲染中...")
    }, 1200))
    MainEnvFun.Weather = new StartWeather();
    MainEnvFun.$Interval = new $Interval();
    log.log(`[main]   ThenEnd`)
    log.log(`[main]   Time=>  ${NowtartTime()}ms`)



});

/**应用内容更新 */
class StartMainInfo {
    private __RefreshTooFast = [{
        info: "你疯狂刷新的样子像极了爱情",
        hitokoto: "来自作者的吐槽:KIIC",
    },
    {
        info: "这个锅我可不背，哪有什么都像我的",
        hitokoto: "来自爱情的吐槽:KIIC",
    },
    {
        info: "作者没有见过爱情 只见过BUG",
        hitokoto: "来自程序猿:KIIC",
    },
    {
        info: "啊对对对，你说的都对",
        hitokoto: "来自爱情的吐槽:KIIC",
    },
    {
        info: "啊对对对，你说的都对，什么都像我",
        hitokoto: "来自爱情的吐槽:KIIC",
    },
    {
        info: "征婚广告本人男下雨会躲雨，东西掉地上不会捡起来吃",
        hitokoto: "KIIC：联系方式138后头随便",
    },
    {
        info: "你要再刷新的话我就只能从了你了！！！",
        hitokoto: "好啦好啦 下次别这样刷啦",
    },
    ]
    /**早上问候语 */
    private __TimeGreetings_Morning: string[] = ["一日之计在于晨，一年之计在于春", "{{UsersName}}，早上好呀~", "今天是元气满满的{{UsersName}}呀~", "带上好心情开始今天吧{{UsersName}}~", "good morning，{{UsersName}}~", "又他娘的是元气满满的一天",]
    /**中午问候语 */
    private __TimeGreetings_Noon: string[] = ["{{UsersName}}中午好呀~", "{{UsersName}}现在开心嘛~", "{{UsersName}}中午好呀~", "{{UsersName}}现在是不是元气满满~", "{{UsersName}}中午好呀~",]
    /**晚上问候语 */
    private __TimeGreetings_Night: string[] = ["{{UsersName}}晚上好~", "{{UsersName}}现在开心嘛~", "{{UsersName}}现在是不是元气满满~", "祝{{UsersName}}百事可乐~~",]
    /**凌晨问候语 */
    private __TimeGreetings_Nighttime: string[] = ["{{UsersName}}夜已深快休息吧~", "月亮睡了你不睡你是秃头小宝贝~", "{{UsersName}}现在是不是元气满满~", "{{UsersName}}中午好呀~",]
    /**黎明问候语 */
    private __TimeGreetings_Dawn: string[] = ["{{UsersName}}夜已深快休息吧~", "你在期待黎明前的破晓吗~", "{{UsersName}}早上好呀~", "{{UsersName}}的熬夜冠军奖杯到手了~"]

    constructor() {
        const { __TimeGreetings_Morning: TimeGreetings_Morning, __TimeGreetings_Noon: TimeGreetings_Noon, __TimeGreetings_Night: TimeGreetings_Night, __TimeGreetings_Nighttime: TimeGreetings_Nighttime, __TimeGreetings_Dawn: TimeGreetings_Dawn } = this;
        // 语法糖转用户名  
        let UsersName = String(Store.get("UsersName")) || "新任魔法师";
        for (const iterator of [TimeGreetings_Morning, TimeGreetings_Noon, TimeGreetings_Night, TimeGreetings_Nighttime, TimeGreetings_Dawn]) {
            for (const key in iterator) iterator[key] = iterator[key].replace("{{UsersName}}", UsersName)
        }
    }
    get TimeGreetings(): string {
        function RandomValue(AnyList: string[]): string {
            let RunValue = "";
            /**
            * 随机数值
            * @param {*} Min 最小
            * @param {*} Max 最大
            */
            function GetRandomNum(Min: number, Max: number): number {
                var Range = Max - Min;
                var Rand = Math.random();
                return (Min + Math.round(Rand * Range));
            }
            RunValue = AnyList[GetRandomNum(0, AnyList.length - 1)];
            return RunValue
        }
        let date = new Date();
        let Hours = date.getHours();
        if (Hours >= 3 && Hours < 6) return RandomValue(this.__TimeGreetings_Dawn)
        else if (Hours >= 6 && Hours < 12) return RandomValue(this.__TimeGreetings_Morning)
        else if (Hours >= 12 && Hours < 18) return RandomValue(this.__TimeGreetings_Noon)
        else if (Hours >= 18 && Hours < 22) return RandomValue(this.__TimeGreetings_Night)
        else if ((Hours >= 23 && Hours < 24) || (Hours >= -1 && Hours < 3)) return RandomValue(this.__TimeGreetings_Night)
        return "";
    }
    private GetKotoWriting: Set<number> = new Set;
    UpdateAskHou(): Promise<void> {
        let $this = this;
        if (!shake.has("GetKotoWriting")) {
            shake.set("GetKotoWriting", 6000, function () {
                $this.GetKotoWriting.clear();
            })
        }
        this.GetKotoWriting.add(this.GetKotoWriting.size + 1);
        return new Promise(async function (resolve, reject) {
            if ($this.GetKotoWriting.size > 3) {
                resolve();
                return
            }
            axios.get($this.KotoWritingAPI,).then(async (KotoWritingData) => {
                let KotoWriting: KotoWritingData = KotoWritingData.body;
                Store.set("AskHou", KotoWriting.hitokoto)
                Store.set("AskHouFrom", `${KotoWriting.from_who ? KotoWriting.from_who : "佚名"}:${KotoWriting.from ? KotoWriting.from : "来自一言"}`)
                log.info(`[Main]   Weather@KotoWriting=>StartGetWeather&id:${KotoWriting.id}`)
                resolve();
                // 开始写入问候语
                Store.set("GreetInfo", $this.TimeGreetings)
            }).catch((error) => {
                log.error(`[Main]   Weather@KotoWriting@apiError=>`, error)
                reject(error)
            })
        })
    }
    private KotoWritingAPI = "https://v1.hitokoto.cn/?c=d&c=i&encode=json&lang=cn"

}

/**打开独立的窗口 */
class StartWindow {
    MainWindow: Electron.BrowserWindow | null;
    /**
     * 打开独立窗口
     * @param URL 打开的网页
     * @param Configure BrowserWindow选项|bool:是否附加Node
     */
    constructor(URL?: string, Configure?: Electron.BrowserWindowConstructorOptions | boolean) {
        let $this = this;
        if (Configure === false) {
            if (!this._.Configure.webPreferences) this._.Configure.webPreferences = {};
            this._.Configure.webPreferences.nodeIntegration = false
            this._.Configure.webPreferences.contextIsolation = true
            this._.Configure.webPreferences.nodeIntegrationInWorker = false
        }
        if (typeof Configure == "object") {
            let { webPreferences } = this._.Configure;
            this._.Configure = Object.assign(this._.Configure, Configure);
            this._.Configure.webPreferences = Object.assign(webPreferences || {}, this._.Configure.webPreferences);
        }
        let win = new BrowserWindow(this._.Configure);
        win.loadFile(URL || this._.DefaultMain);
        win.once("ready-to-show", () => {
            win.show()
        });
        this.MainWindow = win;
        win.autoHideMenuBar = true;
        win.menuBarVisible = false;
        function CloseWin() {
            for (const ForBrowserWindow of StartWindowList) {
                if (ForBrowserWindow.id === win.id) StartWindowList.delete(ForBrowserWindow);
            }
            $this.MainWindow = null
        }
        win.once("close", CloseWin);
        win.once("closed", CloseWin);
        // 禁用默认菜单弹出
        win.hookWindowMessage(0x0116, () => {
            win.setEnabled(false);
            // Sleep(225,true);
            win.setEnabled(true);
        });
    }
    private _ = {
        Ready: false,
        /**页面销毁之后定位的地方 */
        DefaultMain: "about:blank",
        Configure: {
            width: 350,
            height: 650,
            show: false,/**不提前显示 窗口加载完成被 MainWindow主窗口构造显示*/
            // frame: false,/**不需要框架 */
            center: true,/**居中 */
            webPreferences: {/**Web安全性设置 */
                nodeIntegration: true,/**启用node */
                webSecurity: false,/**关闭跨域安全限制 */
                contextIsolation: false,/**是否上下文隔离 */
                spellcheck: false,/**拼写检查器 关闭后不会有input红线 */
                nodeIntegrationInWorker: true,/**是否集成node到渲染页面 */
                webviewTag: true,/**允许启用webview标签页*/
                preload: path.join(apppath, "builds", "PreloadMain.js"),/**上下文不隔离的背景页脚本 */
                plugins: true,/**允许启用插件 */
            },
            backgroundColor: '#ffffff'/**背景色 */
        } as Electron.BrowserWindowConstructorOptions

    }
}

const TempStore = new store({ name: "UserTemp", fileExtension: "HM", cwd: path.join(RootPath, "UserData") })

/**
 * 安装定时器
 */
class $Interval {
    IntervalList: $Interval__IntervalList = {
        _1s: setInterval(() => { for (const Fun of IntervalFunctionList._1s) try { Fun() } catch (error) { log.error("[main]  [$Interval @_1s] => ", error, Fun) } }, 1000),
        _15s: setInterval(() => { for (const Fun of IntervalFunctionList._15s) try { Fun() } catch (error) { log.error("[main]  [$Interval @_15s] => ", error, Fun) } }, 1000 * 15),
        _30s: setInterval(() => { for (const Fun of IntervalFunctionList._30s) try { Fun() } catch (error) { log.error("[main]  [$Interval @_30s] => ", error, Fun) } }, 1000 * 30),
        _1min: setInterval(() => { for (const Fun of IntervalFunctionList._1min) try { Fun() } catch (error) { log.error("[main]  [$Interval @_1min] => ", error, Fun) } }, 1000 * 60),
        _10min: setInterval(() => { for (const Fun of IntervalFunctionList._10min) try { Fun() } catch (error) { log.error("[main]  [$Interval @_10min] => ", error, Fun) } }, 1000 * 60 * 10),
        _30min: setInterval(() => { for (const Fun of IntervalFunctionList._30min) try { Fun() } catch (error) { log.error("[main]  [$Interval @_30min] => ", error, Fun) } }, 1000 * 60 * 30),
        _1Hours: setInterval(() => { for (const Fun of IntervalFunctionList._1Hours) try { Fun() } catch (error) { log.error("[main]  [$Interval @_1Hours] => ", error, Fun) } }, 1000 * 60 * 60),
    }
    constructor() {
        // 软件启动五分钟后清空掉没有使用到的定时器
        setTimeout(() => {
            for (const key in this.IntervalList) {
                let intervalId = this.IntervalList[key];
                let intervalFunLIst = IntervalFunctionList[key];
                if (!intervalId) continue;
                if (!intervalFunLIst?.length) {
                    clearInterval(intervalId)
                }
            }
        }, 1000 * 60 * 5)

    }
}

// 每10分钟扫描一次是否已经有过期的临时文件
IntervalFunctionList._10min.push(function () {
    log.info(`[Main]   [Temp] => Clean`)
    let appTempPath = TempStore.get("appTempPath");
    let systemTempPath = TempStore.get("systemTempPath");
    let Time = +new Date();
    async function Rm(StoreKey: string) {
        let TempPathCont: any;
        if (StoreKey == "systemTempPath") TempPathCont = systemTempPath;
        if (StoreKey == "appTempPath") TempPathCont = appTempPath;
        if (!TempPathCont) return;
        for (const key of Object.keys(TempPathCont)) {
            let value: TempPathAdmin | undefined = TempPathCont[key];
            if (!value) continue;
            if (Time - value.creationTime/*已过时间*/ >= value.timeout /*超时时间*/) {
                if (await fswin.exists(value.path)) {
                    fs.remove(value.path).then(async () => {
                        if (value?.path && ! await fswin.exists(value?.path)) {
                            log.info(`[Main]   [Temp @rm] =>  ${StoreKey}/${value?.name || ""}`)
                            TempStore.delete(StoreKey + "." + key);
                        }
                    }).catch((ERROR) => log.error(`[Main]   [Temp] =>  ${StoreKey}/${value?.name || ""}`, ERROR));
                } else {
                    TempStore.delete(StoreKey + "." + key);
                }
            }
        }
    }
    if (appTempPath) Rm("appTempPath")
    if (systemTempPath) Rm("systemTempPath")

});

setTimeout(() => { IntervalFunctionList._10min[0]() }, 1000 * 30)














interface $Interval__IntervalList {
    [Key: string]: NodeJS.Timer | undefined
}
export type ChromeTabList = {
    /**绑定的BrowserView页面 */
    Webview: Electron.BrowserView
    /**id */
    id: string
    /**是否已经被回收并且可用 */
    recovery: boolean
    /**webContents ID */
    webConId: number
}[]
export type PresetPathList = {
    name: 'home' | 'appData' | 'userData' | 'cache' | 'temp' | 'exe' | 'module' | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos' | 'recent' | 'logs' | 'crashDumps',
    path: string
}[]
export interface MainChromeTabsConfigure {
    /**标题 */
    title: string
    /**图标 */
    favicon?: string | false
    /**是否显示关闭按钮 */
    close?: boolean
    /**唯一键值 
     * !必须填写 不然无法删除无法变更无法绑定
    */
    id: string
    /**是否允许使用node权限 */
    node?: boolean
    /**打开的网站 */
    URL?: string
    /**是否加载背景但是不现实出来 */
    background?: boolean
    /**webContents ID */
    webConId: number
}


export interface MainEnvFun {
    $Interval?: $Interval;
    $nextTick?: () => void;
    MainWindow?: StartMainWindow
    Tray?: StartTray
    IpcMain?: StartIPCMAN
    Weather?: StartWeather
    AppSetup: boolean,
    isDeveloper?: boolean,
    MainInfo?: StartMainInfo
    // MainChromeTabs?: StartMainChromeTabs
}

interface KotoWritingData {
    "id": 7498,
    "uuid": "78224767-827b-41ea-8bc1-cb7aeebf439a",
    "hitokoto": "我所描绘的一切或许并非真实，然而我的感受绝无虚假。",
    "type": "d",
    "from": "妄想症Paranoia",
    "from_who": "雨狸",
    "creator": "禾泱",
    "creator_uid": 10181,
    "reviewer": 4756,
    "commit_from": "web",
    "created_at": "1629604566",
    "length": 25
}


type TempPathAdmin = {
    /**文件名称 */
    name: string;
    /**文件路径 */
    path: string;
    /**超时 */
    timeout: number;
    /**创建时间 */
    creationTime: number;
}
/**写入到系统的 */
interface systemTempPath {
    [Key: string]: TempPathAdmin | undefined
}

/**写入到系统的 */
interface appTempPath {
    [Key: string]: TempPathAdmin | undefined
}


interface IntervalFunctionList {
    _1s: Function[]
    _15s: Function[]
    _30s: Function[]
    _1min: Function[],
    _10min: Function[],
    _30min: Function[],
    _1Hours: Function[],
    [Key: string]: Function[] | undefined

}

import { EditorData } from "../view/CodeEditor/index"