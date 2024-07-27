# 👔 Proyecto BLOG

Este proyecto es una aplicación que utiliza Angular para el frontend y NestJS para el backend, con MySQL como base de datos. A continuación, se detalla cómo instalar, configurar y ejecutar el proyecto.

## Requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) (opcional, si quieres clonar el repositorio)

## 🏃‍♂️ Pasos para clonar e instalar app

1. Clona este repositorio a tu máquina local:
   ```bash
   git clone https://github.com/Manuel-Antonio/blog-mediabyte.git

2. Abre el proyecto en tu Visual Code

Visualizaras los archivos:
- articles-app (carpeta)
- blog-api (carpeta)
- .env (archivo)
- docker-compose.yml (archivo)
- README.md (archivo)

* No olvides editar el archivo ".env" con tus propias credenciales MYSQL

3. Ejecutar comando en terminal

A continuación, abre la terminal integrada en Visual Studio Code para ejecutar el siguiente comando. Puedes abrir la terminal utilizando el atajo de teclado "Ctrl + ñ" en Windows o "Ctrl + ~" en macOS. Una vez abierta, ingresa el comando para construir y levantar los contenedores Docker.

* La instalacion dura 5 min aprox. depende del internet.
   ```bash
   docker-compose up --build

4. Verificar en la interfaz de Docker la creacion del contenedor "blog-mediabyte", dentro de este se encontrará los contenedores:
- mysql_db
- angular_app
- nestjs_app

## 🖥 Pasos para usar el proyecto
1. Ejecuta tu docker creado si todavía no lo está. Luego en el navegador pega el link:
   ```bash
   http://localhost/

2. Por defecto ya está creado un usuario, usa estas credenciales en la pagina de Login o crealas en la pagina de Registro:
   * username:
      ```bash
      admin
   * password:
      ```bash
      password

3. 🎉🎉🎉 Listo ya puedes entrar a la app y realizar un CRUD de articulos.

# Codigo extra
Dejo el link para descargar el archivo que usé para testeo de endpoint en POSTMAN
   ```bash
   https://drive.google.com/file/d/1piUp51ho2YUV-6IzDbi3znrSEdFjLJP4/view?usp=sharing
