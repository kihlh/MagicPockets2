import path from "path";
import FileSystemFast from "./FileSystemFastHandle";

class QuickApi {
    private _Path: string = ""
    private _FsFast?: FileSystemFast;
    get path(){
        return this._Path;
    }
    get name(){
        return path.parse(this._Path).name;
    }
    get base(){
        return path.basename(this._Path);
    }
    get dir (){
        return path.parse(this._Path).dir;
    }
    get ext (){
        return path.extname(this._Path);
    }
    get resolve(){
        return path.resolve(this._Path);
    }
    diff(Path:string){
        return path.resolve(Path)==path.resolve(this._Path);
    }
    fs(){
        this._FsFast= this._FsFast||new FileSystemFast(this._Path);
        return this._FsFast;
    }
    constructor(Path:string){
        this ._Path= Path;
    }
}
