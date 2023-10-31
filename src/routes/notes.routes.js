import { Router } from 'express'

import NotesController from '../controllers/NotesController.js'
import ensureAuthenticated from '../middlewares/ensureAuthenticated.js'

const notesRoutes = Router()

const notesController = new NotesController()

notesRoutes.use(ensureAuthenticated)

notesRoutes.post('/', notesController.create)
notesRoutes.get('/', notesController.index)
notesRoutes.get('/:id', notesController.show)
notesRoutes.delete('/:id', notesController.delete)

export default notesRoutes
