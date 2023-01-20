<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    public function run()
    {
        $banner = [
            [
                'title' => 'Laptop',
                'description' => 'laptop',
                'link' => '/collections/laptop',
                'image' => 'uploads/banner/slideshow_3.webp',
            ],
            [
                'title' => 'Mobile',
                'description' => 'mobile',
                'link' => '/collections/mobile',
                'image' => 'uploads/banner/slideshow_15.webp',
            ],
            [
                'title' => 'Laptop',
                'description' => 'laptop',
                'link' => '/collections/laptop',
                'image' => 'uploads/banner/slideshow_5.webp',
            ],
        ];

        foreach ($banner as $key => $value) {
            Banner::create($value);
        }
    }
}
