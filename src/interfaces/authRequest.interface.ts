import { Request } from 'express';

export interface iAuthRequest extends Request {
  auth: any;
}
