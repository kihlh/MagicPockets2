/*
 * @Author: your name
 * @Date: 2022-05-01 20:23:23
 * @LastEditTime: 2022-05-16 13:15:17
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \app\modules\Core\fs-util\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import fs from "fs-extra";
import path from "path";
    /**
     *  代码阻塞
     *
     * @param {*} ms 毫秒
     * @return undefined
     * 调用： await this._Sleep(500);
     */
     function Sleep(ms:number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

class  StructFsUtil{
    constructor(){}
    /**
     * 等待该文件出现 并停止更新
     * @param Path 路径
     * @param limit  超时（该时间超时后有该文件则返回成功）
     * @returns  
     */
    WaitArise(Path:string,limit:number):Promise<undefined|fs.Stats>&{close?:()=>void}{
        let IF_Close=false;
        let WaitArisePromise:Promise<undefined|fs.Stats>&{close?:()=>void}= new Promise(async function(resolve,reject){
            let StartTime= +new Date();
            let OidSize=0;
            for (let index = 0; index <Infinity; index++) {
                let status=await fs.stat(Path).catch(Not=>{});
                if(!status){
                    if((limit&&( +new Date())-StartTime>limit)||IF_Close)return status!==undefined?status:undefined;
                    await Sleep((limit&&500>limit&&limit<1)?limit:500);
                }
                else {
                    if(IF_Close)return resolve(status);
                    // 没有继续更新了
                    if(OidSize==status.size)return resolve(status);
                    OidSize=status.size;
                }
                
            }
        })
        WaitArisePromise.close=function(){
            IF_Close=true;
        }
        return WaitArisePromise
    }
}