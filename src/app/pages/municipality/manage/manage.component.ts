import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MunicipalityService } from './../../../services/municipality.service';
import Swal from 'sweetalert2';
import { Municipality } from 'src/app/models/municipality.model';
import { DepartmentService } from 'src/app/services/department.service';
import { Department } from 'src/app/models/department.model';

@Component({
  selector: 'app-manage-municipality',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageMunicipalityComponent implements OnInit {
  municipalityForm: FormGroup;
  municipalityId: number;
  mode: number;
  trySend: boolean = false;
  municipality: Municipality;
  departments:Department[];
  department_id:number;


  constructor(
    private theFormBuilder: FormBuilder,
    private municipalityService: MunicipalityService,
    private router: Router,
    private route: ActivatedRoute,
    private departmentsService:DepartmentService
  ) {
    this.departments=[];
    this.configFormGroup();
    this.municipality = {id:0, name:"", description:"", department:{
      id:null
    }}
  }

  departmentsList(){
    this.departmentsService.list().subscribe(data=>{
      this.departments=data;
    })
  }

  ngOnInit(): void {
    this.departmentsList();
    this.configFormGroup();
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
      //this.municipalityForm.get("id").disable();
      this.municipalityForm.get("name").disable();
      this.municipalityForm.get("description").disable();
      this.municipalityForm.get("department").disable();
    } else if (currentUrl.includes('create') && !currentUrl.includes("createForDepartment")) {
      this.mode = 2;
     // this.municipalityForm.get("id").disable();
      this.municipalityForm.get("department").enable();
    } else if(currentUrl.includes("createForDepartment")){
      this.mode = 5;
      //this.municipalityForm.get("id").disable();
      this.department_id = this.route.snapshot.params.department_id;
      
      if (this.department_id) {
        this.municipality.department.id = this.department_id;
        this.municipalityForm.patchValue({department_id: this.department_id });
        // Deshabilitar municipality_id solo en modo createForMunicipality
        this.municipalityForm.get("department").disable();
    }
    
    else if (currentUrl.includes('update')) {
      this.mode = 3;
      this.municipalityForm.get("id").disable();
    } else if (currentUrl.includes('delete')) {
      this.mode = 4;
    }

    if (this.route.snapshot.params.id) {
      this.municipality.id = this.route.snapshot.params.id;
      this.getMunicipality(this.municipality.id);
    }
  }
}

  configFormGroup() {
    this.municipalityForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      description: [''],
      department_id: [null, Validators.required],
    });
  }

  get getTheFormGroup() {
    return this.municipalityForm.controls;
  }

  getMunicipality(id: number) {
    this.municipalityService.get(id).subscribe((data) => {
      this.municipalityForm.patchValue(data);
    });
  }

  handleAction() {
    this.trySend = true;
    if (this.municipalityForm.valid) {
      if (this.mode === 2) {
        this.create();
      } else if (this.mode === 3) {
        this.update();
      }
    }
  }

  create() {
    this.municipalityService.create(this.municipalityForm.value).subscribe(
      () => {
        Swal.fire('Creado', 'El municipio ha sido creado correctamente', 'success');
        this.router.navigate(['/municipalities']);
      },
      (error) => {
        Swal.fire('Error', 'Ocurrió un error al crear el municipio', 'error');
        console.error(error);
      }
    );
  }


  createForDepartment() {
    const department_id = this.municipality.department.id;
    console.log(JSON.stringify(this.municipality));
    this.municipalityService.createForDepartment(this.department_id, this.municipality).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      // Redirigir a la lista de operaciones del municipio específico
      this.router.navigate(["municipio/filterByDepartment", this.department_id]);
    });
  }
 


  update() {
    this.municipalityService.update(this.municipalityId, this.municipalityForm.value).subscribe(
      () => {
        Swal.fire('Actualizado', 'El municipio ha sido actualizado correctamente', 'success');
        this.router.navigate(['/municipalities']);
      },
      (error) => {
        Swal.fire('Error', 'Ocurrió un error al actualizar el municipio', 'error');
        console.error(error);
      }
    );
  }
}