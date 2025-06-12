<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('email')->group(function () {
    Route::post('/send', [EmailController::class, 'sendEventTicketConfirmation']);
});
