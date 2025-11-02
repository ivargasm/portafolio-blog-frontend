'use client';
import { Code, Database, Scale } from 'lucide-react';

// Este componente recibe el nombre de una categoría y devuelve el ícono correspondiente.
export const CategoryIcon = ({ category }: { category: string }) => {
    switch (category) {
        case 'Ingeniería de Datos':
            return <Database className="h-4 w-4" />;
        case 'LegalTech':
            return <Scale className="h-4 w-4" />;
        case 'Desarrollo de Software':
        default:
            return <Code className="h-4 w-4" />;
    }
};
