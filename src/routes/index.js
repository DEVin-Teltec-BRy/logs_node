import { Router } from 'express';

import UserController from '../app/controllers/UserController';
import CategoryController from '../app/controllers/CategoryController';
import PostController from '../app/controllers/PostController';

const routes = new Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.get('/users/:id', UserController.show);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.store);
routes.get('/categories/:id', CategoryController.show);

routes.get('/users/:id/posts', PostController.index);
routes.post('/posts', PostController.store);

export default routes;