# Vue auto detect translation

It generates a translation file for you based on the translations detected in Your Application.
Furthermore, it supports free and automatic translations
using [API Translator (Google translate)](https://www.npmjs.com/package/api-translator)

[![npm](https://img.shields.io/npm/v/vue-detect-translation.svg)](https://www.npmjs.com/package/vue-detect-translation)
[![npm](https://img.shields.io/npm/dt/vue-detect-translation.svg)](https://www.npmjs.com/package/vue-detect-translation)
[![npm](https://img.shields.io/npm/l/vue-detect-translation.svg)](https://www.npmjs.com/package/vue-detect-translation)

## Installation

```bash
npm install -g vue-detect-translation
```

## Usage

```bash
v-detect-t 
# options
--path= # path you want to scan for translation (default: src)
--auto-translate= # language to translate to (example: --auto-translate=ar)
--output= # output json file name (default: locale/en.json)
--funcName= # function name to detect translation (default: $t)
```

## Todo

- [ ] Convert to typescript + add types
- [ ] change the argument library ( currently using minimist )
- [ ] Add tests (Jest)
- [ ] Add option `language-from` in autoTranslate
- [x] Add option `language-to` in autoTranslate (ex. `--auto-translate=fr`)
- [ ] support multiple Programming languages (currently support only`vue|js|jsx|ts|tsx`)
    - im think to create an option called `extentions` (for example `--language=vue,js,jsx,ts,tsx`)
- [x] ~~create custom "free-translate" pkg , to speed up the translation process and upgrade `puppeteer` to
  @latest~~ **([api-translator](https://www.npmjs.com/package/api-translator))**

# vue-auto-detect-translation

# Contributing

#### Please do! I'm open to any suggestions or improvements in this project.

