import { Component } from '@angular/core';
import { ClientesService } from '../servicios/clientes.service';
import { VehiculosService } from '../servicios/vehiculos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturasService } from '../servicios/facturas.service';
import { ICliente } from '../interfaces/ICliente';
import { IVehiculo } from '../interfaces/IVehiculo';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';

@Component({
  selector: 'app-facturas-editar',
  templateUrl: './facturas-editar.component.html',
  styleUrls: ['./facturas-editar.component.css']
})
export class FacturasEditarComponent {
  constructor(
    private clientesService: ClientesService,
    private vehiculosService: VehiculosService,
    private FacturasService: FacturasService,
    private router: Router,
    private ruta: ActivatedRoute,


  ) { }
  id: string | null = '';

  ngOnInit(): void {

    this.id = this.ruta.snapshot.paramMap.get('id');
    this.getFactura(this.id);
    this.getLineas(this.id);

  }

  filas: any[] = [];

  factura: any = {
    descuento: 0,
    subtotal: 0,
    baseImponible: 0,
    ivaPorcentaje: 21,
    ivaDinero: 0,
    total: 0,
    numero: 0,
    fecha: ''
  };
  cliente_id: any;
  cliente: any = {
    id: 0,
    nombre: '',
    apellidos: '',
    nif: '',
    direccion: '',
    telefono: '',
    email: '',
    particularEmpresa: 0
  };
  clientesFiltrados: ICliente[] = [];
  borrar: ICliente[] = [];
  parametro: string = '';
  vehiculos: IVehiculo[] = [];

  vehiculo: any = {
    marca: "",
    modelo: "",
    matricula: "",
    km: "",
    id: 0
  };

  selectedOptionVehiculo: any;
  fecha: any;

  getFactura(id: string | null) {
    this.FacturasService.getFactura(id).subscribe(data => {
      //factura
      this.factura.fecha = data.data;
      this.factura.numero = data.numero;
      this.factura.total = data.totalConIva
      this.factura.baseImponible = data.total;
      this.factura.descuento = data.descuento;
      this.factura.ivaDinero = (data.totalConIva - data.total).toFixed(2);
      this.factura.subtotal = data.subtotal;
      this.factura.ivaPorcentaje = data.ivaPorcentaje;


      //client
      this.cliente.nombre = data.nombre;
      this.cliente.apellidos = data.apellidos;
      this.cliente.direccion = data.direccion;
      this.cliente.nif = data.nif;
      this.cliente.telefono = data.telefono;
console.log(data);

      //vehicle
      this.vehiculo.marca = data.marca;
      this.vehiculo.modelo = data.modelo;
      this.vehiculo.km = data.km;
      this.vehiculo.matricula = data.matricula;
      this.vehiculo.id = data.vehiculo_id;


    }, error => {
      console.log(error);
    });
  }

  getLineas(id: string | null) {
    this.FacturasService.getLinea(id).subscribe(data => {
      if (Array.isArray(data)) { // Verifica si 'data' es un array

        data.forEach((cont) => {
          this.filas.push({
            articulo: cont.nombre,
            unidades: cont.unidades,
            precioUn: cont.precioUn,
            subtotal: cont.precioSinIva,
            totalConIva: cont.precioConIva
          });
        });
      } console.log(this.filas);
    }, error => {
      console.log(error);
    });
  }


  //Fila

  agregarFila() {
    this.filas.push({
      articulo: '',
      unidades: 0,
      precioUn: 0,
      subtotal: 0.0,
      totalConIva: 0
    });
  }

  eliminarFila(index: number) {
    this.filas.splice(index, 1);


  }

  setArticulo(index: number) {
    const articulo: HTMLInputElement = document.getElementById("articulo" + index) as HTMLInputElement;
    console.log(this.filas);
    this.filas[index].articulo = articulo.value;
  }

  setUnidades(index: number) {
    const unidades: HTMLInputElement = document.getElementById("unidades" + index) as HTMLInputElement;
    const unidadesValue: number = parseFloat(unidades.value);

    this.filas[index].unidades = unidadesValue;
    this.calcularSubtotal(index);

  }

  setPrecioUn(index: number) {
    const precio: HTMLInputElement = document.getElementById("precioUn" + index) as HTMLInputElement;
    const precioValue: number = parseFloat(precio.value);

    this.filas[index].precioUn = precioValue;
    this.calcularSubtotal(index);
  }

  calcularSubtotal(index: number) {
    if (this.filas[index].unidades && this.filas[index].precioUn) {
      this.filas[index].subtotal = this.filas[index].unidades * this.filas[index].precioUn;

      this.filas[index].subtotal = parseFloat(this.filas[index].subtotal.toFixed(2));

      this.subtotalFactura();

      this.calcularIva(index);
    }
  }


  calcularIva(index: number) {
    if (this.filas[index].subtotal && this.factura.ivaPorcentaje) {
      const totalConIva = ((this.filas[index].subtotal / 100) * this.factura.ivaPorcentaje) + this.filas[index].subtotal;
      this.filas[index].totalConIva = parseFloat(totalConIva.toFixed(2));
    }
  }



  //Factura

  abrirCrearVehiculo() {
    window.open('../vehiculos-crear/', '_blank');
  }
  abrirCrearCliente() {
    window.open('../clientes-crear/', '_blank');
  }

  subtotalFactura() {
    this.factura.subtotal = 0;

    this.filas.forEach((fila, cont) => {
      if (this.filas[cont].subtotal) {
        this.factura.subtotal += this.filas[cont].subtotal;
      }
    });

    this.factura.subtotal = parseFloat(this.factura.subtotal.toFixed(2));

    this.baseImponible();
  }



  baseImponible() {
    if (this.factura.descuento) {
      const baseImponible = this.factura.subtotal - ((this.factura.subtotal / 100) * this.factura.descuento);
      this.factura.baseImponible = parseFloat(baseImponible.toFixed(2));
    } else {
      this.factura.baseImponible = parseFloat(this.factura.subtotal.toFixed(2));
    }

    this.ivaFactura();
  }


  setDescuento() {
    const descuento: HTMLInputElement = document.getElementById("descuento") as HTMLInputElement;
    const descuentoValue: number = parseFloat(descuento.value);

    this.factura.descuento = descuentoValue;
    this.baseImponible();

  }

  setIva() {
    const iva: HTMLInputElement = document.getElementById("iva") as HTMLInputElement;
    const ivaValue: number = parseFloat(iva.value);

    this.factura.ivaPorcentaje = ivaValue;
    this.ivaFactura();

  }



  ivaFactura() {
    if ((parseInt(this.factura.ivaPorcentaje)>0) && this.factura.baseImponible) {
      const ivaDinero = ((this.factura.baseImponible / 100) * this.factura.ivaPorcentaje);
      this.factura.ivaDinero = parseFloat(ivaDinero.toFixed(2));
    } else {
      this.factura.ivaDinero = 0;

    }

    this.totalFactura();

  }

  totalFactura() {
    if (this.factura.baseImponible) {
      const total = this.factura.baseImponible + this.factura.ivaDinero;
      this.factura.total = parseFloat(total.toFixed(2));
    } else {
      this.factura.total = 0;

    }
  }



  // Relaciones

  clientesBuscar(parametro: any) {

    if (parametro != '') {
      this.clientesService.clientesBuscar(parametro).subscribe(resp => {
        if (resp.body) this.clientesFiltrados = resp.body.reverse();
      });
    } else {
      this.clientesFiltrados = this.borrar;
    }

  }

  clienteSeleccionado(id: any) {

    this.cliente_id = id;
    this.getCliente(id);

    if (this.cliente) {
      this.clientesFiltrados = this.borrar;
    }
  }

  getCliente(id: string | null) {
    this.clientesService.getCliente(id).subscribe(data => {
      this.cliente = data;
      this.cliente.nombre = data.nombre;
      this.cliente.apellidos = data.apellidos;
      this.cliente.direccion = data.calle + ', ' + data.numero + ' ' + data.ciudad + ' ' + data.cp;
      this.cliente.nif = data.nif;
      this.cliente.telefono = data.telefono;
    }, error => {
      console.log(error);
    });

    this.vehiculosService.getVehiculoCliente(id).subscribe(resp => {

      if (resp.body) this.vehiculos = resp.body.reverse();
      this.vehiculo = "";
    });
  }


  actualizarVehiculo(index: any) {

    this.vehiculosService.getVehiculo(index).subscribe(data => {
      console.log();

      if (data) {
        this.vehiculo = data;

      } else {
        console.error('La respuesta de la solicitud no contiene datos válidos.');
      }


    });
  }
  setKm() {

    const km: HTMLInputElement = document.getElementById("km") as HTMLInputElement;
    this.vehiculo.km = km.value;

  }

  setFactura() {
    const numero: HTMLInputElement = document.getElementById("numero") as HTMLInputElement;
    this.factura.numero = numero.value;
  }

  setFecha() {
    const fecha: HTMLInputElement = document.getElementById("fecha") as HTMLInputElement;
    this.factura.fecha = fecha.value;
  }

  // Enviar Factura

  error_fecha: string = "";
  error_numeroFac: string = "";
  error_cliente: string = "";
  error_articulo: string = "";
  error_filas: string = "";
  error_factura: boolean = true;
  error_array: string = "";


  onSubmit() {

    const formData = new FormData();

    //Comprobaciones

    let errores = true;
    this.error_factura = true;

    if (this.factura.fecha) {
      formData.append('data', this.factura.fecha);
      this.error_fecha = "";
    } else {
      this.error_fecha = "Introducir fecha";
      errores = false;
    }

    if (this.factura.numero) {
      formData.append('numero', this.factura.numero);
      this.error_numeroFac = "";
    } else {
      this.error_numeroFac = "Introducir numero de factura";
      errores = false;
    }

    if (this.cliente.nif) {
      this.error_cliente = "";
    } else {
      this.error_cliente = "Seleccionar un cliente";
      errores = false;
    }

    if(this.filas.length<1){
      this.error_array= `Añadir minimo una fila`;
      errores = false;
    }else{
      this.error_array = ``;
    }

    this.filas.forEach((fila, cont) => {
      for (const campo in fila) {
        if (fila[campo] == "") {

          this.error_filas = `Campo ${campo} vacío de la fila ${cont + 1}`;
          this.error_factura = false;
          errores = false;
          break; // Detener el bucle en caso de encontrar un campo vacío
        }
        
      }
    });
    if (this.error_factura) {
      this.error_filas = "";

    }




    if (errores) {
      this.error_filas = "";
      formData.append('lineas', JSON.stringify(this.filas));
      formData.append('total', this.factura.baseImponible);
      formData.append('totalConIva', this.factura.total);
      formData.append('subtotal', this.factura.subtotal);
      formData.append('ivaPorcentaje', this.factura.ivaPorcentaje);
      if(this.factura.descuento){
        formData.append('descuento', this.factura.descuento);
      }else{
        formData.append('descuento',"0");
      }
      
      formData.append('nombre', this.cliente.nombre);
      formData.append('apellidos', this.cliente.apellidos);
      formData.append('direccion', this.cliente.direccion);
      formData.append('nif', this.cliente.nif);
      formData.append('telefono', this.cliente.telefono);



      if (this.vehiculo.marca) { formData.append('marca', this.vehiculo.marca); }
      if (this.vehiculo.modelo) { formData.append('modelo', this.vehiculo.modelo); }
      if (this.vehiculo.matricula) { formData.append('matricula', this.vehiculo.matricula); }
      if (this.vehiculo.km) { formData.append('km', this.vehiculo.km); }
      if (this.vehiculo.id) { formData.append('vehiculo_id', this.vehiculo.id); }


      this.FacturasService.putFactura(this.id, formData).subscribe({
        next: (data) => {
          this.router.navigate(['facturas-lista/'])


        },
        error: (error) => {
        }
      });


    }


  }
}
