import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualFieldsValidatorDirective } from '../validators/equal-fields.validator';

const validators = [EqualFieldsValidatorDirective];

@NgModule({
  declarations: [...validators],
  imports: [
    CommonModule
  ],
  exports: [...validators]
})
export class ValidatorsModule { }
