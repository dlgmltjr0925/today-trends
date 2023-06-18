import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';
import { crawl, getFileName } from '../crawl';
import { existsSync, rmSync } from 'fs';

describe(`Crawl today's trend datas`, () => {
  beforeAll(() => {
    const time = new Date('2099-06-06');
    jest.useFakeTimers();
    jest.setSystemTime(time);
  });

  afterAll(() => {
    jest.useRealTimers();

    rmSync('src/datas/test', { recursive: true });
  });

  it('shoud be contained with todays date', () => {
    const path = 'src/datas/test/go';

    const fileName = getFileName(path);

    expect(fileName).toBeDefined();
    expect(fileName).toContain(`${path}/20990606.json`);
  });

  it(`should be today's trend datas`, async () => {
    await crawl('src/datas/test');

    expect(existsSync('src/datas/test/go/20990606.json')).toBeTruthy();
    expect(existsSync('src/datas/test/today/today.json')).toBeTruthy();
  });
});
