import { UserRepository } from 'src/utility-modules/auth/domain/interfaces/data/repositories/user-repository.interface';
import { User } from 'src/utility-modules/auth/domain/models/user';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { DbService } from 'src/utility-modules/data/db/db.service';
import { Inject } from '@nestjs/common';
import { UserMapper } from 'src/utility-modules/auth/mappers/user.mapper';
import { UUID } from 'crypto';

export class SqlUserRepository implements UserRepository {
  userRepository: Repository<UserEntity>;

  constructor(@Inject(DbService) private readonly db: DbService) {
    this.userRepository = this.db.db.getRepository(UserEntity);
  }
  async insert(user: User): Promise<User> {
    const userDao = UserMapper.modelToDao(user);
    const userSaved = await this.userRepository.save(userDao);
    return UserMapper.daoToModel(userSaved);
  }

  async findById(id: UUID): Promise<User | null> {
    if (!id) return null;
    const userExists = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    return userExists ? UserMapper.daoToModel(userExists) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    if (!email) return null;
    const userExists = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
    return userExists ? UserMapper.daoToModel(userExists) : null;
  }

  async update(user: User): Promise<User | null> {
    const userDao = UserMapper.modelToDao(user);
    const userUpdated = await this.userRepository.save(userDao);
    return UserMapper.daoToModel(userUpdated);
  }
}
