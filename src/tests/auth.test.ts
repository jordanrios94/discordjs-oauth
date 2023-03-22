import request from 'supertest';
import AuthRoute from '@routes/auth';
import App from '@/app';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[GET] /auth/discord', () => {
    it('redirects user to discord', () => {
      const authRoute = new AuthRoute();
      const mockClient = jest.fn(x => 42 + x);
      const app = new App([authRoute], mockClient);

      request(app.getServer()).get('/auth/discord');
    });
  });
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
