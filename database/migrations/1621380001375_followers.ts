import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Followers extends BaseSchema {
  protected tableName = 'followers'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username').notNullable().unique()
      table.integer('followerId').notNullable().unique()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
