<?php

namespace App\GraphQL\Mutations;

use App\Models\Libro;

class DeleteLibro
{
    public function __invoke($_, array $args)
    {
        $libro = Libro::findOrFail($args['id']);
        $libro->delete();
        return $libro;
    }
}
