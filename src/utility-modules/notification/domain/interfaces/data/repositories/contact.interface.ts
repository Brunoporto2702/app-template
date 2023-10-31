import { Contact } from '../../../models/contact';

export interface ContactRepository {
  insert(contact: Contact): Promise<Contact>;
}
