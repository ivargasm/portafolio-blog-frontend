'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/Store';
import { getProjectById, updateProject } from '@/app/lib/api';
import { ProjectUpdatePayload } from '@/app/lib/types';

export default function EditProjectPage() {
    const router = useRouter();
    const params = useParams();
    const id = parseInt(params.id as string);
    const apiUrl = useAuthStore((state) => state.url);

    const [formData, setFormData] = useState<ProjectUpdatePayload | null>(null);
    const [techInput, setTechInput] = useState('');

    useEffect(() => {
        if (id) {
            getProjectById(id, apiUrl)
                .then(data => setFormData(data))
                .catch(() => toast.error('No se pudo cargar el proyecto.'));
        }
    }, [id, apiUrl]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => prev ? { ...prev, [name]: name === 'order' ? parseInt(value) || 0 : value } : null);
    };

    const handleTechKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && techInput.trim()) {
            e.preventDefault();
            if (formData && formData.technologies && !formData.technologies.includes(techInput.trim())) {
                setFormData(prev => prev && prev.technologies ? { ...prev, technologies: [...prev.technologies, techInput.trim()] } : null);
            }
            setTechInput('');
        }
    };

    const removeTechnology = (techToRemove: string) => {
        setFormData(prev => prev && prev.technologies ? { ...prev, technologies: prev.technologies.filter(tech => tech !== techToRemove) } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        toast.promise(
            updateProject(id, formData, apiUrl),
            {
                loading: 'Actualizando proyecto...',
                success: () => {
                    router.push('/projects');
                    return 'Proyecto actualizado con éxito.';
                },
                error: (err) => `Error: ${err.message}`,
            }
        );
    };

    if (!formData) return <div>Cargando proyecto...</div>;

    return (
        <div>
            <h1 className="font-heading text-3xl font-bold text-text-primary mb-6">Editar Proyecto: {formData.title}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-text-secondary mb-1">Título</label>
                    <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="w-full bg-background border border-border-color rounded-md px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-1">Descripción</label>
                    <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={5} required className="w-full bg-background border border-border-color rounded-md px-3 py-2"></textarea>
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-text-secondary mb-1">Categoría</label>
                    <select name="category" id="category" value={formData.category} onChange={handleChange} className="w-full bg-background border border-border-color rounded-md px-3 py-2">
                        <option>Desarrollo de Software</option>
                        <option>Ingeniería de Datos</option>
                        <option>LegalTech</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-text-secondary mb-1">URL de la Imagen</label>
                    <input type="url" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="w-full bg-background border border-border-color rounded-md px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="projectUrl" className="block text-sm font-medium text-text-secondary mb-1">URL del Proyecto (Deploy)</label>
                    <input type="url" name="projectUrl" id="projectUrl" value={formData.projectUrl} onChange={handleChange} required className="w-full bg-background border border-border-color rounded-md px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="repoUrl" className="block text-sm font-medium text-text-secondary mb-1">URL del Repositorio</label>
                    <input type="url" name="repoUrl" id="repoUrl" value={formData.repoUrl} onChange={handleChange} required className="w-full bg-background border border-border-color rounded-md px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="technologies" className="block text-sm font-medium text-text-secondary mb-1">Tecnologías (presiona Enter para añadir)</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {formData.technologies?.map(tech => (
                            <span key={tech} className="flex items-center gap-2 bg-accent-secondary/20 text-accent-secondary text-xs font-semibold px-2 py-1 rounded-full">
                                {tech}
                                <button type="button" onClick={() => removeTechnology(tech)} className="text-accent-secondary hover:text-red-500">&times;</button>
                            </span>
                        ))}
                    </div>
                    <input type="text" id="technologies" value={techInput} onChange={(e) => setTechInput(e.target.value)} onKeyDown={handleTechKeyDown} className="w-full bg-background border border-border-color rounded-md px-3 py-2" />
                </div>
                <div>
                    <label htmlFor="order" className="block text-sm font-medium text-text-secondary mb-1">Orden de Aparición</label>
                    <input type="number" name="order" id="order" value={formData.order} onChange={handleChange} required className="w-full bg-background border border-border-color rounded-md px-3 py-2" />
                </div>
                <div className="flex gap-4">
                    <button type="submit" className="px-6 py-2 font-semibold text-white bg-accent-primary rounded-md">Guardar Cambios</button>
                    <button type="button" onClick={() => router.back()} className="px-6 py-2 font-semibold text-text-secondary bg-border-color rounded-md">Cancelar</button>
                </div>
            </form>
        </div>
    );

}