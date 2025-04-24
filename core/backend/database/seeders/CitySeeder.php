<?php

namespace Database\Seeders;

use App\Models\City;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    public function run(): void
    {
        $cities = [
            ['name' => 'Casablanca'],
            ['name' => 'Rabat'],
            ['name' => 'Marrakech'],
            ['name' => 'Fes'],
            ['name' => 'Tangier'],
            ['name' => 'Agadir'],
            ['name' => 'Meknes'],
            ['name' => 'Oujda'],
            ['name' => 'Kenitra'],
            ['name' => 'Tetouan'],
            ['name' => 'Salé'],
            ['name' => 'Nador'],
            ['name' => 'Mohammedia'],
            ['name' => 'El Jadida'],
            ['name' => 'Beni Mellal'],
            ['name' => 'Taza'],
            ['name' => 'Khouribga'],
            ['name' => 'Settat'],
            ['name' => 'Larache'],
            ['name' => 'Ksar El Kebir'],
        ];

        foreach ($cities as $city) {
            City::create($city);
        }
    }
} 