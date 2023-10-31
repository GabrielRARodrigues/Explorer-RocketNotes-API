import { Router } from 'express'
import UsersController from '../controllers/UsersController.js'
import ensureAuthenticated from '../middlewares/ensureAuthenticated.js'

const userRoutes = Router()

const usersController = new UsersController()

userRoutes.post('/', usersController.create)
userRoutes.put('/', ensureAuthenticated, usersController.update)

export default userRoutes
