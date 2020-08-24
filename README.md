# **Documentación de la api de acortador de urls**

Está es una api para acortar urls. El link de la api es []().

## Advertencias
Está api está en una etapa de pruebas.

## Instalación

1. Clonar este repositorio.
2. Crear un archivo .env en el directorio donde se clone el repositorio con la siguiente información:

CONTRA_SECRETA_DE_JWT="una contraseña segura"
URI_MONGODB="url de la base de datos de mongodb".
PUERTO=número del puerto donde querés correr el servidor.

3. npm install
4. npm run dev (para pruebas) o npm run test (para tests)

## End points

### Registro:

Para poder acortar una url es necesario estar registrado y logueado. Para registrarse se tiene que usar el siguiente end point:
#### Link:
>[]()
#### Metodo
>**POST**
#### Headers:
>**"Content-Type": "application/json"**
#### Body:
Es un json que tiene que tener los siguientes campos
>**correo**: Tiene que tener ser un string, no se puede ocupar dos veces el mismo correo __obligatorio__.

>**nombre**: Tiene que tener ser un string con caracteres alfabéticos __no obligatorio__

>**apellido**: Tiene que tener ser un string con caracteres alfabéticos __no obligatorio__

>**contraseña**: Tiene que tener ser un string con al menos cuatro caracteres __no obligatorio__

>**alias**: Tiene que tener ser un string alfanumérico, no se puede ocupar dos veces el alias, tiene que tener una longitud mínima de 4 caracteres y una longitud máxima de 10 caracteres __obligatorio__.

### Respuesta
#### Si el usuario se registro, se recibe un código 200 y el siguiente json:
>{ mensaje: 'usuario creado' }
#### Si sucedió un error de validación de campos se enviá un código 400 y un json con el siguiente formato:
>{
 "errores": [
        {
            "msg": "Razón por la cual fallo la validación",
            "param": "nombre del parámetro que fallo",
            "location": "Localización del parámetro que fallo"
        },
]
}
#### o un código 500 con el siguiente json
>{ mensaje: 'El servidor tiene un error, lo solucionaremos en un momento' }

### Login:

Para poder acortar una url es necesario estar registrado y logueado. Para registrarse se tiene que usar el siguiente end point:
#### Link:
>[]()
#### Metodo
>**POST**
#### Headers:
>**"Content-Type": "application/json"**
#### Body:
Es un json que tiene que tener los siguientes campos
>**correo**: Tiene que tener ser un string, no se puede ocupar dos veces el mismo correo __obligatorio__.

>**contraseña**: Tiene que tener ser un string con al menos cuatro caracteres __no obligatorio__

#### Si el usuario ingreso las credenciales correctas, se recibe un código 200 y el siguiente json con un token valido por una hora:
>{ mensaje: 'login correcto', token: un string que contiene el token}
#### Si sucedió un error de validación de campos se enviá un código 400 y un json con el siguiente formato:
>{
 "errores": [
        {
            "msg": "Razón por la cual fallo la validación",
            "param": "nombre del parámetro que fallo",
            "location": "Localización del parámetro que fallo"
        },
]
}
#### o un código 500 con el siguiente json
>{ mensaje: 'El servidor tiene un error, lo solucionaremos en un momento' }
#### o un código 403 con el siguiente json
>{ mensaje: 'contraseña incorrecta' }

### Acortar url:

Para poder acortar una url es necesario estar registrado y logueado. Para acortar una url se tiene que usar el siguiente link:
#### Link:
>[]()
#### Metodo
>**POST**
#### Headers:
>** Authorization: Bearer token **
#### Body:
Es un json que tiene que tener los siguientes campos
>**urlOriginal**: Tiene que tener ser un string con una url real __no obligatorio__

>**urlAcortada**: Tiene que tener ser un string con caracteres alfanuméricos y no se puede repetir una url acortada __no obligatorio__

### Respuesta
#### Si la url se registro, se recibe un código 200 y el siguiente json:
>{ mensaje: 'url creada', urlOriginal, urlAcortada }
#### Si sucedió un error de validación de campos se enviá un código 400 y un json con el siguiente formato:
>{
 "errores": [
        {
            "msg": "Razón por la cual fallo la validación",
            "param": "nombre del parámetro que fallo",
            "location": "Localización del parámetro que fallo"
        },
]
}
#### o un código 500 con el siguiente json
>{ mensaje: 'El servidor tiene un error, lo solucionaremos en un momento' }

### Ir a url acortada.

Para poder acceder a una url no es necesario estar registrado.
#### Link:
>[]()
#### Metodo
>**GET**
#### Headers:
>Ninguna
#### Body:
>No es necesario

### Respuesta
#### Si la url se registro, se recibe un código 301 y se redirecciona al usuario a la url original.

#### Si la url no existe se enviá un código 404 y un json con la siguiente forma:
> { mensaje: 'No existe url registrada' }
#### o un código 500 con el siguiente json
>{ mensaje: 'El servidor tiene un error, lo solucionaremos en un momento' }


### Ver perfil

Para poder ver el perfil propio es necesario estar registrado y logueado. Para obtener los datos del perfil se accede a:
#### Link:
>[]()
#### Metodo
>**GET**
#### Headers:
>** Authorization: Bearer token **
#### Body:
>No es necesario

### Respuesta
#### Se enviá un código 200 y un json con la información del usuario:
> {      nombre, apellido, alias, correo, urls: [{urlAcortada, urlOriginal}], creado}
#### o un código 500 con el siguiente json
>{ mensaje: 'El servidor tiene un error, lo solucionaremos en un momento' }