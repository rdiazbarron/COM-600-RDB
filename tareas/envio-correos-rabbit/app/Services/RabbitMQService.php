<?php

namespace App\Services;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

class RabbitMQService
{
    public function publish($message)
    {
        $connection = new AMQPStreamConnection(
            'localhost', 5672, 'guest', 'guest'
        );
        $channel = $connection->channel();
        
        $channel->queue_declare('notifications_queue', false, true, false, false);
        
        $msg = new AMQPMessage(json_encode($message));
        $channel->basic_publish($msg, '', 'notifications_queue');
        
        $channel->close();
        $connection->close();
    }

    public function consume()
    {
        $connection = new AMQPStreamConnection(
            'localhost', 5672, 'guest', 'guest'
        );
        $channel = $connection->channel();
        
        $channel->queue_declare('notifications_queue', false, true, false, false);
        
        $callback = function ($msg) {
            $data = json_decode($msg->body, true);
            
            
            (new \App\Services\EmailService())->sendEventTicketConfirmation(
                $data['to'],
                $data['userName'],
                $data['eventName'],
                $data['ticketQuantity']
            );

            $msg->ack();
        };
        
        $channel->basic_consume(
            'notifications_queue', '', false, false, false, false, $callback
        );
        
        while ($channel->is_open()) {
            $channel->wait();
        }
        
        $channel->close();
        $connection->close();
    }
}