"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nsfw = void 0;
const NsfwFunction = require("nsfw");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
class nsfw {
    /**初始化的C++监听器 */
    StartNsfw;
    /**已初始化完成的C++监听器 */
    Nsfw;
    /**
     * 监听对象 无回调传入则等等on之后启动
     * @param watchPath 监视文件变化的路径
     * @param debounceMS 消除事件回调的时间（以毫秒为单位）
     */
    constructor(watchPath, debounceMS) {
        if (!debounceMS)
            debounceMS = 500;
        let _this = this;
        watchPath = path_1.default.resolve(watchPath);
        if (process.NsfwList) {
            if (process.NsfwList.has(watchPath))
                throw new Error("The path is already listening");
            process.NsfwList.add(watchPath);
        }
        // 没有传入
        if (!watchPath)
            throw Error("Not Input-WatchPath");
        // 不存在该文件
        if (!fs_extra_1.default.existsSync(watchPath))
            throw Error("Exists Not Watch Path");
        // 添加该路径的监听
        this.StartNsfw = NsfwFunction(watchPath, function (NSFW) {
            // 不能把类中的函数直接发送到C++处理 建立中转机制
            try {
                _this._WatchNSFW(NSFW);
            }
            catch (error) {
                _this._WatchError(error);
            }
        }, {
            "errorCallback": function (error) {
                // 不能把类中的函数直接发送到C++处理 建立中转机制
                _this._WatchError(error);
            }, "debounceMS": debounceMS
        });
    }
    _IsFilterMate(Path, NsfwFilterMateList, type, NewPath) {
        if (!Path || !NsfwFilterMateList?.length)
            return false;
        for (let FilterMate of NsfwFilterMateList) {
            try {
                if (typeof FilterMate === "function") {
                    if (FilterMate(Path, type, NewPath)) {
                        return true;
                    }
                    continue;
                }
                if (typeof FilterMate == "number") {
                    FilterMate = String(FilterMate);
                }
                if (Path.match(FilterMate) || Path.match(NewPath || "")) {
                    return true;
                }
            }
            catch (error) {
                return false;
            }
        }
        return false;
    }
    /**处理错误 */
    _WatchError(error) {
        let AlreadyRunError = false;
        for (const iterator of this._WatchEventList)
            if (iterator.type == "error") {
                AlreadyRunError = true;
                iterator.EvalFunction(error);
            }
        if (!AlreadyRunError) {
            this.Nsfw?.stop();
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
            0(NsfwEvents, Path, NewPath) {
                if (NsfwEvents.action == 0)
                    for (const iterator of this.add) {
                        if (_this._IsFilterMate(Path, iterator.Filter, iterator.type, NewPath))
                            return;
                        iterator.EvalFunction.apply(NsfwEvents, [Path, NsfwEvents.directory, NsfwEvents?.file || ""]);
                    }
            },
            add: this._WatchEventList.filter(function (WatchEventContainer) { if (WatchEventContainer.type === "add")
                return true; }),
            /**删除 */
            1(NsfwEvents, Path, NewPath) {
                if (NsfwEvents.action == 1)
                    for (const iterator of this.remove) {
                        if (_this._IsFilterMate(Path, iterator.Filter, iterator.type, NewPath))
                            return;
                        iterator.EvalFunction.apply(NsfwEvents, [Path, NsfwEvents.directory, NsfwEvents?.file || ""]);
                    }
            },
            remove: this._WatchEventList.filter(function (WatchEventContainer) { if (WatchEventContainer.type === "remove")
                return true; }),
            /**变动 */
            2(NsfwEvents, Path, NewPath) {
                if (NsfwEvents.action == 2)
                    for (const iterator of this.change) {
                        if (_this._IsFilterMate(Path, iterator.Filter, iterator.type, NewPath))
                            return;
                        iterator.EvalFunction.apply(NsfwEvents, [Path, NsfwEvents.directory, NsfwEvents?.file || ""]);
                    }
            },
            change: this._WatchEventList.filter(function (WatchEventContainer) { if (WatchEventContainer.type === "change")
                return true; }),
            /*重命名or移动 */
            3(NsfwEvents, Path, NewPath) {
                if (NsfwEvents.action == 3)
                    for (const iterator of this.remove) {
                        if (_this._IsFilterMate(Path, iterator.Filter, iterator.type, NewPath))
                            return;
                        iterator.EvalFunction.apply(NsfwEvents, [Path, NsfwEvents.directory, NsfwEvents.oldFile, NsfwEvents.newDirectory, NsfwEvents.newFile]);
                    }
            },
            rename: this._WatchEventList.filter(function (WatchEventContainer) { if (WatchEventContainer.type === "rename")
                return true; }),
            ToAll(Type, NsfwEvents, Path, NewPath) {
                for (const iterator of _this._WatchEventList) {
                    if (_this._IsFilterMate(Path, iterator.Filter, iterator.type, NewPath))
                        return;
                    if (iterator.type == "all") {
                        // @ts-expect-error
                        iterator.EvalFunction.apply(NsfwEvents, [Type, Path, NsfwEvents?.directory || "", NsfwEvents?.oldFile || NsfwEvents?.file || "", NsfwEvents?.newDirectory || "", NsfwEvents?.newFile || ""]);
                    }
                }
            }
        };
        For_EventsList: for (let index = 0; index < EventsList.length; index++) {
            const Events = EventsList[index];
            // @ts-expect-error 
            let Path = path_1.default.join(Events.directory, Events?.file || Events?.oldFile || "");
            // @ts-expect-error 
            let NewPath = path_1.default.join(Events?.newDirectory || Events.directory, Events?.newFile || Events.file || "");
            let Type = Events.action == 0 ? "add" : Events.action == 1 ? "remove" : Events.action == 2 ? "change" : Events.action == 3 ? "rename" : "all";
            // 执行相应的方法
            WatchEvent[Events.action](Events, Path, NewPath);
            WatchEvent.ToAll(Type, Events, Path, NewPath);
        }
    }
    /**
     * 监听事件列表
     */
    _WatchEventList = [];
    _GetNsfwFilterMate(NsfwFilterMate) {
        let NsfwFilterMateList = [];
        if (!NsfwFilterMate)
            return NsfwFilterMateList;
        function PushFilterMate(NsfwFilterMate) {
            if (!Array.isArray(NsfwFilterMate)) {
                if (typeof NsfwFilterMate === "string")
                    NsfwFilterMate = [NsfwFilterMate];
                if (typeof NsfwFilterMate === "function")
                    NsfwFilterMate = [NsfwFilterMate];
                if (typeof NsfwFilterMate === "number")
                    NsfwFilterMate = [String(NsfwFilterMate)];
            }
        }
        if (Array.isArray(NsfwFilterMate) || NsfwFilterMate instanceof Set) {
            for (const iterator of NsfwFilterMate) {
                PushFilterMate(iterator);
            }
        }
        else {
            PushFilterMate(NsfwFilterMate);
        }
        return NsfwFilterMateList;
    }
    on(Type, CallBack, Filter) {
        if (!this.Nsfw)
            this.StartNsfw && this.StartNsfw.then((value) => {
                this.Nsfw = value;
                value.start();
            });
        this._WatchEventList.push({ EvalFunction: CallBack, type: Type, Filter: this._GetNsfwFilterMate(Filter) });
    }
    /**
     * 结束监听
     * @returns
     */
    stop() {
        return new Promise(async (resolve) => {
            try {
                if (this.Nsfw)
                    this.Nsfw.stop().catch(() => resolve(false)).then(() => resolve(true));
            }
            catch (error) {
                resolve(false);
            }
            resolve(false);
        });
    }
    /**
     * 恢复监听
     * @returns
     */
    resume() {
        return new Promise(async (resolve) => {
            try {
                if (this.Nsfw)
                    this.Nsfw.resume().catch(() => resolve(false)).then(() => resolve(true));
            }
            catch (error) {
                resolve(false);
            }
            resolve(false);
        });
    }
    /**
     * 暂停监听
     * @returns
     */
    pause() {
        return new Promise(async (resolve) => {
            try {
                if (this.Nsfw)
                    this.Nsfw.pause().catch(() => resolve(false)).then(() => resolve(true));
            }
            catch (error) {
                resolve(false);
            }
            resolve(false);
        });
    }
}
exports.nsfw = nsfw;
//# sourceMappingURL=index.js.map