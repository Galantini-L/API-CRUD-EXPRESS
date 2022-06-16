# TEST FANIOT - API termometro IR-1000

## Desarrollado por [Lautaro Galantini](https://www.linkedin.com/in/lautaro-galantini-a97125212/)

### Sobre el proyecto

Desarrollado en Node.js utilizando Express y MongoDB con el framework mongoose.
API que permite realizar las operaciones de CRUD de los datos del termometro IR-1000.
Los test fueron hechos con Insomnia.
Las respuestas son en formato JSON.
El termometro IR-1000 diferencia las superficie, por lo que agregué un campo llamado 'surface' que es necesario para agregar los documnetos.

#### ----- Endpoints -----
GET :
/api/measure/:id => Toma el documento de la base de datos que coincida con el id dado y lo devuelve.

/api/all_measures => Devuelve un objeto con todos los documentos de la colección.

POST :
/api/measure => Resive los campos 'surface' y 'temperature', luego crea un nuevo documento. El campo 'surface' es necesario para realizar la creación mientras que 'temperature' es 0 por defecto.

PUT :
/api/measure/:id => Recibe los campos de 'surface' y 'temperature' y hace la actualización del documento que coincida con el id dado por URL.

DELETE :
/api/measure/:id => Elimina el documento que coincida con el id dado por URL.
