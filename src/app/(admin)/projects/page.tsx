'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/Store';
import { getProjects, deleteProject } from '@/app/lib/api';
import { Project } from '@/app/lib/types';
import { Edit, Trash2, PlusCircle } from 'lucide-react';

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
                        className="px-4 py-2 text-sm font-medium bg-border-color rounded-md cursor-pointer"
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
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md cursor-pointer"
                    >
                        Borrar
                    </button>
                </div>
            </div>
        ), { duration: 6000 });
    };

    if (isLoading) return <div>Cargando proyectos...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-heading text-3xl font-bold text-text-primary">Gestionar Proyectos</h1>
                <Link href="/projects/new" className="inline-flex items-center gap-2 px-4 py-2 font-semibold text-white bg-accent-primary rounded-md shadow-sm hover:bg-opacity-90 transition-colors">
                    <PlusCircle size={18} />
                    Añadir Proyecto
                </Link>
            </div>
            <div className="bg-background border border-border-color rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-border-color">
                    <thead className="bg-border-color/50 dark:bg-border-color/20">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Orden</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Título</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Categoría</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-color">
                        {projects.length > 0 ? (
                            projects.sort((a, b) => a.order - b.order).map((project) => (
                                <tr key={project.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{project.order}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-text-primary">{project.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{project.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                        <Link href={`/projects/edit/${project.id}`} className="text-accent-primary hover:text-accent-primary/80 inline-block">
                                            <Edit size={18} />
                                        </Link>
                                        <button onClick={() => handleDelete(project)} className="text-red-500 hover:text-red-400">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={4} className="px-6 py-4 text-center text-text-secondary">No has añadido ningún proyecto todavía.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

}