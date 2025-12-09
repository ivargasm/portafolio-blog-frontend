import { redirect } from "next/navigation";
import { PostCreatePayload, PostResponse, PostUpdatePayload, ContactFormPayload, ProjectCreatePayload, ProjectUpdatePayload, ServiceCreatePayload, ServiceUpdatePayload, PostLikeStats, PostCommentCreate, PostCommentUpdate, PostCommentWithReplies, PostCommentDeleteRequest, PostCommentResponse } from "./types";

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

    const res = await fetch(fullUrl, {
        cache: 'no-store',
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; ivargasm-frontend/1.0)'
        }
    });

    if (!res.ok) {
        throw new Error(`Post no encontrado: ${res.status}`);
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
    const res = await fetch(`${url}/api/services`, { credentials: 'include' });
    if (!res.ok) throw new Error('Error al obtener los servicios');
    return res.json();
};

export const getServiceById = async (id: string, url: string) => {
    const res = await fetch(`${url}/api/services/${id}`, { credentials: 'include' });
    if (!res.ok) throw new Error('Servicio no encontrado');
    return res.json();
};

export const createService = async (data: ServiceCreatePayload, url: string) => {
    const res = await fetch(`${url}/api/services`, {
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
    const res = await fetch(`${url}/api/services/${id}`, {
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
    const res = await fetch(`${url}/api/services/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    if (!res.ok) throw new Error('Error al borrar el servicio');
    return { success: true };
};


// --- Funciones para Likes ---

/**
 * Alternar like en un post (agregar o quitar)
 */
export const togglePostLike = async (postId: number, url: string): Promise<void> => {
    const res = await fetch(`${url}/api/posts/${postId}/likes`, {
        method: 'POST',
        credentials: 'include',
    });

    if (!res.ok && res.status !== 200) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al procesar el like');
    }
};

/**
 * Obtener estadísticas de likes de un post
 */
export const getPostLikeStats = async (postId: number, url: string): Promise<PostLikeStats> => {
    const res = await fetch(`${url}/api/posts/${postId}/likes/stats`, {
        credentials: 'include',
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Error al obtener estadísticas de likes');
    }

    return res.json();
};


// --- Funciones para Comentarios ---

/**
 * Obtener comentarios de un post con respuestas anidadas
 */
export const getPostComments = async (
    postId: number,
    url: string,
    page: number = 1,
    pageSize: number = 50
): Promise<PostCommentWithReplies[]> => {
    const res = await fetch(
        `${url}/api/posts/${postId}/comments?page=${page}&page_size=${pageSize}`,
        {
            cache: 'no-store',
        }
    );

    if (!res.ok) {
        throw new Error('Error al obtener comentarios');
    }

    return res.json();
};

/**
 * Crear un nuevo comentario
 */
export const createComment = async (
    commentData: PostCommentCreate,
    url: string
): Promise<PostCommentResponse> => {
    const res = await fetch(`${url}/api/posts/${commentData.post_id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(commentData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al crear el comentario');
    }

    return res.json();
};

/**
 * Editar un comentario existente
 */
export const updateComment = async (
    commentId: number,
    updateData: PostCommentUpdate,
    url: string
): Promise<PostCommentResponse> => {
    const res = await fetch(`${url}/api/posts/comments/${commentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updateData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al editar el comentario');
    }

    return res.json();
};

/**
 * Eliminar un comentario
 */
export const deleteComment = async (
    commentId: number,
    deleteData: PostCommentDeleteRequest,
    url: string
): Promise<void> => {
    const res = await fetch(`${url}/api/posts/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(deleteData),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al eliminar el comentario');
    }
};


// --- Funciones de Administración de Comentarios ---

/**
 * Obtener todos los comentarios para moderación (solo admin)
 */
export const getAllCommentsAdmin = async (
    url: string,
    skip: number = 0,
    limit: number = 100
): Promise<PostCommentResponse[]> => {
    const res = await fetch(
        `${url}/api/posts/admin/comments?skip=${skip}&limit=${limit}`,
        {
            credentials: 'include',
            cache: 'no-store',
        }
    );

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error('Error response:', errorData);
        throw new Error(errorData.detail || 'Error al obtener comentarios para moderación');
    }

    return res.json();
};

/**
 * Aprobar o rechazar un comentario (solo admin)
 */
export const approveComment = async (
    commentId: number,
    isApproved: boolean,
    url: string
): Promise<PostCommentResponse> => {
    const res = await fetch(`${url}/api/posts/comments/${commentId}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ is_approved: isApproved }),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al actualizar el comentario');
    }

    return res.json();
};

/**
 * Eliminar un comentario como admin (sin necesidad de edit_token)
 */
export const deleteCommentAdmin = async (
    commentId: number,
    url: string
): Promise<void> => {
    const res = await fetch(`${url}/api/posts/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({}),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Error al eliminar el comentario');
    }
};