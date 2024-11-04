<?php

namespace App\Http\Controllers;

use App\Models\Criteria;
use App\Models\PairwiseComparison;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PairwiseComparisonController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $criterias = Criteria::all();
        // Ambil semua data perbandingan berpasangan
        $comparisons = PairwiseComparison::all();

        // Inisialisasi array untuk menyimpan nilai matriks
        $matrix = [];
        $criteriaCount = 4; // misal kita punya 4 kriteria

        // Isi matriks dengan data dari database
        foreach ($comparisons as $comparison) {
            $matrix[$comparison->criteria1_id][$comparison->criteria2_id] = $comparison->comparison_value;
        }

        $comparisons = [];

        // Mengisi array comparisons dengan nilai yang sesuai
        foreach ($matrix as $key => $criteria) {
            $comparisons[$key] = [];
            foreach ($criteria as $subKey => $value) {
                // Menyimpan nilai
                $comparisons[$key][$subKey] = $value;
            }
        }
        // Membuat array dengan format yang diinginkan
        $finalComparisons = [
            [$comparisons[1][1], $comparisons[1][2], $comparisons[1][3], $comparisons[1][4]],    // Prestasi Akademik
            [$comparisons[2][1], $comparisons[2][2], $comparisons[2][3], $comparisons[2][4]],    // Penghasilan Orang Tua
            [$comparisons[3][1], $comparisons[3][2], $comparisons[3][3], $comparisons[3][4]],    // Kegiatan Ekstrakurikuler
            [$comparisons[4][1], $comparisons[4][2], $comparisons[4][3], $comparisons[4][4]],    // Kehadiran di Sekolah
        ];

        return Inertia::render("Admin/PairwiseComparison/page", [
            "criterias" => $criterias,
            "comparisons" => $finalComparisons,
        ]);
    }
}