<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('username', 191)->unique();
            $table->string('password', 255);
            $table->string('email', 191)->unique();
            $table->string('phone_number', 20)->nullable();
            $table->text('address')->nullable();
            $table->enum('role', ['client', 'partner']);
            $table->string('avatar_url', 512)->nullable();
            $table->timestamp('join_date')->useCurrent();
            $table->decimal('avg_rating_as_client', 3, 2)->default(0.00);
            $table->decimal('avg_rating_as_partner', 3, 2)->default(0.00);
            $table->integer('review_count_as_client')->default(0);
            $table->integer('review_count_as_partner')->default(0);
            $table->integer('report_count')->default(0);
            $table->double('longitude')->nullable();
            $table->double('latitude')->nullable();
            $table->foreignId('city_id')->nullable()->constrained('cities');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}; 