import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Category from '../app/models/Category';
import Post from '../app/models/Post';
class Database {

  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // Start dos modelos
    User.init(this.connection)
    Category.init(this.connection)
    Post.init(this.connection)

    // Associações dos nosso modelos
    User.associate(this.connection.models)
    Post.associate(this.connection.models)
  }
}

export default new Database();