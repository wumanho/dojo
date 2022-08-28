const {transformFileSync} = require('@babel/core');
const logHelper = require('./plugins');
const path = require('path');

const {code} = transformFileSync(path.join(__dirname, './sourceCode.js'), {
  plugins: [logHelper],
  parserOpts: {
    sourceType: 'unambiguous',
    plugins: ['jsx']
  }
})

console.log(code);

