import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IVehiculo } from '../interfaces/IVehiculo';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculosService } from '../servicios/vehiculos.service';
import { Util } from '../Utilidades/Util';

@Component({
  selector: 'app-vehiculos-editar',
  templateUrl: './vehiculos-editar.component.html',
  styleUrls: ['./vehiculos-editar.component.css']
})
export class VehiculosEditarComponent {
  post: any = '';
  id: string | null = '';
  myForm: FormGroup = this.formBuilder.group({});
  vehiculo: IVehiculo = {
    id: 0,
    matricula: '',
    marca: '',
    modelo: '',
    km: '',
    cv: '',
    proximaItv: '',
    cliente: {
      id: 0,
      nombre: '',
      apellidos: '',
      nif: '',
      calle: '',
      numero: 0,
      cp: 0,
      ciudad: '',
      telefono: '',
      email: '',
      particularEmpresa: 0
    }
  }
  formErrors: any = {
    matricula: '',
    marca: '',
    modelo:'',
    km:'',
    cliente_id: ''
  };
  validationMessages: any = {
    matricula: {
      required: 'La matricula es obligatoria.'
    },
    marca: {
      required: 'La marca es obligatoria.'
    },
    modelo: {
      required: 'El modelo es obligatorio.'
    },
    km: {
      required: 'Los km son obligatorios.'
    },
    cliente_id: {
      required: 'El cliente es obligatorio.'
    },

  };
  confirmacio: string = '';

  constructor(
    private ruta: ActivatedRoute,
    private vehiculosService: VehiculosService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.createForm();
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.getVehiculo(this.id);
    this.myForm.valueChanges.subscribe(() => {
      Util.onValueChanged(false, this.myForm, this.formErrors, this.validationMessages);
    });

  }
  getVehiculo(id: string | null) {
    this.vehiculosService.getVehiculo(id).subscribe(data => {
      this.vehiculo = data;
      this.myForm.setValue({
        matricula: data.matricula,
        marca: data.marca,
        modelo: data.modelo,
        km: data.km,
        cv: data.cv,
        proximaItv: data.proximaItv

      });
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
  createForm(): void {
    this.myForm = this.formBuilder.group({
      matricula: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      km: ['', [Validators.required]],
      cv: [''],
      proximaItv: [''],


    });
  }
  onSubmit(): void {

    Util.onValueChanged(true, this.myForm, this.formErrors, this.validationMessages);
    if (this.myForm.invalid) {
      return;
    }
    const formData = new FormData();
    const matricula = this.myForm.get('matricula')?.value;
    const marca = this.myForm.get('marca')?.value;
    const modelo = this.myForm.get('modelo')?.value;
    const km = this.myForm.get('km')?.value;
    const cv = this.myForm.get('cv')?.value;
    const proximaItv = this.myForm.get('proximaItv')?.value;


    if (matricula) formData.append('matricula', matricula);
    if (marca) formData.append('marca', marca);
    if (modelo) formData.append('modelo', modelo);
    if (km) formData.append('km', km);
    if (cv) formData.append('cv', cv);
    if (proximaItv) formData.append('proximaItv', proximaItv);


    const ps = this.vehiculosService.putVehiculo(this.id, formData);
    ps.subscribe(
      (resp) => {
        this.post = resp;
        if (resp.status == '200') {
          this.confirmacio = 'Vehicle actualizado correctamente';
          this.router.navigate(['vehiculos-lista']);
        } else {
          this.confirmacio = 'ERROR ' + resp.status;
        }
      },
      (error) => {
        alert('Error: ' + error.message); // podríamos mostrar el error en html
      });
  }

}
