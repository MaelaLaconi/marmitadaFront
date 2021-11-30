import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

  /**
   * Function to control email with custom validator
   */
  static firstLetterUpper(control: AbstractControl): ValidationErrors | null {
    // returns control
    return /\b[A-Z][a-z-A-Z0-9]*\b/.test(control.value) ? null : {
      firstLetterUpper: true
    };
  }
}
