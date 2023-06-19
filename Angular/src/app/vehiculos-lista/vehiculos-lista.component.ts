import { Component } from '@angular/core';
import { VehiculosService } from '../servicios/vehiculos.service';
import { IVehiculo } from '../interfaces/IVehiculo';

@Component({
  selector: 'app-vehiculos-lista',
  templateUrl: './vehiculos-lista.component.html',
  styleUrls: ['./vehiculos-lista.component.css']
})
export class VehiculosListaComponent {
  router: any;
  constructor(private vehiculosService: VehiculosService) { }
  vehiculos: IVehiculo[] = [];
  listFilter: string = '';

  itemsPerPage: number = 7;
  currentPage: number = 1;


  ngOnInit(): void {

    console.log("Listado de vehiculos inicializado");
    this.vehiculosService.getVehiculos().subscribe(resp => {
      if (resp.body) this.vehiculos = resp.body.reverse();
    });
  }

  confirmarEliminacion(): boolean {
    return confirm("¿Está seguro de que desea eliminar este vehiculo?");
  }

  eliminarVehiculo(id: any) {
    if (this.confirmarEliminacion()) {
      this.vehiculosService.deleteVehiculo(id)
        .subscribe(
          response => {
            console.log(response);
            this.ngOnInit();
          },
          error => {
            console.log(error);
          });
    }
    this.router.navigate(['vehiculos-lista']);
  }
}
