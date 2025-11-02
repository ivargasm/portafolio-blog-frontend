# 🚀 Ismael Vargas - Portafolio & Blog LegalTech

Portafolio personal y blog especializado en la intersección entre **tecnología** y **derecho**, desarrollado con Next.js 15 y tecnologías modernas.

## ✨ Características

- **🎨 Diseño Moderno**: Interfaz elegante con Tailwind CSS y shadcn/ui
- **🌙 Tema Dinámico**: Soporte para modo claro/oscuro
- **📝 Blog Integrado**: Sistema de gestión de contenido con editor Markdown
- **🔐 Autenticación**: Sistema completo de login/registro con Zustand
- **📱 Responsive**: Optimizado para todos los dispositivos
- **⚡ Performance**: Construido con Next.js 15 y Turbopack
- **🎯 SEO Optimizado**: Metadatos y estructura optimizada para buscadores

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Componentes**: shadcn/ui + Radix UI
- **Estado**: Zustand
- **Iconos**: Heroicons + Lucide React

### Funcionalidades
- **Editor**: SimpleMDE (Markdown)
- **Sintaxis**: Highlight.js
- **Notificaciones**: React Hot Toast
- **Tipografías**: Inter + Manrope (Google Fonts)

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+
- npm, yarn, pnpm o bun

### Instalación

```bash
# Clonar el repositorio
git clone [https://github.com/ivargasm/portafolio-blog-frontend.git]
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
```

### Variables de Entorno

```env
# API Backend
NEXT_PUBLIC_API_URL=tu-backend-url

# Otras configuraciones...
```

### Desarrollo

```bash
# Servidor de desarrollo con Turbopack
npm run dev

# Construcción para producción
npm run build

# Servidor de producción
npm run start

# Linting
npm run lint
```

Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── (admin)/          # Panel administrativo
│   ├── (main)/           # Páginas principales
│   │   ├── contacto/     # Página de contacto
│   │   ├── perspectivas/ # Blog posts
│   │   ├── proyectos/    # Portafolio de proyectos
│   │   ├── servicios/    # Servicios ofrecidos
│   │   └── sobre-mi/     # Información personal
│   ├── auth/             # Autenticación
│   ├── components/       # Componentes de la app
│   ├── lib/              # Utilidades y API
│   └── store/            # Estado global (Zustand)
├── components/ui/        # Componentes UI reutilizables
└── lib/                  # Utilidades compartidas
```

## 🎯 Funcionalidades Principales

### 📖 Blog "Perspectivas"
- Artículos sobre tecnología y derecho
- Editor Markdown integrado
- Sintaxis highlighting para código
- Sistema de categorías y tags

### 💼 Portafolio
- Showcase de proyectos
- Casos de estudio detallados
- Tecnologías utilizadas

### 🔐 Sistema de Autenticación
- Registro y login de usuarios
- Gestión de sesiones
- Roles y permisos

### 📞 Contacto & Servicios
- Formulario de contacto
- Descripción de servicios LegalTech
- Información profesional

## 🌐 Despliegue

### Vercel (Recomendado)
```bash
# Conectar con Vercel
vercel

# O usar el dashboard de Vercel
# https://vercel.com/new
```

### Otros Proveedores
- **Netlify**: Compatible con builds estáticos
- **Railway**: Para aplicaciones full-stack
- **Google Cloud Run**: Para contenedores

## 📧 Contacto

**Ismael Vargas** - Ingeniero de Datos & LegalTech

- 🌐 Website: [ivargasm.com]
- 📧 Email: [contacto@ivargasm.com]
- 💼 LinkedIn: [linkedin.com/in/ismael-vargas-martinez-47a618195/]
- 🐙 GitHub: [github.com/ivargasm]

---

⭐ Si este proyecto te resulta útil, ¡no olvides darle una estrella!