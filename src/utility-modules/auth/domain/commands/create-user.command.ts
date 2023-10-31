import { UUID } from 'crypto';
import { Role } from 'src/common/core/types/role';

export default class CreateUserCommand {
  constructor(
    email: string,
    password?: string,
    confirmed?: boolean,
    roles?: Role[],
    id?: UUID,
  ) {
    this.email = email;
    this.password = password;
    this.confirmed = confirmed;
    this.id = id;
    this.roles = roles;
  }
  email: string;
  password?: string;
  confirmed?: boolean;
  id?: UUID;
  roles?: Role[];
}
