<?php

namespace Database\Seeders;

use App\Models\ProductColor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductColorSeeder extends Seeder
{
    public function run()
    {
        $productColors = [
            [
                'color_name' => 'blue',
                'quantity' => '0',
                'product_id' => '1',
            ],
            [
                'color_name' => 'green',
                'quantity' => '1',
                'product_id' => '1',
            ],
            [
                'color_name' => 'violet',
                'quantity' => '2',
                'product_id' => '1',
            ],

        ];

        foreach ($productColors as $key => $value) {
            ProductColor::create($value);
        }
    }
}
