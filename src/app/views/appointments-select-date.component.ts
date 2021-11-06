import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DayWithSlots, Slots } from '../models/day-with-slots.model';
import { FormControl } from '@angular/forms';
import { DayWithSlot, Slot } from '../models/day-with-slot';
import * as L from 'leaflet'
import { Location } from '../models/location.model';

@Component({
  selector: 'ft-appointments-select-date',
  template: `
    <div #host style="width: 100%; height: 300px" class="mb-4"></div>

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
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppointmentsSelectDateComponent implements OnInit, OnChanges {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;
  @Input() slots: DayWithSlots[] = [];
  @Input() location: Location | null = null;
  @Output() selectedDayWithSlot = new EventEmitter<DayWithSlot>();

  public dateInput = new FormControl('');
  public hours: Slots = [];
  public filterSlots = (d: Date | null): boolean => {
    const day = (d || new Date()).getDate();
    return !!this.slots.find(slot => {
      return new Date(slot.day).getDate() === day
    });
  };

  public map!: L.Map;
  public marker!: L.Marker;

  public ngOnInit(): void {
    this.dateInput.valueChanges.subscribe((d: Date) => {
      // Date picker restituisce la data un giorno prima
      const date = this.clearTimeZone(d).toISOString();
      const day = this.slots.find(slot => slot.day === date.substring(0,10));
      if (day) {
        this.hours = day.slots;
      }
    })
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.location && changes.location.firstChange) {
      const coords: L.LatLngExpression = changes.location.currentValue.coords as L.LatLngExpression;
      this.map = L.map(this.host.nativeElement).setView(coords, 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
        this.map
      );

      this.marker = L.marker(coords)
        .addTo(this.map)
        .bindPopup(changes.location.currentValue.name)
        .openPopup();
    }

    if (changes.location && !changes.location.firstChange) {
      const coords: L.LatLngExpression = changes.location.currentValue.coords as L.LatLngExpression;
      this.map.setView(coords);
      this.marker.setLatLng(coords);
      this.marker.bindPopup(changes.location.currentValue.name);
    }
  }

  public selectedDay(slot: Slot): void {
    const dayWithSlot: DayWithSlot = {
      day: this.clearTimeZone(this.dateInput.value).toISOString().substring(0,10),
      slot
    };
    this.selectedDayWithSlot.emit(dayWithSlot);
  }

  private clearTimeZone = (d: Date): Date => new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() - d.getTimezoneOffset());
}
