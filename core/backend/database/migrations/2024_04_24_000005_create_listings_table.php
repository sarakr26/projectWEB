<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->text('description')->nullable();
            $table->decimal('price_per_day', 10, 2);
            $table->enum('status', ['active', 'archived', 'inactive'])->default('active');
            $table->boolean('is_premium')->default(false);
            $table->timestamp('premium_start_date')->nullable();
            $table->timestamp('premium_end_date')->nullable();
            $table->integer('priority')->default(4);
            $table->double('longitude')->nullable();
            $table->double('latitude')->nullable();
            $table->decimal('avg_rating', 3, 2)->default(0.00);
            $table->integer('review_count')->default(0);
            $table->boolean('delivery_option')->default(false);
            $table->foreignId('category_id')->nullable()->constrained('categories');
            $table->foreignId('city_id')->nullable()->constrained('cities');
            $table->foreignId('partner_id')->constrained('users');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('listings');
    }
}; 