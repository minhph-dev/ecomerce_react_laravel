<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('category_name');
            $table->foreign('category_name')->references('category_name')->on('categories')->onDelete('cascade');
            $table->string('product_name');
            $table->string('slug');
            $table->string('brand_name')->nullable();
            $table->longText('description');

            $table->integer('original_price');
            $table->integer('selling_price');
            $table->integer('quantity');
            $table->tinyInteger('trending')->comment('1=trending, 0=not-trending');
            $table->tinyInteger('featured')->comment('1=featured, 0=not-featured');
            $table->tinyInteger('status')->comment('1=hidden, 0=visible');

            $table->string('meta_title')->nullable();
            $table->mediumText('meta_keyword')->nullable();
            $table->mediumText('meta_description')->nullable();

            $table->string('image')->nullable();
            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('products');
    }
};
