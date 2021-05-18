import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthenticateUsersController {
  public async handle({ request }: HttpContextContract) {
    const { username } = request.body()
    const doesUserExists = await User.findByOrFail('username', username)
    return doesUserExists
  }
}
