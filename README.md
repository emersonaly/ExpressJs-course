# Curso de Express.js y Prisma

Este es un proyecto de ejemplo para un curso de desarrollo de APIs REST utilizando **Express.js** y **Prisma ORM**. El proyecto incluye autenticación con JWT, validaciones, y una base de datos PostgreSQL.

## 🚀 Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express.js**: Framework para el desarrollo web en Node.js.
- **Prisma**: ORM para interactuar con la base de datos.
- **PostgreSQL**: Base de datos relacional.
- **JWT (JSON Web Tokens)**: Para la autenticación de usuarios.
- **Bcryptjs**: Para el cifrado de contraseñas.
- **Express-validator**: Para la validación de datos de entrada.

## 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

## 🛠️ Instalación y Configuración

Sigue estos pasos para configurar el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd cursoexpressjs
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Copia el archivo `.env_example` a un nuevo archivo llamado `.env` y completa los datos:
   ```bash
   cp .env_example .env
   ```
   Asegúrate de configurar correctamente tu `DATABASE_URL` en el archivo `.env`:
   ```env
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/nombre_base_datos?schema=public"
   JWT_SECRET="tu_secreto_super_seguro"
   ```

4. **Configurar la base de datos con Prisma:**
   Ejecuta las migraciones para crear las tablas en tu base de datos:
   ```bash
   npx prisma migrate dev --name init
   ```
   *(Opcional)* Si deseas cargar datos de prueba (seeds):
   ```bash
   node prisma/seed.js
   ```

## 🏃‍♂️ Ejecución

### Modo desarrollo (con recarga automática)
```bash
npm run dev
```

### Modo producción
```bash
npm start
```

El servidor se iniciará por defecto en `http://localhost:3000`.

## 📌 Endpoints

Puedes encontrar una lista detallada de los endpoints disponibles en el archivo:
- `express-course-enpoints.json`

Este archivo puede ser importado en herramientas como **Postman** o **Insomnia** para probar la API.

## 📂 Estructura del Proyecto

- `src/`: Contiene el código fuente del servidor.
- `prisma/`: Contiene el esquema de la base de datos y scripts de sembrado.
- `app.js`: Punto de entrada principal (si aplica) o configuración base.
- `.env`: Variables de entorno sensibles.

## ✒️ Autor

- **Emerson Aly** - *Desarrollo Inicial* - [GitHub Profile](https://github.com/tu-usuario)

---
¡Espero que este curso sea de gran utilidad para aprender Express.js!
