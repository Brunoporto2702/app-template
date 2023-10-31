import { UUID } from 'crypto';
import { Role } from 'src/common/core/types/role';

export default class LoggedUser {
  email: string;
  userId: UUID;
  roles: Role[];
}
