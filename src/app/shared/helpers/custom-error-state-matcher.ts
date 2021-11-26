import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class CustomErrorStateMatcher implements ErrorStateMatcher {

  public constructor(private controlKey: string) { }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidControl = control?.invalid;
    const errors = control?.parent?.errors;
    const invalidParent = errors ? errors[this.controlKey] : null;
    const userActions = control?.dirty || control?.touched || form?.submitted;
    console.log(control?.parent?.errors);

    return !!((invalidControl || invalidParent) && userActions);
  }
}
