import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class FollowService {
  public async getUserFollowers(username: string) {
    const userFollowers = await User.query()
      .select(['followers.username'])
      .where('users.username', username)
      .innerJoin('follower_user', 'users.id', 'follower_user.user_id')
      .innerJoin('followers', 'follower_user.follower_id', 'followers.follower_id')

    return { followers: userFollowers, count: userFollowers.length }
  }

  public async getUserFollowees(id: number) {
    const following = await Database.query()
      .select(['follower_user.user_id', 'users.username'])
      .from('follower_user')
      .innerJoin('followers', 'follower_user.follower_id', 'followers.follower_id')
      .innerJoin('users', 'follower_user.user_id', 'users.id')
      .where('follower_user.follower_id', id)

    return { following, count: following.length }
  }
}
