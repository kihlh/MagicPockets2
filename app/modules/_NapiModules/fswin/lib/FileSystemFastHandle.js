"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * 文件系统快速操作的封装
 */
class FileSystemFast {
    _Path;
    /**
     * 文件系统快速操作的封装
     * @param Path 路径
     */
    constructor(Path) {
        this._Path = Path;
    }
    /**
     * 删除此文件
     * @param callback
     * @returns
     */
    remove(callback) {
        return fs_extra_1.default.remove(this._Path, callback || undefined);
    }
}
exports.default = FileSystemFast;
//# sourceMappingURL=FileSystemFastHandle.js.map