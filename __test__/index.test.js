"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
test("get records gets records", function () {
    expect(index_1.getRecords()).toBe([{ key_1: 'value 1', key_2: 'value 2' }]);
});
