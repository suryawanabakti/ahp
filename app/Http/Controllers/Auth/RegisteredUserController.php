<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Candidate;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'level' => 'maba',
            'password' => Hash::make($request->password),
        ]);

        Candidate::create([
            'user_id' => $user->id,
            'npm' => $request->npm,
            'pdf_raport' => $request->file('pdf_raport')->store('pdf_raport'),
            'pdf_skhu' => $request->file('pdf_skhu')->store('pdf_skhu'),
            'full_name' => $user->name,
            'jurusan' => $request->jurusan,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('rankings', absolute: false));
    }
}
