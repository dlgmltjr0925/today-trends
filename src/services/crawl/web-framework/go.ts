import { FailedToGetDataError } from '../../../errors/FailedToGetDataError';
import axios from 'axios';

export interface GoWebFrameworkData extends Record<string, object> {}

export const getGoWebFrameworkReadme = async () => {
  const res = await axios.get(
    'https://raw.githubusercontent.com/mingrammer/go-web-framework-stars/master/README.md'
  );

  return res.data;
};

export const getNameAndUrlFromFirstColumn = (column: string) => {
  const name = column.match(/\[.*\]/)?.[0].replace(/\[|\]/g, '');
  const url = column.match(/\(.*\)/)?.[0].replace(/\(|\)/g, '');

  if (!name || !url) {
    throw new FailedToGetDataError();
  }

  return { name, url };
};

export const parseFromRawToData = (raw: string): GoWebFrameworkData => {
  const data: GoWebFrameworkData = {};

  const lines = raw.split('\n');

  lines
    .filter((line) => line.startsWith('| ['))
    .forEach((line) => {
      const contents = line.split(' | ');
      const { name, url } = getNameAndUrlFromFirstColumn(contents[0]);
      const stars = Number(contents[1]);
      const forks = Number(contents[2]);
      const openIssues = Number(contents[3]);
      const description = contents[4];
      const lastCommit = contents[5].replace(' |', '');

      data[name] = {
        name,
        url,
        stars,
        forks,
        openIssues,
        description,
        lastCommit,
      };
    });

  return data;
};

export const getGoWebFrameworkData = async () => {
  const raw = await getGoWebFrameworkReadme();

  const data = parseFromRawToData(raw);

  return data;
};
