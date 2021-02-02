#!/usr/bin/env node

var FILES_TO_COPY = [{
    srcPath: "src/manifest.json",
    destPath: "www/manifest.json"
}];

var fs = require('fs');
var path = require('path');

function copyFileSync(srcFile, target) {
    var destFile = target;

    console.log('copying ' + srcFile + ' to ' + destFile);

    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            destFile = path.join(target, path.basename(srcFile));
        }
    }

    fs.writeFileSync(destFile, fs.readFileSync(srcFile));
}

FILES_TO_COPY.forEach(function (fileInfo) {
    copyFileSync(fileInfo.srcPath, fileInfo.destPath);
});

const TARGET_DIR = 'www';

module.exports = function (ctx) {
    //only for debugging

    // console.log('=====================');
    // console.log('attaching source maps');
    // console.log('=====================');

    // let files = fs.readdirSync(TARGET_DIR);

    // files.forEach(file => {
    //     let mapFile = path.join(TARGET_DIR, file + '.map');
    //     let targetFile = path.join(TARGET_DIR, file);
    //     if (path.extname(file) === '.js' && fs.existsSync(mapFile)) {
    //         let bufMap = fs.readFileSync(mapFile).toString('base64');
    //         let bufFile = fs.readFileSync(targetFile, "utf8");
    //         let result = bufFile.replace('sourceMappingURL=' + file + '.map', 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + bufMap);
    //         fs.writeFileSync(targetFile, result);
    //     }
    // });
};