<?php

namespace App\Http\Controllers;

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
        if ($parametro!='') {
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

    function deleteCliente($id)
    {
        $client = Cliente::find($id);
        $client->delete();

        return $client;
    }


}