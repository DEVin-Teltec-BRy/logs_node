
import Post from '../models/Post';

import createPostValidation from '../../validations/post/createPostSchema';

class PostController {
  async index(req, res) {

    try {
      const { id } = req.params;

      const posts = await Post.addScope('activesPost').findAll({
        where: {
          user_id: id
        }
      })

      return res.json(posts)
    } catch (error) {
      return res.status(400).json(
        { message: 'Houve um erro ao tentar listar os posts' }
      )
    }
  }


  async store(req, res) {

    try {
      const data = req.body;

      if (!(await createPostValidation.isValid(data))) {
        return res.status(401).json({ message: 'Campos inválidos' })
      }

      const post = await Post.create(data)

      return res.json(post)

    } catch (error) {

    }
  }
}

export default new PostController();