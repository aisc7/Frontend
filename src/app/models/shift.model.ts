import { Conductor } from './conductor.model';

export class Shift {
    id?: number;
    start_time?: Date;
    end_time?: Date;
    location?: string;
    conductor?:Conductor
    createdAt?: Date;
    updatedAt?: Date;
   
}