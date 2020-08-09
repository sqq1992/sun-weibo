const fse = require('fs-extra')
const path = require('path');
const {targetFilePath} = require("../conf/global");
const {MAX_SIZE_FILE} = require("../conf/global");
const {SuccessDataModel,ErrorDataModel} = require("../model/resModel");


async function handleSaveFile({
  name, type, size, filePath
}){
    if (size > MAX_SIZE_FILE) {
        await fse.remove(filePath)
        return new ErrorDataModel("文件体检过大!")
    }

    // 重新命名文件
    const fileName = Date.now() + '.' + name

    // 目的地
    const distFilePath = path.join(targetFilePath, fileName)
    // 移动
    await fse.move(filePath, distFilePath)

    // 返回
    return new SuccessDataModel(fileName);

}

module.exports = {
    handleSaveFile
};