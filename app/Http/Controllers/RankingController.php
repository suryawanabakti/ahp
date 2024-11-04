<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Weight;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RankingController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        // Ambil bobot kriteria dari tabel weights
        $kondisi =  Weight::whereHas('criteria', fn($q) => $q->where('code', "C1"))->first();

        if (empty($kondisi)) {
            $message = "Bobot belum di hitung harap hitung bobot terlebih dahulu";
            $redirect_url = route("weights");
            return Inertia::render("Admin/Error", ["message" => $message, "redirect_url" => $redirect_url]);
        }

        $wPrestasiAkademik = Weight::whereHas('criteria', fn($q) => $q->where('code', "C1"))->first()->weight;
        $wPenghasilanOrangTua = Weight::whereHas('criteria', fn($q) => $q->where('code', "C2"))->first()->weight;
        $wKegiatanEkstrakurikuler = Weight::whereHas('criteria', fn($q) => $q->where('code', "C3"))->first()->weight;
        $wKehadiranDiSekolah = Weight::whereHas('criteria', fn($q) => $q->where('code', "C4"))->first()->weight;


        // Ambil semua data siswa
        $candidates = Candidate::all();
        $scores = [];

        foreach ($candidates as $candidate) {
            // Hitung skor akhir untuk setiap siswa
            $score = (
                ($candidate->academic_performance * $wPrestasiAkademik) +
                ($candidate->family_income * $wPenghasilanOrangTua) +
                ($candidate->extracurricular_activities * $wKegiatanEkstrakurikuler) +
                ($candidate->attendance * $wKehadiranDiSekolah)
            );

            // Simpan skor dengan data siswa
            $scores[] = [
                'id' => $candidate->id,
                'full_name' => $candidate->full_name,
                'score' => $score,
            ];
        }

        // Urutkan siswa berdasarkan skor dari tinggi ke rendah
        usort($scores, function ($a, $b) {
            return $b['score'] <=> $a['score'];
        });


        return Inertia::render("Admin/Rankings/page", [
            "scores" => $scores
        ]);
    }
}
