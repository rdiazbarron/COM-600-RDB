<?php

namespace App\Services;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
use Illuminate\Support\Facades\Log;

class RabbitMQService
{
    public function publish($message)
    {
        $connection = new AMQPStreamConnection(
            env('RABBITMQ_HOST', 'localhost'),
            env('RABBITMQ_PORT', 5672),
            env('RABBITMQ_USER', 'guest'),
            env('RABBITMQ_PASSWORD', 'guest')
        );
        
        $channel = $connection->channel();
        $channel->queue_declare('notifications_queue', false, true, false, false);
        
        $msg = new AMQPMessage(
            json_encode($message),
            ['delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT]
        );
        
        $channel->basic_publish($msg, '', 'notifications_queue');
        $channel->close();
        $connection->close();
    }

  public function consume()
{
    $maxRetries = 3;
    $retryCount = 0;

    while ($retryCount < $maxRetries) {
        try {
            Log::info("⌛ Intentando conectar a RabbitMQ...", [
                'host' => env('RABBITMQ_HOST'),
                'port' => env('RABBITMQ_PORT')
            ]);

            $connection = new AMQPStreamConnection(
                env('RABBITMQ_HOST', 'localhost'), 
                env('RABBITMQ_PORT', 5672),
                env('RABBITMQ_USER', 'guest'),
                env('RABBITMQ_PASSWORD', 'guest'),
                '/', // Virtual host
                false, // $insist
                'AMQPLAIN', // Login method
                null, // Login response
                'en_US', // Locale
                3.0, // Connection timeout
                3.0  // Read/write timeout
            );

            Log::info("✅ Conexión exitosa a RabbitMQ");
            
            $channel = $connection->channel();
            $channel->queue_declare('notifications_queue', false, true, false, false);

            $callback = function ($msg) {
                Log::info("📩 Mensaje recibido", ['body' => $msg->body]);
                
                try {
                    $data = json_decode($msg->body, true);
                    
                    if (!isset($data['correo'], $data['nombre'], $data['cantidad'])) {
                        throw new \Exception("Estructura del mensaje inválida");
                    }

                    Log::info("✉️ Intentando enviar email a: " . $data['correo']);
                    
                    $emailService = new EmailService();
                    $success = $emailService->sendPurchaseConfirmation(
                        $data['correo'],
                        $data['nombre'],
                        $data['cantidad'],
                        [
                            'compra_id' => $data['compra_id'] ?? 'N/A',
                            'fecha_pago' => $data['fecha_pago'] ?? now()->format('d/m/Y H:i:s')
                        ]
                    );

                    if ($success) {
                        $msg->ack();
                        Log::info("✔️ Email enviado y mensaje confirmado (ACK)");
                    } else {
                        throw new \Exception("Falló el envío del email");
                    }
                    
                } catch (\Exception $e) {
                    Log::error("❌ Error procesando mensaje: " . $e->getMessage(), [
                        'exception' => $e,
                        'message' => $msg->body
                    ]);
                    $msg->nack(false, true); // Reintentar mensaje
                }
            };

            $channel->basic_consume(
                'notifications_queue', 
                '', 
                false, // No auto-ack
                false, 
                false, 
                false, 
                $callback
            );

            Log::info("👂 Escuchando mensajes... (Ctrl+C para detener)");
            
            while ($channel->is_consuming()) {
                $channel->wait();
            }

        } catch (\Exception $e) {
            Log::error("🔥 Error crítico en RabbitMQ: " . $e->getMessage());
            $retryCount++;
            sleep(5);
        } finally {
            if (isset($channel)) {
                $channel->close();
                Log::info("🚪 Canal cerrado");
            }
            if (isset($connection)) {
                $connection->close();
                Log::info("🚪 Conexión cerrada");
            }
        }
    }

    Log::error("🛑 Consumidor detenido después de {$maxRetries} reintentos");
}
}