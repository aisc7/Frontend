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
export class ManageComponent implements OnInit {
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
    this.hotelId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.hotelId) {
      this.hotelService.get(this.hotelId).subscribe((data: Hotel) => {
        this.hotelForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.hotelForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.hotelForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.hotelForm.valid) {
      this.hotelService.create(this.hotelForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Hotel ha sido creado correctamente', 'success');
        this.router.navigate(['/hotels']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.hotelForm.valid) {
      this.hotelService.update(this.hotelId, this.hotelForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Hotel ha sido actualizado correctamente', 'success');
        this.router.navigate(['/hotels']);
      });
    }
  }
}