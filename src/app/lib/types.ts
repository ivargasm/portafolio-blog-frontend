// =================================================================================
// ARCHIVO: lib/types.ts (NUEVO)
// DESCRIPCIÓN: Define las interfaces de TypeScript para nuestros datos.
// =================================================================================

// Define la forma de los datos que enviamos a la API para crear un post.
// Coincide con el esquema `PostCreate` de Pydantic en tu backend.
export interface PostCreatePayload {
    title: string;
    slug: string;
    excerpt?: string;
    content: string;
    category?: string;
    imageUrl?: string;
}

// Define la forma de los datos que la API nos devuelve al crear un post.
// Coincide con el esquema `PostResponse` de Pydantic.
export interface PostResponse extends PostCreatePayload {
    id: number;
    is_published: boolean;
    is_deleted: boolean;
    created_at: string; // Las fechas suelen llegar como strings en formato ISO
    updated_at?: string;
    imageUrl?: string;
}

export type PostUpdatePayload = Partial<PostCreatePayload>;

// FINTERFAZ para el formulario de contacto
export interface ContactFormPayload {
    name: string;
    email: string;
    message: string;
    honeypot?: string; // El campo para el bot
}

// Define la forma de los datos que enviamos a la API para crear un proyecto.
export interface Project {
id: number;
title: string;
description: string;
imageUrl: string;
projectUrl: string;
repoUrl: string;
technologies: string[];
category: string;
order: number;
}

export interface ProjectCreatePayload {
title: string;
description: string;
imageUrl: string;
projectUrl: string;
repoUrl: string;
technologies: string[];
category: string;
order: number;
}

export type ProjectUpdatePayload = Partial<ProjectCreatePayload>;


// --- Tipos para Servicios ---

export interface ServiceResponse {
id: string;
title: string;
description: string;
imageUrl: string;
features: string[];
order: number;
created_at: string;
}

export interface ServiceCreatePayload {
title: string;
description: string;
imageUrl: string;
features: string[];
order?: number;
}

export type ServiceUpdatePayload = Partial<ServiceCreatePayload>;