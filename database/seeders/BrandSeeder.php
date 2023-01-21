<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    public function run()
    {
        $brands = [
            // mobile Brand
            [
                'brand_name' => 'Apple',
                'slug' => 'apple',
                'category_name' => 'Mobile',
                'image' => 'uploads/brand/apple-icon.png'
            ],
            [
                'brand_name' => 'Sam Sung',
                'slug' => 'sam-sung-mobile',
                'category_name' => 'Mobile',
                'image' => 'uploads/brand/samsung-icon.png'
            ],
            [
                'brand_name' => 'Xiaomi',
                'slug' => 'xiaomi',
                'category_name' => 'Mobile',
                'image' => 'uploads/brand/xiaomi-mi-logo-icon.png'
            ],
            [
                'brand_name' => 'Oppo',
                'slug' => 'oppo',
                'category_name' => 'Mobile',
                'image' => 'uploads/brand/oppo-mobile-logo-icon.png'
            ],
            //laptop Brand
            [
                'brand_name' => 'Macbook',
                'slug' => 'macbook',
                'category_name' => 'Laptop',
                'image' => 'uploads/brand/apple-icon.png'
            ],
            [
                'brand_name' => 'Dell',
                'slug' => 'dell',
                'category_name' => 'Laptop',
                'image' => 'uploads/brand/dell-icon.png'
            ],
            [
                'brand_name' => 'Asus',
                'slug' => 'asus',
                'category_name' => 'Laptop',
                'image' => 'uploads/brand/asus-icon.png'
            ],
            [
                'brand_name' => 'Lenovo',
                'slug' => 'lenovo',
                'category_name' => 'Laptop',
                'image' => 'uploads/brand/lenovo-logo-icon.png'
            ],
            //tablet brand
            [
                'brand_name' => 'iPad',
                'slug' => 'ipad',
                'category_name' => 'Tablet',
                'image' => 'uploads/brand/apple-icon.png'
            ],
            [
                'brand_name' => 'SamSung',
                'slug' => 'samsung-tablet',
                'category_name' => 'Tablet',
                'image' => 'uploads/brand/samsung-icon.png'
            ],
            [
                'brand_name' => 'Lenovo Tablet',
                'slug' => 'lenovo-tablet',
                'category_name' => 'Tablet',
                'image' => 'uploads/brand/lenovo-logo-icon.png'
            ],
            [
                'brand_name' => 'Masstel',
                'slug' => 'masstel',
                'category_name' => 'Tablet',
                'image' => 'uploads/brand/masstel.png'
            ],
            //smartwatch brand
            [
                'brand_name' => 'WATCH',
                'slug' => 'watch',
                'category_name' => 'SmartWatch',
                'image' => 'uploads/brand/apple-icon.png'
            ],
            [
                'brand_name' => 'SamSung Watch',
                'slug' => 'samsung-watch',
                'category_name' => 'SmartWatch',
                'image' => 'uploads/brand/samsung-icon.png'
            ],
            [
                'brand_name' => 'Amazfit',
                'slug' => 'amazfit',
                'category_name' => 'SmartWatch',
                'image' => 'uploads/brand/amazfit-logo.png'
            ],
            [
                'brand_name' => 'Garmin',
                'slug' => 'garmin',
                'category_name' => 'SmartWatch',
                'image' => 'uploads/brand/garmin-logo-png-garmin-logo-transparent-png-pluspng-1000x270.png'
            ],
        ];

        foreach ($brands as $key => $value) {
            Brand::create($value);
        }
    }
}
