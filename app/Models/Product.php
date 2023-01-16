<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'brand_name',
        'description',
        'original_price',
        'selling_price',
        'quantity',
        'trending',
        'featured',
        'status',
        'meta_title',
        'meta_keyword',
        'meta_description',
        'image'
    ];

    // public function productImages()
    // {
    //     return $this->hasMany(ProductImage::class, 'product_id', 'id');
    // }
    public function productColors()
    {
        return $this->hasMany(ProductColor::class, 'product_id', 'id');
    }
   
}
