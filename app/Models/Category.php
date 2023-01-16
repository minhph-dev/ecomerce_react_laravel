<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $table = 'categories';
    protected $primaryKey = 'category_name';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'category_name',
        'slug',
        'image',
        'description',
    ];

    public function brands(){
        return $this->hasMany(Brand::class, 'category_name', 'category_name');
    }
}
