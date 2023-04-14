import { asyncMiddleware } from '../../src/backend/middleware';

describe('asyncMiddleware', function () {
  it('should call function asynchronously', () => {
    const mockFn = () => ({});
    const fn = asyncMiddleware(mockFn);
    const request: any = {
      get: () => null
    };
    const response: any = {
      status: () => ({
        send: () => ({})
      })
    };

    fn(request, response);
  });

  it('should call function asynchronously with error', () => {
    const mockFn = () => {
      throw new Error('An error occurred');
    };
    const fn = asyncMiddleware(mockFn);
    const request: any = {
      get: () => null
    };
    const response: any = {
      status: () => ({
        send: () => ({})
      })
    };

    try {
      fn(request, response);
    } catch (e: any) {
      expect(e.message).toBe('An error occurred');
    }
  });
});
