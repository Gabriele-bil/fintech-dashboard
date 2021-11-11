import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive } from '@angular/core';

export const IBAN_REGEX = /IT\d{2}[ ][a-zA-Z]\d{3}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{3}|IT\d{2}[a-zA-Z]\d{22}/;

export const ibanValidator = (input: AbstractControl): ValidationErrors | null =>
  input.value && !input.value.match(IBAN_REGEX) ? { iban: true } : null;

@Directive({
  selector: '[amount]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: IbanValidatorDirective,
    multi: true,
  }],
})
export class IbanValidatorDirective implements Validator {
  public validate(input: AbstractControl): ValidationErrors | null {
    return ibanValidator(input);
  }
}
