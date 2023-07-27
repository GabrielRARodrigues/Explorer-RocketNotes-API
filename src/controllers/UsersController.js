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
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExists){
      throw new AppError("Este email já está em uso.")
    }

    return response.status(201).json()
  }
}

export default UsersController
