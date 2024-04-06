import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Gender } from 'src/profiles/entities/profile.entity';
import { PubSubService } from 'src/pubsub/pubsub.service';
import { ElasticsearchService } from 'src/elasticsearch/elasticsearch.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FindUserInput } from './dto/find-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly profilesService: ProfilesService,
    private readonly pubSubService: PubSubService,
    private readonly elasticsearchService: ElasticsearchService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async create(createUserInput: CreateUserInput) {
    const avatar = `https://api.dicebear.com/6.x/pixel-art/png?${
      createUserInput.gender === Gender.MALE
        ? 'beardProbability=50&glassesProbability=50'
        : 'accessoriesProbability=75'
    }&hatProbability=50&seed=${createUserInput.name}`;
    const userEntity = this.usersRepository.create({
      ...createUserInput,
      avatar,
    });
    const user = await this.usersRepository.save(userEntity);
    const { user: theUser, ...profile } = await this.profilesService.create({
      user,
      gender: createUserInput.gender,
    });
    this.eventEmitter.emit('addToIndex', {
      document: { ...profile, ...theUser },
      index: 'users',
    });
    return { ...theUser, profile };
  }
  async findAll(findUserInput: FindUserInput) {
    return await this.usersRepository.find({
      ...findUserInput,
      relations: { profile: true },
    });
  }
  async findOne(id: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.friends', 'user_friends_user')
      .loadRelationCountAndMap('user.friendsCount', 'user.friends')
      .leftJoinAndSelect(
        'user.profile',
        'profile',
        '(user.profileId = profile.id)',
      )
      .andWhere('(user.id = :id OR user.name = :id OR user.email = :id)', {
        id,
      })
      .getOne();
    return user;
  }
  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.findOne(id);
    const updatedUser = await this.usersRepository.preload({
      id,
      ...updateUserInput,
      profile: {
        ...user.profile,
        ...updateUserInput?.profile,
      },
    });
    console.log('pre', updateUserInput);
    await this.usersRepository.save(updatedUser);
    this.pubSubService.publish('userUpdated', {
      userUpdated: updatedUser,
    });
    const { profile, ...rest } = updateUserInput;
    this.eventEmitter.emit('updateFromIndex', {
      index: 'users',
      document: { id, ...profile, ...rest },
    });
    return updatedUser;
  }
  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    return this.usersRepository.remove(user);
  }
}
