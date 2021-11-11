import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

const FISCAL_CODE_REGEX = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i;

export const fiscalCodeValidator = (input: AbstractControl): ValidationErrors | null =>
  input.value && !input.value.match(FISCAL_CODE_REGEX) ? { fiscalCode: true } : null;

@Directive({
  selector: '[fiscalCode]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: FiscalCodeValidatorDirective,
    multi: true,
  }],
})
export class FiscalCodeValidatorDirective implements Validator {
  public validate(input: AbstractControl): ValidationErrors | null {
    return fiscalCodeValidator(input);
  }
}
