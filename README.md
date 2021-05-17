#WebServer + RestServer

Se debe ejecutar el ```npm install``` para reconstruir el proyecto

--Consultas--
//Post-Crear
url/api/usuarios
Body:
nombre
correo
password

//Get-Buscar Usuarios
url/api/usuarios?limite=(numero)

//Put-Actualizar
url/api/usuarios/id
Body:
nombre
password

//Post-Login
url/api/auth/login
Body:
correo
password
//retorna el JWT

//Delete-Eliminar
url/api/usuarios/id
Header: 
x-token: JWT