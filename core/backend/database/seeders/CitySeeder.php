<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    public function run(): void
    {
        $cities = [
            [
                'name' => 'Casablanca',
                'latitude' => 33.5731,
                'longitude' => -7.5898
            ],
            [
                'name' => 'Rabat',
                'latitude' => 34.0209,
                'longitude' => -6.8416
            ],
            [
                'name' => 'Marrakech',
                'latitude' => 31.6295,
                'longitude' => -7.9811
            ],
            [
                'name' => 'Fes',
                'latitude' => 34.0181,
                'longitude' => -5.0078
            ],
            [
                'name' => 'Tangier',
                'latitude' => 35.7595,
                'longitude' => -5.8330
            ],
            [
                'name' => 'Agadir',
                'latitude' => 30.4278,
                'longitude' => -9.5981
            ],
            [
                'name' => 'Meknes',
                'latitude' => 33.8950,
                'longitude' => -5.5547
            ],
            [
                'name' => 'Oujda',
                'latitude' => 34.6819,
                'longitude' => -1.9077
            ],
            [
                'name' => 'Kenitra',
                'latitude' => 34.2610,
                'longitude' => -6.5802
            ],
            [
                'name' => 'Tetouan',
                'latitude' => 35.5764,
                'longitude' => -5.3684
            ],
            [
                'name' => 'Salé',
                'latitude' => 34.0333,
                'longitude' => -6.8167
            ],
            [
                'name' => 'Nador',
                'latitude' => 35.1681,
                'longitude' => -2.9333
            ],
            [
                'name' => 'Mohammedia',
                'latitude' => 33.6833,
                'longitude' => -7.3833
            ],
            [
                'name' => 'El Jadida',
                'latitude' => 33.2333,
                'longitude' => -8.5000
            ],
            [
                'name' => 'Beni Mellal',
                'latitude' => 32.3373,
                'longitude' => -6.3498
            ],
            [
                'name' => 'Taza',
                'latitude' => 34.2144,
                'longitude' => -4.0088
            ],
            [
                'name' => 'Khouribga',
                'latitude' => 32.8833,
                'longitude' => -6.9000
            ],
            [
                'name' => 'Settat',
                'latitude' => 33.0000,
                'longitude' => -7.6167
            ],
            [
                'name' => 'Larache',
                'latitude' => 35.1833,
                'longitude' => -6.1500
            ],
            [
                'name' => 'Ksar El Kebir',
                'latitude' => 35.0000,
                'longitude' => -5.9000
            ]
        ];

        foreach ($cities as $city) {
            City::create($city);
        }
    }
} 