import { Pipe, PipeTransform } from '@angular/core';
import { IFactura } from '../interfaces/IFactura';

@Pipe({
  name: 'facturasListFilter'
})
export class FilterPipe implements PipeTransform {

  transform(facturas: IFactura[], filterBy: string): IFactura[] {
    filterBy = filterBy ? filterBy.toLowerCase() : '';
    return filterBy ? facturas.filter((factura) => {
      return factura.matricula.toLowerCase().indexOf(filterBy) !== -1 || factura.marca.toLowerCase().indexOf(filterBy) !== -1 ||
        factura.modelo.toLowerCase().indexOf(filterBy) !== -1 || factura.nombre.toLowerCase().indexOf(filterBy) !== -1 || 
        factura.apellidos.toLowerCase().indexOf(filterBy) !== -1 || factura.data.toLowerCase().indexOf(filterBy) !== -1 || 
        factura.nif.toLowerCase().indexOf(filterBy) !== -1
    }) : facturas;
  }

}
