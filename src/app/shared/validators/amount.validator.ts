import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

export const amountValidator = (input: AbstractControl): ValidationErrors | null =>
  !isNaN(Number(input.value)) && input.value >= 0 ? null : { amount: true };


@Directive({
  selector: '[amount]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: AmountValidatorDirective,
    multi: true
  }]
})
export class AmountValidatorDirective implements Validator {
  public validate(input: AbstractControl): ValidationErrors | null {
    return amountValidator(input);
  }
}
