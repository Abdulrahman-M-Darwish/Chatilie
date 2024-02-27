import { Injectable } from '@nestjs/common';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
  ) {}
  async create(createProfileInput: CreateProfileInput) {
    const profile = this.profilesRepository.create(createProfileInput);
    return await this.profilesRepository.save(profile);
  }
  async findAll() {
    return await this.profilesRepository.find({ relations: { user: true } });
  }
  async findOne(id: string) {
    return await this.profilesRepository.findOneBy([
      { id },
      {
        user: [{ id }, { name: id }],
      },
    ]);
  }
  async update(id: string, updateProfileInput: UpdateProfileInput) {
    const profile = await this.findOne(id);
    return await this.profilesRepository.save({
      ...profile,
      ...updateProfileInput,
    });
  }
  async remove(id: string) {
    const profile = await this.profilesRepository.findOneBy({ id });
    return this.profilesRepository.remove(profile);
  }
}
