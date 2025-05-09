<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'price_per_day',
        'status',
        'is_premium',
        'premium_start_date',
        'premium_end_date',
        'longitude',
        'latitude',
        'avg_rating',
        'review_count',
        'delivery_option',
        'category_id',
        'city_id',
        'partner_id',
        'priority'
    ];

    protected $casts = [
        'price_per_day' => 'decimal:2',
        'is_premium' => 'boolean',
        'premium_start_date' => 'datetime',
        'premium_end_date' => 'datetime',
        'longitude' => 'double',
        'latitude' => 'double',
        'avg_rating' => 'decimal:2',
        'delivery_option' => 'boolean',
        'priority' => 'integer'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function partner()
    {
        return $this->belongsTo(User::class, 'partner_id');
    }

    public function images()
    {
        return $this->hasMany(ListingImage::class);
    }

    public function availabilities()
    {
        return $this->hasMany(Availability::class);
    }

    public function updatePriority()
    {
        if (!$this->is_premium || !$this->premium_end_date) {
            $this->priority = 4;
            return;
        }

        if (now()->gt($this->premium_end_date)) {
            $this->is_premium = false;
            $this->priority = 4;
            $this->save();
            return;
        }

        $duration = $this->premium_start_date->diffInDays($this->premium_end_date);
        
        if ($duration >= 30) {
            $this->priority = 1;
        } elseif ($duration >= 14) {
            $this->priority = 2;
        } elseif ($duration >= 7) {
            $this->priority = 3;
        } else {
            $this->priority = 4;
        }
        
        $this->save();
    }
} 