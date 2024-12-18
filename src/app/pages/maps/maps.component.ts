import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'; // Librería de Mapbox
import { VehiculoService } from 'src/app/services/vehiculo.service'; // Servicio de vehículos
import { WebSocketService } from 'src/app/services/web-socket.service'; // Servicio WebSocket

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  @ViewChild('mapCanvas', { static: true }) mapElement!: ElementRef;

  private map!: mapboxgl.Map;
  private marker!: mapboxgl.Marker;

  vehicles: any[] = []; // Lista de vehículos cargados
  selectedVehicle: any = null; // Vehículo seleccionado

  constructor(
    private vehiculoService: VehiculoService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit() {
    this.loadVehicles(); // Cargar vehículos
    this.initializeMap(); // Inicializar el mapa
    this.initializeWebSocket(); // Inicializar WebSocket
  }

  // Cargar vehículos desde el servicio
  private loadVehicles(): void {
    this.vehiculoService.list().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles; // Asignar los vehículos al array
      },
      error: (err) => console.error('Error al cargar vehículos:', err),
    });
  }

  // Inicializar el mapa de Mapbox
  private initializeMap(): void {
    const mapCanvas = this.mapElement.nativeElement;
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYWlzYzA3IiwiYSI6ImNtNHB6Z2toOTB5d2cyanEybGd5dnE4bjkifQ.vdBNZstTVV-l-f18IUwNTg'; // Token de Mapbox

    // Inicializar Mapbox
    this.map = new mapboxgl.Map({
      container: mapCanvas,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0], // Coordenadas iniciales
      zoom: 2, // Nivel de zoom
    });

    // Crear marcador inicial vacío
    this.marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([0, 0]) // Posición inicial
      .addTo(this.map);

    // Actualizar posición al arrastrar el marcador
    this.marker.on('dragend', () => {
      const position = this.marker.getLngLat();
      this.updateVehiclePosition(position.lat, position.lng);
    });
  }

  // Inicializar WebSocket
  private initializeWebSocket(): void {
    this.webSocketService.setNameEvent('posicion_actualizada'); // Escuchar el evento 'posicion_actualizada'
    this.webSocketService.callback.subscribe((position: any) => {
      this.updateVehicleOnMap(position); // Actualizar vehículo en el mapa
    });
  }

  // Actualizar la posición del vehículo (cuando se mueve el marcador)
  private updateVehiclePosition(lat: number, lng: number): void {
    if (!this.selectedVehicle) {
      console.warn('No hay un vehículo seleccionado para actualizar.');
      return;
    }

    const payload = {
      vehiculoId: this.selectedVehicle.id,
      latitud: lat,
      longitud: lng,
    };

    this.vehiculoService.update(this.selectedVehicle.id, payload).subscribe({
      next: (response) => console.log('Posición actualizada:', response),
      error: (err) => console.error('Error al actualizar la posición:', err),
    });
  }

  // Actualizar la posición de un vehículo en el mapa cuando llega la actualización desde WebSocket
  private updateVehicleOnMap(position: any): void {
    const vehicle = this.vehicles.find(
      (v) => v.id === position.vehiculoId
    );
    if (vehicle) {
      vehicle.latitud = position.latitud;
      vehicle.longitud = position.longitud;
      // Actualiza el marcador en el mapa
      if (this.selectedVehicle && this.selectedVehicle.id === vehicle.id) {
        this.marker.setLngLat([vehicle.longitud, vehicle.latitud]);
        this.map.setCenter([vehicle.longitud, vehicle.latitud]);
      }
    }
  }

  // Manejar selección de vehículo
  onVehicleSelect(event: any): void {
    const selectedId = event.target.value;
    this.selectedVehicle = this.vehicles.find(
      (vehicle) => vehicle.id === selectedId
    );

    if (this.selectedVehicle) {
      const { latitud, longitud } = this.selectedVehicle;
      this.map.setCenter([longitud, latitud]);
      this.marker.setLngLat([longitud, latitud]);
    }
  }
}
