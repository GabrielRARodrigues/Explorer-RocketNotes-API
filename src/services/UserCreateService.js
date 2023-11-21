import bcryptjs from 'bcryptjs'
import AppError from '../utils/AppError.js'

const { hash, compare } = bcryptjs

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Este email já está em uso.')
    }

    const hashedPassword = await hash(password, 8)

    await this.userRepository.create({ name, email, password: hashedPassword })
  }
}

export default UserCreateService
