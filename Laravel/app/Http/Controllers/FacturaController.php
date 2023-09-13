<?php

namespace App\Http\Controllers;

use App\Models\LineaFactura;
use App\Models\Vehiculo;
use Illuminate\Http\Request;
use App\Models\Factura;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;

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
        return DB::transaction(function () use ($request) {
            $factura = null;

            try {
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
                    'numero' => $request->numero,
                    'telefono' => $request->telefono,
                    'subtotal' => $request->subtotal,
                    'ivaPorcentaje' => $request->ivaPorcentaje,
                    'vehiculo_id' => $request->vehiculo_id,



                ]);

                if ($request->km) {
                    $vehiculo = Vehiculo::find($request->vehiculo_id);
                    $vehiculo->km = $request->km;
                    $vehiculo->save();
                }

                $lineas = json_decode($request->lineas, true);

                $this->insertLineas($factura->id, $lineas);

            } catch (\Exception $e) {
                if ($factura !== null) {
                    $factura->delete(); // Eliminar la factura si ocurrió un error
                }
                throw $e; // Lanzar la excepción para que la transacción se revierta
            }
            return $factura;

        });
    }

    function insertLineas($id, $lineas)
    {
        $factura = Factura::find($id);
        foreach ($lineas as $linea) {
            $lineaFactura = new LineaFactura([
                'nombre' => $linea['articulo'],
                'unidades' => $linea['unidades'],
                'precioUn' => $linea['precioUn'],
                'precioSinIva' => $linea['subtotal'],
                'precioConIva' => $linea['totalConIva'],
            ]);
            $lineaFactura->factura_id = $factura->id;
            $lineaFactura->save();
        }
        return $factura;
    }

    function getUltimaFactura()
    {

        $numero = Factura::max('numero') + 1;

        return $numero;

    }

    function deleteFactura($id)
    {
        $factura = Factura::find($id);

        if (!$factura) {
            return null; // O manejar el caso donde la factura no existe
        }

        $factura->delete();

        // Eliminar las líneas de factura relacionadas
        LineaFactura::where('factura_id', $id)->delete();

        return $factura;
    }

    public function updateFactura(Request $request, $id)
    {
        return DB::transaction(function () use ($request, $id) {
            $factura = Factura::find($id);

            if (!$factura) {
                // Manejar el caso en el que la factura no existe
                return null;
            }

            try {
                $factura->update([
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
                    'vehiculo_id' => $request->vehiculo_id,
                    'numero' => $request->numero,
                    'telefono' => $request->telefono,
                    'subtotal' => $request->subtotal,
                    'ivaPorcentaje' => $request->ivaPorcentaje,
                ]);

                if ($request->km) {
                    $vehiculo = Vehiculo::find($request->vehiculo_id);
                    $vehiculo->km = $request->km;
                    $vehiculo->save();
                }

                $lineas = json_decode($request->lineas, true);

                // Eliminar las líneas de factura existentes
                LineaFactura::where('factura_id', $factura->id)->delete();

                // Insertar las nuevas líneas de factura
                $this->insertLineas($factura->id, $lineas);

            } catch (\Exception $e) {
                throw $e; // Lanzar la excepción para que la transacción se revierta
            }
            return $factura;
        });
    }



}