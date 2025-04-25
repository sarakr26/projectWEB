<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            'Bois et Derivés',
            'Matériaux de Construction',
            'Peinture et Revêtement',
            'Electricité',
            'Plomberie',
            'Outillage',
            'Isolation',
            'Revêtement de sol et murs',
            'Jardin et extérieur'
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category
            ]);
        }
    }
} 