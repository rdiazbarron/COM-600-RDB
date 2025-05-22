<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Los comandos de Artisan proporcionados por tu aplicación.
     *
     * @var array
     */
    protected $commands = [
        // Registra aquí tus comandos personalizados
        \App\Console\Commands\ConsumeMessagesCommand::class,
    ];

    /**
     * Define el plan de ejecución de comandos.
     */
    protected function schedule(Schedule $schedule)
    {
        // Ejemplo: ejecutar un comando diariamente
        // $schedule->command('inspire')->daily();
    }

    /**
     * Registra los comandos para la aplicación.
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}