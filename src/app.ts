import * as express from 'express';
import * as url from 'url';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { GenerateRandomDataService } from './generate-random-data-service';
import { ChartData } from './chart-data';

class App {
  public express;

  constructor() {
    this.express = express();
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(cors());
    this.express.use(express.static('static'));
    this.mountRoutes();
  }

  private mountRoutes(): void {
    const router = express.Router()
    //sample get
    router.get('/get', (req, res) => {
      let parsedUrl = url.parse(req.url, true);
      res.json({
        message: 'Hello ' + parsedUrl.query['name'] + ' !'
      });
    });

    //sample post
    router.post('/post', (req, res) => {
      //query param
      let parsedUrl = url.parse(req.url, true);
      //body
      let name: string = req.body['name'];
      res.json({
        message: 'Hello ' + name + parsedUrl.query['name'] + ' !'
      });
    });

    router.post('/randomdata', (req, res) => {
      //console.log(req.body);
      let start: string = req.body['startDate'];
      let end: string = req.body['endDate'];
      let response:Array<ChartData> = [];
      if (typeof start != undefined && start != null && end != undefined && end != null) {
        let startDate: Date = new Date(start);
        let endDate: Date = new Date(end);
        //console.log(""+startDate+endDate);
        let generateRandomDataService: GenerateRandomDataService = new GenerateRandomDataService();
        response = generateRandomDataService.generateData(startDate, endDate);
      }
      res.json(response);
    });
    this.express.use('/', router);
  }
}

export default new App().express;