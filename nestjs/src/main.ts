import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cluster from 'cluster';
import * as os from 'os';

async function bootstrap() {
  if (cluster.isPrimary) {
    const numCPUs = os.cpus().length;
    console.log(`Primary process is running with PID ${process.pid}`);
    console.log(`Forking ${numCPUs} workers...`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
      console.log('Starting a new worker...');
      cluster.fork();
    });
  } else {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
    console.log(`Worker process running with PID ${process.pid}`);
  }
}
bootstrap();
