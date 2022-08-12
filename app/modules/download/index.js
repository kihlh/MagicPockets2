"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.axios = exports.downloadAll = exports.download = void 0;
/*
 * @Author: your name
 * @Date: 2022-01-06 03:19:34
 * @LastEditTime: 2022-04-24 21:18:47
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \app\modules\download\index.ts
 */
const axios = require("superagent");
exports.axios = axios;
const fs = require("fs-extra");
const url = require("url");
const path = require("path");
/**格式化连接 */
function resolveUrl(Url) {
    if (!Url)
        return "";
    if (!Url.match(/^https?/) &&
        !Url.match(/^file:\/\/\//) &&
        !Url.match(/^[/][/][\d]+\./))
        Url = "http://" + Url;
    let NewURL = Url.replace(/[\\]/g, "/")
        .replace(/^[/]+([^\d])/, "http://$1")
        .replace(/^(https?)[：:]?([\/]+)?/, "$1://")
        .replace(/^(file):[\/]+/, "file:///")
        .replace(/^(file:|https?:)[/]+([\d]+\.\d+)/, "//$2")
        .replace(/\/\/127.0.0.1:.+/, "http:$&");
    return NewURL;
}
function ID() {
    return (Date.now().toString(36) + Math.random().toString(36).slice(2, 7)).toUpperCase();
}
/**
 * 下载文件
 * @param Url 链接
 * @param Path 保存到哪里 没有申明位置会放到缓存中(软件关闭时移除)
 * @param referer 排除跨域
 * @returns
 */
async function download(Url, Path, referer) {
    Url = resolveUrl(Url);
    const downloadS = axios(Url);
    downloadS.set({
        "user-agent": "mozilla/5.0 (windows nt 10.0; win64; x64) applewebkit/537.36 (khtml, like gecko) chrome/96.0.4664.45 safari/537.36",
        referer: new url.URL(referer || Url).origin,
        connection: "keep-alive",
        "sec-ch-ua": '"Chromium";v="96", "Google Chrome";v="96", ";Not A Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        // "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "sec-fetch-site": "same-origin",
        "sec-fetch-mode": "no-cors",
        // "sec-fetch-dest": "image",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9",
    });
    if (Path) {
        const Dir = path.parse(Path).dir;
        // .jpg
        if (Path.match(/^\.[a-z0-9_-]+$/)) {
            Path = ID() + Path;
        }
        // D:/asgg.../asg.jpg
        if (!fs.existsSync(Dir)) {
            if (Dir)
                await fs.mkdirs(Dir);
            // asg.jpg
            if (!Dir)
                Path = path.join(process.resourcesPath || __dirname, '..', "UserData", "temp", "cache");
        }
        let getData;
        return new Promise(function (resolve, reject) {
            if (!Path)
                throw new Error("Not Path");
            getData = fs.createWriteStream(Path);
            downloadS.pipe(getData);
            getData.once("close", () => {
                if (!Path)
                    return;
                resolve(Path);
            });
            getData.once("error", () => {
                reject(getData);
            });
        });
    }
    const downloadinfo = await downloadS;
    console.log(downloadinfo);
    return downloadinfo.text || downloadinfo.body;
}
exports.download = download;
/**
 * 批量下载
 * @param UrlList 链接列表
 * @param Ext 扩展名 .jpg
 * @param at 前缀
 * @param pthread 并发数
 */
async function downloadAll(UrlList, Ext, at, pthread) {
    if (!Ext)
        Ext = "";
    if (!at)
        at = "";
    if (!pthread)
        pthread = 5;
    if (!Array.isArray(UrlList))
        UrlList = [UrlList];
    let Concurrent = [];
    let OKKConcurrent = [];
    async function Gotu() {
        let OKK = await Promise.allSettled(Concurrent);
        for (const iterator of OKK) {
            OKKConcurrent.push(iterator);
        }
        Concurrent.length = 0;
    }
    let index = 0;
    for (const URL of UrlList) {
        index += 1;
        Concurrent.push(download(URL, (at + "_" + index + Ext) || ID() + "_" + index));
        if (Concurrent.length >= pthread)
            await Gotu();
    }
    // 漏网之鱼
    if (Concurrent.length)
        await Gotu();
    return OKKConcurrent;
}
exports.downloadAll = downloadAll;
//# sourceMappingURL=index.js.map