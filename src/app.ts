import express from 'express';
import { DISCORD_CLIENT_ID, DISCORD_SECRET_KEY, NODE_ENV, PORT, SECRET_KEY } from '@config';
import passport from 'passport';
import PassportDiscord from 'passport-discord';
import { Routes } from '@interfaces/routes.interface';
import session from 'express-session';
import * as console from 'console';
class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.initializePassport();
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

  private initializePassport() {
    this.app.use(passport.initialize());

    const DiscordStrategy = PassportDiscord.Strategy;

    const scopes = ['identify', 'email', 'guilds', 'guilds.join'];

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      done(null, id);
    });
    passport.use(
      new DiscordStrategy(
        {
          clientID: DISCORD_CLIENT_ID,
          clientSecret: DISCORD_SECRET_KEY,
          callbackURL: 'http://localhost:3000/auth/discord/callback',
          scope: scopes,
        },
        function (accessToken, refreshToken, profile, callBack) {
          return callBack(null, profile);
        },
      ),
    );
  }
}
export default App;
