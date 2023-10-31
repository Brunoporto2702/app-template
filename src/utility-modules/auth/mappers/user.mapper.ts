import Email from 'src/common/core/types/email';
import { User } from '../domain/models/user';
import { UserEntity } from '../infra/data/entities/user.entity';
import { Role } from 'src/common/core/types/role';
import { UserOut } from '../dtos/OUT/user-out.interface';
import Cpf from 'src/common/core/types/cpf';
import Cnpj from 'src/common/core/types/cnpj';
import { UUID } from 'crypto';

export class UserMapper {
  static modelToDao(user: User): UserEntity {
    const userDao = new UserEntity();
    userDao.email = user.email.value;
    userDao.id = user.id as UUID;
    userDao.password = user.password ? user.password : undefined;
    userDao.roles = user.roles ? (user.roles as string[]) : undefined;
    userDao.confirmed = user.confirmed;
    userDao.name = user.name;
    userDao.cellPhone = user.cellPhone;
    userDao.taxId = user.taxId?.value;
    return userDao;
  }

  static daoToModel(user: UserEntity): User {
    return {
      email: Email.create(user.email),
      password: user.password,
      roles: user.roles as Role[],
      confirmed: user.confirmed,
      id: user.id,
      name: user.name,
      cellPhone: user.cellPhone,
      taxId: !user.taxId
        ? undefined
        : Cpf.validate(user.taxId)
        ? Cpf.create(user.taxId)
        : Cnpj.validate(user.taxId)
        ? Cnpj.create(user.taxId)
        : undefined,
    };
  }

  static modelToUserOut(user: User): UserOut {
    return {
      email: user.email.value,
      id: user.id,
      cellPhone: user.cellPhone,
      name: user.name,
      confirmed: user.confirmed,
      roles: user.roles,
      taxId: String(user.taxId?.value),
    };
  }
}
