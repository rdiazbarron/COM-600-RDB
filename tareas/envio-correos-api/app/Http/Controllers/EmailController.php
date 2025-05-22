<?php

namespace App\Http\Controllers;

use App\Services\EmailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmailController extends Controller
{
    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }
    
    /**
     * Envía un correo de confirmación de compra de entradas
     */
    public function sendEventTicketConfirmation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'to' => 'required|email',
            'userName' => 'required|string|max:255',
            'eventName' => 'required|string|max:255',
            'ticketQuantity' => 'required|integer|min:1',
            'eventDate' => 'nullable|date',
            'eventLocation' => 'nullable|string|max:255',
            'orderNumber' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $success = $this->emailService->sendEventTicketConfirmation(
            $request->to,
            $request->userName,
            $request->eventName,
            $request->ticketQuantity,
            [
                'eventDate' => $request->eventDate,
                'eventLocation' => $request->eventLocation,
                'orderNumber' => $request->orderNumber,
            ]
        );

        if ($success) {
            return response()->json([
                'message' => 'Event ticket confirmation email sent successfully',
                'status' => 'success'
            ]);
        }

        return response()->json([
            'error' => 'Failed to send event ticket confirmation email',
            'status' => 'error'
        ], 500);
    }
} 