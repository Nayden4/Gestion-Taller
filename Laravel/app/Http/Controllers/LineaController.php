<?php

namespace App\Http\Controllers;

use App\Models\LineaFactura;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;


class LineaController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;


    function getLineas($id)
    {
        return LineaFactura::where('factura_id', $id)->get();

    }
}