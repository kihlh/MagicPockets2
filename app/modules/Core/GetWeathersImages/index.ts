/*
 * @Author: your name
 * @Date: 2022-04-23 20:20:06
 * @LastEditTime: 2022-04-28 12:50:20
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \app\modules\Core\GetWeathersImages\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

import fs from "fs-extra"
import path from "path"
import util = require("../../../modules/Object@util")
import { info_weather, info_windpower, temperatureInfoType } from "../../../@types/WeathersAPI";
// F:\MagicPockets\resources\app
function GetAppPath() {
    for (const argv of process.argv) {
        if (argv.includes("--app-path=")) {
            return argv.replace(/--app-path=/i, '')
        }
    }
    return __dirname
}

let WeatherImageslib = path.join(GetAppPath(), "lib\\src\\Main\\weather").replace(/[\\]/ig, '/')

export default class {
    direction: direction

    /**
     * 天气现象和对应的图片
     */
    WeatherImagesList = {
        "晴": path.join(WeatherImageslib, '晴天_1' + '.png'),
        "少云": path.join(WeatherImageslib, '多云转晴' + '.png'),
        "晴间多云": path.join(WeatherImageslib, '多云_1' + '.png'),
        "多云": path.join(WeatherImageslib, '多云_1' + '.png'),
        "阴": path.join(WeatherImageslib, '霾_1' + '.png'),
        "有风": path.join(WeatherImageslib, '浮尘' + '.png'),
        "平静": path.join(WeatherImageslib, '多云_1' + '.png'),
        "微风": path.join(WeatherImageslib, '浮尘' + '.png'),
        "和风": path.join(WeatherImageslib, '浮尘' + '.png'),
        "清风": path.join(WeatherImageslib, '浮尘' + '.png'),
        "强风/劲风": path.join(WeatherImageslib, '扬沙_1' + '.png'),
        "疾风": path.join(WeatherImageslib, '扬沙_1' + '.png'),
        "大风": path.join(WeatherImageslib, '扬沙_1' + '.png'),
        "烈风": path.join(WeatherImageslib, '扬沙_1' + '.png'),
        "风暴": path.join(WeatherImageslib, '扬沙_1' + '.png'),
        "狂爆风": path.join(WeatherImageslib, '扬沙_1' + '.png'),
        "飓风": path.join(WeatherImageslib, '扬沙_1' + '.png'),
        "热带风暴": path.join(WeatherImageslib, '扬沙_1' + '.png'),
        "霾": path.join(WeatherImageslib, '霾_1' + '.png'),
        "中度霾": path.join(WeatherImageslib, '霾_1' + '.png'),
        "重度霾": path.join(WeatherImageslib, '霾_1' + '.png'),
        "严重霾": path.join(WeatherImageslib, '霾_1' + '.png'),
        "阵雨": path.join(WeatherImageslib, '特大雷震雨' + '.png'),
        "雷阵雨": path.join(WeatherImageslib, '特大雷震雨' + '.png'),
        "雷阵雨并伴有冰雹": path.join(WeatherImageslib, '雨夹雪_1' + '.png'),
        "小雨": path.join(WeatherImageslib, '小雨_1' + '.png'),
        "中雨": path.join(WeatherImageslib, '阵雨_1' + '.png'),
        "大雨": path.join(WeatherImageslib, '暴雨_1' + '.png'),
        "暴雨": path.join(WeatherImageslib, '暴雨_1' + '.png'),
        "大暴雨": path.join(WeatherImageslib, '暴雨_1' + '.png'),
        "特大暴雨": path.join(WeatherImageslib, '暴雨_1' + '.png'),
        "强阵雨": path.join(WeatherImageslib, '暴雨_1' + '.png'),
        "强雷阵雨": path.join(WeatherImageslib, '特大雷震雨' + '.png'),
        "极端降雨": path.join(WeatherImageslib, '暴雨_1' + '.png'),
        "毛毛雨/细雨": path.join(WeatherImageslib, '小雨_1' + '.png'),
        "雨": path.join(WeatherImageslib, '小雨_1' + '.png'),
        "小雨-中雨": path.join(WeatherImageslib, '小雨_1' + '.png'),
        "中雨-大雨": path.join(WeatherImageslib, '阵雨_1' + '.png'),
        "大雨-暴雨": path.join(WeatherImageslib, '暴雨_1' + '.png'),
        "暴雨-大暴雨": path.join(WeatherImageslib, '暴雨_1' + '.png'),
        "大暴雨-特大暴雨": path.join(WeatherImageslib, '暴雨_1' + '.png'),
        "雨雪天气": path.join(WeatherImageslib, '雨夹雪_1' + '.png'),
        "雨夹雪": path.join(WeatherImageslib, '雨夹雪_1' + '.png'),
        "阵雨夹雪": path.join(WeatherImageslib, '雨夹雪_1' + '.png'),
        "冻雨": path.join(WeatherImageslib, '雨夹雪_1' + '.png'),
        "雪": path.join(WeatherImageslib, '中雪_1' + '.png'),
        "阵雪": path.join(WeatherImageslib, '中雪_1' + '.png'),
        "小雪": path.join(WeatherImageslib, '中雪_1' + '.png'),
        "中雪": path.join(WeatherImageslib, '中雪_1' + '.png'),
        "大雪": path.join(WeatherImageslib, '暴雪_1' + '.png'),
        "暴雪": path.join(WeatherImageslib, '暴雪_1' + '.png'),
        "小雪-中雪": path.join(WeatherImageslib, '中雪_1' + '.png'),
        "中雪-大雪": path.join(WeatherImageslib, '中雪_1' + '.png'),
        "大雪-暴雪": path.join(WeatherImageslib, '暴雪_1' + '.png'),
        "浮尘": path.join(WeatherImageslib, '浮尘' + '.png'),
        "扬沙": path.join(WeatherImageslib, '扬沙_1' + '.png'),
        "沙尘暴": path.join(WeatherImageslib, '扬沙_1' + '.png'),
        "强沙尘暴": path.join(WeatherImageslib, '扬沙_1' + '.png'),
        "龙卷风": path.join(WeatherImageslib, '扬沙_1' + '.png'),
        "雾": path.join(WeatherImageslib, '雾_1' + '.png'),
        "浓雾": path.join(WeatherImageslib, '雾_1' + '.png'),
        "强浓雾": path.join(WeatherImageslib, '雾_1' + '.png'),
        "轻雾": path.join(WeatherImageslib, '雾_1' + '.png'),
        "大雾": path.join(WeatherImageslib, '雾_1' + '.png'),
        "特强浓雾": path.join(WeatherImageslib, '雾_1' + '.png'),
        "热": path.join(WeatherImageslib, '晴天_1' + '.png'),
        "冷": path.join(WeatherImageslib, '中雪_1' + '.png'),
        "未知": path.join(WeatherImageslib, '未知' + '.png')
    }

    /**
     * 按照天气名寻找适合的图片
     * @param weatherName 
     * @returns 
     */
    weatherNameGet(weatherName: info_weather) {
        let GetPowerForIMAGES = this.WeatherImagesList[weatherName];
        if (GetPowerForIMAGES) {
            return GetPowerForIMAGES
        }
        return this.WeatherImagesList["未知"]
    }

    constructor() {
        this.direction = fs.readJSONSync(path.join(GetAppPath(), "lib", "Weathers", "direction.json"));
    }
    /**
     * 按高德的风力寻找风力指数
     * @param Power 
     * @returns 
     */
    GetDirection(Power: info_windpower) {
       for (const iterator of this.direction) {
           if(iterator.power==Power)return iterator
       }
       console.error(`GetDirection Not Power`,Power);
       
        return this.direction['11']
    }

    GetTempFeeling(temp: temperatureInfoType){
        let Temp=Number(temp)
        if(Temp<-35){
            return "极寒"
        }
        if(Temp<-30){
            return "严寒"
        }
        if(Temp<-15){
            return "冰冷"
        }
        if(Temp<-10){
            return "寒冷"
        }
        if(Temp<-0){
            return "寒意"
        }
        if(Temp<5){
            return "冬日"
        }
        if(Temp<10){
            return "微冷"
        }
        if(Temp<17){
            return "温和"
        }
        if(Temp<22){
            return "舒适"
        }
        if(Temp<26){
            return "舒适"
        }
        if(Temp<30){
            return "夏日"
        }
        if(Temp<36){
            return "酷暑"
        }
        if(Temp<43){
            return "炎热"
        }
        if(Temp<46){
            return "熟了"
        }
        return "未知"
    }
}


type direction = [
    {
        "power": "≤3",
        "info": null,
        "dpower": "无风"
    },
    {
        "power": "4",
        "info": null,
        "dpower": "微风"
    },
    {
        "power": "5",
        "info": "",
        "dpower": "和风"
    },
    {
        "power": "6",
        "info": "出门就是电吹风对着脸",
        "dpower": "清劲风"
    },
    {
        "power": "7",
        "info": "强风",
        "dpower": "外面风大出门考虑体重~"
    },
    {
        "power": "8",
        "info": "小型台风注意安全哦~",
        "dpower": "疾风"
    },
    {
        "power": "9",
        "info": "小型台风注意安全哦~",
        "dpower": "大风"
    },
    {
        "power": "10",
        "info": "倒拔垂杨柳的烈风!",
        "dpower": "台风"
    },
    {
        "power": "11",
        "dpower": "台风",
        "info": "超级大风难得一遇别出门了吧~"
    },
    {
        "power": "12",
        "dpower": "台风",
        "info": "超级大风难得一遇别出门了吧~"
    },
    {
        "power": "13",
        "dpower": "台风",
        "info": "超级大风难得一遇别出门了吧~"
    },
    {
        "power": "未知",
        "dpower": "未知",
        "info": "数据被风吹走了~"
    }
]