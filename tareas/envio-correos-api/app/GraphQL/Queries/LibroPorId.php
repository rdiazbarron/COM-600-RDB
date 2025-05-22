<?php

namespace App\GraphQL\Queries;

use App\Models\Libro;

class LibroPorId
{
    public function __invoke($_, array $args)
    {
        return Libro::findOrFail($args['id']);
    }
}
