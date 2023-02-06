<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone')->nullable();
            $table->string('pin_code')->nullable();
            $table->string('address', 500)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('googleId')->nullable();
            $table->rememberToken();
            $table->string('role_as');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
};
