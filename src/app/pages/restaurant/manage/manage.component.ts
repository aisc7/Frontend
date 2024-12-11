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
    this.restaurantId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
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
}