import { Slot } from './day-with-slot';

export interface DayWithSlots {
  day: string;
  slots: Slots;
}

export type Slots = Array<Slot>;
