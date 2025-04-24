<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'category',
        'base_price',
        'min_duration',
        'max_duration',
        'is_active',
    ];

    protected $casts = [
        'base_price' => 'decimal:2',
        'min_duration' => 'integer',
        'max_duration' => 'integer',
        'is_active' => 'boolean',
    ];

    public function partners()
    {
        return $this->belongsToMany(User::class, 'partner_services')
            ->withPivot('price', 'description', 'is_available')
            ->withTimestamps();
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
} 