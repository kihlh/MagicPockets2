"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.css");
require("../../modules/Vue/vue.global.js");
require("../../modules/element-plus/index.css");
require("../../modules/element-plus/element-plus.js");
require("../../modules/element-plus/icons-vue.js");
/// <reference types="node" />
// import  *as Vue from 'vue'
// import ElementPlus from 'element-plus'
require("element-plus/dist/index.css");
const { clip, shake, ipcRendererRemoteAPI, path, fs, GainPath, ipcRenderer, Store, Vue, ElementPlusIconsVue, ElementPlus } = window;
require("./index.css");
function App_Main_VM_Data() {
    return {
        MainFunctionsList: [],
    };
}
let appMainData = Vue.defineComponent({
    data() {
        return App_Main_VM_Data.apply(this, []);
    },
    methods: {},
    /**
     * 页面渲染完成
     * @param vm
     * @param props
     */
    setup(vm, props) {
    },
    /**
     * 执行数据监听
     */
    created() {
    }
});
const App = Vue.createApp(appMainData);
for (const [key, component] of Object.entries(ElementPlusIconsVue))
    App.component(key, component);
App.use(ElementPlus);
const app = App.mount("#app");
//添加拖拽事件监听器
document.addEventListener("drop", (Events) => {
    //阻止默认行为
    Events.preventDefault();
    //获取文件列表
    const filesList = Events?.dataTransfer?.files;
    if (filesList && filesList.length) {
        for (const iterator of filesList) {
            app.MainFunctionsList.push({
                name: iterator.name.replace(/\.[^.]+$/, ""),
                path: iterator.path
            });
        }
    }
});
//阻止拖拽结束事件默认行为
document.addEventListener("dragover", (Events) => {
    Events.preventDefault();
});
//# sourceMappingURL=index.js.map