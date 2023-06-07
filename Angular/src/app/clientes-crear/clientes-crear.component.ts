import { Component } from '@angular/core';
import { ClientesService } from '../servicios/clientes.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Util } from '../Utilidades/Util';

@Component({
  selector: 'app-clientes-crear',
  templateUrl: './clientes-crear.component.html',
  styleUrls: ['./clientes-crear.component.css']
})
export class ClientesCrearComponent {
  constructor(
    private clientesService: ClientesService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.myForm = new FormGroup({
    });
  }
  myForm: FormGroup;
  errorMessage: string = '';
  formErrors: any = {
    nombre: '',
    numero:'',
    cp:'',
    email: '',
  };
  validationMessages: any = {
    nombre: {
      required: 'El nombre es obligatorio.',
    },
    numero: {
      pattern:'El numero no puede contener letras'
    },
    cp: {
      pattern: 'El Codigo Postal no puede contener letras',
    },
    email: {
      email: 'El correo electrónico no es válido.'
    }
  };


  ngOnInit(): void {

    console.log("Formulario de clientes inicializado");

    //Crear formulario y validaciones

    this.myForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: [''],
      nif: [''],
      calle: [''],
      numero: ['', [Validators.pattern('^[0-9]+$')]],
      cp: ['', [Validators.pattern('^[0-9]+$')]],
      ciudad: [''],
      telefono: [''],
      email: ['', [Validators.email]],
      particularEmpresa:['']

    });

    //Validar formulario y mostrar  errores

    this.myForm.valueChanges.subscribe(() => {
      Util.onValueChanged(false, this.myForm,this.formErrors,this.validationMessages);
    });
  }

  onSubmit(cliente: any) {
    Util.onValueChanged(true,this.myForm,this.formErrors,this.validationMessages);
    if (this.myForm.invalid) {
      return;
    }
    
    this.clientesService.postCliente(cliente).subscribe({
      next: (data) => {
        this.router.navigate(['clientes-lista'])
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });


  }

}
