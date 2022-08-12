/**
 * 按量拆分数组
 * @param {*} array 
 * @param {*} subNum 
 * @returns 
 */
function group(Array: Promise<any>[], SubNum?: number) {
    if (!SubNum) SubNum = 50;
    let index = 0;
    let newArray = [];
    while (index < Array.length) {
        newArray.push(Array.slice(index, index += SubNum));
    }
    return newArray;
}
/**
 * 并发限制
 */
let PthreadSubNum = 5;
class StructMultitProCess {
    // private 
    constructor() {

    }
    /**
    * 异步函数并发
    * @param {*} FunList 异步任务的函数数组
    * @param {*} subNum 并发最高术
    * @param {*} NotCallFun 是否返回本身的函数 不建议使用
    * @returns 
    */
    async MultitProCess(FunList: (() => Promise<any>)[] | Promise<any>[]|(() => Promise<any>)|Promise<any>, subNum?: number):Promise<PromiseSettledResult<any>[]> {
        if(subNum!==undefined)this.SetSubNum(subNum);
        return new Promise(async function (resolve, reject) {
            let ExecutiveFunList: Promise<any>[] = [];
            let FinishFunList:PromiseSettledResult<any>[]= [];
            if (FunList instanceof Promise)FunList=[FunList];
            if (FunList instanceof Function)FunList=[FunList];

            for (let ForPromiseFun of FunList) {
                // 将普通函数包裹的异步函数执行出来
                if (ForPromiseFun instanceof Function&&!(ForPromiseFun instanceof Promise)) {
                    let GetPromiseFun = ForPromiseFun();
                    ExecutiveFunList.push(GetPromiseFun);
                }
                if (ForPromiseFun instanceof Promise) ExecutiveFunList.push(ForPromiseFun);

                // 检查是否到达并发数是的话开始并发 并等待
                if ( ExecutiveFunList.length >PthreadSubNum-1) {
                   let allSettled= await Promise.allSettled(ExecutiveFunList);
                   for (const FinishFunData of allSettled)FinishFunList.push(FinishFunData);
                   ExecutiveFunList.length=0;
                }

            }
            
            let allSettled= await Promise.allSettled(ExecutiveFunList);
            for (const FinishFunData of allSettled)FinishFunList.push(FinishFunData);

            resolve(FinishFunList);
        })
    }
    /**
     * 设置线程并发限制
     * @param SubNum 
     */
    SetSubNum(SubNum: number) {
        if (typeof SubNum == "number" && !isNaN(SubNum) && SubNum > 0 && SubNum < Infinity) PthreadSubNum = SubNum;
    }
}
export let { MultitProCess,SetSubNum } = new StructMultitProCess();