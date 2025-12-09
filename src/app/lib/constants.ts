// llamar a la variable de entorno si existe, de lo contrario usar el valor por defecto
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';