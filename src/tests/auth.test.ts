import request from 'supertest';
import AuthRoute from '@routes/auth';
import App from '@/app';
import passport from 'passport';

afterAll(async () => {
  jest.restoreAllMocks();
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});
import { Router } from 'express';
import supertest from 'supertest';

describe('Testing Auth', () => {
  it('All routes are initialised', () => {
    const mockRouter = Router();
    mockRouter.get = jest.fn();
    const mockAuthenticate = jest.fn((authType, options, callback) => () => { callback('This is an error', null); });

    const mockPassport = {
      authenticate: mockAuthenticate,
    };

    const mockClient = jest.fn();
    const authRoute = new AuthRoute(mockRouter, mockPassport, jest.fn() as any);

    const app = new App([authRoute as any], mockClient);

    const mockAuthController = {
      getUser: jest.fn(),
      logIn: jest.fn(),
    };
    authRoute.authController = mockAuthController as any;

    app.getServer();

    expect(mockRouter.get).toHaveBeenCalledWith('/auth/discord', expect.any(Function));
    expect(mockRouter.get).toHaveBeenCalledWith('/auth/discord/callback', expect.any(Function), expect.any(Function));
    expect(mockRouter.get).toHaveBeenCalledWith('/auth/discord/user', expect.any(Function), expect.any(Function));
  });

  describe('middleware', () => {
    let agent;
    let server;
    let mockAuthenticate;
    let mockLogin;
    let mockGetUser;

    beforeAll(done => {
      const mockRouter = Router();
      mockAuthenticate = jest.fn((authType, options, callback) => () => {
        callback(null, "data")
      });
      const mockPassport = {
        authenticate: mockAuthenticate,
      };
      mockLogin = jest.fn();
      mockGetUser = jest.fn();
      const mockController = {
        logIn: mockLogin,
        getUser: mockGetUser,
      };
      const mockClient = jest.fn();
      const authRoute = new AuthRoute(mockRouter, mockPassport, mockController as any);
      const app = new App([authRoute as any], mockClient);
      passport.authenticate = mockAuthenticate;

      agent = supertest(app.getServer());

      done();
    });

    afterAll(done => {
      server && server.close(done);
    });
    it('test_discordAuthenticationSuccess ', async () => {

      const response = await agent.get('/auth/discord/callback');
      // expect(response.status).toBe(302);
      expect(mockLogin).toHaveBeenCalledTimes(2);
      // expect(mockLogin).toHaveBeenCalledWith('discord');
    });
  });

  xdescribe('app', () => {});
  //
  // describe('[POST] /login', () => {
  //   it('response should have the Set-Cookie header with the Authorization token', async () => {
  //     const userData: CreateUserDto = {
  //       email: 'example1@email.com',
  //       password: 'password',
  //     };
  //
  //     const authRoute = new AuthRoute();
  //     const app = new App([authRoute]);
  //
  //     return request(app.getServer())
  //       .post('/login')
  //       .send(userData)
  //       .expect('Set-Cookie', /^Authorization=.+/);
  //   });
  // });

  // error: StatusCode : 404, Message : Authentication token missing
  // describe('[POST] /logout', () => {
  //   it('logout Set-Cookie Authorization=; Max-age=0', () => {
  //     const authRoute = new AuthRoute();
  //     const app = new AppExample([authRoute]);

  //     return request(app.getServer())
  //       .post('/logout')
  //       .expect('Set-Cookie', /^Authorization=\;/);
  //   });
  // });
});
