import { Injectable } from '@nestjs/common';
import { chunks } from './chunking.helper';

@Injectable()
export class AppService {
  async plus(params): Promise<any> {
    try {
      await new Promise((r) => setTimeout(r, 4000));
      const result = await new Promise((resolve, rejects) => {
        const result = +params.lat + +params.lon;

        resolve(result);
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async getHello(): Promise<void> {
    const array = [
      { lat: '37.7749', lon: '-122.4194' },
      { lat: '40.7128', lon: '-74.0060' },
      { lat: '51.5074', lon: '-0.1278' },
      { lat: '35.6895', lon: '139.6917' },
      { lat: '19.4326', lon: '-99.1332' },
      { lat: '41.9028', lon: '12.4964' },
      { lat: '48.8566', lon: '2.3522' },
      { lat: '52.5200', lon: '13.4050' },
      { lat: '37.5665', lon: '126.9780' },
      { lat: '31.2304', lon: '121.4737' },
      { lat: '55.7558', lon: '37.6173' },
      { lat: '43.6532', lon: '-79.3832' },
      { lat: '39.9042', lon: '116.4074' },
      { lat: '41.3851', lon: '2.1734' },
      { lat: '-33.8688', lon: '151.2093' },
      { lat: '22.3193', lon: '114.1694' },
      { lat: '38.7223', lon: '-9.1393' },
      { lat: '41.0082', lon: '28.9784' },
      { lat: '45.4642', lon: '9.1900' },
      { lat: '-23.5505', lon: '-46.6333' },
    ];

    console.time('ch');
    await chunks(array, this.plus, 3, 'chunk').then((result) => {
      console.log(result);
    });
    console.timeEnd('ch');

    console.time('ch1');
    for (let index = 0; index < 20; index++) {
      await this.plus(array[index]);
    }
    console.timeEnd('ch1');
  }
}
/**
 * [
            -84.6445,            -33.2932,
  51.379599999999996,            175.3812,
  -79.70060000000001,             54.3992,
             51.2088,              65.925,
            164.5445,  152.70409999999998,
             93.3731, -35.730000000000004,
            156.3116,             43.5585,
  117.34050000000002,            136.4887,
              29.583,   69.98660000000001,
  54.654199999999996,  -70.18379999999999
]
ch: 28.072s => our chunk size is 3, data size is 20 = 20/3 = 7 chunk, time to perform weather function is 4s so finally time waste is 4*7 = 28s
ch1: 1:20.131 (m:ss.mmm) => common way, data = 20 time =4 =. 20*4 = 80, 1m 20s
 */
