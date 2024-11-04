<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {


        User::factory()->create([
            'name' => 'july',
            'email' => 'july',
            'password' => bcrypt('qwerty123')
        ]);

        $this->call([
            CandidateSeeder::class,
            CriteriaSeeder::class,
            PairwiseComparisonSeeder::class
        ]);
    }
}
