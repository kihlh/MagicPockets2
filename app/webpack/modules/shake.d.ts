/*
 * @Author: your name
 * @Date: 2022-01-19 15:22:55
 * @LastEditTime: 2022-01-19 15:24:16
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \app\modules\shake.d.ts
 */
/**
 * 删除键值
 * @param Key 键值
 * @param Timeout 延迟执行时间 没有则直接删除
 * @returns
 */
declare function RemoveShakeKey(Key: ShakeKey, Timeout?: number): boolean;
/**
 * 添加防抖key
 * @param Key 键值
 * @param Timeout 超时时间 没有则永久
 */
declare function SetShakeKey(Key: ShakeKey, Timeout?: number): void;
/**
 * 已有的防抖则返回 true  没有则添加
 * @param Key 键值
 * @param Timeout 超时时间
 */
declare function HasIfNotAdd(Key: ShakeKey, Timeout?: number): boolean;
declare type ShakeKey = string | number;
declare const _default: {
    isset: typeof HasIfNotAdd;
   /**
     * 判断该键值是否存在
     */
    get: (key: ShakeKey) => boolean;
    set: typeof SetShakeKey;
    /**
    * 固定该键值
    * @param Key 键值 
    * @returns 
    */
    Const: (Key: ShakeKey) => void;
    remove: typeof RemoveShakeKey;
    del: typeof RemoveShakeKey;
    /**
     * 判断该键值是否存在
     */
    has: (key: ShakeKey) => boolean;
    GetSize: () => number;
    ShakeList: Set<unknown>;
};
export = _default;
