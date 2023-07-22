import express, { Express } from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT;

export const app = () => {
  const app: Express = express();
  app.use(express.json());

  app.use('/assets', express.static(`${__dirname}/assets`));

  /* Redirect all routes to our (soon to exist) "index.html" file */
  app.get('/main.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'main.js'));
  });

  /* Redirect all routes to our (soon to exist) "index.html" file */
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
  });

  return app;
};

const listener = app().listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
