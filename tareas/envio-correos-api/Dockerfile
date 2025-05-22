# Usa la imagen oficial de PHP con Apache
FROM php:8.2-apache

# Instala dependencias de Laravel y PHP
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && docker-php-ext-install mbstring exif pcntl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instala Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copia el código de Laravel al contenedor
WORKDIR /var/www/html
COPY . .

# Instala dependencias de Composer (producción)
RUN composer install --no-dev --no-scripts --no-autoloader --optimize-autoloader

# Genera el autoloader optimizado
RUN composer dump-autoload --optimize

# Configura Laravel
RUN cp .env.example .env && \
    php artisan key:generate && \
    chown -R www-data:www-data /var/www/html && \
    chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Configura Apache
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

# Puerto expuesto
EXPOSE 80