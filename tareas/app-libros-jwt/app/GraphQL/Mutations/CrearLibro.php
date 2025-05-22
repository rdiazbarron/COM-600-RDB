<?php

namespace App\GraphQL\Mutations;

use App\Models\Libro;

class CrearLibro
{
    public function __invoke($_, array $args)
    {
        return Libro::create($args['input']);
    }
}
