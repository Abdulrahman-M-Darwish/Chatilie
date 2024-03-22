import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { FindPostsInput } from './dto/find-posts.input';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    private readonly pubSubService: PubSubService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async create(createPostInput: CreatePostInput) {
    const postEntity = this.postsRepository.create(createPostInput);
    const post = await this.postsRepository.save(postEntity);
    const {
      author: { id, name, avatar, username },
      ...rest
    } = post;
    this.eventEmitter.emit('addToIndex', {
      index: 'posts',
      document: { ...rest, author: { id, name, avatar, username } },
    });
    this.pubSubService.publish('postAdded', { postAdded: post });
    return post;
  }
  async findAll(findPostsInput: FindPostsInput) {
    return await this.postsRepository.find({
      where: findPostsInput,
      relations: { author: true, reacts: { user: true } },
      order: {
        createdAt: 'DESC',
      },
    });
  }
  async findOne(id: string) {
    return await this.postsRepository.findOne({
      where: { id },
      relations: { author: true, reacts: true },
    });
  }
  async update(id: string, updatePostInput: UpdatePostInput) {
    const postEntity = await this.findOne(id);
    const post = await this.postsRepository.save({
      ...postEntity,
      ...updatePostInput,
    });
    this.pubSubService.publish('postUpdated', { postUpdated: post });
    return post;
  }
  async remove(id: string) {
    const post = await this.postsRepository.findOneBy({ id });
    this.pubSubService.publish('postRemoved', { postRemoved: id });
    return await this.postsRepository.remove(post);
  }
}
