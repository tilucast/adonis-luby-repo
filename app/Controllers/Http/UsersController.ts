import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {
  public async index() {
    return await User.query().preload('repositories') // User.all()
  }

  public async show({ params, response }: HttpContextContract) {
    const userData = await User.query().where('username', params.id).preload('repositories')

    if (!userData.length) {
      return response.notFound({ message: 'User not found.' })
    }

    return userData
    // I am not going to redefine the default standard to have id as the params for show, so, id here is the username.
  }

  public async store({ request }: HttpContextContract) {
    const user = await request.validate(CreateUserValidator)

    await User.firstOrCreate(user)

    return { message: 'User created successfully.' }
  }

  public async update({ params, request }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const validatedInputs = await request.validate(UpdateUserValidator)
    return user.merge({ ...validatedInputs }).save()
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return { message: `User with id ${user.id} was deleted.` }
  }
}
