import Cnpj from './cnpj';
import Cpf from './cpf';

// export type TaxId = Cpf | Cnpj | null;

// export function getTaxId(text: string): TaxId {
//     if (!text) return null;
//     return Cpf.validate(text)
//         ? Cpf.create(text)
//         : Cnpj.validate(text)
//             ? Cnpj.create(text) : null;
// }

export default class TaxId {
  private constructor(taxId: Cpf | Cnpj) {
    this.value = taxId;
  }

  value: Cpf | Cnpj;

  static create(taxId: string) {
    if (!taxId) return null;
    return Cpf.validate(taxId)
      ? Cpf.create(taxId)
      : Cnpj.validate(taxId)
      ? Cnpj.create(taxId)
      : null;
  }
}
