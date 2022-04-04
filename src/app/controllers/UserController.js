/*
  index() 
  store() - cadastrar 
  show() 
  update()
  destroy()
*/

import User from '../models/User';
import { Op } from 'sequelize';
import logger from '../../config/logger';

class UserController {

  async index(req, res) {

    try {
      const word = req.query.word ? req.query.word : '';

      const users = await User.findAll({
        include: [
          {
            association: 'posts',
            required: false,  // LEFT JOIN
            where: {
              title: {
                [Op.iLike]: `%${word}%`
              },
              status: true
            }
          }
        ],
        limit: 10,
        order: [
          ["name", "ASC"],
        ],
      },
      )

      return res.json(users)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'Houve um erro ao tentar listar os usuários' })
    }
  }

  async store(req, res) {
    try {
      const data = req.body;

      // Fazer tratamento

      // Tratamento 1

      const userExists = await User.findOne({
        where: {
          email: data.email
        }
      })

     
      if (userExists) {
        throw new Error(`${data.email} já existe`)
      }

      const user = await User.create(data);
      logger.info(`Usuário ${user.name} cadastrado com sucesso`)
      return res.json(user);
    } catch (error) {
      logger.error(`Error na aplicação: ${error.message} - status: ${400}`)
      return res.status(400).json({ message: error.message })
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id)

      return res.json(user)
    } catch (error) {
      return res.status(400).json({ message: 'Houve um erro ao tentar buscar o usuario' })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        name,
        nickname,
        email
      } = req.body;

      const user = await User.findByPk(id);

      user.name = name
      user.nickname = nickname
      user.email = email

      const userUpdated = await user.save()

      return res.json(userUpdated)
    } catch (error) {
      return res.status(400).json({ message: 'Houve um erro ao tentar atualizar o usuario' })
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      await user.destroy()

      return res.json({})
    } catch (error) {
      return res.status(400).json({ message: 'Houve um erro ao tentar deletar o usuario' })
    }
  }

}

export default new UserController()
