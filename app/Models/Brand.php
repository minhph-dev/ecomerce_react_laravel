<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory;
    protected $table = 'brands';
    protected $primaryKey = 'brand_name';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'brand_name',
        'slug',
        'category_name',
        'image'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_name', 'category_name');
    }
}
