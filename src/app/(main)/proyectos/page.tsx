// =================================================================================
// ARCHIVO: app/(main)/proyectos/page.tsx
// DESCRIPCIÓN: Código completo para la página de "Proyectos".
// =================================================================================
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Scale } from 'lucide-react';
import { getProjects } from '@/app/lib/api';
import { Project } from '@/app/lib/types';
import { useAuthStore } from '@/app/store/Store';

export default function ProyectosPage() {
    const apiUrl = useAuthStore((state) => state.url);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjectsData = async () => {
            try {
                setIsLoading(true);
                const fetchedProjects = await getProjects(apiUrl);
                setProjects(fetchedProjects.sort((a: Project, b: Project) => a.order - b.order));
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjectsData();
    }, [apiUrl]);

    if (isLoading) return <div>Cargando proyectos...</div>;

    return (
        <div className="relative overflow-hidden">
            {/* Capas de fondo dinámico */}
            <div className="absolute inset-0 -z-20 bg-background"></div>
            <div className="absolute inset-0 -z-10 grid-background"></div>
            <div className="absolute top-0 left-0 w-72 h-72 bg-accent-primary/20 dark:bg-accent-primary/30 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-accent-secondary/20 dark:bg-accent-secondary/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent-primary/10 dark:bg-accent-primary/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

            <div className="max-w-5xl mx-auto px-4 py-8 md:py-16 relative z-10">
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
                            id={project.id.toString()}
                            className="group flex flex-col bg-background/80 dark:bg-background/60 backdrop-blur-sm border border-border-color rounded-xl shadow-lg hover:shadow-2xl hover:border-accent-primary/50 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                            href={project.projectUrl}
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
                                    <Scale size={16} />
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
                                        {project.technologies.map((tech: string) => (
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
