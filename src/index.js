import express from 'express';
import routes from './routes';
import './database';
import Logger from './config/logger'
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
  }

  routes() {
    this.server.use(routes)
  }
  
}

export default new App().server;