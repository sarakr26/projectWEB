<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'phone_number',
        'address',
        'role',
        'avatar_url',
        'join_date',
        'avg_rating_as_client',
        'avg_rating_as_partner',
        'review_count_as_client',
        'review_count_as_partner',
        'report_count',
        'longitude',
        'latitude',
        'city_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'join_date' => 'datetime',
            'avg_rating_as_client' => 'decimal:2',
            'avg_rating_as_partner' => 'decimal:2',
            'review_count_as_client' => 'integer',
            'review_count_as_partner' => 'integer',
            'report_count' => 'integer',
            'longitude' => 'double',
            'latitude' => 'double',
        ];
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
