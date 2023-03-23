import { iAuthRequest } from '@interfaces/authRequest.interface';
import { iUserRequest } from '@interfaces/userRequest.interface';
import { NextFunction, Response } from 'express';

export interface IAuthController {
  getUser(req: iAuthRequest, res: Response, next: NextFunction): void;
  logIn(req: iUserRequest, res: Response, next: NextFunction): void;
}
