import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturasService } from '../servicios/facturas.service';
import { ICliente } from '../interfaces/ICliente';

@Component({
  selector: 'app-facturas-download',
  templateUrl: './facturas-download.component.html',
  styleUrls: ['./facturas-download.component.css']
})
export class FacturasDownloadComponent {
  id: string | null = '';
  constructor(
    private ruta: ActivatedRoute,
    private facturaService: FacturasService,
  ) { }
  ngOnInit(): void {
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.getFactura(this.id);
  }

  filas: any[] = [
    {
      articulo: '',
      unidades: 0,
      precioUn: 0,
      subtotal: 0.0,
      totalConIva: 0
    }
  ];

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

  cliente: any = {
    nombre: '',
    apellidos: '',
    nif: '',
    calle: '',
    numero: 0,
    cp: 0,
    ciudad: '',
  };

  vehiculo: any = {
    marca: "",
    modelo: "",
    matricula: "",
    km: ""
    }


  getFactura(id: string | null) {
    this.facturaService.getFactura(id).subscribe(data => {
      //factura
      this.factura.descuento = data.data;
      this.factura.numero = data.numero;
      //client
      this.cliente.nombre = data.nombre;
      this.cliente.apellidos = data.apellidos;
      this.cliente.direccion = data.apellidos;

      this.client_movil = data.client.movil;
      //vehicle
      this.vehicle_marca_model = data.vehicle.marca + " " + data.vehicle.model;
      this.vehicle_matricula = data.vehicle.matricula;
      this.vehicle_km = data.vehicle.km;

      this.serveiArr = this.serveiArr.concat(data.serveis);
      console.log(this.serveiArr);
      this.total_factura = 0;
      this.serveiArr.forEach(servei => {
        this.total_factura += servei.pivot.unitats * servei.preu;
      });
  
      this.total_factura_iva = Number((this.total_factura * 1.21).toFixed(2));

      console.log(this.serveiArr);


    }, error => {
      console.log(error);
    });
  }


}
