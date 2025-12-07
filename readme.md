# 🛒 E-Commerce Full Stack — NestJS + Angular

Este proyecto es una **plataforma de comercio electrónico full stack**, desarrollada completamente en **TypeScript**, con una arquitectura moderna, segura y escalable.
Incluye **backend en NestJS**, **frontend en Angular**, **Prisma como ORM**, **PostgreSQL como base de datos**, y **autenticación con JWT basada en roles**.

Es un proyecto pensado no solo para funcionar hoy, sino para **crecer mañana**: está preparado para integrar **sistemas de pago, notificaciones, métricas y más**.

---

## ⚙️ Tecnologías Principales

Este proyecto está construido con un stack moderno y de alto rendimiento:

**Node.js : 22.18.0**

### 🔧 Backend

- **NestJS v11**
- **TypeScript**
- **Prisma ORM v7**
- **PostgreSQL**
- **JWT (JSON Web Tokens)**
- **Autenticación y autorización por roles**
- **Arquitectura modular (Controllers, Services, Guards, DTOs)**

### 🎨 Frontend

- **Angular v21**
- **Angular CLI : 21.0.2**
- **TypeScript**
- **Arquitectura basada en componentes**
- **Consumo de API REST segura con JWT**

---

## 🚀 Funcionalidades Actuales

✅ Registro y login de usuarios
✅ Autenticación con JWT
✅ Sistema de **roles** (admin, user, etc.)
✅ Protección de rutas con Guards
✅ CRUD de productos
✅ Gestión de usuarios
✅ Conexión segura con PostgreSQL usando Prisma
✅ Arquitectura limpia y escalable
✅ Variables de entorno con `.env`
✅ Preparado para despliegue en producción

---

## 🔐 Seguridad

- Las contraseñas se manejan con **hashing seguro**
- Autenticación basada en **JWT**
- Autorización mediante **roles**
- Rutas protegidas con **Guards de NestJS**
- CORS configurado para conexión segura con el frontend

---

## 🗄️ Base de Datos

- Motor: **PostgreSQL**
- ORM: **Prisma v7**
- Migraciones automáticas
- Relaciones entre entidades bien definidas
- Tipado fuerte directo desde la base de datos

---

## 📂 Estructura General del Proyecto

```
/backend
 ├── src
 │   ├── auth
 │   ├── users
 │   ├── products
 │   ├── prisma
 │   └── main.ts
 └── prisma

/frontend
 ├── src
 │   ├── app
 │   ├── pages
 │   ├── services
 │   └── components
```

---

## 🧪 Estado del Proyecto

🟢 En desarrollo activo
🟢 Funcionalidad base completa
🟢 Arquitectura lista para escalar
🟡 Integraciones avanzadas en camino

---

## 💳 Próximas Funcionalidades (Roadmap)

🚧 **Sistema de pagos (en desarrollo futuro)**

- Integración con pasarela de pagos (Stripe, PayPal u otra)
- Carrito de compras conectado al sistema de pago
- Historial de órdenes
- Estados de pago (pendiente, pagado, fallido)
- Confirmaciones automáticas

🚧 Otras mejoras futuras:

- Sistema de notificaciones
- Panel de administración avanzado
- Métricas de ventas
- Filtros avanzados de productos

---

## 📦 Instalación (Desarrollo)

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/Ecomerce-Nest-Angular
```

### 2️⃣ Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

### 3️⃣ Frontend

```bash
cd frontend
npm install
ng serve
```

---

## 🧠 Filosofía del Proyecto

Este proyecto no es solo un e-commerce.
Es un **laboratorio real de aprendizaje profesional**, donde se aplican:

- Buenas prácticas
- Arquitectura limpia
- Seguridad real
- Tipado fuerte con TypeScript
- Separación total entre frontend y backend

---

## 🧑‍💻 Autor - DevBorracho

Desarrollado con enfoque en **aprendizaje profundo, código limpio y escalabilidad real**.
Proyecto pensado para producción, no solo para pruebas.

---

🔥 **Este proyecto seguirá creciendo. Lo que hoy es un e-commerce, mañana será una plataforma completa.**
