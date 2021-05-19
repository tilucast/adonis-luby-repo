import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class FollowersController {
  public async index({ request }: HttpContextContract) {
    const { username } = request.qs()

    const userFollowers = await User.query()
      .select(['followers.username'])
      .where('users.username', username)
      .innerJoin('follower_user', 'users.id', 'follower_user.user_id')
      .innerJoin('followers', 'follower_user.follower_id', 'followers.follower_id')

    return { followers: userFollowers, count: userFollowers.length }
  }

  public async store({ request, response }: HttpContextContract) {
    const { userid } = request.headers()
    const { followeeId } = request.qs()

    const user = await User.find(followeeId)
    const follower = await User.find(userid)
    if (!follower || !user) {
      return response.notFound({ error: 'User not found.' })
    }

    await user?.related('followers').sync([follower.id], false)

    return { followerId: follower.id, followeeId: user.id }
  }
}
