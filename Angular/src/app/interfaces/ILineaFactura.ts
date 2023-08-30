import { IFactura } from "./IFactura";

export interface ILineaFactura {
    id:number;
    nombre:string;
    unidades:string;
    precioSinIva:string;
    precioConIva:string;
    factura:IFactura;
}
