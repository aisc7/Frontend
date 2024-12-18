import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ShiftService } from "./../../../services/shift.service";
import { Shift } from "src/app/models/shift.model";
import Swal from "sweetalert2";
import { Conductor } from "src/app/models/conductor.model";
import { ConductorService } from "src/app/services/conductor.service";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageShiftComponent implements OnInit {
  shiftForm: FormGroup;
  shiftId: number;
  mode: number;
  trySend: boolean = false;
  shift: Shift;
  conductors: Conductor[];

  constructor(
    private theFormBuilder: FormBuilder,
    private shiftService: ShiftService,
    private router: Router,
    private route: ActivatedRoute,
    private conductorsService: ConductorService
  ) {
    this.conductors = [];
    this.configFormGroup();
    this.shift = {
      id: 0,
      start_time: null,
      end_time: null,
      location: "",
      conductor: { id: null },
    };
  }

  conductorsList() {
    this.conductorsService.list().subscribe((data) => {
      this.conductors = data;
    });
  }

  ngOnInit(): void {
    this.conductorsList();
    this.configFormGroup();

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
    if (this.route.snapshot.params.id) {
      this.shiftId = this.route.snapshot.params.id;
      this.getShift(this.shiftId);
    }
  }

  configFormGroup() {
    this.shiftForm = this.theFormBuilder.group({
      start_time: ["", Validators.required],
      end_time: ["", Validators.required],
      location: ["", Validators.required],
      conductor_id: [null, Validators.required],
    });
  }

  getShift(id: number) {
    this.shiftService.get(id).subscribe((data) => {
      this.shiftForm.patchValue(data);
    });
  }

  get getTheFormGroup() {
    return this.shiftForm.controls;
  }

  create() {
    console.log(JSON.stringify(this.shift));

    this.trySend = true;

    // Formatear las fechas al formato ISO requerido
    const start_time = this.shiftForm.value.start_time
      ? new Date(this.shiftForm.value.start_time).toISOString().slice(0, 16)
      : null;

    const end_time = this.shiftForm.value.end_time
      ? new Date(this.shiftForm.value.end_time).toISOString().slice(0, 16)
      : null;

    // Actualizar los valores en el formulario
    this.shiftForm.patchValue({
      start_time: start_time,
      end_time: end_time,
    });

    console.log(
      "Valores del formulario antes de enviar:",
      this.shiftForm.value
    );
    if (this.shiftForm.valid) {
      this.shiftService.create(this.shiftForm.value).subscribe(() => {
        Swal.fire("Creado", "El Turno ha sido creado correctamente", "success");
        this.router.navigate(["/shifts"]);
      });
    } else {
      Swal.fire("Error", "Complete todos los campos obligatorios", "error");
    }
  }

  update() {
    this.trySend = true;
    if (this.shiftForm.valid) {
      this.shiftService
        .update(this.shiftId, this.shiftForm.value)
        .subscribe(() => {
          Swal.fire(
            "Actualizado",
            "El Turno ha sido actualizado correctamente",
            "success"
          );
          this.router.navigate(["/shifts"]);
        });
    }
  }
}
