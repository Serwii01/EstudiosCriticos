# Guía de despliegue — Estudios Críticos
**Stack:** Supabase (PostgreSQL) · Railway (Spring Boot) · Vercel (Angular)

---

## 1. Base de datos en Supabase

1. Crea una cuenta gratuita en [supabase.com](https://supabase.com) e inicia un **New project**.
2. En el panel del proyecto, ve a **Settings → Database** y copia los datos de conexión:
   - **Host** (algo como `db.xxxx.supabase.co`)
   - **Port** → `5432`
   - **Database** → `postgres`
   - **User** → `postgres`
   - **Password** → la que pusiste al crear el proyecto
3. La URL de conexión tiene este formato (la necesitas para Railway):
   ```
   jdbc:postgresql://db.XXXX.supabase.co:5432/postgres
   ```

---

## 2. Backend en Railway

### 2.1 Primer despliegue

1. Crea cuenta en [railway.app](https://railway.app) y haz clic en **New Project → Deploy from GitHub repo**.
2. Conecta tu GitHub y selecciona el repositorio. Railway detectará el `pom.xml` y compilará con Maven automáticamente.
3. En la raíz del repo tienes `BackEnd/` como subcarpeta. En Railway, en la configuración del servicio:
   - **Root Directory** → `BackEnd`
   - **Build Command** → `./mvnw clean package -DskipTests`
   - **Start Command** → `java -jar target/BackEnd-0.0.1-SNAPSHOT.jar`

### 2.2 Variables de entorno en Railway

Ve a tu servicio → **Variables** y añade estas:

| Variable | Valor |
|---|---|
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `DATABASE_URL` | `jdbc:postgresql://db.XXXX.supabase.co:5432/postgres` |
| `DATABASE_USERNAME` | `postgres` |
| `DATABASE_PASSWORD` | tu contraseña de Supabase |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:4200` ← lo actualizarás después con la URL de Vercel |

### 2.3 Obtén la URL de Railway

Una vez desplegado, Railway te da una URL pública como:
```
https://backend-estudios-criticos.up.railway.app
```
Cópiala — la necesitas en el paso 3.

---

## 3. Frontend en Vercel

### 3.1 Actualizar la URL del backend en el código

Abre el archivo:
```
FrontEnd/src/environments/environment.prod.ts
```
Cambia la línea:
```typescript
apiUrl: 'https://TU-APP.up.railway.app'
```
por la URL real que te dio Railway, por ejemplo:
```typescript
apiUrl: 'https://backend-estudios-criticos.up.railway.app'
```
Haz commit y push de ese cambio.

### 3.2 Primer despliegue en Vercel

1. Crea cuenta en [vercel.com](https://vercel.com) e importa tu repositorio de GitHub.
2. En la configuración del proyecto:
   - **Root Directory** → `FrontEnd`
   - **Framework Preset** → `Angular`
   - **Build Command** → `ng build --configuration production`
   - **Output Directory** → `dist/estudios-criticos/browser`
3. Haz clic en **Deploy**.

Vercel usará el `vercel.json` que ya está en `FrontEnd/` para que los refrescos de página funcionen en rutas como `/noticias/1` o `/territorios`.

### 3.3 Actualizar CORS en Railway

Una vez que Vercel te dé la URL del frontend (algo como `https://estudios-criticos.vercel.app`), vuelve a Railway y actualiza la variable:

| Variable | Valor actualizado |
|---|---|
| `CORS_ALLOWED_ORIGINS` | `https://estudios-criticos.vercel.app,http://localhost:4200` |

Railway reiniciará el backend automáticamente.

---

## 4. Resumen del flujo completo

```
Supabase PostgreSQL
      ↑ JDBC
Railway (Spring Boot) ←── autenticación Basic Auth
      ↑ HTTPS / JSON
Vercel (Angular SPA)
      ↑ navegador
    Usuario
```

---

## 5. Dev local (sin cambios)

Tu entorno local sigue funcionando igual que siempre:

```bash
# Backend
cd BackEnd
./mvnw spring-boot:run
# Usa H2 en memoria (perfil por defecto, sin variables de entorno)

# Frontend
cd FrontEnd
ng serve
# El proxy redirige /api/* → http://localhost:8080
```

---

## 6. Checklist final

- [ ] Supabase: proyecto creado, credenciales anotadas
- [ ] Railway: variables de entorno configuradas, backend desplegado y accesible
- [ ] `environment.prod.ts`: URL de Railway actualizada y pusheada
- [ ] Vercel: proyecto importado, build exitoso
- [ ] Railway: variable `CORS_ALLOWED_ORIGINS` actualizada con la URL de Vercel
- [ ] Verificar en producción: página de noticias, territorios, afíliate y admin
