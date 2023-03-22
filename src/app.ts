import express from 'express';
import { NODE_ENV, PORT, SECRET_KEY } from '@config';
import { Routes } from '@interfaces/routes.interface';
import session from 'express-session';
import * as console from 'console';
import { AuthClient } from '@interfaces/authClient.interface';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[], authClient: AuthClient) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    new authClient(this.app);
    this.initializeRoutes(routes);
  }
  public getServer() {
    return this.app;
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      session({
        secret: SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: true },
      }),
    );
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
}
export default App;
