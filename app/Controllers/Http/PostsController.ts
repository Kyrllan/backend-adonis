import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
//import Database from '@ioc:Adonis/Lucid/Database'
import { StoreValidator, UpdateValidator } from 'App/Validators/Post/'

export default class PostsController {
  public async index({}: HttpContextContract) {
    const posts = await Post.query().orderBy('id', 'asc')

    return posts
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate(StoreValidator)

    const user = await auth.authenticate()

    const post = await Post.create({ auhorId: user.id, ...data })

    await post.preload('author')

    return post
  }

  public async show({ params }: HttpContextContract) {
    //const post = await Database.rawQuery(`SELECT * FROM posts WHERE id = ${params.id}`)
    const post = await Post.findOrFail(params.id)

    /*     if (!post) {
      return response.notFound({ message: 'Post not found' })
    } */

    return post
  }

  public async update({ params, request }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const data = await request.validate(UpdateValidator)

    post.merge(data)

    await post.save()

    await post.preload('author')

    return post
  }

  public async destroy({ params }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    await post.delete()
  }
}
