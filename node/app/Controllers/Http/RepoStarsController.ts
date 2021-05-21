import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RepoStar from 'App/Models/RepoStar'

export default class RepoStarsController {
  public async store({ request }: HttpContextContract) {
    const { username, id } = request.headers()
    const { repository_id: repositoryId } = request.qs()

    const repoStar = await RepoStar.firstOrCreate({ userId: Number(id), repositoryId })
    return repoStar
  }

  public async destroy({ params, request }: HttpContextContract) {
    const { id } = params
    const { username, userid } = request.headers()

    const deleteRepoStar = RepoStar.query()
      .where('user_id', Number(userid))
      .andWhere('repository_id', id)
      .delete()

    return deleteRepoStar
  }
}
