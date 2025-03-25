# Finance Track Backend 🏦

Este backend proporciona una API para gestionar datos de acciones financieras, permitiendo la sincronización de información desde una fuente externa y el acceso a datos históricos de acciones.

## 🏗️ Arquitectura utilizada

La aplicación sigue una arquitectura basada en **Cliente - Servidor**, donde:

-   **Backend** (Servidor - API REST): Sigue patrón MVC internamente  
-   **Frontend** (Cliente - SPA en React): Consume API del backend y gestiona UI

## ⚙ Tecnologías utilizadas 

-   **Node.js** y **Express** para el desarrollo del servidor.
-   **PostgreSQL** como base de datos.
-   **pg-promise** para la conexión con la base de datos.
-   **yahoo-finance-2** librería de terceros para acceder a datos de Yahoo Finance.
-   **dotenv** para la gestión de variables de entorno.
-   **Thunder Client** para pruebas de API durante el desarrollo.

## 🚩 Endpoints

### 1. Obtener todas las acciones registradas

-   **Método:** `GET`
-   **Endpoint:** `/api/stocks`
-   **Descripción:** Retorna todas las acciones almacenadas en la base de datos.

### 2. Obtener datos de una acción por su símbolo

-   **Método:** `GET`
-   **Endpoint:** `/api/stocks/:symbol`
-   **Descripción:** Retorna los datos de una acción específica según su símbolo.

### 3. Sincronizar datos de todas las acciones

-   **Método:** `POST`
-   **Endpoint:** `/api/sync`
-   **Descripción:** Obtiene y almacena los datos actualizados de acciones en la base de datos.

### 4. Sincronizar datos de una acción específica

-   **Método:** `POST`
-   **Endpoint:** `/api/sync/:symbol`
-   **Descripción:** Obtiene y almacena los datos actualizados de una acción específica en la base de datos.

### 5. Manejo de rutas no encontradas

-   **Cualquier otro endpoint:** Devuelve un mensaje de error indicando que la ruta no existe.

## 🗃 Estructura de la base de datos

Se optó por utilizar **una sola tabla** con la siguiente estructura:

```sql
CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    symbol TEXT NOT NULL,
    date DATE NOT NULL,
    close_price NUMERIC NOT NULL
);
```

## 📂 Organización del código

- **`routes/`**: Define las rutas de la API.
- **`controllers/`**: Contiene la lógica de negocio para manejar los datos de acciones.
- **`models/`**: Define la interacción con la base de datos.
- **`middlewares/`**: Contiene middlewares, como el manejo de métodos no permitidos.
- **`config/`**: Manejo de configuración y conexión a la base de datos.
