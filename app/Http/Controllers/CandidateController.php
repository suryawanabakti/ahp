<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $candidates = Candidate::all();
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
            'academic_performance' => ['required', 'numeric', 'max:100'],
            'family_income' => ['required', 'numeric', 'max:100'],
            'extracurricular_activities' => ['required', 'numeric', 'max:100'],
            'attendance' => ['required', 'numeric', 'max:100'],
        ]);

        Candidate::create($validatedData);
        return   redirect()->route("candidates.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
