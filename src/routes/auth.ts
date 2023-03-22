import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import passport from 'passport';
import { expressjwt } from 'express-jwt';
import { ALGORITHM, SECRET_KEY } from '@config';

class AuthRoute {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/discord`, passport.authenticate('discord'));
    this.router.get(`${this.path}/discord/callback`, passport.authenticate('discord', { failureRedirect: '/' }), this.authController.logIn);
    this.router.get(`${this.path}/discord/user`, expressjwt({ secret: SECRET_KEY, algorithms: [ALGORITHM] }), this.authController.getUser);
  }
}

export default AuthRoute;
