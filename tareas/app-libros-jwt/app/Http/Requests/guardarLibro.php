<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class guardarLibro extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'titulo' => 'required|string|max:255',
            'autor' => 'required|string|max:255',
            'editorial' => 'required|string|max:255',
            'descripcion' => 'required|string|max:1000',
            'anio' => 'required|integer|min:1900|max:' . date('Y'),
            'nro_paginas' => 'required|integer|min:1',
        ];
    }
}
