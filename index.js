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
