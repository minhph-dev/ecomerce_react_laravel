<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    public function run()
    {
        $colors = [
            [
                'color_name' => 'blue',
            ],
            [
                'color_name' => 'green',
            ],
            [
                'color_name' => 'pink',
            ],
            [
                'color_name' => 'grey',
            ],
            [
                'color_name' => 'violet',
            ],
            
        ];

        foreach ($colors as $key => $value) {
            Color::create($value);
        }
    }
}
