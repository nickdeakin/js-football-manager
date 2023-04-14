import express, { Application } from 'express';
import { asyncMiddleware } from '../../../middleware';

export default class RootController {
  public router = express.Router();

  constructor(private _app: Application) {
    this.router.get('/', asyncMiddleware(this.getDefault));
  }

  getDefault = async (_req: express.Request, res: express.Response, user: any) => {
    res.status(200).send({
      root: true,
      cool: true,
      hungry: true
    });
  };
}
