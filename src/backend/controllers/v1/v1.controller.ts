import express, { Application } from 'express';
import RootController from './root/root.controller';
import StatusController from './status/status.controller';

export default class V1Controller {
  public router = express.Router();

  rootController: RootController;
  statusController: StatusController;

  constructor(private app: Application) {
    this.rootController = new RootController(app);
    this.statusController = new StatusController(app);
    this.initRoutes();
  }

  initRoutes = () => {
    this.app.use('/api/v1/status', this.statusController.router);
    this.app.use('/api/v1', this.rootController.router);
  };
}
