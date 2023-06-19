import { Component } from '@angular/core';
import { VehiculosService } from '../servicios/vehiculos.service';
import { IVehiculo } from '../interfaces/IVehiculo';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  constructor(private vehiculosService: VehiculosService) { }
  vehiculos:IVehiculo[] = [];

  ngOnInit() {
    console.log("Lista de proximas itvs inicializado");
    this.vehiculosService.getProximasItv().subscribe(resp => {
      if(resp.body) this.vehiculos = resp.body;
      console.log(this.vehiculos);
    });



  }
}
