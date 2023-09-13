<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('facturas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            //Datos factura
            $table->date('data');
            $table->String('numero')->unique();
            $table->double('total');
            $table->double('totalConIva');
            $table->double('descuento')->nullable();
            $table->double('subtotal');
            $table->String('ivaPorcentaje');

            //Datos cliente

            $table->string('nombre');
            $table->string('apellidos')->nullable();
            $table->string('direccion')->nullable();
            $table->string('nif')->nullable();
            $table->String('telefono');

            //Datos Vehiculo

            $table->string('matricula')->nullable();
            $table->string('marca')->nullable();
            $table->string('modelo')->nullable();
            $table->string('km')->nullable();
            $table->int('vehiculo_id')->nullable();


     

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facturas');
    }
};
