# CRUD de Inventario de Productos

Este proyecto consiste en la creación de una API RESTful que permite gestionar un inventario de productos. 

## Funcionalidades Principales

* **Crear productos**: Permite añadir nuevos productos al inventario, especificando su nombre, descripción, precio, cantidad disponible, etc.
* **Leer productos**: Permite obtener la información de uno o varios productos del inventario.
* **Actualizar productos**: Permite modificar la información de un producto existente en el inventario.
* **Eliminar productos**: Permite eliminar un producto del inventario.

## Estructura del Proyecto

El proyecto está organizado en la siguiente estructura de carpetas:

* `src/`: Contiene el código fuente de la aplicación.
    * `controllers/`: Lógica de manejo de rutas (controladores).
    * `models/`: Definiciones de modelos de datos (esquemas).
    * `routes/`: Definiciones de rutas de la API.
    * `middlewares/`: Middlewares personalizados (autenticación, validación, etc.).
    * `utils/`: Funciones y utilidades reutilizables.
    * `config/`: Archivos de configuración (conexión a la base de datos, variables de entorno).
    * `services/`: Lógica de negocio (servicios).
    * `tests/`: Pruebas unitarias e integración.
    * `app.js`: Punto de entrada de la aplicación (configuración de Express).
    * `server.js`: Inicialización del servidor HTTP.
* `.env`: Archivo de variables de entorno (no subir a Git).
* `.gitignore`: Archivo para ignorar archivos en Git.
* `package.json`: Archivo de configuración de npm.
* `README.md`: Documentación del proyecto.

## Próximos Pasos

En las próximas etapas del proyecto, se implementarán las funcionalidades CRUD para la gestión de productos, utilizando una base de datos MongoDB.