"use strict";
/*
 * @Author: your name
 * @Date: 2022-04-23 20:20:06
 * @LastEditTime: 2022-04-28 12:50:20
 * @LastEditors: your name
 * @Description:
 * @FilePath: \app\modules\Core\GetWeathersImages\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
// F:\MagicPockets\resources\app
function GetAppPath() {
    for (const argv of process.argv) {
        if (argv.includes("--app-path=")) {
            return argv.replace(/--app-path=/i, '');
        }
    }
    return __dirname;
}
let WeatherImageslib = path_1.default.join(GetAppPath(), "lib\\src\\Main\\weather").replace(/[\\]/ig, '/');
class default_1 {
    direction;
    /**
     * 天气现象和对应的图片
     */
    WeatherImagesList = {
        "晴": path_1.default.join(WeatherImageslib, '晴天_1' + '.png'),
        "少云": path_1.default.join(WeatherImageslib, '多云转晴' + '.png'),
        "晴间多云": path_1.default.join(WeatherImageslib, '多云_1' + '.png'),
        "多云": path_1.default.join(WeatherImageslib, '多云_1' + '.png'),
        "阴": path_1.default.join(WeatherImageslib, '霾_1' + '.png'),
        "有风": path_1.default.join(WeatherImageslib, '浮尘' + '.png'),
        "平静": path_1.default.join(WeatherImageslib, '多云_1' + '.png'),
        "微风": path_1.default.join(WeatherImageslib, '浮尘' + '.png'),
        "和风": path_1.default.join(WeatherImageslib, '浮尘' + '.png'),
        "清风": path_1.default.join(WeatherImageslib, '浮尘' + '.png'),
        "强风/劲风": path_1.default.join(WeatherImageslib, '扬沙_1' + '.png'),
        "疾风": path_1.default.join(WeatherImageslib, '扬沙_1' + '.png'),
        "大风": path_1.default.join(WeatherImageslib, '扬沙_1' + '.png'),
        "烈风": path_1.default.join(WeatherImageslib, '扬沙_1' + '.png'),
        "风暴": path_1.default.join(WeatherImageslib, '扬沙_1' + '.png'),
        "狂爆风": path_1.default.join(WeatherImageslib, '扬沙_1' + '.png'),
        "飓风": path_1.default.join(WeatherImageslib, '扬沙_1' + '.png'),
        "热带风暴": path_1.default.join(WeatherImageslib, '扬沙_1' + '.png'),
        "霾": path_1.default.join(WeatherImageslib, '霾_1' + '.png'),
        "中度霾": path_1.default.join(WeatherImageslib, '霾_1' + '.png'),
        "重度霾": path_1.default.join(WeatherImageslib, '霾_1' + '.png'),
        "严重霾": path_1.default.join(WeatherImageslib, '霾_1' + '.png'),
        "阵雨": path_1.default.join(WeatherImageslib, '特大雷震雨' + '.png'),
        "雷阵雨": path_1.default.join(WeatherImageslib, '特大雷震雨' + '.png'),
        "雷阵雨并伴有冰雹": path_1.default.join(WeatherImageslib, '雨夹雪_1' + '.png'),
        "小雨": path_1.default.join(WeatherImageslib, '小雨_1' + '.png'),
        "中雨": path_1.default.join(WeatherImageslib, '阵雨_1' + '.png'),
        "大雨": path_1.default.join(WeatherImageslib, '暴雨_1' + '.png'),
        "暴雨": path_1.default.join(WeatherImageslib, '暴雨_1' + '.png'),
        "大暴雨": path_1.default.join(WeatherImageslib, '暴雨_1' + '.png'),
        "特大暴雨": path_1.default.join(WeatherImageslib, '暴雨_1' + '.png'),
        "强阵雨": path_1.default.join(WeatherImageslib, '暴雨_1' + '.png'),
        "强雷阵雨": path_1.default.join(WeatherImageslib, '特大雷震雨' + '.png'),
        "极端降雨": path_1.default.join(WeatherImageslib, '暴雨_1' + '.png'),
        "毛毛雨/细雨": path_1.default.join(WeatherImageslib, '小雨_1' + '.png'),
        "雨": path_1.default.join(WeatherImageslib, '小雨_1' + '.png'),
        "小雨-中雨": path_1.default.join(WeatherImageslib, '小雨_1' + '.png'),
        "中雨-大雨": path_1.default.join(WeatherImageslib, '阵雨_1' + '.png'),
        "大雨-暴雨": path_1.default.join(WeatherImageslib, '暴雨_1' + '.png'),
        "暴雨-大暴雨": path_1.default.join(WeatherImageslib, '暴雨_1' + '.png'),
        "大暴雨-特大暴雨": path_1.default.join(WeatherImageslib, '暴雨_1' + '.png'),
        "雨雪天气": path_1.default.join(WeatherImageslib, '雨夹雪_1' + '.png'),
        "雨夹雪": path_1.default.join(WeatherImageslib, '雨夹雪_1' + '.png'),
        "阵雨夹雪": path_1.default.join(WeatherImageslib, '雨夹雪_1' + '.png'),
        "冻雨": path_1.default.join(WeatherImageslib, '雨夹雪_1' + '.png'),
        "雪": path_1.default.join(WeatherImageslib, '中雪_1' + '.png'),
        "阵雪": path_1.default.join(WeatherImageslib, '中雪_1' + '.png'),
        "小雪": path_1.default.join(WeatherImageslib, '中雪_1' + '.png'),
        "中雪": path_1.default.join(WeatherImageslib, '中雪_1' + '.png'),
        "大雪": path_1.default.join(WeatherImageslib, '暴雪_1' + '.png'),
        "暴雪": path_1.default.join(WeatherImageslib, '暴雪_1' + '.png'),
        "小雪-中雪": path_1.default.join(WeatherImageslib, '中雪_1' + '.png'),
        "中雪-大雪": path_1.default.join(WeatherImageslib, '中雪_1' + '.png'),
        "大雪-暴雪": path_1.default.join(WeatherImageslib, '暴雪_1' + '.png'),
        "浮尘": path_1.default.join(WeatherImageslib, '浮尘' + '.png'),
        "扬沙": path_1.default.join(WeatherImageslib, '扬沙_1' + '.png'),
        "沙尘暴": path_1.default.join(WeatherImageslib, '扬沙_1' + '.png'),
        "强沙尘暴": path_1.default.join(WeatherImageslib, '扬沙_1' + '.png'),
        "龙卷风": path_1.default.join(WeatherImageslib, '扬沙_1' + '.png'),
        "雾": path_1.default.join(WeatherImageslib, '雾_1' + '.png'),
        "浓雾": path_1.default.join(WeatherImageslib, '雾_1' + '.png'),
        "强浓雾": path_1.default.join(WeatherImageslib, '雾_1' + '.png'),
        "轻雾": path_1.default.join(WeatherImageslib, '雾_1' + '.png'),
        "大雾": path_1.default.join(WeatherImageslib, '雾_1' + '.png'),
        "特强浓雾": path_1.default.join(WeatherImageslib, '雾_1' + '.png'),
        "热": path_1.default.join(WeatherImageslib, '晴天_1' + '.png'),
        "冷": path_1.default.join(WeatherImageslib, '中雪_1' + '.png'),
        "未知": path_1.default.join(WeatherImageslib, '未知' + '.png')
    };
    /**
     * 按照天气名寻找适合的图片
     * @param weatherName
     * @returns
     */
    weatherNameGet(weatherName) {
        let GetPowerForIMAGES = this.WeatherImagesList[weatherName];
        if (GetPowerForIMAGES) {
            return GetPowerForIMAGES;
        }
        return this.WeatherImagesList["未知"];
    }
    constructor() {
        this.direction = fs_extra_1.default.readJSONSync(path_1.default.join(GetAppPath(), "lib", "Weathers", "direction.json"));
    }
    /**
     * 按高德的风力寻找风力指数
     * @param Power
     * @returns
     */
    GetDirection(Power) {
        for (const iterator of this.direction) {
            if (iterator.power == Power)
                return iterator;
        }
        console.error(`GetDirection Not Power`, Power);
        return this.direction['11'];
    }
    GetTempFeeling(temp) {
        let Temp = Number(temp);
        if (Temp < -35) {
            return "极寒";
        }
        if (Temp < -30) {
            return "严寒";
        }
        if (Temp < -15) {
            return "冰冷";
        }
        if (Temp < -10) {
            return "寒冷";
        }
        if (Temp < -0) {
            return "寒意";
        }
        if (Temp < 5) {
            return "冬日";
        }
        if (Temp < 10) {
            return "微冷";
        }
        if (Temp < 17) {
            return "温和";
        }
        if (Temp < 22) {
            return "舒适";
        }
        if (Temp < 26) {
            return "舒适";
        }
        if (Temp < 30) {
            return "夏日";
        }
        if (Temp < 36) {
            return "酷暑";
        }
        if (Temp < 43) {
            return "炎热";
        }
        if (Temp < 46) {
            return "熟了";
        }
        return "未知";
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map