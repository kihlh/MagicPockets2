/*
 * @Author: your name
 * @Date: 2022-04-22 21:47:46
 * @LastEditTime: 2022-04-25 19:27:22
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \app\modules\Core\StoreRenderer\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
const electron=(r=>r("electron"))(require);
import { HM_Setting } from "../../../@types/Main";
class store {
    /**
     * 数据体 实时更新
     */
    store?: HM_Setting
    constructor() {
        let _this = this;
        electron.ipcRenderer.invoke("StoreGet").then(data=> this.store = data)
       
        electron.ipcRenderer.on("StoreUpdate", function (event, newValue, oldValue, store) {
            _this.store = newValue
        })
    }
    /**
     * 从长存储中读取默认用户设置
     * @param key 
     * @returns 
     */
    async Get(key: string):Promise<any> {
        return  electron.ipcRenderer.invoke("StoreGet", key)
    }
    /**
     * 从长存储中设置默认用户设置
     * @param key 
     * @param Value 
     * @returns 
     */
    async Set(key: string, Value: any) {
        return  electron.ipcRenderer.invoke("StoreSet", key, Value)
    }
    /**
     * 从长存储中判断是否存在该key
     * @param key 
     * @param Value 
     * @returns 
     */
    async Has(key: string):Promise<boolean> {
        return  electron.ipcRenderer.invoke("StoreHas", key)
    }

    /**
     * 从长存储中监听数据
     * @param key 
     * @param Value 
     * @returns 
     */
    on(key: string, CallBack: (this: HM_Setting, newValue: any, oldValue: any, key: string, store?: HM_Setting) => void) {
        if (key === "all") {
            electron.ipcRenderer.on("StoreUpdate", function (event, newValue, oldValue, store) {
                CallBack && CallBack.apply(store, [newValue, oldValue, key, store,])
            })
            return
        }
        electron.ipcRenderer.invoke("StoreON", key)
        electron.ipcRenderer.on(`StoreUpdateForKey_${key}`, function (event, newValue, oldValue, store) {
            CallBack && CallBack.apply(store, [newValue, oldValue, key])
        })
    }
    /**
     * 当store数据初始化完成的时候将返回到 then
     * @returns 
     */
    $nextTick() {
        return new Promise((resolve, reject) => {
            let _this = this;
            if (_this.store) return resolve(this.store)
            let nextTickID = setInterval(() => {
                if (_this.store) resolve(this.store);
                clearInterval(nextTickID)
                // console.log("clearInterval_nextTickID");

            }, 50)
        })
    }
}

interface store {
    on(key: string, CallBack: (this: HM_Setting, newValue: any, oldValue: any) => void): void;
    on(key: "all", CallBack: (this: HM_Setting, newValue: HM_Setting, oldValue: HM_Setting, key: string, store?: HM_Setting) => void): void;

}

export { store }