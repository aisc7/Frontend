import { Conductor } from './conductor.model';

export class Shift {
    id: number;
    startTime: Date;
    endTime: Date;
    location: string;
    conductorId: number;
    createdAt: Date;
    updatedAt: Date;
    conductor: Conductor;
}