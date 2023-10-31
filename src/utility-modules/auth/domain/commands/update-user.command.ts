import { UUID } from 'crypto';

export default class UpdateUserCommand {
  constructor(
    id: UUID,
    email: string,
    name?: string,
    cellPhone?: number,
    confirmed?: boolean,
    taxId?: string,
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.cellPhone = cellPhone;
    this.confirmed = confirmed;
    this.taxId = taxId;
  }
  id: UUID;
  email: string;
  name?: string;
  cellPhone?: number;
  confirmed?: boolean;
  taxId?: string;
}
