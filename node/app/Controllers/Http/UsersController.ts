import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Follower from 'App/Models/Follower'
import User from 'App/Models/User'
import FollowService from 'App/services/FollowService'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
const FollowServiceClass = new FollowService()

export default class UsersController {
  public async index() {
    return await User.query().preload('repositories') // User.all()
  }

  public async show({ params, response }: HttpContextContract) {
    const userData = await User.query()
      .where('username', params.id)
      .preload('repositories')
      .withCount('repositories')

    if (!userData.length) {
      return response.notFound({ message: 'User not found.' })
    }

    const followers = await FollowServiceClass.getUserFollowers(params.id)
    const followees = await FollowServiceClass.getUserFollowees(userData[0].id)

    const result = {
      ...userData[0].$attributes,
      ...userData[0].$preloaded,
      ...userData[0].$extras,
      followers,
      followees,
    }

    return result
    // I'm not going to redefine the default standard to have id as the params for show, so, id here is actually the username.
  }

  public async store({ request }: HttpContextContract) {
    const user = await request.validate(CreateUserValidator)

    const createdUser = await User.firstOrCreate(user)
    await Follower.firstOrCreate({
      username: user.username,
      followerId: createdUser.id,
    })

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
