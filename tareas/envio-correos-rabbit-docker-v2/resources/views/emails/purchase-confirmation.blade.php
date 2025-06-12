<!DOCTYPE html>
<html>
<body>
    <div class="container">
        <h1>¡Gracias por tu compra, {{ $userName }}!</h1>
        <p>Detalles de tu pedido:</p>
        
        <ul>
            <li><strong>Número de entradas:</strong> {{ $ticketQuantity }}</li>
            <li><strong>ID de compra:</strong> {{ $purchaseDetails['compra_id'] ?? 'N/A' }}</li>
            <li><strong>Fecha:</strong> {{ $purchaseDetails['fecha_pago'] ?? now()->format('d/m/Y') }}</li>
        </ul>
    </div>
</body>
</html>