# Imagen base con PHP, Composer y extensiones comunes
FROM php:8.2-fpm

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    default-mysql-client \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev \
    libzip-dev npm nodejs \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establece el directorio de trabajo
WORKDIR /var/www

# Copia archivos del proyecto
COPY . .

# Instala dependencias de PHP
RUN composer install --no-interaction --prefer-dist

# Instala dependencias de Node
RUN npm install && npm run build

# Otorga permisos (opcional, depende del sistema de archivos)
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
