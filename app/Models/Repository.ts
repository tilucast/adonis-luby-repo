import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import RepoStar from './RepoStar'

export default class Repository extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({
    prepare: (value: string) => {
      return value.replace(/ /g, '-')
    },
  })
  public name: string

  @column()
  public description: string

  @column()
  public public: boolean

  @column({
    prepare: (value: string) => {
      return value.replace(/ /g, '-')
    },
  })
  public slug: string

  @column()
  public userId: number

  @hasMany(() => RepoStar)
  public repo_stars: HasMany<typeof RepoStar>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
