
const {promisify} = require('util');
const {
  availableFormats,
  writeText,
  writeRTF,
  writeImage,
  writeHTML,
  writeFindText,
  writeBuffer,
  writeBookmark,
  write,
  readText,
  readRTF,
  readImage,
  readHTML,
  readFindText,
  readBuffer,
  readBookmark,
  read,
  has,
  // clear,
  
}=require('electron').clipboard;
const path =require("path");
const {
  readFilePaths,
  writeFilePaths,
  clear,
  saveImageAsJpegSync,
  saveImageAsJpegAsync,
  saveImageAsPngSync,
  saveImageAsPngAsync,
  putImageSync,
  putImageAsync,
  hasImage} = require(path.join(process.resourcesPath,"bin","clip.node"));

module.exports = {
  readFilePaths(Index){
    let FileList= readFilePaths()||[];
    if(typeof Index =="undefined")return FileList;
    if(FileList.length<Index)return null;
    return FileList[Index]
  },
  writeFilePaths,
  clear,
  saveImageAsJpeg: promisify(saveImageAsJpegAsync),
  saveImageAsJpegSync,
  saveImageAsPng: promisify(saveImageAsPngAsync),
  saveImageAsPngSync,
  putImageSync,
  putImage: promisify(putImageAsync),
  hasImage,
  availableFormats,
  writeText,
  writeRTF,
  writeImage,
  writeHTML,
  writeFindText,
  writeBuffer,
  writeBookmark,
  write,
  readText,
  readRTF,
  readImage,
  readHTML,
  readFindText,
  readBuffer,
  readBookmark,
  read,
  has,
  hasPath(){
    return availableFormats().includes("text/uri-list")
  }
};
