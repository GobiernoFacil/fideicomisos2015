# fideicomisos2015

## instrucciones de instalación

1. se necesita la DB de fideicomisos. Aquí se puede descargar: https://www.dropbox.com/s/gmwilhjodri9aes/fideicomisos.sql.zip?dl=0
2. en la caperta fideicomisos/ descargar las librerías con: composer update (puede ser necesario actualizar primero composer)
3. en la carpeta fideicomisos/ crear un archivo llamado .env (se puede copiar de .env.example, que está en la misma carpeta)
4. generar una APP_KEY con el siguiente comando: php artisan key:generate (en la carpeta fideicomisos)
5. Si se usa MAMP, dentro del archivo .env hay que incluir lo siguiente: USE_MAMP=1
