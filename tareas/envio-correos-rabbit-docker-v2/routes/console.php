<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('test:rabbit', function() {
    $rabbit = new \App\Services\RabbitMQService();
    $rabbit->publish([
        'correo' => 'diazbarronricardojairo@gmail.com',
        'nombre' => 'Test User',
        'cantidad' => 2,
        'compra_id' => 'TEST-' . time()
    ]);
    $this->info("Mensaje publicado!");
});