import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Follower from 'App/Models/Follower'

export default class FollowersController {
  public async index({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async store({ request }: HttpContextContract) {
    const { username, userid } = request.headers()
    const { followeeId } = request.qs()
    const followerTableData = { username: String(username), followerId: Number(userid) }
    const followPivotTableData = { followerId: Number(userid), followeeId: Number(followeeId) }
    console.log(followerTableData, followPivotTableData)
  }
}
