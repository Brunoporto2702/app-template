import { UUID } from 'crypto';
import { Role } from 'src/common/core/types/role';

export class UserOut {
  email: string;
  name?: string;
  roles?: Role[];
  id?: UUID;
  cellPhone?: number;
  confirmed?: boolean;
  taxId?: string;
}
