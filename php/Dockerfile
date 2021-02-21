FROM php:7.4.15-fpm-alpine3.12

RUN apk update; \
	apk upgrade;

RUN docker-php-ext-install pdo pdo_mysql mysqli