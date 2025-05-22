#!/bin/sh

echo "Esperando a que la base de datos esté lista..."

while ! mysqladmin ping -h"$DB_HOST" --silent; do
  sleep 2
done

echo "Base de datos lista, ejecutando migraciones..."
php artisan migrate

echo "Iniciando servidor Laravel..."
php artisan serve --host=0.0.0.0 --port=8000
