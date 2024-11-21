FROM php:7.4-apache

# Instale o MAMP
RUN apt-get update && apt-get install -y mamp

# Copie o seu aplicativo para o contêiner
COPY . /var/www/html

# Defina a porta que o contêiner irá usar
EXPOSE 80

# Defina o comando que irá ser executado quando o contêiner for iniciado
CMD ["apache2-foreground"]