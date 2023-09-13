import { IFactura } from "./IFactura";

export interface ILineaFactura {
    id:number;
    nombre:string;
    unidades:number;
    precioUn:number;
    precioSinIva:number;
    precioConIva:number;
    factura:IFactura;
}
