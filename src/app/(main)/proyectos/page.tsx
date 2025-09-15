// =================================================================================
// ARCHIVO: app/(main)/proyectos/page.tsx
// DESCRIPCIÓN: Código completo para la página de "Proyectos".
// =================================================================================

import Image from 'next/image';
import { Code, Database, Scale } from 'lucide-react';

export default function ProyectosPage() {
    const projects = [
        {
            id: 'etl-generator',
            title: 'Generador de Scripts ETL',
            category: 'Ingeniería de Datos',
            categoryIcon: <Database className="h-4 w-4" />,
            imageUrl: 'https://res.cloudinary.com/ivargasm/image/upload/v1756051783/ivargasm/etl_nb4ix0.png',
            description: 'Crear scripts ETL para diferentes KPIs era un proceso manual y repetitivo. Desarrollé una aplicación web que permite configurar múltiples KPIs mediante formularios dinámicos, generando automáticamente scripts en Python listos para ejecutarse.',
            tech: ['React', 'Zustand', 'TailwindCSS', 'Python', 'ExcelJS'],
            url: 'https://etl-script-generator-frontend.vercel.app/'
        },
        {
            id: 'contract-management',
            title: 'Plataforma de Gestión de Contratos',
            category: 'LegalTech',
            categoryIcon: <Scale className="h-4 w-4" />,
            imageUrl: 'https://res.cloudinary.com/ivargasm/image/upload/v1756051782/ivargasm/contratos_jxxg8t.png',
            description: 'La redacción y gestión de contratos suele requerir conocimientos legales. Desarrollé una aplicación web que guía al usuario paso a paso en la creación de contratos, con campos predefinidos y una interfaz clara y responsiva.',
            tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'shadcn/ui'],
            url: 'https://www.easycontract.com.mx/'
        },
        {
            id: 'json-configurator',
            title: 'Configurador Visual de JSON',
            category: 'Desarrollo de Software',
            categoryIcon: <Code className="h-4 w-4" />,
            imageUrl: 'https://res.cloudinary.com/ivargasm/image/upload/v1756051783/ivargasm/json_stm9gy.png',
            description: 'Las estructuras JSON para reportes complejos se construían manualmente, provocando errores. Desarrollé una aplicación que permite construir la configuración mediante una interfaz gráfica, eliminando el 100% de errores humanos.',
            tech: ['React 18', 'Vite', 'Zustand', 'TypeScript', 'TailwindCSS'],
            url: 'https://json-report-theta.vercel.app/'
        },
        // Puedes añadir más proyectos aquí en el futuro
    ];

    return (
        <div className="relative overflow-hidden">
            {/* Capas de fondo dinámico */}
            <div className="absolute inset-0 -z-20 bg-background"></div>
            <div className="absolute inset-0 -z-10 grid-background"></div>
            <div className="absolute top-0 left-0 w-72 h-72 bg-accent-primary/20 dark:bg-accent-primary/30 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-accent-secondary/20 dark:bg-accent-secondary/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent-primary/10 dark:bg-accent-primary/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

            <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
                {/* Cabecera de la página */}
                <header className="text-center mb-16">
                    <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-text-primary">
                        Proyectos
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
                        Una selección de mi trabajo, desde la ingeniería de datos hasta el desarrollo de soluciones LegalTech.
                    </p>
                </header>

                {/* Galería de Proyectos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {projects.map((project) => (
                        <a
                            key={project.id}
                            id={project.id}
                            className="group flex flex-col bg-background/80 dark:bg-background/60 backdrop-blur-sm border border-border-color rounded-xl shadow-lg hover:shadow-2xl hover:border-accent-primary/50 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                            href={`${project.url}`}
                            target='_blank'
                        >
                            <div className="relative aspect-video overflow-hidden">
                                <Image
                                    src={project.imageUrl}
                                    alt={`Imagen de ${project.title}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-sm text-accent-secondary font-semibold mb-2">
                                    {project.categoryIcon}
                                    <span>{project.category}</span>
                                </div>
                                <h3 className="font-heading text-xl font-bold text-text-primary">
                                    {project.title}
                                </h3>
                                <p className="mt-2 text-text-secondary text-sm flex-grow">
                                    {project.description}
                                </p>
                                <div className="mt-4 pt-4 border-t border-border-color">
                                    <p className="text-xs text-text-secondary font-medium mb-2">Tecnologías Clave:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech) => (
                                            <span key={tech} className="bg-border-color/50 dark:bg-border-color/20 text-text-secondary text-xs font-medium px-2 py-1 rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
