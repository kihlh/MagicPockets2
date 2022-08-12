"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.GenerateForDrew = void 0;
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var walk = require("@nodelib/fs.walk");
var sharp_1 = require("../../../modules/_NapiModules/sharp");
var clip = require("../../../modules/_NapiModules/clip");
var imagSize = require("image-size");
var util_1 = require("util");
function GenerateForDrew() {
    return __awaiter(this, void 0, void 0, function () {
        // 遍历目录
        function AddImagesTo(MainInput, Input, toFile) {
            return __awaiter(this, void 0, void 0, function () {
                var readInputBuff, InputSizeOf, width, height, SharpAddImagesTo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, fs_extra_1["default"].readFile(MainInput)];
                        case 1:
                            readInputBuff = _a.sent();
                            return [4 /*yield*/, fs_extra_1["default"].remove(toFile)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, imagSize(Input)];
                        case 3:
                            InputSizeOf = _a.sent();
                            if (!InputSizeOf.width || !InputSizeOf.height)
                                return [2 /*return*/];
                            width = InputSizeOf.width, height = InputSizeOf.height;
                            SharpAddImagesTo = sharp_1["default"](readInputBuff)
                                .composite([{ input: Input, top: 0, left: 0 }]);
                            if (toFile.match(/[.]jpe?g$/i))
                                SharpAddImagesTo.jpeg({ quality: 100, chromaSubsampling: '4:4:4' });
                            if (toFile.match(/[.]png$/i))
                                SharpAddImagesTo.png({ palette: true });
                            return [2 /*return*/, SharpAddImagesTo.toFile(toFile)];
                    }
                });
            });
        }
        var PromiseList, CopyList, KeyList, _loop_1, _i, CopyList_1, Path, toFileList, libPath, _a, toFileList_1, FilePath, SuspensionLayer, _b, _c, Path, _d, _e, Path, _f, _g, Path, _h, _j, Path;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    PromiseList = [];
                    CopyList = clip.readFilePaths();
                    KeyList = {
                        "king": {
                            800: new Set(),
                            1200: new Set()
                        },
                        "drew": {
                            800: new Set(),
                            1200: new Set()
                        }
                    };
                    _loop_1 = function (Path) {
                        var _a, name, dir, NewName_1, CopyNewPath;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = path_1["default"].parse(Path), name = _a.name, dir = _a.dir;
                                    if (!KeyList[name.toLowerCase()]) return [3 /*break*/, 3];
                                    NewName_1 = (name === null || name === void 0 ? void 0 : name.toLowerCase()) || "";
                                    CopyNewPath = path_1["default"].join(dir, (name === null || name === void 0 ? void 0 : name.match(/Drew/i)) ? "也皮" : "KING_Baby");
                                    return [4 /*yield*/, fs_extra_1["default"].copy(Path, CopyNewPath)];
                                case 1:
                                    _b.sent();
                                    return [4 /*yield*/, util_1.promisify(walk.walk)(CopyNewPath).then(function (walkPathList) {
                                            var _a, _b;
                                            if (KeyList[NewName_1]) {
                                                for (var _i = 0, walkPathList_1 = walkPathList; _i < walkPathList_1.length; _i++) {
                                                    var walkPathCont = walkPathList_1[_i];
                                                    if ((_a = walkPathCont === null || walkPathCont === void 0 ? void 0 : walkPathCont.dirent) === null || _a === void 0 ? void 0 : _a.isFile()) {
                                                        if ((_b = walkPathCont.name) === null || _b === void 0 ? void 0 : _b.match(/(jpe?g|png)$/)) {
                                                            var height = imagSize(walkPathCont.path).height;
                                                            if (!height || (height != 1200 && height != 800))
                                                                continue;
                                                            var ToSet = KeyList[NewName_1][height];
                                                            if (ToSet)
                                                                ToSet.add(walkPathCont.path);
                                                        }
                                                    }
                                                }
                                            }
                                        })];
                                case 2:
                                    _b.sent();
                                    _b.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, CopyList_1 = CopyList;
                    _k.label = 1;
                case 1:
                    if (!(_i < CopyList_1.length)) return [3 /*break*/, 4];
                    Path = CopyList_1[_i];
                    return [5 /*yield**/, _loop_1(Path)];
                case 2:
                    _k.sent();
                    _k.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    toFileList = ["M:\\_A_共用模板\\lib", "F:\\Root\\APortable\\_work_Data\\M_Back\\_A_共用模板\\lib"];
                    libPath = "M:\\_A_共用模板\\lib";
                    for (_a = 0, toFileList_1 = toFileList; _a < toFileList_1.length; _a++) {
                        FilePath = toFileList_1[_a];
                        if (fs_extra_1["default"].existsSync(FilePath)) {
                            libPath = FilePath;
                            break;
                        }
                    }
                    SuspensionLayer = {
                        "KING_Baby_800": path_1["default"].join(libPath, "KING_Baby_800.png"),
                        "KING_Baby_1200": path_1["default"].join(libPath, "KING_Baby_1200.png"),
                        "也皮平铺T恤带阴影800": path_1["default"].join(libPath, "也皮平铺T恤带阴影800.png"),
                        "也皮平铺T恤带阴影800Logo": path_1["default"].join(libPath, "也皮平铺T恤带阴影800Logo.png"),
                        "也皮平铺T恤带阴影1200": path_1["default"].join(libPath, "也皮平铺T恤带阴影1200.png"),
                        "也皮平铺T恤带阴影1200Logo": path_1["default"].join(libPath, "也皮平铺T恤带阴影1200Logo.png")
                    };
                    for (_b = 0, _c = KeyList.king[800]; _b < _c.length; _b++) {
                        Path = _c[_b];
                        if (!Path.match(/[\\\/]透明[\\//]/))
                            PromiseList.push(AddImagesTo(Path, SuspensionLayer.KING_Baby_800, Path));
                    }
                    for (_d = 0, _e = KeyList.king[1200]; _d < _e.length; _d++) {
                        Path = _e[_d];
                        PromiseList.push(AddImagesTo(Path, SuspensionLayer.KING_Baby_1200, Path));
                    }
                    for (_f = 0, _g = KeyList.drew[1200]; _f < _g.length; _f++) {
                        Path = _g[_f];
                        PromiseList.push(AddImagesTo(Path, SuspensionLayer.也皮平铺T恤带阴影1200Logo, Path));
                    }
                    for (_h = 0, _j = KeyList.drew[800]; _h < _j.length; _h++) {
                        Path = _j[_h];
                        if (!Path.match(/[\\\/]透明[\\//]/))
                            if (!Path.match(/[\/\\]SKU[\/\\]/i))
                                PromiseList.push(AddImagesTo(Path, SuspensionLayer.也皮平铺T恤带阴影800, Path));
                            else
                                PromiseList.push(AddImagesTo(Path, SuspensionLayer.也皮平铺T恤带阴影800Logo, Path));
                    }
                    return [4 /*yield*/, Promise.allSettled(PromiseList)];
                case 5: return [2 /*return*/, _k.sent()];
            }
        });
    });
}
exports.GenerateForDrew = GenerateForDrew;
