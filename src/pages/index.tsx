import {
  ArcElement,
  Chart as ChartJS,
  Colors,
  Legend,
  Tooltip,
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import { GoWebFrameworkData } from '../services/crawl/web-framework/go';
import Head from 'next/head';
import { readFileSync } from 'fs';
import styled from '@emotion/styled';
import { useMemo } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  overflow-y: scroll;

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 960px;

    h1 {
      margin-top: 20px;
      font-size: 2rem;
    }

    canvas {
      margin-top: 40px;
    }
  }
`;

export default function TodayTrendsPage({ data }: any) {
  const doughnutData = useMemo(() => {
    if (!data.go) return null;

    const list = Object.values(data.go) as GoWebFrameworkData[];

    return {
      labels: [...list.map(({ name }) => name).slice(0, 6), 'etc'],
      datasets: [
        {
          label: 'stars',
          data: [
            ...list.map(({ stars }) => stars).slice(0, 6),
            list
              .map(({ stars }) => stars as unknown as number)
              .slice(6)
              .reduce((prev, curr) => prev + curr, 0),
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [data]);

  return (
    <>
      <Head>
        <title>{`Today's Trends`}</title>
      </Head>
      <Container>
        <main>
          <h1>Go Web Framework Github Stars</h1>
          {doughnutData && (
            <Doughnut className="doughnut" data={doughnutData} />
          )}
        </main>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const data = JSON.parse(
    readFileSync('src/datas/today/today.json').toString('utf-8')
  );

  return {
    props: {
      data,
    },
  };
}
