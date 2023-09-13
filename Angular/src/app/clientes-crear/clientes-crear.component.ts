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
    nif: '',
    calle: '',
    numero:'',
    cp:'',
    ciudad: '',
    email: '',
  };
  validationMessages: any = {
    nombre: {
      required: 'El nombre es obligatorio.',
    },
    nif: {
      required: 'El nif es obligatorio.',
    },
    calle: {
      required: 'La calle es obligatoria.',
    },
    numero: {
      required: 'El numero es obligatorio.',
    },
    cp: {
      required: 'El Codigo Postal es obligatorio.',
    },
    ciudad: {
      required: 'La ciudad es obligatoria.',
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
      nif: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      cp: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
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
    
    if(!cliente.particularEmpresa){
      cliente.particularEmpresa=0;
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
