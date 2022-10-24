#!/usr/bin/env node
// this is node script to detect translation in vue files
// usage: node vue-detect-translation.js --path=src --output=src/locale/en.json
// usage: node vue-detect-translation.js --path=test.vue --output=src/locale/en.json --funcName=$t
// usage: node vue-detect-translation.js --path=test.vue --output=src/locale/en.json --funcName=$t --autoTranslate=ar

import fs from "fs";
import path from "path";
import glob from "glob";
import minimist from "minimist";
import helpers from "./helpers.js";
import {translate} from "free-translate";

const argv = minimist(process.argv.slice(2));

const functionName = argv.funcName || '$t';

const pathToVueFiles = argv.path || 'src';
const pathToOutputFile = argv.output || 'locale/en.json';

if (!helpers.isPathExists(pathToVueFiles)) {
    console.info('Input Path is not exists');
    process.exit(1);
}
if (!helpers.isJsonFile(pathToOutputFile)) {
    console.info('Output Path is not a json file! Please specify a json file');
    process.exit(1);
}


// make sure the output directory exists
helpers.existingDirectory(pathToOutputFile);


// start
let vueFiles = [];
if (helpers.isFile(pathToVueFiles)) {
    vueFiles.push(pathToVueFiles);
} else {
    // vue or js files
    vueFiles = glob.sync(pathToVueFiles + '/**/*.+(vue|js|jsx|ts|tsx)');
}

const translation = {};

// https://regex101.com/r/UaHhMA/1
const regex = new RegExp(`${functionName.replace('$', '\\$')}[(]*\\(['"\`]([^)]*)['"\`]\\)`, 'g');
vueFiles.forEach(filePath => {
    const file = fs.readFileSync(filePath, 'utf8');
    const matches = file.match(regex);
    if (matches) {
        matches.forEach(match => {
            const key = match.match(regex)[0]
                .replace(functionName, '') // remove $t || function name
                .replace('(`', '')
                .replace('(\'', '')
                .replace('("', '')
                .replace('`)', '')
                .replace('\')', '')
                .replace('")', '');
            // replace backslash with null
            const keyWithoutBackslash = key.replace(/\\/g, '');
            translation[keyWithoutBackslash] = keyWithoutBackslash;
        });
    }
});

// translations
let oldTranslation = helpers.isPathExists(pathToOutputFile) ? JSON.parse(fs.readFileSync(pathToOutputFile, 'utf8')) : {};
const newTranslation = helpers.diff(oldTranslation, translation);
const mergedTranslation = Object.assign({}, oldTranslation, newTranslation);

// async function
(async () => {
    console.info('Found translations:', Object.keys(translation).length);
    console.info('new translations:', Object.keys(newTranslation).length);

    // check if auto translate is enabled
    if (argv.autoTranslate && argv.autoTranslate.length > 0 && Object.keys(newTranslation).length > 0) {
        console.info('Start auto translate');
        const keys = Object.keys(newTranslation);
        for (const key of keys) {
            mergedTranslation[key] = await translate(key, {from: 'en', to: argv.autoTranslate});
        }
    }


    // write to file
    fs.writeFileSync(pathToOutputFile, JSON.stringify(mergedTranslation, null, 2));

    // full path , so user can open it from terminal
    console.info('\x1b[32m%s\x1b[0m', 'Translation file saved to: ' + path.resolve(pathToOutputFile));
})();
