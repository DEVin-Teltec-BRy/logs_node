require('dotenv').config()

import express from 'express';
import routes from './routes';
import './database';
import Logger from './config/logger'
import morgan from './config/morgan'
import cors from 'cors'
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

class App {

  constructor() {
    this.server = express()

    Sentry.init({
      dsn: process.env.DSN_SENTRY,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app: express() }),
      ],
      tracesSampleRate: 1.0,
    });

    this.middlewares()
    this.routes()

    this.server.use(Sentry.Handlers.errorHandler());

    Logger.info('Aplicação online')
  }

  middlewares() {
    console.log('Start middlewares')
    this.server.use(Sentry.Handlers.requestHandler());
    // TracingHandler creates a trace for every incoming request
    this.server.use(Sentry.Handlers.tracingHandler());

    this.server.use(express.json())
    this.server.use(cors())
    this.server.use(morgan)
 


  }

  routes() {
    this.server.use(routes)
  }

  

}

export default new App().server;