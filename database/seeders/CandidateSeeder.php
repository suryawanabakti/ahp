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
            'academic_performance' => 80,
            'family_income' => 60,
            'extracurricular_activities' => 70,
            'attendance' => 90
        ]);

        Candidate::create([
            'full_name' => 'Lisawati',
            'address' => 'Jalan perintis kemerdekaan no.1',
            'gender' => 'female',
            'academic_performance' => 80,
            'family_income' => 70,
            'extracurricular_activities' => 55,
            'attendance' => 80
        ]);

        Candidate::create([
            'full_name' => 'Naury',
            'address' => 'Jalan perintis kemerdekaan no.9',
            'gender' => 'female',
            'academic_performance' => 80,
            'family_income' => 70,
            'extracurricular_activities' => 75,
            'attendance' => 60
        ]);
    }
}
