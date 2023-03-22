import App from '@/app';
import AuthRoute from '@routes/auth';
import serverless from 'serverless-http';
import InitializePassport from '@/initializePassport';

const app = new App([new AuthRoute()], InitializePassport);

app.listen();

module.exports.handler = serverless(app.app);
