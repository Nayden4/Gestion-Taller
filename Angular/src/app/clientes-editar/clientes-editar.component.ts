import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICliente } from '../interfaces/ICliente';
import { ClientesService } from '../servicios/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from '../Utilidades/Util';

@Component({
  selector: 'app-clientes-editar',
  templateUrl: './clientes-editar.component.html',
  styleUrls: ['./clientes-editar.component.css']
})
export class ClientesEditarComponent {
  post: any = '';
  id: string | null = '';
  confirmacio: string = '';
  headers: any;
  myForm: FormGroup = this.formBuilder.group({});
  cliente: ICliente = {
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
  formErrors: any = {
    nombre: '',
    numero: '',
    cp: '',
    email: '',
  };
  validationMessages: any = {
    nombre: {
      required: 'El nombre es obligatorio.',
    },
    numero: {
      pattern: 'El numero no puede contener letras'
    },
    cp: {
      pattern: 'El Codigo Postal no puede contener letras',
    },
    email: {
      email: 'El correo electrónico no es válido.'
    }
  };

  constructor(
    private ruta: ActivatedRoute,
    private clienteService: ClientesService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
    console.log('Formulario de edicion clientes iniciado')
    this.createForm();
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.getCliente(this.id);
    this.myForm.valueChanges.subscribe(() => {
      Util.onValueChanged(false, this.myForm, this.formErrors, this.validationMessages);
    });
  }

  getCliente(id: string | null) {
    this.clienteService.getCliente(id).subscribe(data => {
      this.cliente = data;
      this.myForm.setValue({
        nombre: data.nombre,
        apellidos: data.apellidos,
        nif: data.nif,
        calle: data.calle,
        numero: data.numero,
        cp: data.cp,
        ciudad: data.ciudad,
        telefono: data.telefono,
        email: data.email,
        particularEmpresa: data.particularEmpresa
      });
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  createForm(): void {
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
      particularEmpresa: ['']
    });
  }

  onSubmit(): void {
    
    Util.onValueChanged(true, this.myForm,this.formErrors,this.validationMessages);

    if (this.myForm.invalid) {
      return;
    }
    const formData = new FormData();
    const nombre = this.myForm.get('nombre')?.value;
    const apellidos = this.myForm.get('apellidos')?.value;
    const nif = this.myForm.get('nif')?.value;
    const calle = this.myForm.get('calle')?.value;
    const numero = this.myForm.get('numero')?.value;
    const cp = this.myForm.get('cp')?.value;
    const ciudad = this.myForm.get('ciudad')?.value;
    const telefono = this.myForm.get('telefono')?.value;
    const email = this.myForm.get('email')?.value;
    const particularEmpresa = this.myForm.get('particularEmpresa')?.value;

    
    if (nombre) formData.append('nombre', nombre);
    if (apellidos) formData.append('apellidos', apellidos);
    if (nif) formData.append('nif', nif);
    if (calle) formData.append('calle', calle);
    if (numero) formData.append('numero', numero);
    if (cp) formData.append('cp', cp);
    if (ciudad) formData.append('ciudad', ciudad);
    if (telefono) formData.append('telefono', telefono);
    if (email) formData.append('email', email);
    if (particularEmpresa) formData.append('particularEmpresa', particularEmpresa);


    const ps = this.clienteService.putCliente(this.id, formData);
    ps.subscribe(
      (resp) => { 
        this.post = resp;
        if (resp.status == '200') {
          this.confirmacio = 'Cliente actualizado correctamente';
          this.router.navigate(['clientes-lista']);
        } else {
          this.confirmacio = 'ERROR ' + resp.status; 
        }
      },
      (error) => {  
        alert('Error: ' + error.message); // podríamos mostrar el error en html
      });      
  }

}
