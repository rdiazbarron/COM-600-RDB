FROM php:8.2-cli

# 1. Instalar dependencias del sistema y extensiones PHP
RUN apt-get update && apt-get install -y \
    librabbitmq-dev \
    libzip-dev \
    libonig-dev \  
    unzip \
    netcat-openbsd \
    procps \
    && docker-php-ext-install \
        sockets \
        zip \
        mbstring \
        pdo_mysql \
    && pecl install amqp \
    && docker-php-ext-enable amqp \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .

RUN mkdir -p storage/framework/{cache,sessions,views} \
    && chmod -R 775 storage \
    && chown -R www-data:www-data storage

RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

CMD ["sh", "-c", "while ! nc -z $RABBITMQ_HOST $RABBITMQ_PORT; do sleep 1; done && php artisan rabbitmq:consume"]