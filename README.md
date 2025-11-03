# Dashboard

Una aplicación de panel de control (“dashboard”) con arquitectura separada **frontend** y **backend**.

## 📌 Visión general

Este repositorio contiene dos proyectos principales:

- `DashboardBackend` — servidor en Python (Flask) que expone la API REST y la autenticación JWT.  
- `DashboardFrontend` — interfaz de usuario hecha con Angular que consume la API.

## 🧱 Arquitectura

- Backend
  - Framework: Flask
  - Autenticación: JWT (flask_jwt_extended)
  - CORS habilitado para desarrollo
  - Ejecutable: `app.py` (modo desarrollo)

- Frontend
  - Framework: Angular
  - Consumo de API mediante servicios (HttpClient)
  - Rutas y guards para protección de páginas

## 🚀 Instalación y puesta en marcha

### Backend (DashboardBackend)

1. Crear y activar un entorno virtual (opcional pero recomendado)
```bash
python -m venv .venv
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
# CMD
.\.venv\Scripts\activate
# Unix/macOS
source .venv/bin/activate
```

2. Instalar dependencias
```bash
cd DashboardBackend
pip install -r requirements.txt
```

3. Variables de entorno (recomendado en producción)
- `JWT_SECRET_KEY` — clave secreta para JWT. Actualmente en desarrollo se usa `DesarrolloDashboard` en `app.py`; cámbiala en producción.

4. Ejecutar el servidor (modo desarrollo)
```bash
cd DashboardBackend
python app.py
```
Por defecto el servidor de desarrollo Flask se levantará en `http://localhost:5000`.

### Frontend (DashboardFrontend)

1. Instalar dependencias
```bash
cd DashboardFrontend
npm install
```

2. Ejecutar la aplicación Angular en modo desarrollo
```bash
ng serve --open
```
La app se abrirá en `http://localhost:4200` por defecto.

## 🔐 Ejemplo de flujo de autenticación

- Endpoint de login: `POST http://localhost:5000/login`  
  Cuerpo JSON:
```json
{
  "username": "admin",
  "password": "admin123"
}
```
- Respuesta exitosa (ejemplo):
```json
{
  "message": "Login exitoso",
  "token": "<jwt-token>"
}
```
- El frontend almacena el token en `localStorage` (clave: `authToken`) y lo usa para peticiones protegidas.

## 🧪 Simulación / desarrollo

Si no quieres usar el backend real, puedes:
- Crear un interceptor HTTP en Angular que devuelva un token falso al llamar a `/login`.
- Levantar un mock server simple (Express, json-server o script en Python) que resuelva `/login` y `/tokenValidate`.

## ✅ Notas y buenas prácticas

- El guard de rutas del frontend evita acceso a `/dashboard` si no hay token; igualmente el backend debe validar el token en cada endpoint protegido (no confiar sólo en el cliente).
- Mantén la clave JWT fuera del repositorio en entornos productivos (usar variables de entorno o un vault).
- Para despliegue en producción, no uses el servidor de desarrollo de Flask; usa un WSGI (gunicorn, uwsgi) y un proxy (nginx).

## 🔧 Comandos útiles (git)

- Ver historial gráfico de ramas:
```bash
git fetch --all --prune
git branch --all --graph --decorate --oneline
```

- Para traer cambios de `main` remoto a tu rama feature:
```bash
git fetch origin
git merge origin/main
# o
git rebase origin/main
```

- Establecer upstream para una rama:
```bash
git push -u origin feature/login
# o
git branch --set-upstream-to=origin/feature/login feature/login
```

---
