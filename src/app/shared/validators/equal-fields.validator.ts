import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { Directive, Input } from '@angular/core';

export const equalFieldsValidator = (firstInput: string, secondInput: string): ValidatorFn  => {
  return (fGroup: AbstractControl): ValidationErrors | null => {
    const firstValue = fGroup.get(firstInput)?.value;
    const secondValue = fGroup.get(secondInput)?.value;

    if (firstValue && secondValue) {
      return firstValue === secondValue ? null : { equalFields: 'Le due password non coincidono' };
    }
    return null;
  }
}

@Directive({
  selector: '[equalFields]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EqualFieldsValidatorDirective,
    multi: true
  }]
})
export class EqualFieldsValidatorDirective implements Validator {
  @Input('equalFieldsFirstInput') firstInput: string = '';
  @Input('equalFieldsSecondInput') secondInput: string = '';

  public validate(fGroup: AbstractControl): ValidationErrors | null {
    return equalFieldsValidator(this.firstInput, this.secondInput);
  }
}
