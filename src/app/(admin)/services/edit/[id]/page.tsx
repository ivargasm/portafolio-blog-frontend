'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/Store';
import { getServiceById, updateService } from '@/app/lib/api';
import { ServiceResponse } from '@/app/lib/types';

export default function EditServicePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const apiUrl = useAuthStore((state) => state.url);

    const [service, setService] = useState<ServiceResponse | null>(null);
    const [itemsText, setItemsText] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            getServiceById(id, apiUrl)
                .then(data => {
                    setService(data);
                    if (data && Array.isArray(data.features)) {
                        setItemsText(data.features.join('\n'));
                    }
                    setIsLoading(false);
                })
                .catch(() => toast.error('No se pudo cargar el servicio.'));
        }
    }, [id, apiUrl]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!service) return;

        // <-- CAMBIO: Procesar desde el textarea
        const itemsArray = itemsText.split('\n').map(item => item.trim()).filter(item => item);

        const promise = updateService(id, {
            title: service.title,
            description: service.description,
            imageUrl: service.imageUrl,
            features: itemsArray,
            order: service.order
        }, apiUrl);

        toast.promise(promise, {
            loading: 'Actualizando servicio...',
            success: () => {
                router.push('/services');
                return 'Servicio actualizado con éxito.';
            },
            error: (err) => `Error: ${err.message}`,
        });
    };

    if (isLoading) return <div>Cargando servicio...</div>;
    if (!service) return <div>Servicio no encontrado.</div>;

    return (
        <div>
            <h1 className="font-heading text-3xl font-bold mb-6">Editar Servicio</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium">Título</label>
                    <input type="text" id="title" value={service.title} onChange={(e) => setService({ ...service, title: e.target.value })} required className="mt-1 block w-full bg-background border border-border-color rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-primary focus:border-accent-primary" />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium">Descripción</label>
                    <textarea id="description" value={service.description} onChange={(e) => setService({ ...service, description: e.target.value })} required rows={4} className="mt-1 block w-full bg-background border border-border-color rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-primary focus:border-accent-primary"></textarea>
                </div>
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium">URL de la Imagen</label>
                    <input type="text" id="imageUrl" value={service.imageUrl} onChange={(e) => setService({ ...service, imageUrl: e.target.value })} required className="mt-1 block w-full bg-background border border-border-color rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-primary focus:border-accent-primary" />
                </div>
                <div>
                    <label htmlFor="items" className="block text-sm font-medium">Puntos Clave (uno por línea)</label>
                    <textarea id="items" value={itemsText} onChange={(e) => setItemsText(e.target.value)} required rows={5} className="mt-1 block w-full bg-background border border-border-color rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-primary focus:border-accent-primary" />
                </div>
                <div>
                    <label htmlFor="order" className="block text-sm font-medium">Orden</label>
                    <input type="number" id="order" value={service.order} onChange={(e) => setService({ ...service, order: parseInt(e.target.value, 10) })} required className="mt-1 block w-full bg-background border border-border-color rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent-primary focus:border-accent-primary" />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-6 py-2 font-semibold text-white bg-text-secondary rounded-md shadow-sm hover:bg-opacity-90 cursor-pointer">
                        Actualizar Servicio
                    </button>
                </div>
            </form>
        </div>
    );

}