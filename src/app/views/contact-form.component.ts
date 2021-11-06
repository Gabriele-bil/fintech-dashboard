import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'ft-contact-form',
  template: `
    <form [formGroup]="contactForm">
      <mat-form-field appearance="fill" class="w-100">
        <mat-label>Nome</mat-label>
        <input matInput formControlName="name">
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-100">
        <mat-label>Surname</mat-label>
        <input matInput formControlName="surname">
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-100">
        <mat-label>IBAN</mat-label>
        <input matInput formControlName="iban">
      </mat-form-field>

      <button
        mat-raised-button [disabled]="contactForm.invalid"
        color="primary" class="w-100 mt-3"
        (click)="contactForm.valid && saveContact.emit(contactForm.value)">
        {{ initialContact ? 'Modifica' : 'Crea' }}
      </button>
    </form>
  `,
})
export class ContactFormComponent implements OnInit {
  @Input() initialContact: Omit<Contact, "_id"> | null = null;
  @Output() saveContact = new EventEmitter<Omit<Contact, "_id">>();

  public contactForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [this.initialContact?.name ? this.initialContact?.name : '', Validators.required],
      surname: [this.initialContact?.surname ? this.initialContact?.surname : '', Validators.required],
      iban: [this.initialContact?.iban ? this.initialContact?.iban : '', Validators.required],
    });
  }
}
