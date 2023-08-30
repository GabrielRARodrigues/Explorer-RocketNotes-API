import bcryptjs from 'bcryptjs'
const { hash, compare } = bcryptjs
import AppError from '../utils/AppError.js'
import sqliteConnection from '../database/sqlite/index.cjs'

class UsersController {
  /**
   * index - GET para listar vários registros.
   * show - GET para exibir um registro especifico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro
   * delete - DELETE para remover um registro
   */

  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConnection()
    const checkUserExists = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    try {
      if (checkUserExists) {
        throw new AppError('Este email já está em uso.')
      }
    } catch (error) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }

    const hashedPassword = await hash(password, 8)

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const { id } = request.params

    const database = await sqliteConnection()
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])
    try {
      if (!user) {
        throw new AppError('Usuário não encontrado')
      }
    } catch (error) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }

    const userWithUpdatedEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    try {
      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new AppError('Este e-mail já está em uso.')
      }
    } catch (error) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }

    user.name = name ?? user.name
    user.email = email ?? user.email
    try {
      if (password && !old_password) {
        throw new AppError(
          'Você precisa informar a senha antiga para definir a nova senha'
        )
      }
    } catch (error) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)
      try {
        if (!checkOldPassword) {
          throw new AppError('A senha antiga não confere')
        }
      } catch (error) {
        return response.status(error.statusCode).json({
          status: 'error',
          message: error.message
        })
      }

      user.password = await hash(password, 8)
    }

    await database.run(
      ` 
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,
      [user.name, user.email, user.password, id]
    )

    return response.status(200).json()
  }
}

export default UsersController
