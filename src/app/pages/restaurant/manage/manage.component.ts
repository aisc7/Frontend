import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from './../../../services/restaurant.service';
import { Restaurant } from 'src/app/models/restaurant.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageRestaurantComponent implements OnInit {
  restaurantForm: FormGroup;
  restaurantId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1; // Modo de ver
    } else if (currentUrl.includes("create")) {
      this.mode = 2; // Modo de crear
    } else if (currentUrl.includes("update")) {
      this.mode = 3; // Modo de actualizar
    } else if (currentUrl.includes("delete")) {
      this.mode = 4; // Modo de eliminar
    }
    // Si estamos en modo actualización o eliminación, cargamos el restaurante
    if (this.restaurantId) {
      this.restaurantService.get(this.restaurantId).subscribe((data: Restaurant) => {
        this.restaurantForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.restaurantForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.restaurantForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.restaurantForm.valid) {
      this.restaurantService.create(this.restaurantForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Restaurante ha sido creado correctamente', 'success');
        this.router.navigate(['/restaurants']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.restaurantForm.valid) {
      this.restaurantService.update(this.restaurantId, this.restaurantForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Restaurante ha sido actualizado correctamente', 'success');
        this.router.navigate(['/restaurants']);
      });
    }
  }

  delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Este restaurante será eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.restaurantService.delete(this.restaurantId).subscribe(() => {
          Swal.fire('Eliminado', 'El restaurante ha sido eliminado', 'success');
          this.router.navigate(['/restaurants']);
        });
      }
    });
  }
}