<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\RabbitMQService;

class ConsumeMessagesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rabbitmq:consume';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Consume messages from RabbitMQ';

    /**
     * Execute the console command.
     */
  public function handle()
{
    $this->info("🚀 Iniciando consumidor... Ver logs en storage/logs/laravel.log");
    
    // Habilita logging detallado
    config(['logging.channels.single.level' => 'debug']);
    
    (new RabbitMQService())->consume();
}
}
