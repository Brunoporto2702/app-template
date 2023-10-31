import { UUID } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import Email from 'src/common/core/types/email';
import { Role } from 'src/common/core/types/role';
import Cpf from 'src/common/core/types/cpf';
import Cnpj from 'src/common/core/types/cnpj';
import InvalidInputException from 'src/common/core/exceptions/invalid-input.exception';

export class User {
  private constructor(
    email: Email,
    password?: string,
    roles?: Role[],
    confirmed?: boolean,
    id?: UUID,
    taxId?: Cpf | Cnpj,
    name?: string,
    cellPhone?: number,
  ) {
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.confirmed = confirmed;
    this.id = id;
    this.taxId = taxId;
    this.name = name;
    this.cellPhone = cellPhone;
  }
  email: Email;
  password?: string;
  roles?: Role[];
  confirmed?: boolean;
  id?: UUID;
  taxId?: Cpf | Cnpj;
  name?: string;
  cellPhone?: number;

  static create(
    email: string,
    password?: string,
    roles?: Role[],
    confirmed?: boolean,
    id?: UUID,
    taxId?: Cpf | Cnpj,
    name?: string,
    cellPhone?: number,
  ): User {
    id = id ? id : (uuidv4() as UUID);
    const emailObject = Email.create(email);

    if (
      !roles ||
      roles.length === 0 ||
      !roles.every((role) => Object.values(Role).includes(role as Role))
    ) {
      throw new InvalidInputException(
        'Invalid user roles',
        'Invalid user roles',
      );
    }

    return new User(
      emailObject,
      password,
      roles,
      confirmed,
      id,
      taxId,
      name,
      cellPhone,
    );
  }
}
