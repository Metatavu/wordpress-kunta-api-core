#!/bin/bash

KA_HOST=${KUNTA_API_HOST:-http://dev.kunta-api.fi:8080/v1}
KA_USER=${KUNTA_API_CLIENT:-client}
KA_PASS=${KUNTA_API_PASSWORD:-secret}
WP_ADMIN_USER=${WP_ADMIN_USER:-admin}
WP_ADMIN_PASS=${WP_ADMIN_PASS:-secret}
ORG_ID=${KUNTA_API_ORGANIZATION_ID:-00000000-0000-0000-0000-000000000000}
ORG_NAME=${KUNTA_API_ORGANIZATION_NAME:-$KUNTA_API_ORGANIZATION_ID}
TINY_MCE_EMBED=${TINY_MCE_EMBED:-0}

echo "Waiting MySQL..."

while ! mysqladmin ping -h"$WORDPRESS_DB_HOST" --silent; do
  sleep 1
done

echo "MySQL found."

wp core download
wp config create --dbname=$WORDPRESS_DB_NAME --dbuser=$WORDPRESS_DB_USER --dbpass=$WORDPRESS_DB_PASSWORD --dbhost=$WORDPRESS_DB_HOST
wp core install --url=$WORDPRESS_HOST --title=Kunta\ WP --admin_user=${WP_ADMIN_USER} --admin_password=${WP_ADMIN_PASS} --admin_email=mail@example.com

if [ -d "/usr/src/wordpress-kunta-api-core-local" ]; then
  ln -s /usr/src/wordpress-kunta-api-core-local /usr/src/wordpress/wp-content/plugins/wordpress-kunta-api-core
else
  ln -s /usr/src/wordpress-kunta-api-core /usr/src/wordpress/wp-content/plugins/
fi

wp plugin activate wordpress-kunta-api-core
wp option update kunta_api_core_settings "{ \"useServiceEmbedPluginTinymce\": \"${TINY_MCE_EMBED}\", \"apiUrl\": \"${KA_HOST}\", \"apiUser\": \"${KA_USER}\", \"apiPassword\": \"${KA_PASS}\", \"organizations\": [{ \"name\":\"${ORG_NAME}\", \"organizationId\": \"${ORG_ID}\", \"serviceLocationChannnelsPath\": \"/servicelocations\", \"synchronizeServices\": \"0\", \"synchronizeServiceLocationServiceChannels\": \"0\", \"webhooks\":\"1\" }] }" --format=json
wp server --host=0.0.0.0