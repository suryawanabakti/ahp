<?php

namespace App\Http\Controllers;

use App\Models\Criteria;
use App\Models\PairwiseComparison;
use App\Models\Weight;
use Illuminate\Http\Request;

class CalculateWeightController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $criteria = Criteria::all();
        $matrix = [];
        $columnSums = [];

        foreach ($criteria as $criterion) {
            foreach ($criteria as $criterion2) {
                $value = PairwiseComparison::where('criteria1_id', $criterion->id)
                    ->where('criteria2_id', $criterion2->id)
                    ->first()
                    ->comparison_value;
                $matrix[$criterion->id][$criterion2->id] = $value;
                $columnSums[$criterion2->id] = ($columnSums[$criterion2->id] ?? 0) + $value;
            }
        }

        $weights = [];
        foreach ($matrix as $i => $row) {
            $sumRow = 0;
            foreach ($row as $j => $value) {
                $normalizedValue = $value / $columnSums[$j];
                $sumRow += $normalizedValue;
            }
            $weights[$i] = $sumRow / count($criteria);
        }

        // Simpan bobot ke database
        foreach ($weights as $criterionId => $weight) {
            Weight::updateOrCreate(
                ['criteria_id' => $criterionId],
                ['weight' => $weight]
            );
        }

        return redirect('/weights');
    }
}
