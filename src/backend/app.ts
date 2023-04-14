import express, { Express } from 'express';
import path from 'path';
import { V1Controller } from './controllers/v1';

export const app = () => {
  const app: Express = express();
  app.use(express.json());

  const v1Controller = new V1Controller(app);
  app.use('/api/v1', v1Controller.router);

  const publicPath = 'src/frontend';
  app.use('/static', express.static(`${publicPath}/static`));

  /* Redirect all routes to our (soon to exist) "index.html" file */
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve('src/frontend', 'index.html'));
  });

  return app;
};
