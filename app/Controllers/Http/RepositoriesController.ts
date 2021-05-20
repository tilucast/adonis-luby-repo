import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Repository from 'App/Models/Repository'
import User from 'App/Models/User'
import CreateUserRepositoryValidator from 'App/Validators/CreateUserRepositoryValidator'

export default class RepositoriesController {
  public async index({ request, response }: HttpContextContract) {
    const { userId } = request.qs()
    const userRepos = await Repository.query()
      .where('user_id', userId)
      .preload('repo_stars')
      .withCount('repo_stars')

    if (!userRepos.length) {
      return response.notFound({ error: 'User not found.' })
    }

    const repoInfo = userRepos.map((repo) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      let repo_stars_count
      return {
        ...repo.$attributes,
        ...repo.$preloaded,
        ...(repo_stars_count = repo.$extras),
      }
    })

    return {
      count: userRepos.length,
      repositories: repoInfo,
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params

    const oneRepo = await Repository.query()
      .where('name', id)
      .preload('repo_stars')
      .withCount('repo_stars')
    if (!oneRepo.length) {
      return response.notFound({ error: 'Repository not found.' })
    }

    return { ...oneRepo[0].$attributes, ...oneRepo[0].$preloaded, ...oneRepo[0].$extras }
  }

  public async store({ request, response }: HttpContextContract) {
    const { userId } = request.qs()
    const userRepo = await request.validate(CreateUserRepositoryValidator)
    const user = await User.find(userId)
    if (!user) {
      return response.notFound({ error: 'User id not found.' })
    }
    const slug = `${userRepo.name}-${user.username}`
    const finalUserData = { ...userRepo, slug, userId }
    return await Repository.create(finalUserData)
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params

    const repo = await Repository.findOrFail(id)
    await repo.delete()
    return { message: `Repository with id: ${repo.id} was deleted successfully.` }
  }
}
