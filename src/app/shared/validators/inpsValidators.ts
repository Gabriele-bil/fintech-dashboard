import { AbstractControl, ValidationErrors } from '@angular/forms';

export const inpsValidators = (fGrop: AbstractControl): ValidationErrors | null => {
  const firstValue: Date = fGrop.get('da')?.value;
  const secondValue: Date = fGrop.get('a')?.value;

  if (firstValue && secondValue) {
    return secondValue.getTime() < firstValue.getTime()
           ? { inps: 'La data di inizio deve essere precedente alla data di fine' }
           : null
  }
  return null;
}
