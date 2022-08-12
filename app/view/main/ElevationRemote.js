"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 该内容将会在打包时移除  并且所有脚本仅允许在主进程运行（这是个破坏框架安全和性能的方法）
const remote_1 = require("@electron/remote");
const path_1 = __importDefault(require("path"));
let apppath = remote_1.app.getAppPath();
window.BrowserWindow = remote_1.BrowserWindow;
window.Electron = require('@electron/remote');
;
class StartMainChromeTabs {
    MainWindow;
    constructor(MainWindow) {
        this.MainWindow = MainWindow;
    }
    /**
     * 移除该窗口内容
     * @param id
     */
    remove(id) {
        let [MainWindow, webContents] = [this.MainWindow, this.MainWindow.webContents];
        webContents.send("MainChromeTabs.remove", id);
        this._.ChromeTabID_List.delete(id);
        let MainViews = MainWindow.getBrowserViews();
        for (const ChromeTabData of this._.ChromeTabList) {
            for (const Views of MainViews) {
                let { webContents } = Views;
                if (webContents.id == ChromeTabData.webConId) {
                }
            }
        }
    }
    _ = {
        /**页面销毁之后定位的地方 */
        DefaultMain: "about:blank",
        /**最多允许有多少个view窗口 */
        ChromeTabsMax: 5,
        ChromeTabID_List: new Set(),
        /**所有已经绑定的视窗 */
        ChromeTabList: [],
        Configure: {
            webPreferences: {
                nodeIntegration: true,
                webSecurity: false,
                contextIsolation: false,
                spellcheck: true,
                nodeIntegrationInWorker: true,
                nodeIntegratio: true,
                preload: path_1.default.join(apppath, "build", "PreloadView.js"),
                webviewTag: true,
                enableRemoteModule: true
            }
        }
    };
    /**
     * 最多允许有多少个view窗口
     * @param limit
     */
    SetChromeTabMax(limit) {
        if (!limit)
            throw new Error("SetChromeTabMax Not limit");
        if (typeof limit != "number")
            throw new Error("SetChromeTabMax Unsupported parameters");
    }
    add(configure) {
        if (!this.MainWindow)
            throw new Error("HM: Not MainWindow could not be built Tab");
        if (!configure.id)
            throw new Error("HM: Not Tab Id");
        let [MainWindow, webContents] = [this.MainWindow, this.MainWindow.webContents];
        if (this._.ChromeTabID_List.has(configure.id))
            throw new Error("HM: Tab Id Repetitive");
        this._.ChromeTabID_List.add(configure.id);
        webContents.send("MainChromeTabs.add", JSON.parse(JSON.stringify(configure)));
        if (!configure.background) {
            this.Show(configure);
        }
    }
    AddViews() {
    }
    Show(configure) {
        // let 
        for (const ChromeTabData of this._.ChromeTabList) {
            if (ChromeTabData.id == configure.id) {
            }
        }
    }
}
//BrowserWindow.fromId(1)?.webContents.send("MainChromeTabs.add",{})
window.MainChromeTabs = new StartMainChromeTabs(remote_1.BrowserWindow.getAllWindows()[0]);
//# sourceMappingURL=ElevationRemote.js.map