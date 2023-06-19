<?php

namespace App\Http\Controllers;

use App\Models\LineaFactura;
use Illuminate\Http\Request;
use App\Models\Factura;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class FacturaController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;


    function getFacturas()
    {
        return Factura::all();

    }

    function getFactura($id)
    {
        return Factura::find($id);

    }

    function insertFactura(Request $request)
    {

        $numero = Factura::max('numero') + 1;


        $factura = Factura::create([
            'data' => $request->data,
            'total' => $request->total,
            'totalConIva' => $request->totalConIva,
            'descuento' => $request->descuento,
            'nombre' => $request->nombre,
            'apellidos' => $request->apellidos,
            'direccion' => $request->direccion,
            'nif' => $request->nif,
            'matricula' => $request->matricula,
            'marca' => $request->marca,
            'modelo' => $request->modelo,
            'km' => $request->km,
            'numero' => 11,
        ]);

        $this->insertLineas($factura->id, $request->lineas);

        return $factura;

    }

    function insertLineas($id,$lineas)
    {
        $factura = Factura::find($id);
        foreach ($lineas as $linea) {
            $lineaFactura = new LineaFactura([
                'nombre' => $linea['nombre'],
                'unidades' => $linea['unidades'],
                'precioSinIva' => $linea['precioSinIva'],
                'precioConIva' => $linea['precioConIva'],
            ]);
            $lineaFactura->factura_id = $factura->id;
            $lineaFactura->save();        }
        return $factura;
    }



}