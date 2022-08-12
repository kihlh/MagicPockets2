import path from 'path';
import fs from "fs-extra";
import walk= require("@nodelib/fs.walk") 
import sharp from "../../../modules/_NapiModules/sharp"
import clip = require("../../../modules/_NapiModules/clip")
import GainPath from '../../../modules/GainPath';
import probeImagSize from "probe-image-size";
import _imagSize from "image-size"
const imagSize:typeof _imagSize = require( "image-size");
import { promisify } from "util";


export async function GenerateForDrew() {
    let PromiseList=[];
    let CopyList = clip.readFilePaths();
    let KeyList: KeyList = {
        "king": {
            800: new Set(),
            1200: new Set(),
        },
        "drew": {
            800: new Set(),
            1200: new Set(),
        }
    }
    // 复制主目录
    for (let Path of CopyList) {
        let { name, dir } = path.parse(Path);
        if (KeyList[name.toLowerCase()]) {
            let NewName: string = name?.toLowerCase() || "";
            let CopyNewPath = path.join(dir, name?.match(/Drew/i) ? "也皮" : "KING_Baby")
            await fs.copy(Path, CopyNewPath);
            await promisify(walk.walk)(CopyNewPath).then(function (walkPathList) {
                if (KeyList[NewName]) {
                    for (let walkPathCont of walkPathList) {
                        if (walkPathCont?.dirent?.isFile()) {
                            if (walkPathCont.name?.match(/(jpe?g|png)$/)) {
                                let height: number | undefined = imagSize(walkPathCont.path).height;
                                if (!height || (height != 1200 && height != 800)) continue;
                                let ToSet = KeyList[NewName][height];
                                if (ToSet) ToSet.add(walkPathCont.path)
                            }
                        }
                    }
                }
            })
        }
    }
    // 遍历目录

    async function AddImagesTo(MainInput: string, Input: string, toFile: string) {
        let readInputBuff=await fs.readFile(MainInput);
        await fs.remove(toFile);
        // console.log(MainInput,Input,toFile)
        let InputSizeOf=await imagSize(Input);
        if(!InputSizeOf.width||!InputSizeOf.height)return;
        let {width, height} = InputSizeOf;
        let SharpAddImagesTo= sharp(readInputBuff)
            .composite([{ input: Input, top: 0, left: 0 }])
        if(toFile.match(/[.]jpe?g$/i))SharpAddImagesTo.jpeg({quality: 100,chromaSubsampling: '4:4:4'});
        if(toFile.match(/[.]png$/i))SharpAddImagesTo.png({ palette: true });
        return SharpAddImagesTo.toFile(toFile);
    }
    let toFileList =["M:\\_A_共用模板\\lib","F:\\Root\\APortable\\_work_Data\\M_Back\\_A_共用模板\\lib"];
    let libPath = "M:\\_A_共用模板\\lib";
    for (const FilePath of toFileList) {
        if(fs.existsSync(FilePath)){
            libPath=FilePath;
            break;
        }
    }
    // let libPath = "M:\\_A_共用模板\\lib"
    let SuspensionLayer={
        "KING_Baby_800":path.join(libPath,"KING_Baby_800.png"),
        "KING_Baby_1200":path.join(libPath,"KING_Baby_1200.png"),
        "也皮平铺T恤带阴影800":path.join(libPath,"也皮平铺T恤带阴影800.png"),
        "也皮平铺T恤带阴影800Logo":path.join(libPath,"也皮平铺T恤带阴影800Logo.png"),
        "也皮平铺T恤带阴影1200":path.join(libPath,"也皮平铺T恤带阴影1200.png"),
        "也皮平铺T恤带阴影1200Logo":path.join(libPath,"也皮平铺T恤带阴影1200Logo.png"),
    }

    for (let Path of KeyList.king[800]) {
        if(!Path.match(/[\\\/]透明[\\//]/))  PromiseList.push(AddImagesTo(Path,SuspensionLayer.KING_Baby_800,Path)) 
    }
    for (let Path of KeyList.king[1200]) {
          PromiseList.push(AddImagesTo(Path,SuspensionLayer.KING_Baby_1200,Path)) 
    }
    for (let Path of KeyList.drew[1200]) {
          PromiseList.push(AddImagesTo(Path,SuspensionLayer.也皮平铺T恤带阴影1200Logo,Path)) 
    }
    for (let Path of KeyList.drew[800]) {
        if(!Path.match(/[\\\/]透明[\\//]/))  if(!Path.match(/[\/\\]SKU[\/\\]/i)) PromiseList.push(AddImagesTo(Path,SuspensionLayer.也皮平铺T恤带阴影800,Path)) 
         else  PromiseList.push(AddImagesTo(Path,SuspensionLayer.也皮平铺T恤带阴影800Logo,Path))  
    }
 return await Promise.allSettled(PromiseList)
}









interface KeyList {
    "king": {
        800: Set<string>,
        1200: Set<string>,
    },
    "drew": {
        800: Set<string>,
        1200: Set<string>,
    }
    [key: string]: {
        800: Set<string>,
        1200: Set<string>,
    }
}
import { SetGlobalWindowListType } from "../../../preload/AllPreload";
// 暴露到控制台可调
declare var window: Window & typeof globalThis & SetGlobalWindowListType 