import { Request } from 'express';

export interface iUserRequest extends Request {
  user: any;
}
