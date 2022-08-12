/**获取多天的数据表 单数据 */
export type amap_com_v3_weatherInfo___ALL_infoCasts = {
  /**时间  "2022-01-02"*/
  date: string;
  /**星期几  "1"*/
  week: "1" | "2" | "3" | "4" | "5" | "6" | "7";
  /**白天天气现象 */
  dayweather: info_weather;
  /**晚上天气现象 */
  nightweather: info_weather;
  /**白天温度  "1"*/
  daytemp: temperatureInfoType;
  /**晚上温度  "1"*/
  nighttemp: temperatureInfoType;
  /**白天风向 */
  daywind: info_winddirection;
  /**晚上风向*/
  nightwind: info_winddirection;
  /**晚上风力  "1"*/
  daypower: info_windpower;
  /**晚上风力  "1"*/
  nightpower: info_windpower;
};
export interface amap_com_v3_weatherInfo___ALL {
  /**成功/失败 */
  status: "1" | "0";
  count: "1";
  /**状态码
   *
   * 详见https://lbs.amap.com/api/webservice/guide/tools/info/ */
  info: string;
  /**状态码
   *
   * 详见https://lbs.amap.com/api/webservice/guide/tools/info/ */
  infocode: string;
  /**数据体 */
  forecasts: [
    {
      /**省 */
      province: string;
      /**市/区/县 */
      city: string;
      /**省 "350581"*/
      adcode: string;
      /**更新时间  "2022-01-02 02:02:14" */
      reporttime: string;
      casts: amap_com_v3_weatherInfo___ALL_infoCasts[];
    }
  ];
}
/**所有天气处返回值 */
export type info_weather =
  | "晴"
  | "少云"
  | "晴间多云"
  | "多云"
  | "阴"
  | "有风"
  | "平静"
  | "微风"
  | "和风"
  | "清风"
  | "强风/劲风"
  | "疾风"
  | "大风"
  | "烈风"
  | "风暴"
  | "狂爆风"
  | "飓风"
  | "热带风暴"
  | "霾"
  | "中度霾"
  | "重度霾"
  | "严重霾"
  | "阵雨"
  | "雷阵雨"
  | "雷阵雨并伴有冰雹"
  | "小雨"
  | "中雨"
  | "大雨"
  | "暴雨"
  | "大暴雨"
  | "特大暴雨"
  | "强阵雨"
  | "强雷阵雨"
  | "极端降雨"
  | "毛毛雨/细雨"
  | "雨"
  | "小雨-中雨"
  | "中雨-大雨"
  | "大雨-暴雨"
  | "暴雨-大暴雨"
  | "大暴雨-特大暴雨"
  | "雨雪天气"
  | "雨夹雪"
  | "阵雨夹雪"
  | "冻雨"
  | "雪"
  | "阵雪"
  | "小雪"
  | "中雪"
  | "大雪"
  | "暴雪"
  | "小雪-中雪"
  | "中雪-大雪"
  | "大雪-暴雪"
  | "浮尘"
  | "扬沙"
  | "沙尘暴"
  | "强沙尘暴"
  | "龙卷风"
  | "雾"
  | "浓雾"
  | "强浓雾"
  | "轻雾"
  | "大雾"
  | "特强浓雾"
  | "热"
  | "冷"
  | "未知";
export type info_winddirection =
  | "无风向"
  | "东北"
  | "东"
  | "东南"
  | "南"
  | "西南"
  | "西"
  | "西北"
  | "北"
  | "旋转不定";
export type info_windpower =
  | "≤3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12";
/**
 * 温度  -50 -- 50
 */
export type temperatureInfoType = "-0" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-13" | "-14" | "-15" | "-16" | "-17" | "-18" | "-19" | "-20" | "-21" | "-22" | "-23" | "-24" | "-25" | "-26" | "-27" | "-28" | "-29" | "-30" | "-31" | "-32" | "-33" | "-34" | "-35" | "-36" | "-37" | "-38" | "-39" | "-40" | "-41" | "-42" | "-43" | "-44" | "-45" | "-46" | "-47" | "-48" | "-49" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48" | "49"
/**获取单天 实时 */
export interface amap_com_v3_weatherInfo {
  /**成功/失败 */
  status: "1" | "0";
  count: "1";
  /**状态码
   *
   * 详见https://lbs.amap.com/api/webservice/guide/tools/info/ */
  info: string;
  /**状态码
   *
   * 详见https://lbs.amap.com/api/webservice/guide/tools/info/ */
  infocode: string;
  /**数据体  weatherInfo仅一条*/
  lives: [
    {
      /**省 */
      province: string;
      /**市/区/县 */
      city: string;
      /**省 "350581"*/
      adcode: string;
      /**天气 */
      weather: info_weather;
      /**温度  "-0" , "15" */
      temperature: temperatureInfoType;
      /**风向 */
      winddirection: info_winddirection;
      /**风力 */
      windpower: info_windpower;
      /**湿度 "82"*/
      humidity: string;
      /**更新时间 ： "2022-01-02 02:02:14" */
      reporttime: string;
    }
  ];
}



export interface MainShowCastsObject {
  /**相对时间 */
  time: "来自全天" | "来自后天" | "来自明天" | "未来预测"
  /**时间  "2022-01-02"*/
  date: string;
  /**星期几  "1"*/
  week: "1" | "2" | "3" | "4" | "5" | "6" | "7";
  /**白天天气现象 */
  dayweather: info_weather;
  /**晚上天气现象 */
  nightweather: info_weather;
  /**白天温度  "1"*/
  daytemp: temperatureInfoType;
  /**晚上温度  "1"*/
  nighttemp: temperatureInfoType;
  /**白天风向 */
  daywind: info_winddirection;
  /**晚上风向*/
  nightwind: info_winddirection;
  /**晚上风力  "1"*/
  daypower: info_windpower;
  /**晚上风力  "1"*/
  nightpower: info_windpower;
  /**显示图片 */
  img: string;
}

export interface amap_com_v3_weatherInfo___ALL {
  /**成功/失败 */
  status: "1" | "0";
  count: "1";
  /**状态码
   *
   * 详见https://lbs.amap.com/api/webservice/guide/tools/info/ */
  info: string;
  /**状态码
   *
   * 详见https://lbs.amap.com/api/webservice/guide/tools/info/ */
  infocode: string;
  /**数据体 */
  forecasts: [
    {
      /**省 */
      province: string;
      /**市/区/县 */
      city: string;
      /**省 "350581"*/
      adcode: string;
      /**更新时间  "2022-01-02 02:02:14" */
      reporttime: string;
      casts: amap_com_v3_weatherInfo___ALL_infoCasts[];
    }
  ];
}

/**
* 温度  -50 -- 50
*/
export type temperatureInfoType = "-0" | "-1" | "-2" | "-3" | "-4" | "-5" | "-6" | "-7" | "-8" | "-9" | "-10" | "-11" | "-12" | "-13" | "-14" | "-15" | "-16" | "-17" | "-18" | "-19" | "-20" | "-21" | "-22" | "-23" | "-24" | "-25" | "-26" | "-27" | "-28" | "-29" | "-30" | "-31" | "-32" | "-33" | "-34" | "-35" | "-36" | "-37" | "-38" | "-39" | "-40" | "-41" | "-42" | "-43" | "-44" | "-45" | "-46" | "-47" | "-48" | "-49" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48" | "49"

export interface amap_com_v5_ip_Get {
  status: "1";
  info: "OK";
  infocode: "10000";
  country: "中国";
  province: "福建省";
  city: "泉州市";
  district: "晋江市";
  isp: "中国电信" | "中国移动" | "中国铁通" | "中国联通" | null;
  location: "123xxx.xxx38,123xxxx.xxxx5241" | null;
  ip: "0.0.0.0" | null;
}
export interface amap_com_v3_ip_Get {
  status: "1";
  info: "OK";
  infocode: "10000";
  province: "福建省";
  city: "泉州市";
  adcode: "350500";
  rectangle: "118.4247422,24.78335456;118.7353957,25.00952156";
}
export interface KIIC_API_Detailed {
  /**成功/失败 */
  status: "1" | "0";
  count: "1";
  /**状态码
   *
   * 详见https://lbs.amap.com/api/webservice/guide/tools/info/ */
  info: string;
  /**状态码
   *
   * 详见https://lbs.amap.com/api/webservice/guide/tools/info/ */
  infocode: string;
  /**数据体 weatherInfo仅一条 */
  lives: amap_com_v3_weatherInfo["lives"]
  /**多天预测数据体 */
  forecasts: amap_com_v3_weatherInfo___ALL["forecasts"]
  /**更新时间 */
  reportDate: number;
  LaunchTime?:number
}
declare var Store : store