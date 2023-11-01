import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../configs/upload.js'

import UsersController from '../controllers/UsersController.js'
import UserAvatarController from '../controllers/UserAvatarController.js'
import ensureAuthenticated from '../middlewares/ensureAuthenticated.js'

const userRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

userRoutes.post('/', usersController.create)
userRoutes.put('/', ensureAuthenticated, usersController.update)
userRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update
)

export default userRoutes
