import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class FolloweesController {
  public async index({ request }: HttpContextContract) {
    const { id } = request.qs()

    const following = await Database.query()
      .select(['follower_user.user_id', 'users.username'])
      .from('follower_user')
      .innerJoin('followers', 'follower_user.follower_id', 'followers.follower_id')
      .innerJoin('users', 'follower_user.user_id', 'users.id')
      .where('follower_user.follower_id', id)

    return following
  }

  public async destroy({ request }: HttpContextContract) {
    const { userid } = request.headers()
    const { id } = request.params()

    const unfollow = await Database.query()
      .from('follower_user')
      .where('follower_user.user_id', Number(id))
      .andWhere('follower_user.follower_id', Number(userid))
      .delete()

    return { message: `User with id: ${userid} has unfollowed user with id: ${id}` }
  }
}

/*
select follower_user.user_id, users.username from follower_user INNER JOIN followers 
ON follower_user.follower_id = followers.follower_id
INNER JOIN users on follower_user.user_id = users.id
where follower_user.follower_id = 10

DELETE FROM follower_user WHERE follower_user.user_id = 9 and follower_user.follower_id = 10
*/
