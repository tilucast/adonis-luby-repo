import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime
}
