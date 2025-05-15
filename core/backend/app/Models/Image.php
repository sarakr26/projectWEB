<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'listing_id',
        'url',
        'filename',
        'order'
    ];

    public function listing()
    {
        return $this->belongsTo(Listing::class);
    }
}
