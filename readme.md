## Las Cajas Negras del Gobierno AKA Fideicomisos Públicos

Revelar a través de investigaciones periodísticas, los montos milonarios que se destinan día tras día a los Fideicomisos. En manos de quiénes están, qué entidad gubernamental tiene más manejo de recursos “opaco” y si se cumple o no con los objetivos de los mismos. 

Un objetivo específico del proyecto es que el usuario entienda el tema. Se mostrará la información vinculada con reportajes, datos y fuentes por tema. La invisibilidad en la que se encuentran actualmente los recursos millonarios de los Fideicomisos ha traído como consecuencia que estos recursos públicos no sean fiscalizados. 

## requerimientos técnicos

* MySQL 5.5
* PHP 5.4
* Composer
* Bower

## Guía de instalación 

1. Descargar el repositorio
2. En el directorio raíz del proyecto, crear el archivo de configuración *.env* (se puede copiar el archivo *.env.example* que está en el directorio
3. agregar la información necesaria para hacer la conexión a la DB en el archivo *.env*; Aquí un ejemplo:

> DB_HOST=localhost
> DB_DATABASE=fideicomisos
> DB_USERNAME=batman
> DB_PASSWORD=secret

4. obtener las librerías del sitio mediante: composer install
5. generar una llave para el sitio: php artisan key:generate
6. instalar las librerías de JS necesarias en public/js/ mediante: bower install
7. generar las tablas en la DB con: php artisan migrate
8. cargar la información en la db con: php artisan db:seed
9. enjoy :D
