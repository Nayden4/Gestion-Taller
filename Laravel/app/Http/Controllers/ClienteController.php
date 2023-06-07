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

}