<?php

namespace Database\Seeders;

use App\Models\Candidate;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CandidateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $maba1 = User::create([
        //     'name' => 'jully',
        //     'email' => 'july@gmail.com',
        //     'password' => bcrypt('qwerty123'),
        //     'level' => 'maba'
        // ]);

        // Candidate::create([
        //     'user_id' => $maba1->id,
        //     'npm' => '1234567',
        //     'full_name' => 'July',
        //     'jurusan' => 'Tekhnik Informatika',
        //     'gender' => 'female',
        //     'c1' => 80,
        //     'c2' => 60,
        //     'c3' => 70,
        //     'c4' => 90
        // ]);
    }
}
