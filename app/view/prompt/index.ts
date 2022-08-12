import { ipcRendererAPI } from "../../modules/Core/ipcMainRendererRemoteFunction";
let ipcRendererRemoteAPI = new ipcRendererAPI();
import { ipcRenderer } from "electron";
let data:PromptIpcInputData={
    id:"",
    value:"",
    title:"HM神奇口袋",
    placeholder:"请输入..."
}
ipcRenderer.on("Prompt_Set_ID",function(event,Data:PromptIpcInputData) {data=Data;});


window.addEventListener("load", function () {
    let el = {
        title: document.querySelector("#title") as HTMLAreaElement,
        no: document.querySelector("#no"),
        yes: document.querySelector("#yes"),
        data: document.querySelector("#data") as HTMLTextAreaElement,
    }
    
    if(!el.data||!el.yes!||!el.no||!el.title)throw new Error("Not Data");
    el.data.value=data.value;
    el.title.innerText =data.title;
    el.data.placeholder =data.placeholder;
    function Put(){
        ipcRenderer.invoke(data.id,el.data?.value||"");
        ipcRendererRemoteAPI.Close();
    }

    el.no?.addEventListener("click",Put)
    el.yes?.addEventListener("click",Put)
    window.addEventListener("keydown",function(KeyboardEvent){
        if(KeyboardEvent.key=="Enter"){
           if(!KeyboardEvent.ctrlKey&&!KeyboardEvent.altKey&&!KeyboardEvent.shiftKey)
            Put()
        }
    })
});

// window.onload
ipcRendererRemoteAPI.SetTop();
export type PromptIpcInputData ={
    id:string
    value:string
    title:string
    placeholder:string
}