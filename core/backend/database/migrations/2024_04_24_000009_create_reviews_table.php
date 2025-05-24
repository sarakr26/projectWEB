<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->integer('rating')->check('rating BETWEEN 1 AND 5');
            $table->text('comment')->nullable();
            $table->boolean('is_visible')->default(true);
            $table->enum('type', ['forObject', 'forClient', 'forPartner']);
            $table->foreignId('reviewer_id')->constrained('users');
            $table->foreignId('reviewee_id')->constrained('users');
            $table->foreignId('reservation_id')->nullable()->constrained('reservations');
            $table->foreignId('listing_id')->nullable()->constrained('listings');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('reviews');
    }
}; 