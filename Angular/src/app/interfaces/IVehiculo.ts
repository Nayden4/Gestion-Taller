import { ICliente } from "./ICliente";

export interface IVehiculo {
    id:number;
    matricula:string;
    marca:string;
    modelo:string;
    km:string;
    cv:string;
    proximaItv:string;
    cliente:ICliente;
}
