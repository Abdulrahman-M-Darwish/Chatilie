import { Resolver, Query, Mutation, Args, ID, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { IsAuthenticatedGuard } from 'src/auth/is-authenticated.guard';

@Resolver(() => User)
@UseGuards(IsAuthenticatedGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string, @Context('req') context) {
    return id === 'me' ? context.user : this.usersService.findOne(id);
  }
  @Mutation(() => User)
  updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Context('req') context,
  ) {
    const userId = updateUserInput.id || context.user.id;
    return this.usersService.update(userId, updateUserInput);
  }
  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }
}
