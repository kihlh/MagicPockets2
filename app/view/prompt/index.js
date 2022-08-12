"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ipcMainRendererRemoteFunction_1 = require("../../modules/Core/ipcMainRendererRemoteFunction");
let ipcRendererRemoteAPI = new ipcMainRendererRemoteFunction_1.ipcRendererAPI();
const electron_1 = require("electron");
let data = {
    id: "",
    value: "",
    title: "HM神奇口袋",
    placeholder: "请输入..."
};
electron_1.ipcRenderer.on("Prompt_Set_ID", function (event, Data) { data = Data; });
window.addEventListener("load", function () {
    let el = {
        title: document.querySelector("#title"),
        no: document.querySelector("#no"),
        yes: document.querySelector("#yes"),
        data: document.querySelector("#data"),
    };
    if (!el.data || !el.yes || !el.no || !el.title)
        throw new Error("Not Data");
    el.data.value = data.value;
    el.title.innerText = data.title;
    el.data.placeholder = data.placeholder;
    function Put() {
        electron_1.ipcRenderer.invoke(data.id, el.data?.value || "");
        ipcRendererRemoteAPI.Close();
    }
    el.no?.addEventListener("click", Put);
    el.yes?.addEventListener("click", Put);
    window.addEventListener("keydown", function (KeyboardEvent) {
        if (KeyboardEvent.key == "Enter") {
            if (!KeyboardEvent.ctrlKey && !KeyboardEvent.altKey && !KeyboardEvent.shiftKey)
                Put();
        }
    });
});
// window.onload
ipcRendererRemoteAPI.SetTop();
//# sourceMappingURL=index.js.map