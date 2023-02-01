<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            CategorySeeder::class,
            BrandSeeder::class,
            ColorSeeder::class,
            ProductSeeder::class,
            UserSeeder::class,
            BannerSeeder::class,
            ProductColorSeeder::class,
            SettingSeeder::class,
        ]);
    }
}