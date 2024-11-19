<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $candidates = Candidate::with('user')->orderBy('created_at')->get();
        return Inertia::render("Admin/Candidates/page", ["candidates" => $candidates]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Admin/Candidates/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'full_name' => ['required'],
            'npm' => ['required'],
            'jurusan' => ['required'],
            'jumlah_prestasi_akademik' => ['required'],
            'jumlah_prestasi_non_akademik' => ['required'],
            'c1' => ['required', 'numeric', 'max:100'],
            'c2' => ['required', 'numeric', 'max:100'],
            'c3' => ['required', 'numeric', 'max:100'],
            'c4' => ['required', 'numeric', 'max:100'],
        ]);
        // if ($request->c1 == 1) {
        //     $validatedData['c1'] = 100;
        // }
        // if ($request->c1 == 2) {
        //     $validatedData['c1'] = 66.66666666666667;
        // }
        // if ($request->c1 == 3) {
        //     $validatedData['c1'] = 33.33333333333333;
        // }

        $user  = User::create([
            'name' => $request->full_name,
            'email' => fake()->email(),
            'password' => bcrypt('qwerty123'),
            'level' => 'maba'
        ]);
        $validatedData['user_id'] = $user->id;
        Candidate::create($validatedData);
        return   redirect()->route("candidates.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Candidate $candidate)
    {
        return Inertia::render("Admin/Candidates/Show", ["candidate" => $candidate]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Candidate $candidate)
    {
        return Inertia::render("Admin/Candidates/Edit", ["candidate" => $candidate]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Candidate $candidate)
    {
        $validatedData = $request->validate([
            'full_name' => ['required'],
            'npm' => ['required'],
            'jurusan' => ['required'],
            'jumlah_prestasi_akademik' => ['required'],
            'jumlah_prestasi_non_akademik' => ['required'],
            'c1' => ['required', 'numeric', 'max:100'],
            'c2' => ['required', 'numeric', 'max:100'],
            'c3' => ['required', 'numeric', 'max:100'],
            'c4' => ['required', 'numeric', 'max:100'],
        ]);

        $candidate->update($validatedData);
        $candidate->user()->update(['name' => $request->full_name]);

        return   redirect()->route("candidates.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Candidate $candidate)
    {
        $candidate->delete();
        $candidate->user()->delete();
        return   back();
    }
}
