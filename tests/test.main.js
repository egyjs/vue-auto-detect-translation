alert($t('Hello World!'));

// Language: javascript
// Path: vue-detect-translation\tests\test.main.js

function test() {
    let line = 7;
    console.log('test', this.$t(`test from this line: ${line}`));
    console.log('test', this.$t(`test from this line: ${line}`).replace('`', this.$t('inline test')));
}
