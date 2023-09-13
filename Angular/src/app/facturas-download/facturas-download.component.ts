import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturasService } from '../servicios/facturas.service';
import { ICliente } from '../interfaces/ICliente';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
    this.getLineas(this.id);

  }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 230;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
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

  cliente: any = {
    nombre: '',
    apellidos: '',
    nif: '',
    calle: '',
    numero: 0,
    cp: 0,
    ciudad: '',
    telefono: ''
  };

  vehiculo: any = {
    marca: "",
    modelo: "",
    matricula: "",
    km: ""
  };

  getFactura(id: string | null) {
    this.facturaService.getFactura(id).subscribe(data => {
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


      //vehicle
      this.vehiculo.marca = data.marca;
      this.vehiculo.modelo = data.modelo;
      this.vehiculo.km = data.km;
      this.vehiculo.matricula = data.matricula;


    }, error => {
      console.log(error);
    });
  }

  getLineas(id: string | null) {
    this.facturaService.getLinea(id).subscribe(data => {
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
}
