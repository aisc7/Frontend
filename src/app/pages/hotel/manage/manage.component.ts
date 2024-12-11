import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HotelService } from './../../../services/hotel.service';
import { Hotel } from 'src/app/models/hotel.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageHotelComponent implements OnInit {
  hotelForm: FormGroup;
  hotelId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private hotelService: HotelService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");
    
    // Determinamos el modo dependiendo de la URL
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    } else if (currentUrl.includes("delete")) {
      this.mode = 4;
    }

    // Si existe un ID, cargamos los datos del hotel
    if (this.route.snapshot.params.id) {
      this.hotelId = this.route.snapshot.params.id;
      this.getHotel(this.hotelId);
    }
  }

  // Configuramos el formulario con validaciones
  configFormGroup() {
    this.hotelForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  // Getter para los controles del formulario
  get getTheFormGroup() {
    return this.hotelForm.controls;
  }

  // Obtener los datos de un hotel específico
  getHotel(id: number) {
    this.hotelService.get(id).subscribe((data) => {
      this.hotelForm.patchValue(data); // Llenamos el formulario con los datos
    });
  }

  // Crear un nuevo hotel
  create() {
    this.trySend = true;
    if (this.hotelForm.valid) {
      this.hotelService.create(this.hotelForm.value).subscribe(() => {
        Swal.fire('Creado', 'El hotel ha sido creado correctamente', 'success');
        this.router.navigate(['/hotels']); // Redirige a la lista de hoteles
      });
    }
  }

  // Actualizar un hotel existente
  update() {
    this.trySend = true;
    if (this.hotelForm.valid) {
      this.hotelService.update(this.hotelId, this.hotelForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El hotel ha sido actualizado correctamente', 'success');
        this.router.navigate(['/hotels']); // Redirige a la lista de hoteles
      });
    }
  }

  // Eliminar un hotel
  delete() {
    this.hotelService.delete(this.hotelId).subscribe(() => {
      Swal.fire('Eliminado', 'El hotel ha sido eliminado correctamente', 'success');
      this.router.navigate(['/hotels']); // Redirige a la lista de hoteles
    });
  }

  // Maneja las acciones dependiendo del modo (crear/actualizar/eliminar)
  handleAction() {
    this.trySend = true;
    if (this.hotelForm.valid) {
      if (this.mode === 2) { // Crear
        this.create();
      } else if (this.mode === 3) { // Actualizar
        this.update();
      } else if (this.mode === 4) { // Eliminar
        this.delete();
      }
    }
  }
}
