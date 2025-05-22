<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class editarLibro extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'titulo' => 'sometimes|required|string|max:255',
            'autor' => 'sometimes|required|string|max:255',
            'editorial' => 'sometimes|required|string|max:255',
            'descripcion' => 'sometimes|required|string|max:1000',
            'anio' => 'sometimes|required|integer|min:1900|max:' . date('Y'),
            'nro_paginas' => 'sometimes|required|integer|min:1',
        ];
    }
}
