import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Repository from 'App/Models/Repository'
import User from 'App/Models/User'
import CreateUserRepositoryValidator from 'App/Validators/CreateUserRepositoryValidator'

export default class RepositoriesController {
  public async index({ request, response }: HttpContextContract) {
    const { userId } = request.qs()
    const userRepos = await Repository.query().where('user_id', userId)
    if (!userRepos.length) {
      return response.notFound({ error: 'User not found.' })
    }

    return userRepos
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params

    return await Repository.findByOrFail('name', id)
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
