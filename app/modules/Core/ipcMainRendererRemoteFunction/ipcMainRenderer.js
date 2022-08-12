"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipcRendererAPI = void 0;
/*
 * @Author: 渲染进程与主进程交互
 * @Date: 2022-04-24 13:24:42
 * @LastEditTime: 2022-07-03 02:00:17
 * @LastEditors: your name
 * @Description: 方法链接主进程（\Main.ts）中的 StartIPCMAN 构造函数
 * @FilePath: \app\modules\Core\ipcMainRendererRemoteFunction\ipcMainRenderer.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
const StoreRenderer_1 = require("../StoreRenderer");
const electron = (r => r("electron"))(require);
const { invoke: invoke, send: send, sendSync: sendSync } = electron.ipcRenderer;
const Store = new StoreRenderer_1.store();
class ipcRendererAPI {
    Store = Store;
    $nextTick;
    constructor() {
        // $nextTick 方法仅在软件第一次启动时候可用
        this.$nextTick = () => {
            invoke("$nextTick").catch(() => { });
        };
    }
    /**
     * 从长存储中设置默认用户设置
     * @param key
     * @param Value
     * @returns
     */
    StoreSet = Store.Set;
    /**
     * 从长存储中读取默认用户设置
     * @param key
     * @returns
     */
    StoreGet = Store.Get;
    /**
     * 从长存储中判断是否存在该key
     * @param key
     * @param Value
     * @returns
     */
    StoreHas = Store.Has;
    /**
     * 当store数据初始化完成的时候将返回到 then
     * @returns
     */
    Store$nextTick = Store.$nextTick;
    /**
     * 从长存储中监听数据
     * @param key
     * @param Value
     * @returns
     */
    onStore = Store.on;
    /**
     * 长存储中的数据体 只读
     */
    get StoreData() {
        return Store.store;
    }
    /**
     * 打开主渲染进程的控制台
     */
    openMainDevTools() {
        invoke("openMainDevTools");
    }
    /**
     * 打开当前窗口的控制台
     */
    openDevTools() {
        invoke("openDevTools");
    }
    /**在主进程运行代码
     * ! 高风险功能
     */
    MainEval(Code) {
        invoke("MainEval", Code);
    }
    /**
     * 对所有窗口发送一遍ipc消息
     * @param info 发送名
     * @param Content 发送内容
     */
    SendAllWin(info, ...Content) {
        invoke("MainEval", info, ...Content);
    }
    /**最大化 ...恢复 */
    LimitWindow() {
        invoke("LimitWindow");
    }
    /**最大化 ...恢复 */
    MaxWindow() {
        let $this = this;
        return new Promise(async function (resolve, reject) {
            invoke("LimitWindow")
                .then(async (value) => {
                resolve(await $this.isMax());
            })
                .catch((error) => reject(error));
        });
    }
    /**最小化窗口 */
    MinWindow() {
        invoke("MinWindow");
    }
    /**最小化窗口 */
    show() {
        invoke("show");
    }
    /**隐藏窗口 */
    hide() {
        invoke("hide");
    }
    /**聚焦窗口 */
    Focus() {
        invoke("Focus");
    }
    /**刷新窗口 */
    Refresh() {
        invoke("Refresh");
    }
    /**刷新一言 */
    UpdateAskHou() {
        return new Promise(async function (resolve, reject) {
            invoke("UpdateAskHou").then(resolve).catch(reject);
        });
    }
    /**最小化窗口 */
    Quit() {
        invoke("Quit");
    }
    /**关闭窗口 */
    Close() {
        invoke("Close");
    }
    /**重启软件 */
    Relaunch() {
        invoke("Relaunch");
    }
    /**设置顶设或取消 */
    SetTop() {
        return new Promise(async function (resolve, reject) {
            invoke("SetTop")
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**
     * 获取该窗口大小
     */
    GetBounds() {
        return new Promise(async function (resolve, reject) {
            invoke("GetBounds")
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**获取保存到的路径 */
    async Save() {
        return new Promise(async function (resolve, reject) {
            invoke("Save")
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**
     * 获取该窗口大小
     */
    async SetBounds(Bounds) {
        return new Promise(async function (resolve, reject) {
            invoke("SetBounds", Bounds)
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**
     * 打开所有支持的图片文件 并返回路径
     */
    async OpenImagesPathList() {
        return new Promise(async function (resolve, reject) {
            invoke("OpenImagesPathList")
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**
     * 截屏
     * @param Bounds 截取未知
     * @param Path 保存到哪里 不填写返回Buffer
     * @returns
     */
    async GetPage(Bounds, Path) {
        if (Bounds === undefined) {
            return new Promise(async function (resolve, reject) {
                invoke("GetPage", Bounds || null)
                    .then((value) => resolve(value))
                    .catch((error) => reject(error));
            });
        }
        return new Promise(async function (resolve, reject) {
            invoke("GetPage", Bounds || null, Path)
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**窗口是否可见 */
    async isShow() {
        return new Promise(async function (resolve, reject) {
            invoke("isShow")
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**窗口是否可见 */
    async isTop() {
        return new Promise(async function (resolve, reject) {
            invoke("isTop")
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**窗口是否可见 */
    async isMax() {
        return new Promise(async function (resolve, reject) {
            invoke("isMax")
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**窗口是否可见 */
    async isNormal() {
        return new Promise(async function (resolve, reject) {
            invoke("isNormal")
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**窗口是否可见 */
    async GetId() {
        return new Promise(async function (resolve, reject) {
            invoke("GetId")
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**electron的app.getPath路径请求 */
    async GetPath(Name) {
        return new Promise(async function (resolve, reject) {
            invoke("GetPath", Name)
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**electron的app.getFileIcon */
    async getFileIcon(path, options) {
        return new Promise(async function (resolve, reject) {
            invoke("getFileIcon", path, options)
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**返回软件启动到现在的毫秒 */
    async DiffStartTime() {
        return new Promise(async function (resolve, reject) {
            invoke("DiffStartTime")
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**
     * 判断软件是否被打包并编译
     *  @returns  Promise<boolean>
     */
    async isDeveloper() {
        return new Promise(async function (resolve, reject) {
            invoke("isDeveloper")
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**
     * 获取app是否已经关闭了启动动画并已就绪
     *  @returns  Promise<boolean>
     */
    async IsAppSetup() {
        return new Promise(async function (resolve, reject) {
            invoke("IsAppSetup")
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**
     * 拖拽文件后发送到主进程 让其可以响应到系统的文件拖拽
     * @param Path 路径|路径数组
     * @param icon 图标路径
     * @returns
     */
    async DragFiles(Path, icon) {
        return new Promise(async function (resolve, reject) {
            invoke("DragFiles", Path, icon)
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**
     * 创建窗口
     * @param URL
     * @param Configure 同窗口配置|或者传入true 将会禁用窗口拥有node权限但是背景页拥有node权限
     * @returns BrowserWindow ID
     * @error -1
     */
    async OpenBrowserWindow(URL, Configure) {
        return new Promise(async function (resolve, reject) {
            invoke("OpenBrowserWindow", URL, Configure)
                .then((value) => resolve(value))
                .catch((error) => reject(error));
        });
    }
    /**
     * 添加元素监听拖拽
     * @param Element
     * @param Path
     */
    onDragFiles(Element, Path) {
        let $this = this;
        Element.setAttribute("draggable", "true");
        function dragstart(Events) {
            Events.preventDefault();
            $this.DragFiles(Path);
        }
        Element.addEventListener("dragstart", dragstart);
        return new onDragFilesRun(Element, dragstart, Path);
    }
    /**
     * 模拟用户输入框
     * @param Title 标题
     * @param data 数据
     * @param placeholder 背景字
     * @returns
     */
    async Prompt(Title, data, placeholder) {
        return new Promise(async function (resolve, reject) {
            invoke("Prompt", Title, data, placeholder)
                .then((value) => resolve(String(value)))
                .catch((error) => reject(error));
        });
    }
    /**
    * 直接写到系统缓存位置的临时文件路径
    * @param Ext 后缀
    * @param Timeout 超时(ms)
    * @returns
    */
    async systemTempPath(Ext, Timeout) {
        return new Promise(async function (resolve, reject) {
            invoke("systemTempPath", Ext, Timeout)
                .then((value) => resolve(String(value)))
                .catch((error) => reject(error));
        });
    }
    /**
  * 直接写到自定义缓存位置的临时文件路径
  * @param Ext 后缀
  * @param Timeout 超时(ms)
  * @returns
  */
    async TempPath(Ext, Timeout) {
        return new Promise(async function (resolve, reject) {
            invoke("TempPath", Ext, Timeout)
                .then((value) => resolve(String(value)))
                .catch((error) => reject(error));
        });
    }
    /**
   * 写入文件到系统临时文件里面
   * @param Event
   * @param data 内容
   * @param Ext 后缀
   * @param Timeout 超时
   * @returns
   */
    systemTempPathWrite(data, Ext, Timeout) {
        return new Promise(async function (resolve, reject) {
            invoke("systemTempPathWrite", data, Ext, Timeout)
                .then((value) => resolve(String(value)))
                .catch((error) => reject(error));
        });
    }
    /**
  * 写入文件到自定义缓存位置临时文件里面
  * @param Event
  * @param data 内容
  * @param Ext 后缀
  * @param Timeout 超时
  * @returns
  */
    TempPathWrite(data, Ext, Timeout) {
        return new Promise(async function (resolve, reject) {
            invoke("TempPathWrite", data || "", Ext || undefined, Timeout || undefined)
                .then((value) => resolve(String(value)))
                .catch((error) => reject(error));
        });
    }
    CodeEditor(data) {
        return new Promise(async function (resolve, reject) {
            invoke("CodeEditor", data)
                .then((value) => resolve(String(value)))
                .catch((error) => reject(error));
        });
    }
    CodeEditorForPath(Path, language) {
        return new Promise(async function (resolve, reject) {
            invoke("CodeEditor", {
                language: language || "javascript",
                path: Path
            })
                .then((value) => resolve(String(value)))
                .catch((error) => reject(error));
        });
    }
    CodeEditorForCode(Code, language) {
        return new Promise(async function (resolve, reject) {
            invoke("CodeEditor", {
                language: language || "javascript",
                value: Code
            })
                .then((value) => resolve(String(value)))
                .catch((error) => reject(error));
        });
    }
}
exports.ipcRendererAPI = ipcRendererAPI;
/**
 * 把文件拖拽监听添加进去并且添加一些快速操作
 */
class onDragFilesRun {
    _;
    constructor(Element, addOnEvent, paths) {
        this._ = {
            Element: Element,
            addOnEvent: addOnEvent,
            path: paths
        };
    }
    get Element() {
        return this._?.Element;
    }
    close() {
        if (!this._)
            return true;
        this._.Element?.removeAttribute("draggable");
        this._.Element?.removeEventListener("dragstart", this._.addOnEvent);
        this._.Element = null;
        this._ = undefined;
    }
    get path() {
        return this._?.path || [];
    }
}
//# sourceMappingURL=ipcMainRenderer.js.map