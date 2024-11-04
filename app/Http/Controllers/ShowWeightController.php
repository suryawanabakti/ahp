<?php

namespace App\Http\Controllers;

use App\Models\Weight;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShowWeightController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $weights = Weight::with('criteria')->get();

        return Inertia::render("Admin/Weights/page", [
            "weights" => $weights
        ]);
    }
}
