FROM php

USER root
RUN apt update
RUN docker-php-ext-install mysqli
RUN apt install mysql-client -y
RUN curl -o /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod a+x /usr/local/bin/wp

ADD --chown=www-data . /usr/src/wordpress-kunta-api-core
RUN cp /usr/src/wordpress-kunta-api-core/docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod a+x /usr/local/bin/entrypoint.sh
RUN chown www-data.www-data /usr/local/bin/entrypoint.sh
RUN mkdir -p /usr/src/wordpress
RUN chown www-data.www-data /usr/src/wordpress

USER www-data
WORKDIR /usr/src/wordpress
ENTRYPOINT [ "/usr/local/bin/entrypoint.sh"]