import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DistributionCenterService } from './../../../services/distribution-center.service';
import { DistributionCenter } from 'src/app/models/distribution-center.model';
import Swal from 'sweetalert2';
import { Municipality } from 'src/app/models/municipality.model';
import { MunicipalityService } from 'src/app/services/municipality.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageDistributionCenterComponent implements OnInit {
  distributionCenterForm: FormGroup;
  distributionCenterId: number | null = null;
  mode: number = 2; // Default to create
  trySend: boolean = false;
  distributionCenter:DistributionCenter;
  municipalities:Municipality[];

  constructor(
    private formBuilder: FormBuilder,
    private distributionCenterService: DistributionCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private municipalitiesService:MunicipalityService
  ) {
    this.municipalities=[]
    this.configFormGroup();
    this.distributionCenter={id:0, name:"", phone:"", email:"", capacity:0, address_id:null, municipality:{
      id:null
    } }
  }

  municipalitiesList(){
    this.municipalitiesService.list().subscribe(data=>{
      this.municipalities=data;
    })
  }

  ngOnInit(): void {
    this.municipalitiesList();
    this.configFormGroup();
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1; // Modo Ver
    } else if (currentUrl.includes('create')) {
      this.mode = 2; // Modo Crear
    } else if (currentUrl.includes('update')) {
      this.mode = 3; // Modo Actualizar
    }

    if (this.route.snapshot.params['id']) {
      this.distributionCenterId = +this.route.snapshot.params['id'];
      this.getDistributionCenter(this.distributionCenterId);
    }
  }

  configFormGroup() {
    this.distributionCenterForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      capacity: ['', [Validators.required, Validators.min(0)]],
      address_id: ['', Validators.required],
      municipality_id: [null, Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.distributionCenterForm.controls;
  }

  getDistributionCenter(id: number) {
    this.distributionCenterService.get(id).subscribe((data) => {
      this.distributionCenterForm.patchValue(data);
    });
  }

  handleAction() {
    if (this.mode === 2) {
      this.create();
    } else if (this.mode === 3) {
      this.update();
    }
  }

  create() {
    this.trySend = true;
    if (this.distributionCenterForm.valid) {
      this.distributionCenterService.create(this.distributionCenterForm.value).subscribe(() => {
        Swal.fire('Creado', 'El centro de distribución ha sido creado correctamente', 'success');
        this.router.navigate(['/distribution-centers']);
      });
    } else {
      Swal.fire('Error', 'Complete todos los campos obligatorios', 'error');
    }
  }

  update() {
    this.trySend = true;
    if (this.distributionCenterForm.valid) {
      this.distributionCenterService.update(this.distributionCenterId!, this.distributionCenterForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El centro de distribución ha sido actualizado correctamente', 'success');
        this.router.navigate(['/distribution-centers']);
      });
    } else {
      Swal.fire('Error', 'Complete todos los campos obligatorios', 'error');
    }
  }

  delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Este centro de distribución será eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.distributionCenterService.delete(this.distributionCenterId!).subscribe(() => {
          Swal.fire('Eliminado', 'El centro de distribución ha sido eliminado', 'success');
          this.router.navigate(['/distribution-centers']);
        });
      }
    });
  }
}