import { Context, APIGatewayEvent } from 'aws-lambda';
import awsServerlessExpress from 'aws-serverless-express';

const appServer = require('./server');
const server = awsServerlessExpress.createServer(appServer);

exports.handler = (event: APIGatewayEvent, context: Context) => awsServerlessExpress.proxy(server, event, context);
