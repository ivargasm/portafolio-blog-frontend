// =================================================================================
// ARCHIVO: app/(main)/proyectos/page.tsx
// DESCRIPCIÓN: Código completo para la página de "Proyectos".
// =================================================================================
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Sparkles } from 'lucide-react';
import { getProjects } from '@/app/lib/api';
import { Project } from '@/app/lib/types';
import { useAuthStore } from '@/app/store/Store';

export default function ProyectosPage() {
    const apiUrl = useAuthStore((state) => state.url);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

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

    // Obtener categorías únicas
    const categories = ['Todos', ...Array.from(new Set(projects.map(p => p.category)))];

    // Filtrar proyectos
    const filteredProjects = selectedCategory === 'Todos'
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    // Proyecto destacado (el primero)
    const featuredProject = filteredProjects[0];
    const otherProjects = filteredProjects.slice(1);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Cargando proyectos...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                {/* Fondo con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--surface)] to-[var(--background)]"></div>

                {/* Patrón de puntos sutil */}
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                            <Sparkles className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                                PORTAFOLIO
                            </span>
                        </div>

                        <h1 className="font-heading text-5xl md:text-6xl font-extrabold mb-6" style={{ color: 'var(--text-primary)' }}>
                            Proyectos & Casos de Estudio
                        </h1>

                        <p className="text-xl md:text-2xl leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                            La intersección entre la Ingeniería de Datos y el Derecho. Explora cómo utilizo{' '}
                            <strong style={{ color: 'var(--primary)' }}>Python y Lógica Algorítmica</strong>{' '}
                            para transformar procesos manuales en soluciones legales eficientes.
                        </p>

                        {/* Filtros de categoría */}
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className="px-5 py-2.5 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                                    style={{
                                        backgroundColor: selectedCategory === category ? 'var(--primary)' : 'var(--surface)',
                                        color: selectedCategory === category ? 'white' : 'var(--text-primary)',
                                        border: `1px solid ${selectedCategory === category ? 'var(--primary)' : 'var(--border)'}`
                                    }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="py-24" style={{ backgroundColor: 'var(--background)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredProjects.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                                No hay proyectos en esta categoría.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {/* Proyecto Destacado */}
                            {featuredProject && (
                                <div className="relative rounded-2xl overflow-hidden border group"
                                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                    <div className="grid lg:grid-cols-2 gap-0">
                                        {/* Imagen */}
                                        <div className="relative aspect-video lg:aspect-auto lg:min-h-[500px] overflow-hidden">
                                            <Image
                                                src={featuredProject.imageUrl}
                                                alt={featuredProject.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                                        </div>

                                        {/* Contenido */}
                                        <div className="p-8 md:p-12 flex flex-col justify-center">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 w-fit"
                                                style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                                                ⭐ PROYECTO DESTACADO
                                            </div>

                                            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4"
                                                style={{ color: 'var(--text-primary)' }}>
                                                {featuredProject.title}
                                            </h2>

                                            <p className="text-lg mb-6 leading-relaxed"
                                                style={{ color: 'var(--text-secondary)' }}>
                                                {featuredProject.description}
                                            </p>

                                            {/* Tags de tecnologías */}
                                            <div className="mb-6">
                                                <p className="text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                                                    Tecnologías:
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {featuredProject.technologies.map((tech: string) => (
                                                        <span
                                                            key={tech}
                                                            className="px-3 py-1 rounded-full text-sm font-medium"
                                                            style={{
                                                                backgroundColor: 'var(--background)',
                                                                color: 'var(--text-secondary)',
                                                                border: `1px solid var(--border)`
                                                            }}
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Botón */}
                                            <a
                                                href={featuredProject.projectUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 w-fit"
                                                style={{ backgroundColor: 'var(--primary)', color: 'white' }}
                                            >
                                                Ver Caso de Estudio
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Grid de otros proyectos */}
                            {otherProjects.length > 0 && (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {otherProjects.map((project) => (
                                        <a
                                            key={project.id}
                                            href={project.projectUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                                            style={{
                                                backgroundColor: 'var(--surface)',
                                                borderColor: 'var(--border)'
                                            }}
                                        >
                                            {/* Imagen */}
                                            <div className="relative aspect-video overflow-hidden">
                                                <Image
                                                    src={project.imageUrl}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                {/* Overlay en hover */}
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <span className="text-white font-semibold flex items-center gap-2">
                                                        Ver Detalles
                                                        <ExternalLink className="w-4 h-4" />
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Contenido */}
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-xs font-semibold px-2 py-1 rounded-full"
                                                        style={{
                                                            backgroundColor: 'var(--primary)',
                                                            color: 'white'
                                                        }}>
                                                        {project.category}
                                                    </span>
                                                </div>

                                                <h3 className="font-heading text-xl font-bold mb-2"
                                                    style={{ color: 'var(--text-primary)' }}>
                                                    {project.title}
                                                </h3>

                                                <p className="text-sm mb-4 flex-grow"
                                                    style={{ color: 'var(--text-secondary)' }}>
                                                    {project.description}
                                                </p>

                                                {/* Tags de tecnologías */}
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.slice(0, 3).map((tech: string) => (
                                                        <span
                                                            key={tech}
                                                            className="text-xs px-2 py-1 rounded-full"
                                                            style={{
                                                                backgroundColor: 'var(--background)',
                                                                color: 'var(--text-secondary)',
                                                                border: `1px solid var(--border)`
                                                            }}
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.technologies.length > 3 && (
                                                        <span
                                                            className="text-xs px-2 py-1 rounded-full"
                                                            style={{
                                                                backgroundColor: 'var(--background)',
                                                                color: 'var(--text-secondary)',
                                                                border: `1px solid var(--border)`
                                                            }}
                                                        >
                                                            +{project.technologies.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
