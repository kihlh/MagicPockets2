/*
 * @Author: your name
 * @Date: 2022-01-07 20:47:11
 * @LastEditTime: 2022-01-07 21:08:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \app\modules\Object@util.d.ts
 */

type MergeFunc = <TObject, TSource>(object: TObject, source: TSource) => TObject & TSource;

type SplitFunc = (input: string, options?: Options) => string;
/**
 * key值 设置数据
 */
interface Options {
    /**
    *不要拆分包含“/”的属性。
    *默认情况下，设置值假定不希望拆分带有“/”的属性。
    *此选项允许您禁用默认行为。
    *请注意，如果为“选项”，则不能使用此选项。分隔符“”设置为“/”。
     * @default true
     */
    preservePaths?: boolean | undefined;
    /**
    *用于拆分对象路径的自定义分隔符。
     * @default `.`
     */
    separator?: string | undefined;
    /**
     * 自定义“”。split（）`要使用的函数。
     */
    split?: SplitFunc | undefined;
    /**
     * 允许您更新普通对象值，而不是覆盖它们。
     * @default  `undefined`
     */
    merge?: boolean | MergeFunc | undefined;
}/**
 * 键值获取内容
 * @param input_Object  对象
 * @param keys 键值
 * - 文本键值 => KEY_1.LEY_2.KEY_3
 * - 数组键值 => ['KEY_1','LEY_2','KEY_3']
 * @returns
 */
declare function Get(input_Object: Object, keys: string | number | Array<string>): any;
/**
 * 设置键值内容
 * @param input_Object  对象
* @param keys 键值
* - 文本键值 => KEY_1.LEY_2.KEY_3
* - 数组键值 => ['KEY_1','LEY_2','KEY_3']
 * @param Value 数值
 * @param options 配置
 */
declare function Set(input_Object: Object, keys: string | number | Array<string>, Value: any, options?: Options | undefined): any;
/**
 * 存在判断
 * @param input_Object  对象
 * @param keys 键值
 * - 文本键值 => KEY_1.LEY_2.KEY_3
 * - 数组键值 => ['KEY_1','LEY_2','KEY_3']
 * @returns
 */
declare function has(input_Object: Object, keys: string | number | Array<string>): boolean;
/**
 * 删除
 * @param input_Object  对象
 * @param keys 键值
 * - 文本键值 => KEY_1.LEY_2.KEY_3
 * - 数组键值 => ['KEY_1','LEY_2','KEY_3']
 * @returns
 */
declare function del(input_Object: Object, keys: string | Array<string>): boolean;
/**
 * 数组拼合方法
 * @param input_Object  对象
 * @param keys 键值
 * - 文本键值 => KEY_1.LEY_2.KEY_3
 * - 数组键值 => ['KEY_1','LEY_2','KEY_3']
 * @param Value 数组
 */
declare function Array_concat(input_Object: Object, keys: string | Array<string>, Value: Array<any>): void;
/**
 * 数据拼合方法
 * @param input_Object  对象
 * @param keys 键值
 * - 文本键值 => KEY_1.LEY_2.KEY_3
 * - 数组键值 => ['KEY_1','LEY_2','KEY_3']
 * @param Value 数组
 */
declare function concat(input_Object: Object, keys: string | Array<string>, Value: any): any;
/**
 * 格式化到文本
 * @param input
 * @returns
 */
declare function Format(input: Object | Array<any>): string;
declare const set: typeof Set, Del: typeof del, get: typeof Get;
export { concat, Array_concat, Get, Set, has, del, set, Del, get, Format };
