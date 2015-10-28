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

DB_HOST=localhost
DB_DATABASE=fideicomisos
DB_USERNAME=batman
DB_PASSWORD=secret

4. obtener las librerías del sitio mediante: composer install
5. generar una llave para el sitio: php artisan key:generate
6. instalar las librerías de JS necesarias en public/js/ mediante: bower install
7. generar las tablas en la DB con: php artisan migrate
8. cargar la información en la db con: php artisan db:seed
9. enjoy :D

 
## Descripción

Este proyecto cuenta con 4 secciones:
1. un editor de contenido
2. un navegador de fideicomisos
3. un API de consulta
4. un front end con información básica de qué es un fideicomiso y datos de contacto

### Editor de contenido
El sitio cuenta con un pequeño administrador en el que se puede escribir artículos y generar gráficas con datos de fideicomisos. Se puede acceder al admin en /auth/login (el usuario y el password inicial se pueden ver al cargar los datos en la DB mediante Artisan)

### El navegador de fideicomisos
Este cuenta con tres herramientas: 
* el buscador
* una sección de visualizaciones
* la lista de fideicomisos ordenada por distintas categorías

### El api de consulta
El API de consulta da acceso a la DB con los fideicomisos desde fuera del sistema. 
la documentación se puede leer aquí: https://github.com/GobiernoFacil/fideicomisos2015/blob/master/API-fideicomisos.md

### El front end
La información de contacto, la descripción de un fideicomiso, el acceso a los artículos.
