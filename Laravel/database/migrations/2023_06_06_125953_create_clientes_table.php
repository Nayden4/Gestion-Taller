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
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('nombre');
            $table->string('apellidos');
            $table->string('nif');
            $table->string('calle');
            $table->integer('numero');
            $table->integer('cp');
            $table->string('ciudad');
            $table->string('telefono');
            $table->string('email')->unique();
            $table->integer('particularEmpresa');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};
