import express from 'express';
import routes from './routes';
import './database';
import Logger from './config/logger'
import morgan from './config/morgan'
class App {

  constructor() {
    this.server = express()
    this.middlewares()
    this.routes()

    Logger.info('Aplicação online')
  }

  middlewares() {
    console.log('Start middlewares')
    this.server.use(express.json())
    this.server.use(morgan)
  }

  routes() {
    this.server.use(routes)
  }
  
}

export default new App().server;