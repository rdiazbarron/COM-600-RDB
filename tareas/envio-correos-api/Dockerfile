# Usa la imagen oficial de PHP con Apache
FROM php:8.2-apache

# Instala dependencias necesarias para el servicio de correos
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install mbstring \
    && docker-php-ext-install exif \
    && docker-php-ext-install pcntl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configuración de Apache
RUN a2enmod rewrite

# Copia el código del proyecto
WORKDIR /var/www/html
COPY . .

# Instala las dependencias
RUN composer install --no-dev --optimize-autoloader

# Configuración de permisos
RUN chown -R www-data:www-data /var/www/html/storage
RUN chmod -R 775 /var/www/html/storage

# Configuración de la aplicación
COPY .env.example .env
RUN php artisan key:generate

# Expone el puerto 80
EXPOSE 80

# Comando por defecto
CMD ["apache2-foreground"]