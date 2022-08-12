/*
 * @Author: 高效的文件监视
 * @Date: 2022-04-25 19:54:18
 * @LastEditTime: 2022-06-02 02:41:10
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \app\modules\nsfw\index.ts
 */
import NSFW from "nsfw";
const NsfwFunction: typeof NSFW = require("nsfw");
import fs from "fs-extra";
import path from "path";

class nsfw {
    /**初始化的C++监听器 */
    private StartNsfw?: Promise<NSFW.NSFW>;

    /**已初始化完成的C++监听器 */
    private Nsfw?: NSFW.NSFW
    /**
     * 监听对象 无回调传入则等等on之后启动
     * @param watchPath 监视文件变化的路径 
     * @param debounceMS 消除事件回调的时间（以毫秒为单位）
     */
    constructor(watchPath: string, debounceMS?: number) {
        if (!debounceMS) debounceMS = 500;
        let _this = this;
        watchPath = path.resolve(watchPath);
        if (process.NsfwList) {
            if (process.NsfwList.has(watchPath)) throw new Error("The path is already listening");
            process.NsfwList.add(watchPath);
        }
        // 没有传入
        if (!watchPath) throw Error("Not Input-WatchPath");
        // 不存在该文件
        if (!fs.existsSync(watchPath)) throw Error("Exists Not Watch Path");
        // 添加该路径的监听
        this.StartNsfw = NsfwFunction(watchPath, function (NSFW) {
            // 不能把类中的函数直接发送到C++处理 建立中转机制
            try {
                _this._WatchNSFW(NSFW)
            } catch (error: any) {
                _this._WatchError(error)
            }
        }, {
            "errorCallback": function (error) {
                // 不能把类中的函数直接发送到C++处理 建立中转机制
                _this._WatchError(error)
            }, "debounceMS": debounceMS
        });
    }
    private _IsFilterMate(Path:string,NsfwFilterMateList:WatchEventContainer["Filter"], type: WatchEventType, NewPath: string | undefined):boolean{
        if(!Path||!NsfwFilterMateList?.length)return false
        for (let FilterMate of NsfwFilterMateList) {
            try {
                if(typeof FilterMate==="function" ){
                    if(FilterMate(Path,type,NewPath)){
                        return true
                    }
                    continue
                }
                if(typeof FilterMate =="number"){
                    FilterMate=String(FilterMate);
                }
    
                if(Path.match(FilterMate)||Path.match(NewPath||"")){
                      return true
                }
            } catch (error) {
                return false
            }
        }
        return false
    }

    /**处理错误 */
    private _WatchError(error: Error) {
        let AlreadyRunError = false;
        for (const iterator of this._WatchEventList) if (iterator.type == "error") { AlreadyRunError = true; iterator.EvalFunction(error) }
        if (!AlreadyRunError) {
            this.Nsfw?.stop();
            throw error
        }
    }
    /**
     * 内执行回调
     * @param EventsList 
     */
    private _WatchNSFW(EventsList: Array<NSFW.FileChangeEvent>) {
        let _this = this;

        let WatchEvent = {
            /**创建 */
            0(NsfwEvents: NSFW.FileChangeEvent, Path: string, NewPath: string) {
                if (NsfwEvents.action == 0) for (const iterator of this.add) {
                    if(_this._IsFilterMate(Path,iterator.Filter,iterator.type,NewPath))return ;
                    iterator.EvalFunction.apply(NsfwEvents, [Path, NsfwEvents.directory, NsfwEvents?.file || ""])
                }
            },
            add: this._WatchEventList.filter(function (WatchEventContainer) { if (WatchEventContainer.type === "add") return true }),
            /**删除 */
            1(NsfwEvents: NSFW.FileChangeEvent, Path: string, NewPath: string) {
                if (NsfwEvents.action == 1) for (const iterator of this.remove) {
                    if(_this._IsFilterMate(Path,iterator.Filter,iterator.type,NewPath))return ;
                    iterator.EvalFunction.apply(NsfwEvents, [Path, NsfwEvents.directory, NsfwEvents?.file || ""])}
            },
            remove: this._WatchEventList.filter(function (WatchEventContainer) { if (WatchEventContainer.type === "remove") return true }),

            /**变动 */
            2(NsfwEvents: NSFW.FileChangeEvent, Path: string, NewPath: string) {
                if (NsfwEvents.action == 2) for (const iterator of this.change){
                    if(_this._IsFilterMate(Path,iterator.Filter,iterator.type,NewPath))return ;
                     iterator.EvalFunction.apply(NsfwEvents, [Path, NsfwEvents.directory, NsfwEvents?.file || ""])
                    }
            },
            change: this._WatchEventList.filter(function (WatchEventContainer) { if (WatchEventContainer.type === "change") return true }),

            /*重命名or移动 */
            3(NsfwEvents: NSFW.FileChangeEvent, Path: string, NewPath: string) {
                if (NsfwEvents.action == 3) for (const iterator of this.remove){
                    if(_this._IsFilterMate(Path,iterator.Filter,iterator.type,NewPath))return ;
                     iterator.EvalFunction.apply(NsfwEvents, [Path, NsfwEvents.directory, NsfwEvents.oldFile, NsfwEvents.newDirectory, NsfwEvents.newFile])
                    }
            },
            rename: this._WatchEventList.filter(function (WatchEventContainer) { if (WatchEventContainer.type === "rename") return true }),

            ToAll(Type: string, NsfwEvents: NSFW.FileChangeEvent, Path: string, NewPath: string) {
                for (const iterator of _this._WatchEventList) {
              if(_this._IsFilterMate(Path,iterator.Filter,iterator.type,NewPath))return ;
                    if (iterator.type == "all") {
                        // @ts-expect-error
                        iterator.EvalFunction.apply(NsfwEvents, [Type, Path, NsfwEvents?.directory || "", NsfwEvents?.oldFile || NsfwEvents?.file || "", NsfwEvents?.newDirectory || "", NsfwEvents?.newFile || ""])
                    }
                }

            }
        }

        For_EventsList: for (let index = 0; index < EventsList.length; index++) {
            const Events = EventsList[index];
            // @ts-expect-error 
            let Path = path.join(Events.directory, Events?.file || Events?.oldFile || "");
            // @ts-expect-error 
            let NewPath: string = path.join(Events?.newDirectory || Events.directory, Events?.newFile || Events.file || "")
            let Type: WatchEventType = Events.action == 0 ? "add" : Events.action == 1 ? "remove" : Events.action == 2 ? "change" : Events.action == 3 ? "rename" : "all"

            // 执行相应的方法
            WatchEvent[Events.action](Events, Path, NewPath);
            WatchEvent.ToAll(Type, Events, Path, NewPath)
        }

    }
    /**
     * 监听事件列表
     */
    private _WatchEventList: WatchEventContainer[] = []
    private _GetNsfwFilterMate(NsfwFilterMate: NsfwFilterMate | undefined): string[] | RegExp[] | FilterFunction[] {
        let NsfwFilterMateList: string[] | RegExp[] | FilterFunction[] = [];
        if (!NsfwFilterMate) return NsfwFilterMateList
        function PushFilterMate(NsfwFilterMate: NsfwFilterMate) {
            if (!Array.isArray(NsfwFilterMate)) {
                if (typeof NsfwFilterMate === "string") NsfwFilterMate = [NsfwFilterMate]
                if (typeof NsfwFilterMate === "function") NsfwFilterMate = [NsfwFilterMate]
                if (typeof NsfwFilterMate === "number") NsfwFilterMate = [String(NsfwFilterMate)]
            }
        }
        if (Array.isArray(NsfwFilterMate) || NsfwFilterMate instanceof Set) {
            for (const iterator of NsfwFilterMate) {
                PushFilterMate(iterator)
            }
        }
        else {
            PushFilterMate(NsfwFilterMate)
        }
        return NsfwFilterMateList
    }

    on(Type: WatchEventType, CallBack: (this: any, ...cmd: any[]) => void, Filter?: NsfwFilterMate): void {
        if (!this.Nsfw) this.StartNsfw && this.StartNsfw.then((value: NSFW.NSFW) => {
            this.Nsfw = value
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
                if (this.Nsfw) this.Nsfw.stop().catch(() => resolve(false)).then(() => resolve(true))
            } catch (error) {
                resolve(false)
            }
            resolve(false)
        })
    }
    /**
     * 恢复监听
     * @returns 
     */
    resume() {
        return new Promise(async (resolve) => {
            try {
                if (this.Nsfw) this.Nsfw.resume().catch(() => resolve(false)).then(() => resolve(true))
            } catch (error) {
                resolve(false)
            }
            resolve(false)
        })
    }
    /**
     * 暂停监听
     * @returns 
     */
    pause() {
        return new Promise(async (resolve) => {
            try {
                if (this.Nsfw) this.Nsfw.pause().catch(() => resolve(false)).then(() => resolve(true))
            } catch (error) {
                resolve(false)
            }
            resolve(false)
        })
    }
}
type NsfwFilterMate = string | RegExp | number | FilterFunction | string[] | RegExp[] | number[] | FilterFunction[]
interface nsfw {
    /**
     * 所有内容都监听不包含错误
     * @param Type 
     * @param CallBack 
     */
    on(Type: "all", CallBack: (this: any, Type: string, Path: string, dir: string, FileName: string, NewDir: string, OldFileName: string) => void, Filter?: NsfwFilterMate): void
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
     * 监听文件/文件夹 变化
     * @param Type 
     * @param CallBack 
     */
    on(Type: "change", CallBack: (this: any, Path: string, dir: string, FileName: string) => void): void
    /**
     * 监听文件/文件夹 重命名/移动
     * @param Type 
     * @param CallBack 
     */
    on(Type: "rename", CallBack: (this: any, Path: string, dir: string, FileName: string, NewDir: string, OldFileName: string) => void): void

}

interface WatchEventContainer {
    EvalFunction: Function,
    type: WatchEventType
    Filter: string[] | RegExp[] | number[] | FilterFunction[]
}

type WatchEventType = "all" | "error" | "change" | "add" | "remove" | "rename"

type FilterFunction = (Path: string, type: WatchEventType, NewPath: string | undefined,) => boolean

export { nsfw }

declare var process: NodeJS.Process & {
    /**监听中的路径 */
    NsfwList: Set<string>
}