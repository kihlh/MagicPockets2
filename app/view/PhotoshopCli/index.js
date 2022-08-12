"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.css");
require("../../modules/Vue/vue.global.js");
require("../../modules/tdesign/tdesign.css");
require("../../modules/tdesign/tdesign.js");
const robotjs_1 = __importDefault(require("../../modules/_NapiModules/robotjs"));
const open_1 = __importDefault(require("open"));
// import { Sleep } from "../../modules/_NapiModules/win32api";
const index_1 = __importDefault(require("../../modules/Magick-Cli/index"));
const HMC_1 = __importDefault(require("../../modules/_NapiModules/HMC"));
// window.Magick = Magick;
const { clip, shake, ipcRendererRemoteAPI, path, fs, GainPath, ipcRenderer, Store } = window;
require("../../lib/css.gg/css/bolt.css");
require("../../lib/css.gg/css/erase.css");
require("../../lib/css.gg/css/ericsson.css");
require("../../lib/css.gg/css/add.css");
require("../../lib/css.gg/css/backspace.css");
const GenerateForDrew_1 = require("./plugins/GenerateForDrew");
let Photoshop_Path_List = ["D:\\application\\Photoshop2020\\Adobe Photoshop 2020\\Photoshop.exe", "D:\\Program Files (x86)\\Adobe\\Adobe_Photoshop_2020_v21.2.12.215_2021-09\\Photoshop.exe",];
Photoshop_Path_List.push(...HMC_1.default.getProcessNameFilePath("Photoshop.exe"));
let PS_Path = Photoshop_Path_List[0];
for (const iterator of Photoshop_Path_List) {
    let path = Photoshop_Path_List.pop() || "";
    if (fs.existsSync(path)) {
        PS_Path = path;
        break;
    }
}
require("./index.css");
function App_Main_VM_Data() {
    return {
        Cli_ToolShow: true,
        AddPlugins: false,
        Top_prompt: false,
        TopBtn: [
            {
                name: "安装插槽",
                color: "#32A7E2",
                icon: "gg-bolt",
                click: () => {
                    for (const iterator of this.MainFunctions) {
                        if (iterator.name == "插槽") {
                            let PathList = [];
                            iterator.FunctionList?.forEach((data) => {
                                PathList.push(data.path);
                            });
                            NotificationPhotoshop(PathList);
                        }
                    }
                }
            }, {
                name: "执行方法",
                color: "#FF8700",
                icon: "gg-ericsson",
                click: () => {
                    if (this.SelectMenuFunctions && this.SelectMenuFunctions.path) {
                        let Path = this.SelectMenuFunctions.path;
                        NotificationPhotoshop(Path);
                    }
                    else {
                        alert("重新选择该方法");
                    }
                }
            }, {
                name: "擦除插槽",
                color: "#B548C6",
                icon: "gg-erase",
                click() {
                    /**
                     .then(async function () {
                        const { keyToggle, mouseClick, moveMouse } = robotjs;
                        Sleep(1000, true);
                        keyToggle("control", "down")
                        Sleep(20, true);
                        keyToggle("shift", "down")
                        Sleep(30, true);
                        keyToggle("alt", "down")
                        Sleep(30, true);
                        keyToggle("f3", "down")
                        Sleep(30, true);
                        keyToggle("f3", "up")
                        Sleep(50, true);
                        keyToggle("shift", "up")
                        Sleep(30, true);
                        keyToggle("alt", "up")
                        Sleep(10, true);
                        keyToggle("control", "up")
                        Sleep(150, true);
                        moveMouse(852, 388);
                        Sleep(80, true);
                        mouseClick();
                        keyToggle("enter", "up")
                        Sleep(50, true);
                        keyToggle("enter", "up")

                    });
                     */
                }
            }, {
                name: "删除方法",
                color: "#22B07D",
                icon: "gg-backspace",
                click: () => {
                    if (this.MainFunctionsList.length == 1) {
                        this.MainFunctionsList.length = 0;
                        return;
                    }
                    if (app.SelectMenuFunctions && app.MainFunctionsList) {
                        let index = app.MainFunctionsList.indexOf(app.SelectMenuFunctions);
                        let DataList = new Set(app.MainFunctionsList);
                        DataList.delete(app.SelectMenuFunctions);
                        app.MainFunctionsList.length = 0;
                        for (const data of DataList) {
                            if (data.name != app.SelectMenuFunctions?.name && data.path != app.SelectMenuFunctions?.path) {
                                app.MainFunctionsList.push(data);
                            }
                        }
                    }
                    else {
                        alert("重新选择该方法");
                    }
                }
            },
        ],
        MainFunctionsList: [],
        MainFunctions: localStorage.getItem("MainFunctions") ? JSON.parse(String(localStorage.getItem("MainFunctions"))) : [
            {
                name: "T恤",
                icon: "",
                FunctionList: []
            },
            {
                name: "背心",
                icon: "",
                FunctionList: []
            },
            {
                name: "卫衣",
                icon: "",
                FunctionList: []
            },
            {
                name: "插槽",
                icon: "",
                FunctionList: []
            },
            {
                name: "便捷",
                icon: "",
                FunctionList: []
            },
        ],
        SelectMenuFunctions: null,
        visible: false,
        Top_prompt_model: "",
    };
}
let appMainData = window.Vue.defineComponent({
    data() {
        return App_Main_VM_Data.apply(this, []);
    },
    methods: {
        openCodeEditor(Itme) {
            ipcRendererRemoteAPI.CodeEditorForPath(Itme.path);
        },
        /**
         * 选择了方法
         * @param index
         * @returns
         */
        MainFunctionsChange(index) {
            // if(!this.MainFunctionsList?.length)return;
            // this.SelectMenuFunctions= this.MainFunctionsList[index]
        },
        /**
         * 底部按钮
         * @param Itme
         */
        ClickMainFunctions(Itme) {
            if (Itme.name == "便捷") {
                if (shake.isset(`__SelectMenuClick__`, 300)) {
                    this.Top_prompt_modelClick();
                }
            }
            this.SelectMenuFunctions = null;
            for (const iterator of app.MainFunctions) {
                iterator.Select = false;
            }
            // @ts-expect-error 
            app.MainFunctionsList = Itme.FunctionList;
            Itme.Select = true;
        },
        contextmenuMenuFunctionsValue(Itme) {
            if (Itme?.path?.match(/\.js|\.jsx|\.txt/i)) {
                ipcRendererRemoteAPI.CodeEditorForPath(Itme.path);
            }
        },
        /**
         *
         * @param Itme 点击了选择了方法
         */
        SelectMenuFunctionsValue(Itme) {
            let NotJSXNameList = ["行动文件到自动化", "当前Aoto转AotoX", "导出Aoto中的内容为AotoX", "Aoto浏览器", "AotoEvalDemo", "导出小宝贝", "选择黑色印花", "选择白色印花", "镜像", "清空插槽"];
            if (shake.isset(`__SelectMenuFunctionsValue___${Itme.name}`, 300)) {
                // if (NotJSXNameList.join(',').indexOf(Itme.name)!=-1) {
                //     NotificationPhotoshop(Itme.path, true);
                // } else 
                NotificationPhotoshop(Itme.path);
            }
            app.SelectMenuFunctions = Itme;
            for (const iterator of app.MainFunctionsList) {
                // @ts-expect-error 
                iterator.Select = false;
            }
            Itme.Select = true;
        },
        /**
         * 执行输入框/执行脚本/重命名
         */
        async Top_prompt_modelClick() {
            let oid_Photoshop_JSX = (await fs.readFile(path.join(GainPath.UserData, "Photoshop.jsx"), "utf-8").catch(() => { })) || "";
            let data = await ipcRendererRemoteAPI.CodeEditorForCode(oid_Photoshop_JSX);
            if (confirm("是否运行？"))
                if (data && !this.SelectMenuFunctions) {
                    fs.writeFile(path.join(GainPath.UserData, "Photoshop.jsx"), data).then(data => {
                        NotificationPhotoshop(path.join(GainPath.UserData, "Photoshop.jsx"));
                    }).catch(() => { });
                }
        }
    },
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
        function Sava() {
            localStorage.setItem("MainFunctions", JSON.stringify(app.MainFunctions));
        }
        this.$watch("MainFunctions.0.FunctionList", Sava, { deep: true });
        this.$watch("MainFunctions.1.FunctionList", Sava, { deep: true });
        this.$watch("MainFunctions.2.FunctionList", Sava, { deep: true });
        this.$watch("MainFunctions.3.FunctionList", Sava, { deep: true });
        this.$watch("MainFunctions.4.FunctionList", Sava, { deep: true });
        this.$watch("Top_prompt", Sava, { deep: true });
    }
});
// @ts-expect-error
const app = window.Vue.createApp(appMainData).use(window.TDesign).mount("#app");
app.$nextTick().then(() => {
    app.MainFunctionsList = app.MainFunctions[0].FunctionList;
});
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
function SelectPrint(Path) {
    return new Promise(async function (resolve, reject) {
        let IsBlack = Path.includes("选择黑色");
        let IsWhite = Path.includes("选择白色");
        let Jsx = (await fs.readFile(Path, "utf-8").catch(err => reject(err))) || "";
        let matchOidName = Jsx.match(/SelectLyr\("(.+?)"\)/gi);
        let oidName = matchOidName ? matchOidName[0].replace(/SelectLyr\(\"(.+)\"\)/, '$1') : IsBlack ? "lee黑色1" : IsWhite ? "lee白色1" : "";
        let GetNewName = await ipcRendererRemoteAPI.Prompt(IsBlack ? "选择黑色印花" : "选择白色印花", oidName, IsBlack ? "选择黑色印花" : "选择白色印花").catch(err => reject(err)) || "";
        ;
        await fs.writeFile(Path, Jsx.replace(/SelectLyr\("(.+?)"\)/gi, "SelectLyr(\"" + GetNewName + "\")")).catch(err => reject(err));
        resolve("OK");
    });
}
async function NotificationPhotoshop(Path, Notclear) {
    let pathSelectBlackPrint = "F:\\Compiler\\PS-lib\\lib\\选择黑色印花.jsx";
    let pathSelectWhitePrint = "F:\\Compiler\\PS-lib\\lib\\选择白色印花.jsx";
    let isJSX = false;
    let PathList = [];
    for (const Paths of (Path && Array.isArray(Path) ? Path : [Path]) || [""]) {
        if (Paths.includes("挪移") || Paths.match(/L6D0XYUC7OK3G|导出所有支持格式/)) {
            await SelectPrint(pathSelectBlackPrint);
            await SelectPrint(pathSelectWhitePrint);
        }
        if (Paths.includes("选择黑色") || Paths.includes("选择白色")) {
            if (Paths.includes("选择黑色"))
                await SelectPrint(pathSelectBlackPrint);
            if (Paths.includes("选择白色"))
                await SelectPrint(pathSelectWhitePrint);
        }
        if (Paths.match(/\.jsx/i)) {
            isJSX = true;
        }
        PathList.push(Paths);
    }
    // if (isJSX) {
    //     for (const iterator of app.MainFunctions) {
    //         if (iterator.name == "插槽") {
    //             let PathList: string[] = [];
    //             iterator.FunctionList?.forEach((data: { path: string; }) => {
    //                 PathList.push(data.path);
    //             });
    //             NotificationPhotoshop(PathList);
    //         }
    //     }
    // }
    if (PathList)
        return open_1.default.openApp(PS_Path, {
            "arguments": PathList
        });
}
//阻止拖拽结束事件默认行为
document.addEventListener("keydown", (Events) => {
    // console.log(Events);
    if (Events.code == 'F2') {
        if (app.SelectMenuFunctions) {
            app.Top_prompt = true;
            app.Top_prompt_model = app.SelectMenuFunctions.name;
        }
    }
    if (Events.code == 'KeyV') {
        let readPathList = clip.readFilePaths();
        if (readPathList.length) {
            for (const iterator of readPathList) {
                app.MainFunctionsList.push({
                    name: path.parse(iterator).name.replace(/\.[^.]+$/, ""),
                    path: iterator
                });
            }
        }
    }
    function moveElement(arr, n) {
        if (Math.abs(n) > arr.length)
            n = n % arr.length;
        return arr.slice(-n).concat(arr.slice(0, -n));
    }
    if (Events.ctrlKey && Events.key == 'ArrowUp') {
        if (app.SelectMenuFunctions && app.MainFunctionsList) {
            let index = app.MainFunctionsList.indexOf(app.SelectMenuFunctions);
            if (index != -1 && index != 0) {
                app.MainFunctionsList.splice(index, 1);
                app.MainFunctionsList.splice(index - 1, 0, app.SelectMenuFunctions);
                let LIs = app.MainFunctionsList;
                app.MainFunctionsList = LIs;
            }
        }
    }
    if (Events.ctrlKey && Events.key == 'ArrowDown') {
        if (app.SelectMenuFunctions && app.MainFunctionsList) {
            let index = app.MainFunctionsList.indexOf(app.SelectMenuFunctions);
            if (index != -1 && index != 0) {
                app.MainFunctionsList.splice(index, 1);
                app.MainFunctionsList.splice(index + 1, 0, app.SelectMenuFunctions);
                let LIs = app.MainFunctionsList;
                app.MainFunctionsList = LIs;
            }
        }
    }
});
function clipPathMirrorToSave() {
    let ForImagesFileList = [];
    let FileList = clip.readFilePaths();
    for (let Path of FileList)
        ForImagesFileList.push({ path: path.resolve(Path), dir: path.dirname(Path) });
    let ToJSON = JSON.stringify(ForImagesFileList);
    let photoshopCode = `#target photoshop\n(function(){var u=${ToJSON};function s(T,p){function a(){}cTID=function(t){return app.charIDToTypeID(t)},sTID=function(t){return app.stringIDToTypeID(t)};function d(t,r){if(!(t!=null&&!t)){var n=r?DialogModes.ALL:DialogModes.NO,e=new ActionDescriptor;e.putBoolean(sTID("dontRecord"),!1),e.putBoolean(sTID("forceNotify"),!0),e.putPath(cTID("null"),new File(T)),e.putInteger(cTID("DocI"),708),executeAction(sTID("open"),e,n)}}function l(t,r){if(!(t!=null&&!t)){var n=r?DialogModes.ALL:DialogModes.NO;executeAction(sTID("copyToLayer"),void 0,n)}}function f(t,r){if(!(t!=null&&!t)){var n=r?DialogModes.ALL:DialogModes.NO,e=new ActionDescriptor,c=new ActionReference;c.putEnumerated(cTID("Lyr "),cTID("Ordn"),cTID("Trgt")),e.putReference(cTID("null"),c),e.putEnumerated(cTID("FTcs"),cTID("QCSt"),sTID("QCSAverage"));var o=new ActionDescriptor;o.putUnitDouble(cTID("Hrzn"),cTID("#Pxl"),0),o.putUnitDouble(cTID("Vrtc"),cTID("#Pxl"),0),e.putObject(cTID("Ofst"),cTID("Ofst"),o),e.putUnitDouble(cTID("Wdth"),cTID("#Prc"),-100),e.putBoolean(cTID("Lnkd"),!0),e.putEnumerated(cTID("Intr"),cTID("Intp"),cTID("Bcbc")),executeAction(sTID("transform"),e,n)}}function g(t,r){if(!(t!=null&&!t)){var n=r?DialogModes.ALL:DialogModes.NO,e=new ActionDescriptor;e.putInteger(cTID("Idnt"),4),e.putPath(cTID("null"),new File("D:\\\\ImagLib\\\\kiic.library\\\\images\\\\L2H1ASXM1EDD6.info\\\\\\u5FAE\\u4FE1\\u56FE\\u7247_20220427114517.png")),e.putEnumerated(cTID("FTcs"),cTID("QCSt"),sTID("QCSAverage"));var c=new ActionDescriptor;c.putUnitDouble(cTID("Hrzn"),cTID("#Pxl"),64.3236994219652),c.putUnitDouble(cTID("Vrtc"),cTID("#Pxl"),95.5518945634267),e.putObject(cTID("Ofst"),cTID("Ofst"),c),e.putUnitDouble(cTID("Wdth"),cTID("#Prc"),18.111753371869),e.putUnitDouble(cTID("Hght"),cTID("#Prc"),18.111753371869),executeAction(sTID("placeEvent"),e,n)}}function v(t,r){if(!(t!=null&&!t)){var n=r?DialogModes.ALL:DialogModes.NO,e=new ActionDescriptor,c=new ActionReference;c.putEnumerated(cTID("Lyr "),cTID("Ordn"),cTID("Trgt")),e.putReference(cTID("null"),c),executeAction(sTID("rasterizeLayer"),e,n)}}function A(t,r){if(!(t!=null&&!t)){var n=r?DialogModes.ALL:DialogModes.NO,e=new ActionDescriptor,c=new ActionList,o=new ActionReference;o.putEnumerated(cTID("Lyr "),cTID("Ordn"),cTID("Trgt")),c.putReference(o),e.putList(cTID("null"),c),executeAction(sTID("hide"),e,n)}}function L(t,r){if(!(t!=null&&!t)){var n=r?DialogModes.ALL:DialogModes.NO,e=new ActionDescriptor,c=new ActionReference;c.putClass(cTID("Lyr ")),e.putReference(cTID("null"),c);var o=new ActionDescriptor;o.putString(cTID("Nm  "),"\\u8986\\u76D6\\u5C42"),e.putObject(cTID("Usng"),cTID("Lyr "),o),e.putInteger(cTID("LyrI"),10),executeAction(sTID("make"),e,n)}}function M(t,r){if(!(t!=null&&!t)){var n=r?DialogModes.ALL:DialogModes.NO,e=new ActionDescriptor,c=new ActionDescriptor;c.putBoolean(sTID("maximizeCompatibility"),!0),e.putObject(cTID("As  "),cTID("Pht3"),c),e.putPath(cTID("In  "),new File(p)),e.putInteger(cTID("DocI"),659),executeAction(sTID("save"),e,n)}}d(),l(),f(),g(),v(),A(),L(),M(),a.main=function(){},a.main();var w=charIDToTypeID("Cls "),D=new ActionDescriptor,O=charIDToTypeID("DocI");D.putInteger(O,719);var y=stringIDToTypeID("forceNotify");D.putBoolean(y,!0),executeAction(w,D,DialogModes.NO)}for(var i=0;i<u.length;i++){var I=u[i];s(I.path,I.dir)}})();\n`;
    ipcRendererRemoteAPI.systemTempPathWrite(photoshopCode, "jsx", 1000 * 60).then(photoshopCodePath => {
        fs.writeFileSync(photoshopCodePath, photoshopCode);
        NotificationPhotoshop(photoshopCodePath);
        setTimeout(() => fs.remove(photoshopCodePath).catch(err => { }), 1000 * 60);
    });
}
async function Clip_PSD_To(SetExt, ProcessLimit) {
    const { cmd } = window;
    if (!ProcessLimit)
        ProcessLimit = Infinity;
    let HandleError = () => { };
    /**正在处理中
     * ?处理完成则移除
    */
    let ProcessingList = new Set();
    let MatchFormats = /[.](psd|psb|jpe?g|png|webp|gif|svg|ai)$/;
    let GetClipDataType = clip.availableFormats();
    let GotuSpawnList = [];
    // 剪贴板没有内容
    if (!GetClipDataType.length)
        throw new Error("Not Clip Data");
    // 复制的是文件列表
    if (GetClipDataType.includes("text/uri-list")) {
        if (!GetClipDataType.includes('image/png')) {
            let ClipFilePaths = clip.readFilePaths();
            let HandleListComplete = new Set();
            //遍历所有路径 
            for (const Paths of ClipFilePaths) {
                let Stats = (await fs.stat(Paths).catch(HandleError)) || undefined;
                if (!Stats)
                    continue;
                // 处理文件夹
                if (Stats.isDirectory()) {
                    window.walk.walkStream(Paths).on("data", function (chunk) {
                        if (chunk.name.match(MatchFormats) && chunk.dirent.isFile() && GainPath.convert) {
                            let Path = path.resolve(chunk.path);
                            if (!HandleListComplete.has(Path)) {
                                ProcessingList.add(Path);
                                let ToFormatsPath = Path.replace(MatchFormats, (".".concat(SetExt || ".png").replace(/[.]+([^.]+)/, ".$1")));
                                let IputPath = Path.match(/[.](psd|psb|gif|pdf|gif)$/) ? Path.concat('[0]') : Path;
                                GotuSpawnList.push(cmd.spawn(GainPath.convert, [IputPath, ToFormatsPath]).finally(() => ProcessingList.delete(Path)));
                                HandleListComplete.add(Path);
                            }
                        }
                    });
                }
                // 处理文件
                else if (Stats.isFile() && GainPath.convert) {
                    let Path = path.resolve(Paths);
                    if (!HandleListComplete.has(Path)) {
                        ProcessingList.add(Path);
                        let ToFormatsPath = Path.replace(MatchFormats, (".".concat(SetExt || ".png").replace(/[.]+([^.]+)/, ".$1")));
                        let IputPath = Path.match(/[.](psd|psb|gif|pdf|gif)$/) ? Path.concat('[0]') : Path;
                        GotuSpawnList.push(cmd.spawn(GainPath.convert, [IputPath, ToFormatsPath]).finally(() => ProcessingList.delete(Path)));
                        HandleListComplete.add(Path);
                    }
                }
                //  进程限制
                if (ProcessingList.size > ProcessLimit) {
                    await Promise.allSettled(GotuSpawnList);
                }
            }
        }
    }
    return await Promise.allSettled(GotuSpawnList);
}
window.Clip_PSD_To = Clip_PSD_To;
window.NotificationPhotoshop = NotificationPhotoshop;
window.Magick = new index_1.default(window.GainPath.convert || "false");
window.GenerateForDrew = GenerateForDrew_1.GenerateForDrew;
window.app = app;
window.clipPathMirrorToSave = clipPathMirrorToSave;
window.robotjs = robotjs_1.default;
function Clip_To_Link() {
    let FileList = clip.readFilePaths();
    let photoshopCode = `function OpenLinkSmartObjects(FilePath){if("object"==typeof FilePath)for(var index=0;index<FilePath.length;index++)OpenLinkSmartObjects(FilePath[index]);!function step2(enabled,withDialog){var cTID=function(s){return app.charIDToTypeID(s)},sTID=function(s){return app.stringIDToTypeID(s)};if(null==enabled||enabled){var dialogMode=withDialog?DialogModes.ALL:DialogModes.NO,desc1=new ActionDescriptor;desc1.putInteger(cTID("Idnt"),8),desc1.putPath(cTID("null"),new File(FilePath)),desc1.putBoolean(cTID("Lnkd"),!0),desc1.putEnumerated(cTID("FTcs"),cTID("QCSt"),sTID("QCSAverage"));var desc2=new ActionDescriptor;desc2.putUnitDouble(cTID("Hrzn"),cTID("#Pxl"),0),desc2.putUnitDouble(cTID("Vrtc"),cTID("#Pxl"),0),desc1.putObject(cTID("Ofst"),cTID("Ofst"),desc2);try{executeAction(sTID("placeEvent"),desc1,dialogMode)}catch(err){}}}()}OpenLinkSmartObjects(${JSON.stringify(FileList)});`;
    ipcRendererRemoteAPI.systemTempPathWrite(photoshopCode, "jsx", 1000 * 60).then(photoshopCodePath => {
        fs.writeFileSync(photoshopCodePath, photoshopCode);
        NotificationPhotoshop(photoshopCodePath);
        setTimeout(() => fs.remove(photoshopCodePath).catch(err => { }), 1000 * 60);
    });
}
window.Clip_To_Link = Clip_To_Link;
//# sourceMappingURL=index.js.map