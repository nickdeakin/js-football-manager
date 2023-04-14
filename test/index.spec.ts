import supertest from 'supertest';
import { app } from '../src/backend/app';
import { Server } from 'http';

describe('app', function () {
  let listener: Server;

  beforeEach(() => {
    listener = app().listen(5000, () => {
      // nothing to do
    });
  });

  afterEach(done => {
    listener.close(done);
  });

  it('should get /api/v1/status/health', async () => {
    const res = await supertest(listener).get('/api/v1/status/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('UP');
  });

  it('should get /api/v1', async () => {
    const res = await supertest(listener).get('/api/v1');
    expect(res.status).toBe(200);
    expect(res.body.root).toBeTruthy();
  });

  it('should get /', async () => {
    const res = await supertest(listener).get('/');
    expect(res.status).toBe(200);
  });
});
