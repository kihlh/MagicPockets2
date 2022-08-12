import "./index.css";
import "../../modules/Vue/vue.global.js";
import "../../modules/element-plus/index.css";
import "../../modules/element-plus/element-plus.js";
import "../../modules/element-plus/icons-vue.js";
/// <reference types="node" />
// import  *as Vue from 'vue'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import _Vue, { RenderFunction } from 'vue';
import _ElementPlus from 'element-plus';
const { clip, shake, ipcRendererRemoteAPI, path, fs, GainPath, ipcRenderer, Store ,Vue,ElementPlusIconsVue,ElementPlus} = window;
import "./index.css";
function App_Main_VM_Data(this: any) {
    return {
        MainFunctionsList: [] as { path: string, name: string }[],

    }
}
let appMainData =Vue.defineComponent({
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
})

const App:any =Vue.createApp(appMainData);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) App.component(key, component)

  App.use(ElementPlus);
  const app: vm =App.mount("#app");

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
            })

        }

    }
})

//阻止拖拽结束事件默认行为
document.addEventListener("dragover", (Events) => {
    Events.preventDefault();
})




type vm = _Vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, _Vue.ComponentOptionsBase<any, vm_data, any, any, any, any, any, any, any, {}>> & vm_data & typeof appMainData;
import { SetGlobalWindowListType } from "../../preload/AllPreload";
// 暴露到控制台可调
declare var window: Window & typeof globalThis & SetGlobalWindowListType & {
    Vue: typeof _Vue,
    app: vm;
    ElementPlus:typeof _ElementPlus
    ElementPlusIconsVue:any
}
type vm_data = ReturnType<typeof App_Main_VM_Data>;

