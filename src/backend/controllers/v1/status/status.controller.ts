import express, { Application } from 'express';
import { asyncMiddleware } from '../../../middleware';

export default class StatusController {
  public router = express.Router();

  constructor(private _app: Application) {
    this.router.get('/health', asyncMiddleware(this.getStatus));
  }

  getStatus = async (_req: express.Request, res: express.Response, user: any) => {
    res.status(200).send({
      status: 'UP'
    });
  };
}
