<?php

namespace App\Http\Controllers;
use App\Models\Libro;
use Illuminate\Http\Request;
use App\Http\Requests\guardarLibro;
use App\Http\Requests\editarLibro;

class LibroController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $libros = Libro::all();

        return response()->json($libros);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(guardarLibro $request)
    {
        $libro = Libro::create($request->validated());
        
        return response()->json($libro, 201);
    }
    /**
     * Show the form for creating a new resource.
     */
    
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $libro = Libro::find($id);

        if (!$libro) {
            return response()->json(['message' => 'Libro no encontrado'], 404);
        }

        return response()->json($libro);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(editarLibro $request, string $id)
    {
        $libro = Libro::find($id);

        if (!$libro) {
            return response()->json(['message' => 'Libro no encontrado'], 404);
        }

        $libro->update($request->validated());

        return response()->json($libro);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $libro = Libro::find($id);

        if (!$libro) {
            return response()->json(['message' => 'Libro no encontrado'], 404);
        }

        $libro->delete();

        return response()->json(['message' => 'Libro eliminado con éxito']);
    }
}
