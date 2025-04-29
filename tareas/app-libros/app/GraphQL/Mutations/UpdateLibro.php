<?php

namespace App\GraphQL\Mutations;

use App\Models\Libro;

class UpdateLibro
{
    public function __invoke($_, array $args)
    {
        $libro = Libro::findOrFail($args['id']);
        $libro->update($args['input']);
        return $libro;
    }
}
