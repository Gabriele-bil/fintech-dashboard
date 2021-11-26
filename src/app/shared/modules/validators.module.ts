import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualFieldsValidatorDirective } from '../validators/equal-fields.validator';
import { AmountValidatorDirective } from '../validators/amount.validator';
import { IbanValidatorDirective } from '../validators/iban.validators';
import { TransferValidators } from '../validators/transfer.validators';
import { FiscalCodeValidatorDirective } from '../validators/fiscal-code.validator';
import { ProvinciaValidators } from "../validators/provincia.validators";

const validators = [
  EqualFieldsValidatorDirective,
  AmountValidatorDirective,
  IbanValidatorDirective,
  FiscalCodeValidatorDirective
];

@NgModule({
  declarations: [...validators],
  imports: [CommonModule],
  exports: [...validators],
  providers: [TransferValidators, ProvinciaValidators],
})
export class ValidatorsModule {
}
