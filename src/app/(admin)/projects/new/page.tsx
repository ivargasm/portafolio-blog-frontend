'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
// Rutas de importación a ajustar
import { useAuthStore } from '@/app/store/Store';
import { createProject } from '@/app/lib/api';

export default function NewProjectPage() {
    const router = useRouter();
    const apiUrl = useAuthStore((state) => state.url);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        imageUrl: '',
        projectUrl: '',
        repoUrl: '',
        technologies: '',
        order: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const projectData = {
            ...formData,
            technologies: formData.technologies.split(',').map(tech => tech.trim()),
            order: Number(formData.order),
        };

        toast.promise(
            createProject(projectData, apiUrl),
            {
                loading: 'Guardando proyecto...',
                success: () => {
                    router.push('/projects');
                    return 'Proyecto creado con éxito.';
                },
                error: (err) => `Error: ${err.message}`,
            }
        );
    };

    return (
        <div>
            <h1 className="font-heading text-3xl font-bold mb-6">Crear Nuevo Proyecto</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Título */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-1">Título</label>
                    <input type="text" name="title" id="title" required onChange={handleChange} className="w-full p-2 border border-border-color rounded-md bg-background" />
                </div>

                {/* Categoría */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-text-secondary mb-1">Categoría</label>
                    <input type="text" name="category" id="category" required onChange={handleChange} className="w-full p-2 border border-border-color rounded-md bg-background" />
                </div>

                {/* Descripción */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">Descripción</label>
                    <textarea name="description" id="description" rows={4} required onChange={handleChange} className="w-full p-2 border border-border-color rounded-md bg-background" />
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-text-secondary mb-1">URL de la Imagen</label>
                        <input type="url" name="imageUrl" id="imageUrl" required onChange={handleChange} className="w-full p-2 border border-border-color rounded-md bg-background" />
                    </div>
                    <div>
                        <label htmlFor="projectUrl" className="block text-sm font-medium text-text-secondary mb-1">URL del Proyecto</label>
                        <input type="url" name="projectUrl" id="projectUrl" required onChange={handleChange} className="w-full p-2 border border-border-color rounded-md bg-background" />
                    </div>
                </div>

                {/* Repo URL y Order */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="repoUrl" className="block text-sm font-medium text-text-secondary mb-1">URL del Repositorio</label>
                        <input type="url" name="repoUrl" id="repoUrl" required onChange={handleChange} className="w-full p-2 border border-border-color rounded-md bg-background" />
                    </div>
                    <div>
                        <label htmlFor="order" className="block text-sm font-medium text-text-secondary mb-1">Orden</label>
                        <input type="number" name="order" id="order" required onChange={handleChange} className="w-full p-2 border border-border-color rounded-md bg-background" />
                    </div>
                </div>

                {/* Tecnologías */}
                <div>
                    <label htmlFor="technologies" className="block text-sm font-medium text-text-secondary mb-1">Tecnologías (separadas por coma)</label>
                    <input type="text" name="technologies" id="technologies" required onChange={handleChange} className="w-full p-2 border border-border-color rounded-md bg-background" />
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="px-6 py-2 font-semibold text-white bg-text-secondary rounded-md shadow-sm hover:bg-opacity-90 cursor-pointer">
                        Guardar Proyecto
                    </button>
                </div>
            </form>
        </div>
    );

}