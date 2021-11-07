import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location.model';
import { DayWithSlots } from '../models/day-with-slots.model';
import { DayWithSlot } from '../models/day-with-slot';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  public getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>('/locations');
  }

  public getSlotsByLocationId(locationId: string): Observable<DayWithSlots[]>{
    return this.http.get<DayWithSlots[]>(`/slots/${locationId}`);
  }

  public scheduleAppointment(appointment: DayWithSlot): Observable<boolean> {
    return this.http.post<boolean>(`/schedule`, { appointment });
  }
}
