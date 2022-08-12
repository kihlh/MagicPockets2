"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateForDrew = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const walk = require("@nodelib/fs.walk");
const sharp_1 = __importDefault(require("../../../modules/_NapiModules/sharp"));
const clip = require("../../../modules/_NapiModules/clip");
const imagSize = require("image-size");
const util_1 = require("util");
async function GenerateForDrew() {
    let PromiseList = [];
    let CopyList = clip.readFilePaths();
    let KeyList = {
        "king": {
            800: new Set(),
            1200: new Set(),
        },
        "drew": {
            800: new Set(),
            1200: new Set(),
        }
    };
    // 复制主目录
    for (let Path of CopyList) {
        let { name, dir } = path_1.default.parse(Path);
        if (KeyList[name.toLowerCase()]) {
            let NewName = name?.toLowerCase() || "";
            let CopyNewPath = path_1.default.join(dir, name?.match(/Drew/i) ? "也皮" : "KING_Baby");
            await fs_extra_1.default.copy(Path, CopyNewPath);
            await (0, util_1.promisify)(walk.walk)(CopyNewPath).then(function (walkPathList) {
                if (KeyList[NewName]) {
                    for (let walkPathCont of walkPathList) {
                        if (walkPathCont?.dirent?.isFile()) {
                            if (walkPathCont.name?.match(/(jpe?g|png)$/)) {
                                let height = imagSize(walkPathCont.path).height;
                                if (!height || (height != 1200 && height != 800))
                                    continue;
                                let ToSet = KeyList[NewName][height];
                                if (ToSet)
                                    ToSet.add(walkPathCont.path);
                            }
                        }
                    }
                }
            });
        }
    }
    // 遍历目录
    async function AddImagesTo(MainInput, Input, toFile) {
        let readInputBuff = await fs_extra_1.default.readFile(MainInput);
        await fs_extra_1.default.remove(toFile);
        // console.log(MainInput,Input,toFile)
        let InputSizeOf = await imagSize(Input);
        if (!InputSizeOf.width || !InputSizeOf.height)
            return;
        let { width, height } = InputSizeOf;
        let SharpAddImagesTo = (0, sharp_1.default)(readInputBuff)
            .composite([{ input: Input, top: 0, left: 0 }]);
        if (toFile.match(/[.]jpe?g$/i))
            SharpAddImagesTo.jpeg({ quality: 100, chromaSubsampling: '4:4:4' });
        if (toFile.match(/[.]png$/i))
            SharpAddImagesTo.png({ palette: true });
        return SharpAddImagesTo.toFile(toFile);
    }
    let toFileList = ["M:\\_A_共用模板\\lib", "F:\\Root\\APortable\\_work_Data\\M_Back\\_A_共用模板\\lib"];
    let libPath = "M:\\_A_共用模板\\lib";
    for (const FilePath of toFileList) {
        if (fs_extra_1.default.existsSync(FilePath)) {
            libPath = FilePath;
            break;
        }
    }
    // let libPath = "M:\\_A_共用模板\\lib"
    let SuspensionLayer = {
        "KING_Baby_800": path_1.default.join(libPath, "KING_Baby_800.png"),
        "KING_Baby_1200": path_1.default.join(libPath, "KING_Baby_1200.png"),
        "也皮平铺T恤带阴影800": path_1.default.join(libPath, "也皮平铺T恤带阴影800.png"),
        "也皮平铺T恤带阴影800Logo": path_1.default.join(libPath, "也皮平铺T恤带阴影800Logo.png"),
        "也皮平铺T恤带阴影1200": path_1.default.join(libPath, "也皮平铺T恤带阴影1200.png"),
        "也皮平铺T恤带阴影1200Logo": path_1.default.join(libPath, "也皮平铺T恤带阴影1200Logo.png"),
    };
    for (let Path of KeyList.king[800]) {
        if (!Path.match(/[\\\/]透明[\\//]/))
            PromiseList.push(AddImagesTo(Path, SuspensionLayer.KING_Baby_800, Path));
    }
    for (let Path of KeyList.king[1200]) {
        PromiseList.push(AddImagesTo(Path, SuspensionLayer.KING_Baby_1200, Path));
    }
    for (let Path of KeyList.drew[1200]) {
        PromiseList.push(AddImagesTo(Path, SuspensionLayer.也皮平铺T恤带阴影1200Logo, Path));
    }
    for (let Path of KeyList.drew[800]) {
        if (!Path.match(/[\\\/]透明[\\//]/))
            if (!Path.match(/[\/\\]SKU[\/\\]/i))
                PromiseList.push(AddImagesTo(Path, SuspensionLayer.也皮平铺T恤带阴影800, Path));
            else
                PromiseList.push(AddImagesTo(Path, SuspensionLayer.也皮平铺T恤带阴影800Logo, Path));
    }
    return await Promise.allSettled(PromiseList);
}
exports.GenerateForDrew = GenerateForDrew;
//# sourceMappingURL=GenerateForDrew.js.map