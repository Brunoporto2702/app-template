import EmailTemplate from 'src/utility-modules/notification/domain/models/email.template';

export interface NewLeadTemplateData {
  name: string;
  email: string;
  role: string;
  company: string;
  message: string;
}

export default class NewLeadTemplate<
  NewLeadTemplateData,
> extends EmailTemplate {
  constructor(data: NewLeadTemplateData) {
    super(data);
  }

  getBody(): string {
    return `
      <h1>Novo contato do site</h1>
      <p>Name: ${this.data.name}</p>
      <p>Email: ${this.data.email}</p>
      <p>Position: ${this.data.role}</p>
      <p>Company: ${this.data.company}</p>
      <p>Message: ${this.data.message}</p>
        `;
  }
  getSubject(): string {
    return 'Novo contato do site';
  }
}
