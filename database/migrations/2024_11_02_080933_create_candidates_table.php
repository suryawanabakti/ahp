<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('candidates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id'); // Team
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->string('npm')->nullable();
            $table->string('full_name')->nullable();
            $table->string('jurusan')->nullable();
            $table->enum('gender', ['male', 'female']);
            $table->string('pdf_raport')->nullable();
            $table->string('pdf_skhu')->nullable();
            $table->float('c1');
            $table->float('c2');
            $table->float('c3');
            $table->float('c4');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidates');
    }
};
