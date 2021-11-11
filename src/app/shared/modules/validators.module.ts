import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualFieldsValidatorDirective } from '../validators/equal-fields.validator';
import { AmountValidatorDirective } from '../validators/amount.validator';

const validators = [EqualFieldsValidatorDirective, AmountValidatorDirective];

@NgModule({
  declarations: [...validators],
  imports: [CommonModule],
  exports: [...validators]
})
export class ValidatorsModule { }
