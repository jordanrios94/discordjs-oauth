import { IRouter } from 'express';
import AuthController from '@controllers/auth.controller';
import { Passport } from 'passport';
import { expressjwt } from 'express-jwt';
import { ALGORITHM, SECRET_KEY } from '@config';
import { IAuthController } from "@interfaces/authController.interface";

class AuthRoute {
  public path = '/auth';
  public authController = new AuthController();
  private router: IRouter;
  private authMiddleware: Passport;
  private controller: IAuthController;

  constructor(router: IRouter, authMiddleware: Passport, controller: IAuthController) {
    this.router = router;
    this.authMiddleware = authMiddleware;
    this.controller = controller;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/discord`, this.authMiddleware.authenticate('discord'));
    this.router.get(
      `${this.path}/discord/callback`,
      this.authMiddleware.authenticate('discord', { failureRedirect: '/' }),
      this.authController.logIn,
    );
    this.router.get(`${this.path}/discord/user`, expressjwt({ secret: SECRET_KEY, algorithms: [ALGORITHM] }), this.authController.getUser);
  }
}

export default AuthRoute;
