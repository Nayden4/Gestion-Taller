import { Pipe, PipeTransform } from '@angular/core';
import { IVehiculo } from '../interfaces/IVehiculo';

@Pipe({
  name: 'vehiculosListFilter'
})
export class VehiculosFilterPipe implements PipeTransform {

  transform(vehiculos: IVehiculo[], filterBy: string): IVehiculo[] {
    filterBy = filterBy ? filterBy.toLowerCase() : '';
    return filterBy ? vehiculos.filter((vehiculo) => {
      return (
        (vehiculo.matricula && vehiculo.matricula.toLowerCase().indexOf(filterBy) !== -1) ||
        (vehiculo.marca && vehiculo.marca.toLowerCase().indexOf(filterBy) !== -1) ||
        (vehiculo.modelo && vehiculo.modelo.toLowerCase().indexOf(filterBy) !== -1) ||
        (vehiculo.km && vehiculo.km.toLowerCase().indexOf(filterBy) !== -1) ||
        (vehiculo.cv && vehiculo.cv.toLowerCase().indexOf(filterBy) !== -1) ||
        (vehiculo.cliente &&
          (vehiculo.cliente.nombre && vehiculo.cliente.nombre.toLowerCase().indexOf(filterBy) !== -1) ||
          (vehiculo.cliente.apellidos && vehiculo.cliente.apellidos.toLowerCase().indexOf(filterBy) !== -1)
        )
      );
    }) : vehiculos;
  }

}

