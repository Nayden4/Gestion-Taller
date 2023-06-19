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

            //Datos cliente

            $table->string('nombre');
            $table->string('apellidos')->nullable();
            $table->string('direccion')->nullable();
            $table->string('nif')->nullable();

            //Datos Vehiculo

            $table->string('matricula');
            $table->string('marca');
            $table->string('modelo')->nullable();
            $table->string('km')->nullable();


     

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
