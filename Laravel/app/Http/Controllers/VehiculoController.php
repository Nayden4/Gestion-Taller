<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehiculo;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class VehiculoController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    function getProximasItv()
    {
        $vehiculos = Vehiculo::whereNotNull('proximaItv')
        ->orderBy('proximaItv', 'asc')
        ->take(3)
        ->with('cliente')
        ->get();
    

        return $vehiculos;
    }
    function getVehiculos()
    {
        return Vehiculo::with('cliente')->get();

    }

    function getVehiculo($id)
    {
        return Vehiculo::with('cliente')->find($id);

    }

    function insertVehiculo(Request $request)
    {

        $vehiculo = Vehiculo::create([
            'matricula' => $request->matricula,
            'marca' => $request->marca,
            'modelo' => $request->modelo,
            'km' => $request->km,
            'cv' => $request->cv,
            'proximaItv' => $request->proximaItv,
            'cliente_id' => $request->cliente_id
        ]);

        return $vehiculo;


    }
    function updateVehiculo(Request $request)
    {
        $vehiculo = Vehiculo::find($request->id);

        $vehiculo->update([
            'matricula' => $request->matricula,
            'marca' => $request->marca,
            'modelo' => $request->modelo,
            'km' => $request->km,
            'cv' => $request->cv,
            'proximaItv' => $request->proximaItv,
        ]);

        return $vehiculo;
    }

    function deleteVehiculo($id)
    {
        $vehiculo = Vehiculo::find($id);
        $vehiculo->delete();

        return $vehiculo;
    }

    function getVehiculoCliene($id)
    {

        $vehicles = Vehiculo::where('cliente_id', $id)->get();
        return $vehicles;

    }





}