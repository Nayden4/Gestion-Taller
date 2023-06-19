<?php

namespace App\Models;
use App\Models\LineaFactura;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function lineasFactura()
    {
        return $this->hasMany(LineaFactura::class);
    }
}
