<?php

namespace App\Http\Controllers;

use App\Models\PairwiseComparison;
use Illuminate\Http\Request;

class UpdatePairwsiseComparisonController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $c1c2 = PairwiseComparison::where('criteria1_id', 1)->where('criteria2_id', 2)->update(['comparison_value' => $request->c1c2]);
        $c2c1 = PairwiseComparison::where('criteria1_id', 2)->where('criteria2_id', 1)->update(['comparison_value' => 1 / $request->c1c2]);

        $c1c3 = PairwiseComparison::where('criteria1_id', 1)->where('criteria2_id', 3)->update(['comparison_value' => $request->c1c3]);
        $c3c1 = PairwiseComparison::where('criteria1_id', 3)->where('criteria2_id', 1)->update(['comparison_value' => 1 / $request->c1c3]);

        $c1c4 = PairwiseComparison::where('criteria1_id', 1)->where('criteria2_id', 4)->update(['comparison_value' => $request->c1c4]);
        $c4c1 = PairwiseComparison::where('criteria1_id', 4)->where('criteria2_id', 1)->update(['comparison_value' => 1 / $request->c1c4]);

        $c2c3 = PairwiseComparison::where('criteria1_id', 2)->where('criteria2_id', 3)->update(['comparison_value' => $request->c2c3]);
        $c3c2 = PairwiseComparison::where('criteria1_id', 3)->where('criteria2_id', 2)->update(['comparison_value' => 1 / $request->c2c3]);

        $c4c2 = PairwiseComparison::where('criteria1_id', 4)->where('criteria2_id', 2)->update(['comparison_value' => $request->c4c2]);
        $c2c4 = PairwiseComparison::where('criteria1_id', 2)->where('criteria2_id', 4)->update(['comparison_value' => 1 / $request->c4c2]);

        $c4c3 = PairwiseComparison::where('criteria1_id', 4)->where('criteria2_id', 3)->update(['comparison_value' => $request->c4c3]);
        $c3c4 = PairwiseComparison::where('criteria1_id', 3)->where('criteria2_id', 4)->update(['comparison_value' => 1 / $request->c4c3]);
    }
}
