import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DayWithSlots, Slots } from '../models/day-with-slots.model';
import { FormControl } from '@angular/forms';
import { DayWithSlot, Slot } from '../models/day-with-slot';

@Component({
  selector: 'ft-appointments-select-date',
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Seleziona una data</mat-label>
      <input
        matInput
        [matDatepicker]="picker"
        [matDatepickerFilter]="filterSlots"
        [formControl]="dateInput"
      >
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>

    <mat-list *ngIf="dateInput.value">
      <div mat-subheader>Orari disponibili</div>
      <mat-list-item *ngFor="let hour of hours" (click)="selectedDay(hour)">
        <mat-icon class="me-3">schedule</mat-icon>
        {{ hour }}
      </mat-list-item>
    </mat-list>
  `,
  styles: [`
    mat-list-item:hover {
      background-color: #4b4b4b;
      cursor: pointer;
    }
  `]
})
export class AppointmentsSelectDateComponent implements OnInit {
  @Input() slots: DayWithSlots[] = [];
  @Output() selectedDayWithSlot = new EventEmitter<DayWithSlot>();

  public dateInput = new FormControl('');
  public hours: Slots = [];
  public filterSlots = (d: Date | null): boolean => {
    const day = (d || new Date()).getDate();
    return !!this.slots.find(slot => {
      return new Date(slot.day).getDate() === day
    });
  };

  public ngOnInit(): void {
    this.dateInput.valueChanges.subscribe((d: Date) => {
      // Date picker restituisce la data un giorno prima
      const date = this.removeTimeZone(d).toISOString();
      const day = this.slots.find(slot => slot.day === date.substring(0,10));
      if (day) {
        this.hours = day.slots;
      }
    })
  }

  public selectedDay(slot: Slot): void {
    const dayWithSlot: DayWithSlot = {
      day: this.removeTimeZone(this.dateInput.value).toISOString().substring(0,10),
      slot
    };
    this.selectedDayWithSlot.emit(dayWithSlot);
  }

  private removeTimeZone = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset());
}
