<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CookieController;

Route::get('/test', function () {
    return response()->json(['message' => 'API funcionando']);
});

// Get a random cookie
Route::get('/cookies/random', [CookieController::class, 'random']);

// Fetch all cookies
Route::get('/cookies', [CookieController::class, 'index']);


// Create a new cookie
Route::post('/cookies', [CookieController::class, 'store']);

// // Fetch a specific cookie by ID
// Route::get('/cookies/{cookie}', [CookieController::class, 'show']);

// Update a specific cookie by ID
Route::put('/cookies/{cookie}', [CookieController::class, 'update']);

// Delete a specific cookie by ID
Route::delete('/cookies/{cookie}', [CookieController::class, 'destroy']);