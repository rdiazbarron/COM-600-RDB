<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\EmailService;

class ConsumeTicketMessages extends Command
{
    protected $signature = 'email:consume-tickets';
    protected $description = 'Inicia el consumo de mensajes de compra de entradas';

    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        parent::__construct();
        $this->emailService = $emailService;
    }

    public function handle()
    {
        $this->info('Iniciando consumo de mensajes de compra de entradas...');
        $this->emailService->startConsuming();
    }
} 