import { Pipe, PipeTransform } from '@angular/core';
import { IFactura } from '../interfaces/IFactura';

@Pipe({
  name: 'facturasListFilter'
})
export class FilterPipe implements PipeTransform {

  transform(facturas: IFactura[], filterBy: string, fechaInici: string, fechaFi: any): IFactura[] {
    filterBy = filterBy ? filterBy.toLowerCase() : '';
    // Verificamos si las fechas de inicio y fin están definidas
    if (fechaInici && fechaFi) {
      return facturas.filter((factura) => {
        const fechaFactura = new Date(factura.data); // Supongamos que tienes un campo 'fecha' en tus facturas
        const fechaInicio = new Date(fechaInici);
        const fechaFin = new Date(fechaFi);
        
        // Comparamos si la fecha de la factura está dentro del rango seleccionado
        return fechaFactura >= fechaInicio && fechaFactura <= fechaFin && (
        (factura.matricula && factura.matricula.toLowerCase().indexOf(filterBy) !== -1) ||
        (factura.marca && factura.marca.toLowerCase().indexOf(filterBy) !== -1) ||
        (factura.modelo && factura.modelo.toLowerCase().indexOf(filterBy) !== -1) ||
        (factura.nombre && factura.nombre.toLowerCase().indexOf(filterBy) !== -1) ||
        (factura.apellidos && factura.apellidos.toLowerCase().indexOf(filterBy) !== -1) ||
        (factura.data && factura.data.toLowerCase().indexOf(filterBy) !== -1) ||
        (factura.nif && factura.nif.toLowerCase().indexOf(filterBy) !== -1) || filterBy=='');
      });
    } else {
      return facturas;
    }
  }

}

