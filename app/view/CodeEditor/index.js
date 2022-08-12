"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("../../modules/monaco-editor/min/vs/loader.js");
const monaco = __importStar(require("../../modules/monaco-editor"));
const electron_1 = require("electron");
const fs_extra_1 = __importDefault(require("fs-extra"));
const EditorEMent = document.createElement("div");
let Editor;
EditorEMent.id = "container";
EditorEMent.style.width = "100vw";
EditorEMent.style.height = "100vh";
let EditorText = "";
let CodeEditor_OidCode = "";
let EditorData;
document.querySelector("body")?.appendChild(EditorEMent);
electron_1.ipcRenderer.on("EditorCode", function (Evens, Data) {
    EditorData = Data;
    if (!Editor) {
        EditorText = Data.value || "";
        let _Editor = monaco.editor.create(EditorEMent, {
            value: Data?.value || "",
            language: Data.language || 'javascript'
        });
        Editor = _Editor;
        localStorage.CodeEditor_OidCode = Data?.value || "";
        CodeEditor_OidCode = Data?.value || "";
    }
    Editor.setValue(Data?.value || "");
    if (Data.path) {
        fs_extra_1.default.readFile(Data.path, "utf8", function (err, data) {
            if (!err) {
                localStorage.CodeEditor_OidCode = data || "";
                CodeEditor_OidCode = data || "";
                Editor.setValue(data || "");
            }
        });
    }
});
async function Put() {
    if (!EditorData)
        return;
    await electron_1.ipcRenderer.invoke(EditorData.id, Editor.getValue());
    if (!EditorData.value && EditorData.path && CodeEditor_OidCode !== EditorText) {
        try {
            fs_extra_1.default.writeFileSync(EditorData.path, Editor.getValue(), "utf8");
        }
        catch (error) {
            fs_extra_1.default.writeFile(EditorData.path, Editor.getValue(), "utf8", () => { });
        }
    }
}
window.onbeforeunload = function (event) {
    ((async () => {
        try {
            await Put();
        }
        catch (error) {
        }
        window.onbeforeunload = null;
        window.close();
    })());
    return false;
};
document.querySelector("body")?.addEventListener("keydown", async function (KeyboardEvent) {
    if (KeyboardEvent.ctrlKey && KeyboardEvent.key == "Enter") {
        if (!KeyboardEvent.altKey && !KeyboardEvent.shiftKey)
            await Put();
        window.onbeforeunload = null;
        window.close();
    }
});
//# sourceMappingURL=index.js.map