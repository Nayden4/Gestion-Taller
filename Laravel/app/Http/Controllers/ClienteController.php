<?php

namespace App\Http\Controllers;

use App\Models\Vehiculo;
use Illuminate\Http\Request;
use App\Models\Cliente;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class ClienteController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;


    function buscarClientes($parametro)
    {
        if ($parametro != '') {
            $clientes = Cliente::where('nombre', 'like', "%$parametro%")
                ->orWhere('apellidos', 'like', "%$parametro%")
                ->orWhere('nif', 'like', "%$parametro%")
                ->orWhere('telefono', 'like', "%$parametro%")
                ->orWhere('email', 'like', "%$parametro%")
                ->get();
            return $clientes;
        }
        return '';
    }
    function getClientes()
    {
        return Cliente::all();

    }

    function getCliente($id)
    {
        return Cliente::find($id);

    }

    function insertCliente(Request $request)
    {

        $cliente = Cliente::create([
            'nombre' => $request->nombre,
            'apellidos' => $request->apellidos,
            'nif' => $request->nif,
            'calle' => $request->calle,
            'numero' => $request->numero,
            'cp' => $request->cp,
            'ciudad' => $request->ciudad,
            'telefono' => $request->telefono,
            'email' => $request->email,
            'particularEmpresa' => $request->particularEmpresa

        ]);


        return $cliente;


    }
    function updateCliente(Request $request)
    {
        $cliente = Cliente::find($request->id);

        $cliente->update([
            'nombre' => $request->nombre,
            'apellidos' => $request->apellidos,
            'nif' => $request->nif,
            'calle' => $request->calle,
            'numero' => $request->numero,
            'cp' => $request->cp,
            'ciudad' => $request->ciudad,
            'telefono' => $request->telefono,
            'email' => $request->email,
            'particularEmpresa' => $request->particularEmpresa
        ]);

        return $cliente;
    }


    public function deleteCliente($id)
    {
        // Busca al cliente por su ID
        $cliente = Cliente::find($id);

        if (!$cliente) {
            // Si el cliente no se encuentra, puedes manejar el error aquí
            return response()->json(['mensaje' => 'Cliente no encontrado'], 404);
        }

        // Borra todos los vehículos asociados al cliente
        Vehiculo::where('cliente_id', $cliente->id)->delete();

        // Borra al cliente
        $cliente->delete();

        // Puedes retornar una respuesta exitosa si lo deseas
        return response()->json(['mensaje' => 'Cliente y vehículos asociados eliminados con éxito'], 200);
    }


}