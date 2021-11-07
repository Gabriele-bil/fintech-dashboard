import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '../../../models/location.model';

@Component({
  selector: 'ft-appointments-list',
  template: `
    <mat-list>
      <div mat-subheader>Sedi</div>
      <mat-list-item *ngFor="let location of locations" (click)="selectedLocation.emit(location)">
        <mat-icon>apartment</mat-icon>
        <div class="ms-3">
          <p class="mb-0">{{ location.name }}</p>
          <small class="mb-0">{{ location.address }} - {{ location.phone }}</small>
        </div>
      </mat-list-item>
    </mat-list>
  `,
  styles: [`
    mat-list-item:hover {
      background-color: #4b4b4b;
      cursor: pointer;
    }

    small {
      color: #afafaf;
    }
  `],
})
export class AppointmentsListComponent {
  @Input() locations: Location[] = [];
  @Output() selectedLocation = new EventEmitter<Location>();
}
