# To replicate

```sh
npm install
npm test
```

I'm running this on node v17.6.0.

# Problem Demo

Running jest with `npm test` throws this error:

```
$ npm test

> ts-jest-sample@1.0.0 test
> jest

 FAIL  __test__/index.test.ts
  ● Test suite failed to run

    Cannot find module 'csv-parse/sync' from 'index.ts'

    Require stack:
      index.ts
      __test__/index.test.ts

    > 1 | import { parse } from 'csv-parse/sync';
        | ^
      2 |
      3 | export function getRecords() {
      4 |   const input = `

      at Resolver.resolveModule (node_modules/jest-resolve/build/resolver.js:324:11)
      at Object.<anonymous> (index.ts:1:1)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.664 s
Ran all test suites.
[/tmp/ts-jest-sample]$ tsc
[/tmp/ts-jest-sample]$ node index.ts
(node:18609) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
(Use `node --trace-warnings ...` to show where the warning was created)
/private/tmp/ts-jest-sample/index.ts:1
import { parse } from 'csv-parse/sync';
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at Object.compileFunction (node:vm:352:18)
    at wrapSafe (node:internal/modules/cjs/loader:1026:15)
    at Module._compile (node:internal/modules/cjs/loader:1061:27)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1151:10)
    at Module.load (node:internal/modules/cjs/loader:975:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)
    at node:internal/main/run_main_module:17:47
```

But tsc seems to have no problem compiling this into runnable JavaScript:

```
[/tmp/ts-jest-sample]$ node index.js
[/tmp/ts-jest-sample]$ echo $?
0
```

Contents of index.js:

```
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecords = void 0;
var sync_1 = require("csv-parse/sync");
function getRecords() {
    var input = "\n\"key_1\",\"key_2\"\n\"value 1\",\"value 2\"\n";
    return sync_1.parse(input, {
        columns: true,
        skip_empty_lines: true
    });
}
exports.getRecords = getRecords;
```

This is using ts-jasmine so we can still have type safety when running tests (instead of Babel).

# I tried...

https://github.com/kulshekhar/ts-jest/blob/main/TROUBLESHOOTING.md

But this mainly relates to rootDir, where the default makes sense here as everything is just literally in `.` at the project root

Ensuring `esModuleInterop` and `esModuleInterop` are turned on in  `tsconfig.json`. 

Ensuring tsc can build executable JS out of this

Ensuring ts-node can also run it without error

