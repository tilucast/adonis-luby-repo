import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import FollowService from 'App/services/FollowService'
const FollowServiceClass = new FollowService()

export default class FollowersController {
  public async index({ request }: HttpContextContract) {
    const { username } = request.qs()

    return FollowServiceClass.getUserFollowers(username)
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
