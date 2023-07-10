import AppError from "../utils/AppError.js"

class UsersController {
  /**
   * index - GET para listar vários registros.
   * show - GET para exibir um registro especifico.
   * create - POST para criar um registro.
   * update - PUT para atualizar um registro
   * delete - DELETE para remover um registro
   */

  create(request, response) {
    const { name, email, password } = request.body

    if(!name){
      throw new AppError("Nome é obrigatório")
    }

    response.status(201).json({ name, email, password })
  }
}

export default UsersController
