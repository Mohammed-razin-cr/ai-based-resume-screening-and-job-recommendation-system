#!/usr/bin/env node
'use strict';
const ts = require('./node_modules/typescript/lib/typescript.js');
const fs = require('fs');
const path = require('path');

function transpileFile(srcPath, destPath) {
  const src = fs.readFileSync(srcPath, 'utf8');
  const result = ts.transpileModule(src, {
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
      removeComments: false,
      strict: false,
      allowJs: true,
      esModuleInterop: true,
    },
    fileName: path.basename(srcPath),
  });
  fs.writeFileSync(destPath, result.outputText, 'utf8');
  console.log(`✓ ${srcPath} -> ${destPath}`);
}

transpileFile('src/App.tsx', 'src/App.jsx');
transpileFile('src/main.tsx', 'src/main.jsx');
console.log('All done!');
