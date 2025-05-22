<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Log;

class EmailService
{
    /**
     * Envía un correo de confirmación de compra de entradas
     *
     * @param string $to Correo del comprador
     * @param string $userName Nombre del comprador
     * @param string $eventName Nombre del evento
     * @param int $ticketQuantity Cantidad de entradas
     * @param array $additionalData Datos adicionales del evento (opcional)
     * @return bool
     */
    public function sendEventTicketConfirmation(
        string $to,
        string $userName,
        string $eventName,
        int $ticketQuantity,
        array $additionalData = []
    ): bool {
        $data = array_merge([
            'userName' => $userName,
            'eventName' => $eventName,
            'ticketQuantity' => $ticketQuantity,
        ], $additionalData);

        return $this->sendEmail(
            $to,
            "Confirmación de compra - {$eventName}",
            'emails.event-tickets',
            $data
        );
    }

    /**
     * Método base para enviar correos electrónicos
     *
     * @param string $to Dirección de correo del destinatario
     * @param string $subject Asunto del correo
     * @param string $view Vista Blade a utilizar
     * @param array $data Datos para la vista
     * @return bool
     */
    protected function sendEmail(string $to, string $subject, string $view, array $data): bool
    {
        \Log::info("Intentando enviar email a: " . $to);
        try {
            Mail::send($view, $data, function (Message $message) use ($to, $subject) {
                $message->to($to)
                    ->subject($subject);
            });
            \Log::info("Email enviado exitosamente");

            return true;
        } catch (\Exception $e) {
            Log::error('Error al enviar correo: ' . $e->getMessage());
            return false;
        }
    }
} 