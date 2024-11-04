<?php

use App\Http\Controllers\CalculateWeightController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\CriteriaController;
use App\Http\Controllers\PairwiseComparisonController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\ShowWeightController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/users', function () {
    $users = User::all()->map(function ($data) {
        return [
            "id" => $data->id,
            "name" => $data->name,
            "email" => $data->email,
        ];
    });
    return Inertia::render('Admin/Users/page', ["users" => $users]);
})->middleware(['auth', 'verified'])->name('users');


Route::middleware('auth')->group(function () {
    Route::get('/rankings', RankingController::class)->name('rankings');

    Route::get('/weights', ShowWeightController::class)->name('weights');
    Route::get('/pairwise-comparison', PairwiseComparisonController::class)->name('pairwise-comparison');
    Route::get('/calculate-weight', CalculateWeightController::class)->name('calculate-weight');

    Route::resource('candidates', CandidateController::class)->names('candidates');
    Route::resource('criterias', CriteriaController::class)->names('criterias');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
