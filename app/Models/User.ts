import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Repository from './Repository'
import Follower from './Follower'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public location: string

  @column()
  public avatar: string

  @column()
  public username: string

  @column()
  public bio: string

  @hasMany(() => Repository)
  public repositories: HasMany<typeof Repository>

  @manyToMany(() => Follower)
  public followers: ManyToMany<typeof Follower>

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
