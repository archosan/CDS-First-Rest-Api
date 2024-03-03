import * as notReallyCluster from 'cluster';
import * as os from 'os';
import { Injectable } from '@nestjs/common';

const numberOfCPUs = os.cpus().length;
const cluster = notReallyCluster as unknown as notReallyCluster.Cluster;

@Injectable()
export class AppClusterService {
  static clusterize(callback: () => void): void {
    if (cluster.isPrimary) {
      console.log(`Master ${process.pid} is running`);

      for (let i = 0; i < numberOfCPUs; i++) {
        cluster.fork();
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      });
    } else {
      console.log(`Worker ${process.pid} started`);
      callback();
    }
  }
}
