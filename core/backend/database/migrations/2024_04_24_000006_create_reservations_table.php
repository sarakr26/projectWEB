<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->enum('status', ['pending', 'confirmed', 'ongoing', 'canceled', 'completed'])->default('pending');
            $table->string('contract_url', 512)->nullable();
            $table->boolean('delivery_option')->default(false);
            $table->foreignId('client_id')->constrained('users');
            $table->foreignId('partner_id')->constrained('users');
            $table->foreignId('listing_id')->constrained('listings');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reservations');
    }
}; 