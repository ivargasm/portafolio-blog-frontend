// =================================================================================
// ARCHIVO: app/lib/readingTime.ts
// DESCRIPCIÓN: Calcula el tiempo estimado de lectura en minutos (~200 palabras/min).
// =================================================================================

export function getReadingTime(content: string = ''): string {
    if (!content) return '1 min de lectura';
    // Remueve etiquetas HTML y caracteres markdown comunes para un conteo más limpio
    const cleanContent = content
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replace(/[#*`_~\[\]()>-]/g, ' ');
    const words = cleanContent.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} min de lectura`;
}
