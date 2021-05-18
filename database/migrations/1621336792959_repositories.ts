import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Repositories extends BaseSchema {
  protected tableName = 'repositories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').unique().notNullable()
      table.text('description')
      table.boolean('public').notNullable()
      table.string('slug').notNullable()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
