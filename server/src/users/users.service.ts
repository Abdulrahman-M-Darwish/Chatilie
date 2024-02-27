import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ProfilesService } from 'src/profiles/profiles.service';
import { Gender } from 'src/profiles/entities/profile.entity';
import { PubSubService } from 'src/pubsub/pubsub.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly profilesService: ProfilesService,
    private readonly pubSubService: PubSubService,
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
    return { ...theUser, profile };
  }
  async findAll() {
    return await this.usersRepository.find({ relations: { profile: true } });
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
    const updatedUser = await this.usersRepository.save({
      ...user,
      ...updateUserInput,
    });
    this.pubSubService.publish('userUpdated', {
      userUpdated: updatedUser,
    });
    return updatedUser;
  }
  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    return this.usersRepository.remove(user);
  }
}
