import { parse } from 'csv-parse/sync';

export function getRecords() {
  const input = `
"key_1","key_2"
"value 1","value 2"
`;
  return parse(input, {
    columns: true,
    skip_empty_lines: true
  });
}
