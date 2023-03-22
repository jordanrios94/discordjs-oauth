import { Application } from 'express';

export interface AuthClient {
  new (app: Application);
}
