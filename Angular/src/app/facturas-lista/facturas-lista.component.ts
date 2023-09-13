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
  constructor(private facturasService: FacturasService) { }
  facturas: IFactura[] = [];
  listFilter: string = '';

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
