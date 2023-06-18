import { describe, expect, it } from '@jest/globals';
import {
  getGoWebFrameworkData,
  getGoWebFrameworkReadme,
  getNameAndUrlFromFirstColumn,
  parseFromRawToData,
} from '../web-framework/go';

import { raw } from '../__mocks__/go.mock';

describe(`Crawl go framework data`, () => {
  it('should be go web framework raw', async () => {
    const raw = await getGoWebFrameworkReadme();

    expect(typeof raw).toBe('string');
  });

  it('should be name', () => {
    const ginColumn = `| [gin](https://github.com/gin-gonic/gin)`;
    const goResultfulColumn = `| [go-restful](https://github.com/emicklei/go-restful)`;

    expect(getNameAndUrlFromFirstColumn(ginColumn)).toEqual({
      name: 'gin',
      url: 'https://github.com/gin-gonic/gin',
    });
    expect(getNameAndUrlFromFirstColumn(goResultfulColumn)).toEqual({
      name: 'go-restful',
      url: 'https://github.com/emicklei/go-restful',
    });
  });

  it('should be data when parsing raw data', () => {
    const data = parseFromRawToData(raw);

    expect(typeof data).toBe('object');
    expect(data.gin).not.toBeUndefined();
  });

  it('should be go web framework datas', async () => {
    const data = await getGoWebFrameworkData();

    expect(typeof data).toBe('object');
    expect(data.gin).not.toBeUndefined();
  });
});
