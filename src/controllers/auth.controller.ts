import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
class AuthController {
  public helloWorld = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.send(req.auth.date);
    } catch (error) {
      next(error);
    }
  };
  public logIn = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const token = jwt.sign({ date: req.user }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).send({ token });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
