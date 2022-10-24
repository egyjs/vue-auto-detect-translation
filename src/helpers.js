// diff two objects
import fs from "fs";
import path from "path";

let diff = (obj1, obj2) => {
    let result = {};
    for (let i in obj2) {
        if (obj2[i] !== obj1[i]) {
            result[i] = obj2[i];
        }
    }
    return result;
}

// check if path is exists
let isPathExists = (pathToVueFiles) => {
    return fs.existsSync(pathToVueFiles)
}
// check if path is File
let isFile = (pathToVueFiles) => {
    return fs.existsSync(pathToVueFiles) && fs.lstatSync(pathToVueFiles).isFile()
}
// check file extension
let isJsonFile = (pathToVueFiles) => {
    return path.extname(pathToVueFiles) === '.json'
}

let existingDirectory = (dir_path) => {
    const outputDir = path.dirname(dir_path);
    if (!fs.existsSync(outputDir)) {
        const outs = outputDir.split('/');
        outs.forEach((out, index) => {
            const subDir = outs.slice(0, index + 1).join('/');
            if (!fs.existsSync(subDir)) {
                fs.mkdirSync(subDir);
            }
        });
    }
    return true;
}

export default {
    diff,
    isPathExists,
    isFile,
    isJsonFile,
    existingDirectory
}
