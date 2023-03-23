import App from '@/app';
import AuthRoute from '@routes/auth';
import serverless from 'serverless-http';
import InitializePassport from '@/initializePassport';
import { Router } from 'express';
import passport from 'passport';
import authController from '@controllers/auth.controller';

const authRoute = new AuthRoute(Router(), passport, authController);
const app = new App([authRoute], InitializePassport);

app.listen();

module.exports.handler = serverless(app.app);
