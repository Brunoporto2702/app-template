import { UUID } from 'crypto';

export default interface EmailResponse {
  id: UUID;
  status?: string;
}
