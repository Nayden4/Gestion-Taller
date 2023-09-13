<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\VehiculoController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\LineaController;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Clientes

Route::get('/clientes', [ClienteController::class, 'getClientes']);
Route::get('/cliente/{id}', [ClienteController::class, 'getCliente']);
Route::post('/cliente', [ClienteController::class, 'insertCliente']);
Route::post('/cliente/{id}', [ClienteController::class, 'updateCliente']);
Route::delete('/cliente/{id}', [ClienteController::class, 'deleteCliente']);
Route::get('/clientesBuscar/{parametro}', [ClienteController::class, 'buscarClientes']);

//Vehiculos

Route::get('/vehiculos', [VehiculoController::class, 'getVehiculos']);
Route::get('/vehiculo/{id}', [VehiculoController::class, 'getVehiculo']);
Route::get('/vehiculos-itv', [VehiculoController::class, 'getProximasItv']);
Route::get('/vehiculo-cliente/{id}', [VehiculoController::class, 'getVehiculoCliene']);

Route::post('/vehiculo', [VehiculoController::class, 'insertVehiculo']);
Route::post('/vehiculo/{id}', [VehiculoController::class, 'updateVehiculo']);
Route::delete('/vehiculo/{id}', [VehiculoController::class, 'deleteVehiculo']);

//Facturas

Route::get('/facturas', [FacturaController::class, 'getFacturas']);
Route::get('/factura/{id}', [FacturaController::class, 'getFactura']);
Route::get('/ultimaFactura', [FacturaController::class, 'getUltimaFactura']);
Route::post('/factura', [FacturaController::class, 'insertFactura']);
Route::delete('/factura/{id}', [FacturaController::class, 'deleteFactura']);
Route::post('/factura/{id}', [FacturaController::class, 'updateFactura']);

Route::get('/lineaFactura/{id}', [LineaController::class, 'getLineas']);


