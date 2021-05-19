import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FollowerUsers extends BaseSchema {
  protected tableName = 'follower_user'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.integer('follower_id').unsigned().references('followers.follower_id').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
