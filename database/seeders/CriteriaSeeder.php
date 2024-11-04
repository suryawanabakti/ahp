<?php

namespace Database\Seeders;

use App\Models\Criteria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $criteria = ['Prestasi Akademik', 'Penghasilan Orang Tua', 'Kegiatan Ekstrakurikuler', 'Kehadiran di Sekolah'];
        $no = 1;
        foreach ($criteria as $criterion) {
            Criteria::create(['name' => $criterion, 'code' => "C" . $no]);
            $no++;
        }
    }
}
