<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LibroController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmailController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Rutas para el servicio de email
Route::prefix('email')->group(function () {
    Route::post('/event-tickets', [EmailController::class, 'sendEventTicketConfirmation']);
});

Route::middleware('jwt')->group(function () {
    Route::get('/libros', [LibroController::class, 'index']);
    Route::post('/libros', [LibroController::class, 'store']);
    Route::get('/libros/{id}', [LibroController::class, 'show']);
    Route::put('/libros/{id}', [LibroController::class, 'update']);
    Route::delete('/libros/{id}', [LibroController::class, 'destroy']);
});

