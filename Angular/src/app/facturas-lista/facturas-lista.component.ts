import { Component } from '@angular/core';
import { FacturasService } from '../servicios/facturas.service';
import { IFactura } from '../interfaces/IFactura';

@Component({
  selector: 'app-facturas-lista',
  templateUrl: './facturas-lista.component.html',
  styleUrls: ['./facturas-lista.component.css']
})
export class FacturasListaComponent {
  router: any;

  constructor(private facturasService: FacturasService) {

    const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, '0'); // Agregar ceros a la izquierda si es necesario
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 al mes ya que los meses comienzan desde 0
    const año = hoy.getFullYear().toString();

    this.fechaFin = `${año}-${mes}-${dia}`; // Formatear la fecha como "YYYY-MM-DD"

    const seisMesesAtras = new Date(hoy);
    seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6);
    const diaInicio = seisMesesAtras.getDate().toString().padStart(2, '0');
    const mesInicio = (seisMesesAtras.getMonth() + 1).toString().padStart(2, '0');
    const añoInicio = seisMesesAtras.getFullYear().toString();
    this.fechaInicio = `${añoInicio}-${mesInicio}-${diaInicio}`;
  
  }

  facturas: IFactura[] = [];
  listFilter: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';




  itemsPerPage: number = 7;
  currentPage: number = 1;

  ngOnInit(): void {

    console.log("Listado de facturas inicializado");
    this.facturasService.getFacturas().subscribe(resp => {
      if (resp.body) this.facturas = resp.body.reverse();
    });
  }



  confirmarEliminacion(): boolean {
    return confirm("¿Está seguro de que desea eliminar este factura?");
  }

  eliminarFactura(id: any) {
    if (this.confirmarEliminacion()) {
      this.facturasService.deleteFactura(id)
        .subscribe(
          response => {
            console.log(response);
            this.ngOnInit();
          },
          error => {
            console.log(error);
          });
    }
  }
}
