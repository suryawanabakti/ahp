<?php

namespace Database\Seeders;

use App\Models\PairwiseComparison;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PairwiseComparisonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $comparisons = [
            [1, 1, 1],     // C1 vs C1
            [1, 2, 5],     // C1 vs C2
            [1, 3, 7],     // C1 vs C3
            [1, 4, 3],     // C1 vs C4
            [2, 1, 1 / 5],   // C2 vs C1
            [2, 2, 1],     // C2 vs C2
            [2, 3, 3],     // C2 vs C3
            [2, 4, 1 / 3],   // C2 vs C4
            [3, 1, 1 / 7],   // C3 vs C1
            [3, 2, 1 / 3],   // C3 vs C2
            [3, 3, 1],     // C3 vs C3
            [3, 4, 1 / 5],   // C3 vs C4
            [4, 1, 1 / 3],   // C4 vs C1
            [4, 2, 3],     // C4 vs C2
            [4, 3, 5],     // C4 vs C3
            [4, 4, 1]      // C4 vs C4
        ];

        foreach ($comparisons as $comparison) {
            PairwiseComparison::create([
                'criteria1_id' => $comparison[0],
                'criteria2_id' => $comparison[1],
                'comparison_value' => $comparison[2]
            ]);
        }
    }
}
