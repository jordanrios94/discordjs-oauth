import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { iAuthRequest } from "@interfaces/authRequest.interface";
import { iUserRequest } from "@interfaces/userRequest.interface";

class AuthController {
  public getUser = (req: iAuthRequest, res: Response, next: NextFunction): void => {
    try {
      res.send(req.auth.data);
    } catch (error) {
      next(error);
    }
  };
  public logIn = (req: iUserRequest, res: Response, next: NextFunction): void => {
    try {
      const token = jwt.sign({ data: req.user }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).send({ token });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
