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
    this.setupSentry()
    this.middlewares()
    this.routes()

    Logger.info('Aplicação online')
  }

  middlewares() {
    console.log('Start middlewares')
    this.server.use(express.json())
    this.server.use(cors())
    this.server.use(morgan)
    this.server.use(Sentry.Handlers.requestHandler());
    // TracingHandler creates a trace for every incoming request
    this.server.use(Sentry.Handlers.tracingHandler());


  }

  routes() {
    this.server.use(routes)
  }

  setupSentry() {
    Sentry.init({
      dsn: process.env.DSN_SENTRY,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app: this.server }),
      ],
      tracesSampleRate: 1.0,
    });
  }

}

export default new App().server;