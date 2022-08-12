import "../../modules/monaco-editor/min/vs/loader.js"
import * as monaco from "../../modules/monaco-editor";
import { ipcRenderer } from "electron";
import fs from "fs-extra";
import shake from "../../modules/shake";
import path from 'path';

const EditorEMent = document.createElement("div");
let Editor: any;
EditorEMent.id = "container";
EditorEMent.style.width = "100vw";
EditorEMent.style.height = "100vh";
let EditorText: string = "";
let CodeEditor_OidCode :string ="";
let EditorData: { value: string, language: string, id: string, path: string } | undefined;
document.querySelector("body")?.appendChild(EditorEMent);
ipcRenderer.on("EditorCode", function (Evens, Data: { value: string, language: string, id: string, path: string }) {
    EditorData = Data;
    if (!Editor) {
        EditorText = Data.value || "";
        let _Editor = monaco.editor.create(EditorEMent, {
            value: Data?.value || "",
            language: Data.language || 'javascript'
        });
        Editor = _Editor;
        localStorage.CodeEditor_OidCode=Data?.value || "";
        CodeEditor_OidCode=Data?.value || "";
    }
    Editor.setValue(Data?.value||"");

            if (Data.path) {
        fs.readFile(Data.path, "utf8", function (err, data) {
            if (!err) {
                localStorage.CodeEditor_OidCode=data||"";
                CodeEditor_OidCode=data||"";
                Editor.setValue(data||"");
            }
        });
        
    }

})

async function Put() {
    if (!EditorData) return;
    await ipcRenderer.invoke(EditorData.id, Editor.getValue());
    if (!EditorData.value && EditorData.path&&CodeEditor_OidCode!==EditorText) {
        try {
            fs.writeFileSync(EditorData.path, Editor.getValue(), "utf8");
        } catch (error) {
            fs.writeFile(EditorData.path, Editor.getValue(), "utf8", () => { });
        }
    }
}

window.onbeforeunload = function (event) {
    ((async () => {
        try {
           await Put();
        } catch (error) {

        }
        window.onbeforeunload = null;
        window.close();
    })());
    return false;
}

export type EditorData= typeof EditorData;


document.querySelector("body")?.addEventListener("keydown",async function(KeyboardEvent){
    if(KeyboardEvent.ctrlKey&&KeyboardEvent.key=="Enter"){
        if(!KeyboardEvent.altKey&&!KeyboardEvent.shiftKey)
        await Put()
        window.onbeforeunload = null;
        window.close();
     }
})