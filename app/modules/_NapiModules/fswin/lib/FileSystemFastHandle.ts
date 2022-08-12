import fs from "fs-extra";

/**
 * 文件系统快速操作的封装
 */
export default class FileSystemFast{
    _Path:string
    /**
     * 文件系统快速操作的封装
     * @param Path 路径
     */
    constructor(Path:string){
        this._Path=Path;
    }
    /**
     * 删除此文件
     * @param callback 
     * @returns 
     */
     remove(callback?: ((err: Error) => void) | undefined): void | Promise<void> {
        return fs.remove(this._Path, callback || undefined);
    }

}

