<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'listing_id',
        'client_id',
        'partner_id',
        'start_date',
        'end_date',
        'status',
        'contract_url',
        'delivery_option'
    ];

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'delivery_option' => 'boolean'
    ];

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function partner()
    {
        return $this->belongsTo(User::class, 'partner_id');
    }
} 