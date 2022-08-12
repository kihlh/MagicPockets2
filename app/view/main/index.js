"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._ChromeTabs = void 0;
const { clip, shake, ipcRendererRemoteAPI, path, fs, GainPath, ipcRenderer, Store } = window;
const dayjs = require("dayjs");
const GetWeathersImages_1 = __importDefault(require("../../modules/Core/GetWeathersImages"));
const index_1 = require("./tab/index");
Object.defineProperty(exports, "_ChromeTabs", { enumerable: true, get: function () { return index_1._ChromeTabs; } });
window.chromeTabs = new ChromeTabs(document.querySelector('.chrome-tabs'), false);
const GoalUtil = require("../../modules/Object@util");
const tippy_js_1 = __importDefault(require("tippy.js"));
window.tippy = tippy_js_1.default;
// 打包Css
require("./tab/chrome-tabs.css");
require("./Preset.css");
require("./index.css");
require("../../node_modules/tippy.js/dist/tippy.css");
require("../../node_modules/tippy.js/themes/light-border.css");
require("../../modules/Vue/vue.global.js");
require("dayjs/locale/zh-cn");
require("./ElevationRemote");
dayjs.extend(require('dayjs/plugin/relativeTime'));
dayjs.locale("zh-cn");
(0, tippy_js_1.default)('.AskHouMain', {
    content: 'Tooltip',
});
let GetWeathersImages = new GetWeathersImages_1.default();
// @ts-expect-error 
const app = Vue.createApp(Vue.defineComponent({
    data() {
        let Main = {
            /**消息中心 */
            info: {
                UsersNameTemporary: "",
                /**有新消息 */
                isMsg: false,
                UsersName: "",
                AskHou: "",
                AskHouTemporary: "",
                UsersHeadImg: "",
                Search: {
                    placeholder: "搜索功能或者添加城市天气...",
                    value: "",
                },
                Note: {
                    NearCard: {
                        title: "所有美好正在奔赴而来...",
                        info: "没有接近提醒时间的事件，建议添加，下班小助手，点餐小助手等..."
                    },
                    AddNoteBtnList: [
                        { name: '添加待办', info: '美好生活小助手', id: 'AddNoteBtn', icon: path.join(Store.store?.apppath || __dirname, "lib", "src", "Main", "Note", "AddMsg.svg") },
                        { name: '弹个提醒', info: '备忘小助手...', id: 'remindBtn', icon: path.join(Store.store?.apppath || __dirname, "lib", "src", "Main", "Note", "remind.svg") },
                        { name: '嘘寒问暖', info: '天气变化快 记得多喝热水...', id: 'SkyChangeBtn', icon: path.join(Store.store?.apppath || __dirname, "lib", "src", "Main", "Note", "Sky.svg") }
                    ],
                    AddNoteEgg: {
                        /** %NN */
                        date: "00",
                    }
                }
            },
            /**天气 */
            Weathers: {
                visual: [{
                        title: "湿度",
                        info: "67",
                        point: "0",
                    }, {
                        title: "风力",
                        info: "微风",
                        point: false,
                    }, {
                        title: "体感",
                        info: "熟了",
                        point: false,
                    },],
                "Temperature": {
                    "status": "1",
                    "count": "1",
                    "info": "OK",
                    "infocode": "10000",
                    "lives": [
                        {
                            "province": "福建",
                            "city": "晋江市",
                            "adcode": "350582",
                            "weather": "阴",
                            "temperature": "23",
                            "winddirection": "南",
                            "windpower": "4",
                            "humidity": "78",
                            "reporttime": "2022-04-22 21:05:46"
                        }
                    ],
                    "forecasts": [
                        {
                            "city": "晋江市",
                            "adcode": "350582",
                            "province": "福建",
                            "reporttime": "2022-04-22 21:05:46",
                            "casts": [
                                {
                                    "date": "2022-04-22",
                                    "week": "5",
                                    "dayweather": "多云",
                                    "nightweather": "阴",
                                    "daytemp": "28",
                                    "nighttemp": "21",
                                    "daywind": "南",
                                    "nightwind": "南",
                                    "daypower": "≤3",
                                    "nightpower": "≤3"
                                },
                                {
                                    "date": "2022-04-23",
                                    "week": "6",
                                    "dayweather": "小雨",
                                    "nightweather": "阴",
                                    "daytemp": "29",
                                    "nighttemp": "21",
                                    "daywind": "西南",
                                    "nightwind": "西南",
                                    "daypower": "≤3",
                                    "nightpower": "≤3"
                                },
                                {
                                    "date": "2022-04-24",
                                    "week": "7",
                                    "dayweather": "小雨",
                                    "nightweather": "阴",
                                    "daytemp": "28",
                                    "nighttemp": "22",
                                    "daywind": "北",
                                    "nightwind": "北",
                                    "daypower": "≤3",
                                    "nightpower": "≤3"
                                },
                                {
                                    "date": "2022-04-25",
                                    "week": "1",
                                    "dayweather": "多云",
                                    "nightweather": "多云",
                                    "daytemp": "29",
                                    "nighttemp": "23",
                                    "daywind": "南",
                                    "nightwind": "南",
                                    "daypower": "4",
                                    "nightpower": "4"
                                }
                            ]
                        }
                    ],
                    "reportDate": 1650634086196,
                    "LaunchTime": 1650634086065,
                },
                DiffUpdateTime: "",
                UpdateTime: "",
                WeatherTypesImages: ""
            },
            NavigationBarList: [
                { name: "首页", show: true, ico: "../../lib/src/Main/NavigationBar/太阳.svg" },
                { name: "待办", show: false, ico: "../../lib/src/Main/NavigationBar/待办事件.svg" },
                { name: "扩展", show: false, ico: "../../lib/src/Main/NavigationBar/插件市场.svg" }
            ],
        };
        return Main;
    },
    methods: {
        async ShowAskHouSource() {
            if (shake.isset("AskHouMouseover", 3500))
                return;
            app.info.UsersName = Store.store?.AskHouFrom || app.info.UsersName;
            shake.on("AskHouMouseover", "remove", function () {
                app.info.UsersName = Store.store?.GreetInfo || Store.store?.UsersName || app.info.UsersName;
            });
        },
        ShowNavigationBarButton(item, index) {
            for (const NavigationBar of this.NavigationBarList) {
                NavigationBar.show = false;
            }
            item.show = true;
        },
        GetWeathersCastsImaeg(item) {
            return GetWeathersImages.weatherNameGet(item.dayweather);
        }
    },
    /**
     * 页面渲染完成
     * @param vm
     * @param props
     */
    setup(vm, props) {
        delete window.exports;
        /**更新当前页面天气 */
        async function UpdateTemperature(data) {
            if (!data)
                data = await Store.Get("Temperature");
            // @ts-expect-error
            app.Weathers.Temperature = Vue.reactive(data);
            // @ts-expect-error
            app.Weathers.DiffUpdateTime = (dayjs(Store?.store?.Temperature.LaunchTime).from(dayjs()) + "").replace(/([ \s\t])+/gi, "").replace(/内/g, "前") + "更新";
            app.Weathers.UpdateTime = `(${dayjs(Store?.store?.Temperature.LaunchTime).format("HH:mm:ss")})`;
            app.Weathers.WeatherTypesImages = GetWeathersImages.weatherNameGet(Store?.store?.Temperature.lives[0].weather || "未知");
            app.info.Note.AddNoteEgg.date = String(dayjs().date()).replace(/^.$/, "0$&");
        }
        setInterval(UpdateTemperature, 1000 * 15);
        /**
         * 更新页面内容
         * @param data
         */
        function UpdateMain(data) {
            app.info.UsersName = data.UsersName || "从设置用户名开始探索神奇口袋吧~";
            if (data.GreetInfo)
                app.info.UsersName = data.GreetInfo || "新任魔法师";
            app.info.AskHou = data.AskHou;
            app.info.UsersHeadImg = data.UsershotImg || path.join(data.apppath, "lib", "src", "MianUsershot@45px.gif");
            UpdateTemperature(data.Temperature);
            // 风力可视化
            app.Weathers.visual[1].info = (GetWeathersImages.GetDirection(data.Temperature.lives[0].windpower)).dpower;
            // 湿度
            app.Weathers.visual[0].info = data.Temperature.lives[0].humidity;
            app.Weathers.visual[2].info = GetWeathersImages.GetTempFeeling(data.Temperature.lives[0].temperature);
        }
        // @ts-expect-error 首次更新天气
        Store.$nextTick().then((data) => UpdateMain(data));
        Store.on("all", function () { UpdateMain(this); });
        ipcRendererRemoteAPI.isDeveloper().then((isDeveloper) => {
            if (!isDeveloper)
                return;
            // @ts-expect-error 如果是开发者模式则显示刷新页面按钮
            document.querySelector("#TopMume_relaunch").style.display = "";
            document.querySelector("#TopMume_relaunch")?.addEventListener("click", () => ipcRendererRemoteAPI.Refresh());
        }).catch(e => { });
        document.querySelector("#TopMume_Top")?.addEventListener("click", function () {
            let $this = this;
            ipcRendererRemoteAPI.SetTop().then(value => {
                if (value)
                    $this.classList.add("Top");
                else
                    $this.classList.remove("Top");
            });
        });
        document.querySelector("#TopMume_Min")?.addEventListener("click", () => ipcRendererRemoteAPI.MinWindow());
        function isMaxToUPMainTopBtn() {
            let $this = document.querySelector("#TopMume_Max")?.querySelector("i") || null;
            ipcRendererRemoteAPI.MaxWindow().then(isMax => {
                $this?.classList.add(!isMax ? "gg-maximize" : "gg-log-out");
                $this?.classList.remove(isMax ? "gg-maximize" : "gg-log-out");
            });
        }
        document.querySelector("#TopMume_Max")?.addEventListener("click", isMaxToUPMainTopBtn);
        document.querySelector("#TopMume_Close")?.addEventListener("click", () => ipcRendererRemoteAPI.hide());
        // 最大化/最小化/窗口调整 都会触发是否被最大化
        ipcRenderer.on("resized", async function OnResizedAutoUpdateBtn() {
            let isMax = await ipcRendererRemoteAPI.isMax();
            let $this = document.querySelector("#TopMume_Max")?.querySelector("i") || null;
            $this?.classList.add(!isMax ? "gg-maximize" : "gg-log-out");
            $this?.classList.remove(isMax ? "gg-maximize" : "gg-log-out");
            $this?.classList.add("Hide");
            setTimeout(function () {
                $this?.classList.remove("Hide");
            }, 300);
        });
        ipcRendererRemoteAPI.$nextTick();
        // 创建标签页
        const { chromeTabs } = window;
        let home = chromeTabs.addTab({ title: "主页", id: "home", favicon: path.join(Store.store?.apppath || __dirname, "lib/src/Newico", "ico16px.png").replace(/[\\]/g, "/"), "close": false });
        home.addEventListener("dblclick", function () {
            ipcRendererRemoteAPI.openDevTools();
        });
    },
    /**
     * 执行数据监听
     */
    created() {
    }
})).mount("#app");
window.app = app;
// 注册一言交互
app.$nextTick().then(() => {
    tippy_js_1.default.setDefaultProps({ theme: 'light-border' });
    let AskHou = document.querySelector("#AskHou");
    if (AskHou) {
        // 作者显示
        // tippy(AskHou, { content: () => Store.store?.AskHouFrom || "", });
        const instance = (0, tippy_js_1.default)(AskHou, {
            content: '已复制',
            placement: 'right-start',
            trigger: 'manual',
            interactive: true,
            arrow: false,
            delay: 200,
            offset: [0, 0],
        });
        AskHou.addEventListener('contextmenu', () => ipcRendererRemoteAPI.UpdateAskHou().then(app.ShowAskHouSource));
        AskHou.addEventListener("click", (event) => {
            event.preventDefault();
            instance.setProps({
                // @ts-expect-error
                getReferenceClientRect: () => ({
                    width: 0,
                    height: 0,
                    top: GoalUtil.Get(event, "clientY"),
                    bottom: GoalUtil.Get(event, "clientY"),
                    left: GoalUtil.Get(event, "clientX"),
                    right: GoalUtil.Get(event, "clientX"),
                }),
            });
            Store.Get("AskHou").then(AskHou => clip.writeText(String(AskHou)));
            instance.show();
            setTimeout(instance.hide, 600);
        });
    }
});
// 与主进程的标签视窗关联
app.$nextTick().then(() => {
    // 便签页与主进程的视窗模块关联
    const { chromeTabs } = window;
    // 监听添加
    ipcRenderer.on("MainChromeTabs.add", function (event, configure) {
        chromeTabs.addTab({
            close: configure.close || true,
            title: configure.title || "新标签",
            id: configure.id || "",
            favicon: configure.favicon || false
        }, {
            background: configure.background || false
        });
    });
    /**监听移除 */
    ipcRenderer.on("MainChromeTabs.remove", function (event, id) {
        chromeTabs.removeTab(String(id));
    });
});
//# sourceMappingURL=index.js.map