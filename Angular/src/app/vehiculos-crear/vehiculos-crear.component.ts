import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculosService } from '../servicios/vehiculos.service';
import { ClientesService } from '../servicios/clientes.service';
import { Router } from '@angular/router';
import { ICliente } from '../interfaces/ICliente';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Util } from '../Utilidades/Util';

@Component({
  selector: 'app-vehiculos-crear',
  templateUrl: './vehiculos-crear.component.html',
  styleUrls: ['./vehiculos-crear.component.css']
})
export class VehiculosCrearComponent {
  constructor(
    private vehiculosService: VehiculosService,
    private clientesService: ClientesService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.myForm = new FormGroup({
    });
  }

  clientes: ICliente[] = [];
  myForm: FormGroup;
  errorMessage: string = '';
  parametro: string = '';
  cliente_id: string = '';
  clientesFiltrados: ICliente[] = [];
  borrar: ICliente[] = [];

  formErrors: any = {
    matricula: '',
    marca: '',
    cliente_id: ''
  };
  validationMessages: any = {
    matricula: {
      required: 'La matricula es obligatoria.'
    },
    marca: {
      required: 'La marca es obligatoria.'
    },
    cliente_id: {
      required: 'El cliente es obligatorio.'
    },

  };

  ngOnInit() {

    this.clientesService.getClientes().subscribe(resp => {
      if (resp.body) this.clientes = resp.body.reverse();
    });
    console.log(this.clientes)


    this.myForm = this.formBuilder.group({

      matricula: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      modelo: [''],
      km: [''],
      cv: [''],
      proximaItv: [''],
      cliente_id: ['', Validators.required]
    });


    this.myForm.valueChanges.subscribe(() => {
      Util.onValueChanged(false, this.myForm, this.formErrors, this.validationMessages);
    });
  }

  clientesBuscar(parametro: any) {

    if (parametro != '') {
      this.clientesService.clientesBuscar(parametro).subscribe(resp => {
        if (resp.body) this.clientesFiltrados = resp.body.reverse();
      });
    }else {
      this.clientesFiltrados=this.borrar;
    }

  }

  clienteSeleccionado(id:any,nombre: string , apellidos: string){
    this.cliente_id=id;
    
    const elementoCliente = document.getElementById('cliente') as HTMLInputElement;
    if (elementoCliente) {
      elementoCliente.value = nombre + " " + apellidos;
    }
    this.clientesFiltrados=this.borrar;

  }




  onSubmit(vehiculo: any) {
    Util.onValueChanged(true, this.myForm, this.formErrors, this.validationMessages);
    if (this.myForm.invalid) {
      return;
    }

    vehiculo.cliente_id=this.cliente_id;
    this.vehiculosService.postVehiculo(vehiculo).subscribe({
      next: (data) => {
        this.router.navigate(['vehiculos-lista'])
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });


  }

}
