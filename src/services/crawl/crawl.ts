import { GoWebFrameworkData, getGoWebFrameworkData } from './web-framework/go';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

export type Language = 'go';

export interface Today {
  webFramework: {
    go: GoWebFrameworkData;
  };
}

let today: string | undefined;

export const getFileName = (path: string, fileName?: string) => {
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }

  if (!fileName && !today) {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = `${now.getUTCMonth() + 1}`.padStart(2, '0');
    const date = `${now.getUTCDate()}`.padStart(2, '0');

    today = year + month + date;
  }

  return `${path}/${fileName ?? `${today}.json`}`;
};

export const crawl = async (basePath: string = 'src/datas') => {
  const goWebFrameworkData = await getGoWebFrameworkData();

  const today = {
    go: goWebFrameworkData,
  };

  /**
   * append go web framework data
   */
  const goFileName = getFileName(`${basePath}/go`);
  writeFileSync(goFileName, JSON.stringify(goWebFrameworkData));

  /**
   * update today
   */
  const todayFileName = getFileName(`${basePath}/today`, 'today.json');
  writeFileSync(todayFileName, JSON.stringify(today));
};
