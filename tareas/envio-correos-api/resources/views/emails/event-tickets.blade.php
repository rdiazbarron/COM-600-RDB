<!DOCTYPE html>
<html>
<head>
    <title>Confirmación de Compra de Entradas</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4a90e2;
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            background-color: #f9f9f9;
        }
        .ticket-info {
            background-color: white;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #666;
        }
        .highlight {
            color: #4a90e2;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>¡Compra de Entradas Confirmada!</h1>
        </div>
        <div class="content">
            <p>¡Hola {{ $userName }}!</p>
            <p>Gracias por tu compra. Tu pedido ha sido procesado exitosamente.</p>
            
            <div class="ticket-info">
                <h2>Detalles de tu compra:</h2>
                <p><strong>Evento:</strong> <span class="highlight">{{ $eventName }}</span></p>
                <p><strong>Cantidad de entradas:</strong> <span class="highlight">{{ $ticketQuantity }}</span></p>
                @if(isset($eventDate))
                    <p><strong>Fecha del evento:</strong> {{ $eventDate }}</p>
                @endif
                @if(isset($eventLocation))
                    <p><strong>Lugar:</strong> {{ $eventLocation }}</p>
                @endif
                @if(isset($orderNumber))
                    <p><strong>Número de orden:</strong> {{ $orderNumber }}</p>
                @endif
            </div>

            <p>Por favor, guarda este correo como comprobante de tu compra.</p>
            <p>Te enviaremos un correo adicional con las entradas adjuntas más cerca de la fecha del evento.</p>
            
            <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
            <p>¡Esperamos verte en el evento!</p>
        </div>
        <div class="footer">
            <p>Este es un correo automático, por favor no responda a este mensaje.</p>
        </div>
    </div>
</body>
</html> 