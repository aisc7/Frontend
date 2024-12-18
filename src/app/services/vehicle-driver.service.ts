import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { VehicleDriver } from "../models/vehicle-driver.model";

@Injectable({
  providedIn: "root",
})
export class VehicleDriverService {
  constructor(private http: HttpClient) {}

  list(): Observable<VehicleDriver[]> {
    return this.http.get<VehicleDriver[]>(
      `${environment.url_ms_businessAKJ}/vehicledrivers`
    );
  }

  listByVehiculo(vehiculo_id: number): Observable<VehicleDriver[]> {
    return this.http.get<VehicleDriver[]>(
      `${environment.url_ms_businessAKJ}/spents?dueno_id=${vehiculo_id}`
    );
  }

  listByConductor(conductor_id: number): Observable<VehicleDriver[]> {
    return this.http.get<VehicleDriver[]>(
      `${environment.url_ms_businessAKJ}/spents?conductor_id=${conductor_id}`
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${environment.url_ms_businessAKJ}/vehicledrivers/${id}`
    );
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(
      `${environment.url_ms_businessAKJ}/vehicledrivers/${id}`
    );
  }

  create(vehicleDriver: any): Observable<any> {
    delete vehicleDriver.id;
    return this.http.post<any>(
      `${environment.url_ms_businessAKJ}/vehicledrivers`,
      vehicleDriver
    );
  }

  update(id: number, vehicleDriver: any): Observable<any> {
    return this.http.put<any>(
      `${environment.url_ms_businessAKJ}/vehicledrivers/${id}`,
      vehicleDriver
    );
  }
}
