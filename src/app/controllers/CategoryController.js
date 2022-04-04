/*
  index() 
  store() - cadastrar 
  show() 
  update()
  destroy()
*/

import databaseConfig from '../../config/database'
import Category from '../models/Category';

import createCategoryValidation from '../../validations/category/createCategorySchema';
import { Sequelize } from 'sequelize';

class CategoryController {

  async index(_req, res) {
    try {
      
      const categories = await Category.findAll({
        attributes: ['id', 'name']
      })
      return res.json(categories)
    } catch (error) {
      return res.status(401).json(
        { message: 'Houve um erro ao tentar listar as categorias' }
      )
    }
  }

  async store(req, res) {
    try {
      const data = req.body

      if (!(await createCategoryValidation.isValid(data))) {
        return res.status(401).json({ message: 'Campos inválidos' })
      }

      const categoryExists = await Category.findOne({
        where: {
          name: data.name
        }
      })

      if (categoryExists) {
        return res.status(401).json({ message: 'Oops! Essa categoria ja existe' })
      }
      
      const category = await Category.create(data)

      return res.json(category)

    } catch (error) {
      console.log(error)
      return res.status(400).json({
        message: 'Houve um erro ao tentar realizar o cadastro da categoria'
      })
    }

  }

  async show(req, res) {
    /*
    const {id} = req.params;
    const category = await Category.findByPk(id)
    return res.json(category)
    */
    const { id } = req.params;

    const sequelize = new Sequelize(databaseConfig);
    const [results] = await sequelize.query(`SELECT * FROM categories where id = ${id}`);

    return res.json(results);
  }

}

export default new CategoryController()
