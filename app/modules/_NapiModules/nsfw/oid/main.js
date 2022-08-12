"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nsfw = void 0;
const NsfwFunction = require("./nsfw/index");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
class nsfw {
    /**
     * 监听对象 无回调传入则等等on之后启动
     * @param watchPath 监视文件变化的路径
     * @param filter 过滤器/过滤回调
     *  - 过滤路径
     *  - 过滤路径数组
     *  - 过滤路径的正则
     *  - 过滤回调
     * @param debounceMS
     * - 回调
     * - 消除事件回调的时间（以毫秒为单位）
     */
    constructor(watchPath, filter, debounceMS) {
        /**过滤列表 */
        this._FilterList = [];
        /**
         * 监听事件列表
         */
        this._WatchEventList = [];
        // 没有传入
        if (!watchPath)
            throw Error("Not Input-WatchPath");
        // 不存在该文件
        if (!fs_extra_1.default.existsSync(watchPath))
            throw Error("Exists Not Watch Path");
        // 添加该路径的监听
        this.StartNsfw = NsfwFunction(watchPath, this._WatchNSFW, { "errorCallback": this._WatchError, "debounceMS": typeof debounceMS == "number" ? debounceMS : 500 });
        // debounceMS传入的是回调函数的话
        if (typeof debounceMS === "function")
            this.on("all", debounceMS);
        // 添加过滤器
        this.AddFilter(filter);
    }
    /**处理错误 */
    _WatchError(error) {
        var _a;
        let AlreadyRunError = false;
        for (const iterator of this._WatchEventList)
            if (iterator.type == "error") {
                AlreadyRunError = true;
                iterator.EvalFunction(error);
            }
        if (!AlreadyRunError) {
            (_a = this.Nsfw) === null || _a === void 0 ? void 0 : _a.stop();
            throw error;
        }
    }
    /**
     * 内执行回调
     * @param EventsList
     */
    _WatchNSFW(EventsList) {
        let _this = this;
        let WatchEvent = {
            /**创建 */
            0(EventsList, Path, NewPath) {
                if (EventsList.action == 0)
                    for (const iterator of this.add)
                        iterator.EvalFunction.apply(EventsList, [Path, EventsList.directory, (EventsList === null || EventsList === void 0 ? void 0 : EventsList.file) || ""]);
            },
            add: this._WatchEventList.filter(function (WatchEventContainer) { if (WatchEventContainer.type === "add")
                return true; }),
            /**删除 */
            1(EventsList, Path, NewPath) {
                if (EventsList.action == 1)
                    for (const iterator of this.remove)
                        iterator.EvalFunction.apply(EventsList, [Path, EventsList.directory, (EventsList === null || EventsList === void 0 ? void 0 : EventsList.file) || ""]);
            },
            remove: this._WatchEventList.filter(function (WatchEventContainer) { if (WatchEventContainer.type === "remove")
                return true; }),
            /**变动 */
            2(EventsList, Path, NewPath) {
                if (EventsList.action == 2)
                    for (const iterator of this.change)
                        iterator.EvalFunction.apply(EventsList, [Path, EventsList.directory, (EventsList === null || EventsList === void 0 ? void 0 : EventsList.file) || ""]);
            },
            change: this._WatchEventList.filter(function (WatchEventContainer) { if (WatchEventContainer.type === "change")
                return true; }),
            /*重命名or移动 */
            3(EventsList, Path, NewPath) {
                if (EventsList.action == 3)
                    for (const iterator of this.remove)
                        iterator.EvalFunction.apply(EventsList, [Path, EventsList.directory, EventsList.oldFile, EventsList.newDirectory, EventsList.newFile]);
            },
            rename: this._WatchEventList.filter(function (WatchEventContainer) { if (WatchEventContainer.type === "rename")
                return true; }),
            ToAll(Type, Events, Path, NewPath) {
                for (const iterator of _this._WatchEventList) {
                    if (iterator.type == "all") {
                        // @ts-expect-error
                        iterator.EvalFunction.apply(Events, [Type, Path, (Events === null || Events === void 0 ? void 0 : Events.directory) || "", (Events === null || Events === void 0 ? void 0 : Events.oldFile) || (Events === null || Events === void 0 ? void 0 : Events.file) || "", (Events === null || Events === void 0 ? void 0 : Events.newDirectory) || "", (Events === null || Events === void 0 ? void 0 : Events.newFile) || ""]);
                    }
                }
            }
        };
        For_EventsList: for (let index = 0; index < EventsList.length; index++) {
            const Events = EventsList[index];
            // @ts-expect-error 
            let Path = path_1.default.join(Events.directory, (Events === null || Events === void 0 ? void 0 : Events.file) || (Events === null || Events === void 0 ? void 0 : Events.oldFile) || "");
            // @ts-expect-error 
            let NewPath = path_1.default.join((Events === null || Events === void 0 ? void 0 : Events.newDirectory) || Events.directory, (Events === null || Events === void 0 ? void 0 : Events.newFile) || Events.file || "");
            let Type = Events.action == 0 ? "add" : Events.action == 1 ? "remove" : Events.action == 2 ? "change" : Events.action == 3 ? "rename" : "all";
            // 过滤
            if (this._FilterList.length) {
                let FilterList = this._FilterList;
                for (let index = 0; index < FilterList.length; index++) {
                    const element = FilterList[index];
                    if (typeof element === "function") {
                        if (!element(Path, Type, NewPath))
                            continue For_EventsList;
                    }
                    else {
                        if (Path.match(element))
                            continue For_EventsList;
                    }
                }
            }
            // 执行相应的方法
            WatchEvent[Events.action](Events, Path, NewPath);
            WatchEvent.ToAll(Type, Events, Path, NewPath);
        }
    }
    on(Type, CallBack) {
        this._WatchEventList.push({ EvalFunction: CallBack, type: Type });
    }
    /**
     * 添加过滤器
     * @param filter
     * @returns
     */
    AddFilter(filter) {
        if (!filter)
            return;
        if (filter && Array.isArray(filter))
            for (const FilterItem of filter)
                this._FilterList.push(FilterItem);
        else
            this._FilterList.push(filter);
    }
}
exports.nsfw = nsfw;
//# sourceMappingURL=main.js.map