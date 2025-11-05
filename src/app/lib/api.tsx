import { redirect } from "next/navigation";
import { PostCreatePayload, PostResponse, PostUpdatePayload, ContactFormPayload, ProjectCreatePayload, ProjectUpdatePayload, ServiceCreatePayload, ServiceUpdatePayload } from "./types";

export const fetchUser = async (url: string) => {
    const res = await fetch(`${url}/auth/me`, { credentials: 'include' });
    if (!res.ok) redirect("/auth/login");;
    return res.json();
};


export const login = async (email: string, password: string, url: string) => {
    const res = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Credenciales incorrectas');
    return res;
};

export const logout = async (url: string) => {
    const res = await fetch(`${url}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Error al cerrar sesión');
    return res;
};

export async function register(username: string, email: string, password: string, url: string) {
    try {
        const res = await fetch(`${url}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.detail || 'Error en el registro');
        }

        return res.json();
    } catch (error) {
        console.error("Error en el registro:", error);
        throw error; // Re-lanzar el error para que lo maneje el store
    }
}

export async function forgot_password(url: string, email: string) {
    const res = await fetch(`${url}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error('Error al enviar el correo');
    return res;
}

export async function reset_password(url: string, new_password: string, token: string) {
    const res = await fetch(`${url}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password }),
    });

    if (!res.ok) throw new Error('Error al resetear la contraseña');
    return res;
}

// --- FUNCIÓN PARA CREAR POSTS ---

export const createPost = async (postData: PostCreatePayload, url: string): Promise<PostResponse> => {
    const res = await fetch(`${url}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // MUY IMPORTANTE: para enviar la cookie de sesión
        body: JSON.stringify(postData),
    });

    if (!res.ok) {
        // Si hay un error, intentamos leer el detalle del error de la API
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al crear el post');
    }

    return res.json();
};

// --- FUNCIÓN PARA OBTENER TODOS LOS POSTS ---
export const getPosts = async (url: string, publishedOnly: boolean = false): Promise<PostResponse[]> => {
    // Construimos la URL con el parámetro de consulta si es necesario
    const requestUrl = publishedOnly ? `${url}/api/posts?published_only=true` : `${url}/api/posts`;

    const res = await fetch(requestUrl, {
        credentials: 'include',
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Error al obtener los posts');
    }

    return res.json();
};

// --- FUNCIÓN PARA CAMBIAR EL ESTADO DE PUBLICACIÓN ---
export const updatePublishStatus = async (postId: number, isPublished: boolean, url: string): Promise<PostResponse> => {
    const res = await fetch(`${url}/api/posts/${postId}/publish`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ is_published: isPublished }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al actualizar el estado del post');
    }

    return res.json();
};

// --- FUNCIÓN PARA OBTENER UN POST POR SLUG ---
export const getPostBySlug = async (slug: string, url: string): Promise<PostResponse> => {
    const fullUrl = `${url}/api/posts/${slug}`;
    console.log('Fetching post from:', fullUrl);
    
    const res = await fetch(fullUrl, {
        cache: 'no-store',
    });

    console.log('Response status:', res.status);
    
    if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response:', errorText);
        throw new Error(`Post no encontrado: ${res.status} - ${errorText}`);
    }

    return res.json();
};

// --- FUNCIÓN PARA BORRADO LÓGICO ---
export const deletePost = async (postId: number, url: string): Promise<void> => {
    const res = await fetch(`${url}/api/posts/${postId}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!res.ok) {
        // El status 204 (No Content) es un éxito pero no tiene cuerpo JSON
        if (res.status === 204) return;

        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al borrar el post');
    }
};

// --- FUNCIONES PARA EDITAR ---

export const getPostById = async (postId: number, url: string): Promise<PostResponse> => {
    const res = await fetch(`${url}/api/posts/id/${postId}`, {
        credentials: 'include',
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('No se pudo obtener el post para editar');
    }
    return res.json();
};

export const updatePost = async (postId: number, postData: PostUpdatePayload, url: string): Promise<PostResponse> => {
    const res = await fetch(`${url}/api/posts/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(postData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al actualizar el post');
    }
    return res.json();
};

// --- FUNCIÓN PARA ENVIAR MENSAJE DE CONTACTO ---
export const sendContactMessage = async (formData: ContactFormPayload, url: string): Promise<{ message: string }> => {
    const res = await fetch(`${url}/api/contact/send-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });

    if (!res.ok) {
        throw new Error('Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo.');
    }

    return res.json();
};


// --- Funciones para Proyectos ---

export const getProjects = async (url: string) => {
    const res = await fetch(`${url}/api/projects/`, { cache: 'no-store' });
    if (!res.ok) throw new Error('No se pudieron obtener los proyectos.');
    return res.json();
};

export const getProjectById = async (id: number, url: string) => {
    const res = await fetch(`${url}/api/projects/${id}`, { credentials: 'include' });
    if (!res.ok) throw new Error('No se pudo obtener el proyecto.');
    return res.json();
};

export const createProject = async (projectData: ProjectCreatePayload, url: string) => {
    const res = await fetch(`${url}/api/projects/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(projectData),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al crear el proyecto.');
    }
    return res.json();
};

export const updateProject = async (id: number, projectData: ProjectUpdatePayload, url: string) => {
    const res = await fetch(`${url}/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(projectData),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al actualizar el proyecto.');
    }
    return res.json();
};

export const deleteProject = async (id: number, url: string): Promise<void> => {
    const res = await fetch(`${url}/api/projects/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!res.ok) {
        let errorMessage = 'Error al borrar el proyecto.';
        try {
            const errorData = await res.json();
            errorMessage = errorData.detail || errorMessage;
        } catch {
            // Si no se puede parsear el JSON del error, usar mensaje por defecto
        }
        throw new Error(errorMessage);
    }

    // Para DELETE exitoso, no intentar parsear JSON, solo retornar
    return;
};

// --- Funciones CRUD para Servicios ---

export const getServices = async (url: string) => {
    const res = await fetch(`${ url }/api/services`, { credentials: 'include' });
    if (!res.ok) throw new Error('Error al obtener los servicios');
    return res.json();
};

export const getServiceById = async (id: string, url: string) => {
    const res = await fetch(`${ url }/api/services/${ id }`, { credentials: 'include' });
    if (!res.ok) throw new Error('Servicio no encontrado');
    return res.json();
};

export const createService = async (data: ServiceCreatePayload, url: string) => {
    const res = await fetch(`${ url }/api/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al crear el servicio');
    }
    return res.json();
};

export const updateService = async (id: string, data: ServiceUpdatePayload, url: string) => {
    const res = await fetch(`${ url }/api/services/${ id }`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al actualizar el servicio');
    }
    return res.json();
};

export const deleteService = async (id: string, url: string) => {
    const res = await fetch(`${ url }/api/services/${ id }`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Error al borrar el servicio');
    return { success: true };
};