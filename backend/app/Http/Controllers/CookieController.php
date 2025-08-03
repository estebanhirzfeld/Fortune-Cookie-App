<?php

namespace App\Http\Controllers;

use App\Models\Cookie;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CookieController extends Controller
{
    public function index()
    {
        // Ordenamos por ID descendente para ver las más nuevas primero
        $cookies = Cookie::with('user')->orderBy('id', 'desc')->get();
        return response()->json($cookies);
    }

    public function random()
    {
        $cookie = Cookie::with('user')->inRandomOrder()->first();

        if (!$cookie) {
            return response()->json(['message' => 'Aún no hay frases de la fortuna. ¡Agrega algunas!'], 404);
        }

        return response()->json($cookie);
    }

    public function store(Request $request)
    {
        try {
            // Validación: 'message' debe ser único en la tabla 'cookies'
            $validated = $request->validate([
                'message' => 'required|string|unique:cookies,message',
                // opcional
                'creator' => 'nullable|exists:users,id', 
            ]);

            $cookie = Cookie::create($validated);

            return response()->json($cookie->load('user'), 201);

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $e->errors(),
            ], 422); // 422 Unprocessable Entity es el código estándar para errores de validación
        }
    }

    public function update(Request $request, Cookie $cookie)
    {
        $validated = $request->validate([
            'message' => 'sometimes|string|unique:cookies,message,' . $cookie->id,
            'creator' => 'sometimes|nullable|exists:users,id',
        ]);

        $cookie->update($validated);

        return response()->json($cookie->load('user'));
    }

    public function destroy(Cookie $cookie)
    {
        $cookie->delete();

        // 204 No Content es una respuesta estándar para un DELETE
        return response()->json(null, 204);
    }
}