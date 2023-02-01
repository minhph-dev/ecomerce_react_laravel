<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run()
    {
        Setting::create(
            [
                'wedsite_name' => 'ESHOP',
                'wedsite_url' => 'http://127.0.0.1:8000/',
                'page_title' => 'ESHOP',
                'meta_keyword' => 'ESHOP',
                'meta_description' => 'ESHOP',
                'address' => '590 Đ. Cách Mạng Tháng 8, Phường 11, Quận 3, Thành phố Hồ Chí Minh 723564, Việt Nam',
                'phone1' => '0354868289',
                'phone2' => '0354868289',
                'email1' => 'sendmailprod.dev@gmail.com',
                'email2' => 'minhphts2202007@fpt.edu.vn',
                'facebook' => 'https://www.facebook.com/',
                'twitter' => 'https://www.twitter.com/',
                'instagram' => 'https://www.instagram.com/',
                'youtube' => 'https://www.youtube.com/'
            ]
        );
    }
}
