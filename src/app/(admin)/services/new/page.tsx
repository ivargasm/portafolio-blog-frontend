'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/Store';
import { createService } from '@/app/lib/api';

export default function NewServicePage() {
    const router = useRouter();
    const apiUrl = useAuthStore((state) => state.url);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [itemsText, setItemsText] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const itemsArray = itemsText.split('\n').map(item => item.trim()).filter(item => item);

        const promise = createService({ title, description, imageUrl, features: itemsArray }, apiUrl);

        toast.promise(promise, {
            loading: 'Guardando servicio...',
            success: () => {
                router.push('/services');
                return 'Servicio creado con éxito.';
            },
            error: (err) => {
                setIsLoading(false);
                return `Error: ${err.message}`;
            }
        });
    };

    return (
        <div>
            <h1 className="font-heading text-3xl font-bold mb-6">Crear Nuevo Servicio</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">Título</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full bg-background border border-border-color rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-primary focus:border-accent-primary" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required rows={4} className="mt-1 block w-full bg-background border border-border-color rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-primary focus:border-accent-primary"></textarea>
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium">URL de la Imagen</label>
                    <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required className="mt-1 block w-full bg-background border border-border-color rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-primary focus:border-accent-primary" />
                </div>
                <div>
                    <label htmlFor="items" className="block text-sm font-medium">Puntos Clave (uno por línea)</label>
                    <textarea id="items" value={itemsText} onChange={(e) => setItemsText(e.target.value)} required rows={5} className="mt-1 block w-full bg-background border border-border-color rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-primary focus:border-accent-primary" />
                </div>
                <div className="flex justify-end">
                    <button type="submit" disabled={isLoading} className="px-6 py-2 font-semibold text-white bg-text-secondary rounded-md shadow-sm hover:bg-opacity-90 disabled:bg-gray-400 cursor-pointer">
                        {isLoading ? 'Guardando...' : 'Guardar Servicio'}
                    </button>
                </div>
            </form>
        </div>
    );

}