import { Pipe, PipeTransform } from '@angular/core';
import { ICliente } from '../interfaces/ICliente';

@Pipe({
  name: 'clientesListFilter'
})
export class ClientesFilterPipe implements PipeTransform {

  transform(clientes: ICliente[], filterBy: string): ICliente[] {
    filterBy = filterBy ? filterBy.toLowerCase() : '';
    return filterBy ? clientes.filter((cliente) => {
      return (
        (cliente.nombre && cliente.nombre.toLowerCase().indexOf(filterBy) !== -1) ||
        (cliente.apellidos && cliente.apellidos.toLowerCase().indexOf(filterBy) !== -1) ||
        (cliente.nif && cliente.nif.toLowerCase().indexOf(filterBy) !== -1) ||
        (cliente.ciudad && cliente.ciudad.toLowerCase().indexOf(filterBy) !== -1) ||
        (cliente.telefono && cliente.telefono.toLowerCase().indexOf(filterBy) !== -1) ||
        (cliente.email && cliente.email.toLowerCase().indexOf(filterBy) !== -1)
      );
    }) : clientes;
  }

}
