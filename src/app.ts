import express, { Express, Request, Response } from 'express';

export const app = () => {
    const app: Express = express();
    app.use(express.json())

    app.get('/', (req: Request, res: Response) => {
        res.status(200).send(
            {
                status: 'UP'
            }
        );
    });

    return app;
}
