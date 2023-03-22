import App from '@/app';
import AuthRoute from '@routes/auth';
import serverless from 'serverless-http';

const app = new App([new AuthRoute()]);

app.listen();

module.exports.handler = serverless(app.app);
