import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class CreateUsersSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'Admin',
        email: 'admin@email.com',
        password: 'secret',
        role: 'admin',
      },
      {
        name: 'User',
        email: 'user@email.com',
        password: 'secret',
        role: 'user',
      },
    ])
  }
}
