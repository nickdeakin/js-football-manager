import { Request, Response } from 'express';

const asyncMiddleware: any = (fn: (request: Request, response: Response) => any) => {
  return (request: Request, response: Response) => {
    Promise.resolve(fn(request, response)).catch(e => {
      response.status(e.statusCode ?? 500).send(e.message ?? 'There was an error');
    });
  };
};

export default asyncMiddleware;
