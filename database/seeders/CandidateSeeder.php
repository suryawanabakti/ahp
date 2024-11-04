<?php

namespace Database\Seeders;

use App\Models\Candidate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CandidateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Candidate::create([
            'full_name' => 'July',
            'address' => 'Jalan perintis kemerdekaan no.3',
            'gender' => 'female',
            'c1' => 80,
            'c2' => 60,
            'c3' => 70,
            'c4' => 90
        ]);
    }
}
