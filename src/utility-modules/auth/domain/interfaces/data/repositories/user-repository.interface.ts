import { User } from '../../../models/user';

export interface UserRepository {
  insert(user: User): Promise<User>;
  findByEmail(email: string, password: string): Promise<User | null>;
}
