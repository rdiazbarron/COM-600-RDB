<?php

namespace App\Services;

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class EmailService
{
    /**
     * Envía confirmación de compra usando Mail::send()
     */
    public function sendPurchaseConfirmation(
        string $to, 
        string $userName, 
        int $ticketQuantity, 
        array $purchaseDetails
    ): bool {
        try {
            Mail::send('emails.purchase-confirmation', [
                'userName' => $userName,
                'ticketQuantity' => $ticketQuantity,
                'purchaseDetails' => $purchaseDetails
            ], function ($message) use ($to, $purchaseDetails) {
                $message->to($to)
                    ->subject("Confirmación de compra #{$purchaseDetails['compra_id']}");
            });

            return true;
        } catch (\Exception $e) {
            Log::error("Email error to {$to}: " . $e->getMessage());
            return false;
        }
    }

    // Elimina el método sendEventTicketConfirmation si no lo usas
}