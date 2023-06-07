import { Pipe, PipeTransform } from '@angular/core';
import { ICliente } from '../interfaces/ICliente';

@Pipe({
  name: 'clientesListFilter'
})
export class FilterPipe implements PipeTransform {

  transform(clientes: ICliente[], filterBy: string): ICliente[] {
    filterBy = filterBy ? filterBy.toLowerCase() : '';
    return filterBy ? clientes.filter((cliente) => {
      return cliente.nombre.toLowerCase().indexOf(filterBy) !== -1 || cliente.apellidos.toLowerCase().indexOf(filterBy) !== -1 || 
      cliente.nif.toLowerCase().indexOf(filterBy) !== -1 || cliente.ciudad.toLowerCase().indexOf(filterBy) !== -1 ||
      cliente.telefono.toLowerCase().indexOf(filterBy) !== -1 || cliente.email.toLowerCase().indexOf(filterBy) !== -1;
    }) : clientes;
  }

}
