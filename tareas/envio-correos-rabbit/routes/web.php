<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-queue', function () {
    $data = [
        'to' => 'tucorreo@ejemplo.com',
        'userName' => 'Juan Pérez',
        'eventName' => 'Concierto de Prueba',
        'ticketQuantity' => 2
    ];
    
    (new \App\Services\RabbitMQService())->publish($data);
    
    return "Mensaje publicado a RabbitMQ!";
});