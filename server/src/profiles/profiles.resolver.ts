import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { IsAuthenticatedGuard } from 'src/auth/is-authenticated.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Profile)
@UseGuards(IsAuthenticatedGuard)
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) {}
  @Mutation(() => Profile)
  createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ) {
    return this.profilesService.create(createProfileInput);
  }
  @Query(() => [Profile], { name: 'profiles' })
  findAll() {
    return this.profilesService.findAll();
  }
  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.profilesService.findOne(id);
  }
  @Mutation(() => Profile)
  updateProfile(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return this.profilesService.update(id, updateProfileInput);
  }
  @Mutation(() => Profile)
  removeProfile(@Args('id', { type: () => ID }) id: string) {
    return this.profilesService.remove(id);
  }
}
