/*
 * @Author: your name
 * @Date: 2022-04-28 22:10:04
 * @LastEditTime: 2022-07-08 20:38:55
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \resources\app\modules\GainPath\index.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import path from "path";
import fswin from "../../modules/_NapiModules/fswin/index";

/**APP 各种路径获取 */
class GainPath {
    private MatchArgv(Name: string, Replace?: boolean) {
        for (let ArgvItme of process.argv) {
            if (ArgvItme.includes(Name)) {
                if (Replace) return ArgvItme.replace(Name, "")
                return ArgvItme
            }
        }
        return "";
    }

    /**软件根目录 exe目录 */
    get RootPath() {
        return path.join(process.argv0, '..') || process.cwd()
    }

    /**代码内容根目录 */
    get AppPath() {
        let APP_PATH = this.MatchArgv('--app-path=', true);
        if (!APP_PATH) {
            let Cwd = process.cwd();
            let UnPackagedPath = path.join(Cwd, "resources", "app");
            let PackagedPath = path.join(Cwd, "resources", "app.asar");
            if (fswin.existsSync(UnPackagedPath)) return UnPackagedPath;
            if (fswin.existsSync(PackagedPath)) return PackagedPath;
        }
        return APP_PATH;
    }

    /**
     * 自编写模块位置
     */
    get ModulesPath() {
        return path.resolve(this.AppPath, "modules")
    }
    /**
     * 自编写模块位置
     */
    get NapiModulesPath() {
        return path.resolve(this.AppPath, "modules", "_NapiModules")
    }
    /**
     * 软件的扩展插件 比如7zip ImageMagick fonts minimages... 
     */
    get lib() {
        return path.resolve(this.RootPath, "lib")
    }
    /**字体 */
    get fonts() {
        return path.resolve(this.lib, "fonts.asar")
    }
    /**
     * 扩展的二进制软件
     */
    get exe() {
        return path.resolve(this.lib, "exe")
    }
    get UserData() {
        return this.MatchArgv('--user-data-dir=', true);
    }
    /**
     * ImageMagick convert
     */
    get convert() {
        if (!this.#IS_Convert) return undefined;
        return path.join(this.exe, 'ImageMagick', "convert.exe");
    }
    /**
    * ImageMagick 
    */
    get Magick() {
        if (!this.#IS_Magick) return undefined;
        return path.join(this.exe, 'ImageMagick', "magick.exe");
    }
    /**
     * 7-zip
     */
    get z7() {
        if (!this.#IS_7Zzip) return undefined;
        return path.join(this.exe, "7z.exe");
    }
    /**高效文件遍历器 */
    get Everything() {
        if (!this.#IS_Everything) return undefined;
        return path.join(this.exe, "Everything.exe");
    }
    constructor() {
        fswin.exists(this.z7 || "false").then(Exist => { if (!Exist) this.#IS_7Zzip = false });
        fswin.exists(this.convert || "false").then(Exist => { if (!Exist) this.#IS_Convert = false });
        fswin.exists(this.Everything || "false").then(Exist => { if (!Exist) this.#IS_Everything = false });
        fswin.exists(this.Everything || "false").then(Exist => { if (!Exist) this.#IS_Magick = false });

    }
    #IS_Convert = true;
    #IS_Magick = true;
    #IS_Everything = true;
    #IS_7Zzip = true;

}
export default { GainPath }

