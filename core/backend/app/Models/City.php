<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'state',
        'country',
        'longitude',
        'latitude',
    ];

    protected $casts = [
        'longitude' => 'double',
        'latitude' => 'double',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }
} 