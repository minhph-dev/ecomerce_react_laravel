<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'category_name' => 'Mobile',
                'slug' => 'mobile',
                'image' => 'uploads/category/1674113546.png',
                'description' => 'This is desc mobile category',
            ],
            [
                'category_name' => 'Laptop',
                'slug' => 'laptop',
                'image' => 'uploads/category/1674011809.png',
                'description' => 'This is desc laptop category',
            ],
            [
                'category_name' => 'Tablet',
                'slug' => 'tablet',
                'image' => 'uploads/category/1674006941.png',
                'description' => 'This is desc mobile category',
            ],
            [
                'category_name' => 'SmartWatch',
                'slug' => 'smart-watch',
                'image' => 'uploads/category/1674009838.png',
                'description' => 'This is desc smart watch category',
            ],
        ];

        foreach ($categories as $key => $value) {
            Category::create($value);
        }
    }
}
