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

    protected $with = ['category', 'brand'];
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_name', 'category_name');
    }
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_name', 'brand_name');
    }

    // public function productImages()
    // {
    //     return $this->hasMany(ProductImage::class, 'product_id', 'id');
    // }
    public function productColors()
    {
        return $this->hasMany(ProductColor::class, 'product_id', 'id');
    }
}
