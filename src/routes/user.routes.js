import { Router } from 'express'

const userRoutes = Router()

userRoutes.post('/', (request, response) => {
  const { name, email, password } = request.body
  response.json({ name, email, password })
})

export default userRoutes
