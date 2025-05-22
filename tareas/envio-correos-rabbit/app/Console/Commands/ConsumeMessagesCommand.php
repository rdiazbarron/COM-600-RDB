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
        $this->info("Escuchando mensajes...");
        
        $rabbitmq = new RabbitMQService();
        $rabbitmq->consume();
    }
}
