import { User } from 'src/utility-modules/auth/domain/models/user';
import { UserEntity } from 'src/utility-modules/auth/infra/data/entities/user.entity';
import { UserMapper } from 'src/utility-modules/auth/mappers/user.mapper';
import { Role } from 'src/common/core/types/role';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

const usersToCreate: UserEntity[] = [
  UserMapper.modelToDao(
    User.create('admin@admin.com', bcrypt.hashSync('password', 10), [
      Role.Admin,
      Role.User,
    ]),
  ),
];

function seedUsers(repository: Repository<UserEntity>) {
  usersToCreate.forEach(async (user) => {
    const userExists = await repository.findOne({
      where: {
        email: user.email,
      },
    });
    if (!userExists) await repository.insert(user);
  });
}

export default seedUsers;
