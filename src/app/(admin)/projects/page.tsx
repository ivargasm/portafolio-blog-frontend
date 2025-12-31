'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/Store';
import { getProjects, deleteProject } from '@/app/lib/api';
import { Project } from '@/app/lib/types';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function ProjectsDashboardPage() {
    const apiUrl = useAuthStore((state) => state.url);
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                const fetchedProjects = await getProjects(apiUrl);
                setProjects(fetchedProjects);
            } catch {
                toast.error('No se pudieron cargar los proyectos.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, [apiUrl]);

    const handleDelete = (projectToDelete: Project) => {
        toast((t) => (
            <div className="flex flex-col gap-4">
                <p>¿Seguro que quieres borrar el proyecto <strong>{projectToDelete.title}</strong>?</p>
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-2 text-sm font-medium rounded-md"
                        style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            const loadingToast = toast.loading('Borrando proyecto...');

                            try {
                                await deleteProject(projectToDelete.id, apiUrl);
                                const updatedProjects = await getProjects(apiUrl);
                                setProjects(updatedProjects);
                                toast.success('Proyecto borrado con éxito.', { id: loadingToast });
                            } catch (error) {
                                console.error('Error al borrar proyecto:', error);
                                toast.error(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`, { id: loadingToast });
                            }
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                        Borrar
                    </button>
                </div>
            </div>
        ), { duration: 6000 });
    };

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
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="font-heading text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Gestionar Proyectos
                    </h1>
                    <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                        Administra tu portafolio de proyectos
                    </p>
                </div>
                <Link
                    href="/projects/new"
                    className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: 'var(--primary)' }}
                >
                    <Plus size={20} />
                    Añadir Proyecto
                </Link>
            </div>

            {/* Projects Table */}
            <div className="rounded-2xl border overflow-hidden"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y" style={{ borderColor: 'var(--border)' }}>
                        <thead style={{ backgroundColor: 'var(--background)' }}>
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Orden
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Título
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Categoría
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
                            {projects.length > 0 ? (
                                projects.sort((a, b) => a.order - b.order).map((project) => (
                                    <tr key={project.id} className="hover:bg-[var(--background)] transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="text-sm px-3 py-1 rounded-full font-medium"
                                                style={{
                                                    backgroundColor: 'var(--background)',
                                                    color: 'var(--text-secondary)'
                                                }}>
                                                {project.order}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                                {project.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm px-2 py-1 rounded-full"
                                                style={{
                                                    backgroundColor: 'var(--primary)',
                                                    color: 'white'
                                                }}>
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link
                                                    href={`/projects/edit/${project.id}`}
                                                    className="p-2 rounded-lg transition-colors hover:bg-[var(--background)]"
                                                    style={{ color: 'var(--primary)' }}
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project)}
                                                    className="p-2 rounded-lg transition-colors hover:bg-red-50 text-red-500"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center" style={{ color: 'var(--text-secondary)' }}>
                                        No has añadido ningún proyecto todavía.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}
