import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive, Input } from '@angular/core';

export const equalFieldsValidator = (fGroup: AbstractControl, firstInput: string, secondInput: string): ValidationErrors | null  => {
  const firstValue = fGroup.get(firstInput)?.value;
  const secondValue = fGroup.get(secondInput)?.value;

  return firstValue === secondValue ? null : { equalFields: true };
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
    return equalFieldsValidator(fGroup, this.firstInput, this.secondInput);
  }
}
