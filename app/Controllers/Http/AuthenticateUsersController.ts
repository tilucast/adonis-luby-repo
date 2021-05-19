import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Token from 'App/Models/Token'
import User from 'App/Models/User'

export default class AuthenticateUsersController {
  public async handle({ request }: HttpContextContract) {
    const { username } = request.body()
    const doesUserExists = await User.findByOrFail('username', username)
    const id = doesUserExists.id
    await Token.firstOrCreate({ logged_user_id: id })
    return doesUserExists
  }
}
