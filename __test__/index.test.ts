import { getRecords } from '../index';

test("get records gets records", () => {
  expect(getRecords()).toBe([{ key_1: 'value 1', key_2: 'value 2' }])
});
