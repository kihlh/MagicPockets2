/*
 * @Author: your name
 * @Date: 2022-01-19 13:48:36
 * @LastEditTime: 2022-06-21 20:04:05
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \app\modules\shake.ts
 */
/**所有防抖数据都会在这里存放 */
const ConstShakeList:Set<ShakeKey> = new Set;
const handleShakeEventList:{key:ShakeKey,type:"add"|"remove"|"has",CallBack:(this:typeof ConstShakeList,type:"add"|"remove"|"has",Time:number|undefined,)=>void}[]=[];

/**
 * 删除键值 
 * @param Key 键值
 * @param Timeout 延迟执行时间 没有则直接删除
 * @returns 
 */
function RemoveShakeKey(Key: ShakeKey, Timeout?: number, CallBack?: () => void) {
    if (Timeout) {
        setTimeout(() => {
            ConstShakeList.delete(Key);
            if (CallBack) CallBack();
            for (const handleShake of handleShakeEventList) if(handleShake.key==Key)handleShake.CallBack.apply(ConstShakeList,["remove",Timeout])
        }, Timeout)
        return true
    }
    ConstShakeList.delete(Key);
    for (const handleShake of handleShakeEventList) if(handleShake.key==Key)handleShake.CallBack.apply(ConstShakeList,["remove",Timeout])
    return true
}
/**
 * 添加防抖key
 * @param Key 键值
 * @param Timeout 超时时间 没有则永久
 */
function SetShakeKey(Key: ShakeKey, Timeout?: number, CallBack?: () => void) {
    ConstShakeList.add(Key);
    if (Timeout) RemoveShakeKey(Key, Timeout, CallBack);
    for (const handleShake of handleShakeEventList) if(handleShake.key==Key)handleShake.CallBack.apply(ConstShakeList,["add",Timeout])
}
/**
 * 判断是否有这个Key
 */
const HasShakeKey = (key: ShakeKey) =>{
    for (const handleShake of handleShakeEventList) if(handleShake.key==key)handleShake.CallBack.apply(ConstShakeList,["has",undefined])
    return ConstShakeList.has(key)
};
/**
 * 已有的防抖则返回 true  没有则添加
 * @param Key 键值
 * @param Timeout 超时时间
 */
function HasIfNotAdd(Key: ShakeKey, Timeout?: number, CallBack?: () => void): boolean {
    if (HasShakeKey(Key)) return true;
    SetShakeKey(Key, Timeout, CallBack)
    return false
}
/**
 * 按照时间进行异步等待 如果之前没有该键值则立马通过
 * @param Key 
 * @param Timeout 
 * @returns 
 */
function IsNext(Key: ShakeKey, Timeout?: number): Promise<void> {
    return new Promise(async function (resolve, reject) {
        if (ConstShakeList.has(Key)) {
            if (!Timeout) resolve();
            else setTimeout(resolve, Timeout)
        } else {
            SetShakeKey(Key, Timeout)
            resolve();
        }
    })
}
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
/**
 * 已有的防抖则返回 true  没有则添加 并随机延时
 * @param Key 键值
 * @param MinTimeout 最小超时时间
 * @param MaxTimeout 最大超时时间
 */
function Random(Key: ShakeKey, MinTimeout?: number|[number,number],MaxTimeout?: number){
    if(Array.isArray(MinTimeout)){
        MaxTimeout=MinTimeout[1];
        MinTimeout=MinTimeout[0];
    }
    let Timeout=GetRandomNum(MinTimeout||500,MaxTimeout||5000);
    if (HasShakeKey(Key)) return true;
    SetShakeKey(Key, Timeout)
    return false 
}
/**
 * 监听事件冒泡
 * @param Key 
 * @param type 
 * @param CallBack 
 */
function on(Key:ShakeKey,type:typeof handleShakeEventList[0]["type"],CallBack:typeof handleShakeEventList[0]["CallBack"]){
    if(Key&&type&&!!CallBack){
        handleShakeEventList.push({
            key: Key,
            type: type,
            CallBack:CallBack
        })
    }

}

const GetShakeKeySize = () => { return ConstShakeList.size };

let isset = HasIfNotAdd;
let get = HasShakeKey;
let set = SetShakeKey;

/**
 * 固定该键值
 * @param Key 键值 
 * @returns 
 */
let Const = (Key: ShakeKey) => SetShakeKey(Key);
let remove = RemoveShakeKey;
let del = RemoveShakeKey;
let has = HasShakeKey;
let GetSize = GetShakeKeySize;
let ShakeList = ConstShakeList;

export let shake ={
    isset, get, set, Const, remove, del, has, GetSize, ShakeList, IsNext,Random,on
}
type ShakeKey = string | number
export {
    isset, get, set, Const, remove, del, has, GetSize, ShakeList, IsNext,Random,on
}

export default {
    isset, get, set, Const, remove, del, has, GetSize, ShakeList, IsNext,Random,on
}
