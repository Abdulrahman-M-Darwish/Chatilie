import { Injectable } from '@nestjs/common';
import { CreateReactionInput } from './dto/create-reaction.input';
import { EntityManager } from 'typeorm';
import { Reaction } from './entities/reaction.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReactionsService {
  constructor(private readonly entityManager: EntityManager) {}
  async create(createReactionInput: CreateReactionInput, user: User) {
    const reaction = this.entityManager.create(Reaction, createReactionInput);
    await this.entityManager.save(reaction);
    return { ...reaction, user };
  }
  async findAll(postId: string) {
    const reactionsAndCount = await this.entityManager.findAndCount(Reaction, {
      where: { postId },
      relations: { user: true },
    });
    return { reactions: reactionsAndCount[0], count: reactionsAndCount[1] };
  }
  async remove(postId: string, userId: string) {
    const reaction = await this.entityManager.findOne(Reaction, {
      where: { postId, userId },
    });
    await this.entityManager.remove(reaction);
    return userId;
  }
}
