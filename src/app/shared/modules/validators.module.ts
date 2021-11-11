import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualFieldsValidatorDirective } from '../validators/equal-fields.validator';
import { AmountValidatorDirective } from '../validators/amount.validator';
import { IbanValidatorDirective } from '../validators/iban.validators';
import { TransferValidators } from '../validators/transfer.validator';

const validators = [EqualFieldsValidatorDirective, AmountValidatorDirective, IbanValidatorDirective];

@NgModule({
  declarations: [...validators],
  imports: [CommonModule],
  exports: [...validators],
  providers: [TransferValidators]
})
export class ValidatorsModule { }
