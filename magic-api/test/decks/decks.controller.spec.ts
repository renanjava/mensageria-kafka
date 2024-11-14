import autocannon, { AutocannonResult } from 'autocannon';
import { PassThrough } from 'stream';

async function runLoadTest(
  url: string,
  connections: number,
  duration: number,
): Promise<AutocannonResult> {
  const outputStream = new PassThrough();

  return new Promise((resolve, reject) => {
    const test = autocannon({
      url,
      connections,
      duration,
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjczNzg4OTQsImV4cCI6MTcyNzM4MjQ5NH0.e9bkrNywDlqg4b3HYbyR3Pz5ISBxmuJHCjfq42NjaH0',
      },
    });

    autocannon.track(test, { outputStream });

    outputStream.on('data', (data) => {
      process.stdout.write(data);
    });

    test.on('done', (result: AutocannonResult) => {
      resolve(result);
    });

    test.on('error', (err) => {
      reject(err);
    });
  });
}

async function compareLoadTests(
  url1: string,
  url2: string,
  connections: number,
  duration: number,
) {
  const [result1, result2] = await Promise.all([
    runLoadTest(url1, connections, duration),
    runLoadTest(url2, connections, duration),
  ]);
  console.log(
    '##############################################################################################################################\n',
  );
  if (result1.requests.total > result2.requests.total) {
    console.log(
      `A rota SEM CACHE teve o melhor desempenho,\ncom a vantagem de ${result1.requests.total - result2.requests.total} requisições.\n${url1}`,
    );
  } else if (result1.requests.total < result2.requests.total) {
    console.log(
      `A rota COM CACHE teve o melhor desempenho,\ncom a vantagem de ${result2.requests.total - result1.requests.total} requisições.\n${url2}`,
    );
  } else {
    console.log('Ambas as URLs tiveram o mesmo número de requisições.');
  }
  console.log(
    '\n##############################################################################################################################',
  );
}

const url1 = 'http://localhost:3000/decks/sem-cache/my-decks';
const url2 = 'http://localhost:3000/decks/com-cache/my-decks';
const connections = 100;
const duration = 10;

compareLoadTests(url1, url2, connections, duration).catch((err) => {
  console.error('Erro ao executar o teste de carga:', err);
});
