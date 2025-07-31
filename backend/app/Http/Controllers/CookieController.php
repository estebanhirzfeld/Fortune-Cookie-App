<?php

namespace App\Http\Controllers;

use App\Models\Cookie;
use Illuminate\Http\Request;

class CookieController extends Controller
{
    public function index()
    {
        $cookies = Cookie::with('user')->get();
        return response()->json($cookies);
    }

    public function random()
    {
        $cookie = Cookie::with('user')->inRandomOrder()->first();

        if (!$cookie) {
            return response()->json(['message' => 'No cookies found'], 404);
        }

        return response()->json($cookie);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string',
            'creator' => 'nullable|exists:users,id',
        ]);

        $cookie = Cookie::create($validated);

        return response()->json($cookie->load('user'), 201);
    }

    public function update(Request $request, Cookie $cookie)
    {
        $validated = $request->validate([
            'message' => 'sometimes|string',
            'creator' => 'sometimes|nullable|exists:users,id',
        ]);

        $cookie->update($validated);

        return response()->json($cookie->load('user'));
    }
}
