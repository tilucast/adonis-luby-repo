import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RepoStars extends BaseSchema {
  protected tableName = 'repo_stars'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('repository_id').unsigned().references('repositories.id')
      table.integer('user_id').unsigned().references('users.id')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
