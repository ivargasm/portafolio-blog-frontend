'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/Store';
import { getServices, deleteService } from '@/app/lib/api';
import { ServiceResponse } from '@/app/lib/types';
import { Edit, Trash2 } from 'lucide-react';

export default function ServicesDashboardPage() {
    const apiUrl = useAuthStore((state) => state.url);
    const [services, setServices] = useState<ServiceResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setIsLoading(true);
                const fetchedServices = await getServices(apiUrl);
                setServices(fetchedServices);
            } catch (err: unknown) {
                if (err instanceof Error) setError(err.message);
                else setError('Ocurrió un error desconocido.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchServices();
    }, [apiUrl]);

    const handleDelete = (serviceToDelete: ServiceResponse) => {
        toast((t) => (
            <div className="flex flex-col gap-4">
                <p>¿Seguro que quieres borrar el servicio <strong>{serviceToDelete.title}</strong>?</p>
                <div className="flex gap-2 justify-end">
                    <button onClick={() => toast.dismiss(t.id)} className="px-4 py-2 text-sm font-medium bg-border-color rounded-md">Cancelar</button>
                    <button
                        onClick={() => {
                            toast.dismiss(t.id);
                            toast.promise(deleteService(serviceToDelete.id, apiUrl), {
                                loading: 'Borrando servicio...',
                                success: () => {
                                    setServices(services.filter(s => s.id !== serviceToDelete.id));
                                    return 'Servicio borrado con éxito.';
                                },
                                error: (err) => `Error: ${err.message}`,
                            });
                        }}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md"
                    >
                        Borrar
                    </button>
                </div>
            </div>
        ), { duration: 6000 });
    };

    if (isLoading) return <div>Cargando servicios...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="font-heading text-3xl font-bold">Gestionar Servicios</h1>
                <Link href="/services/new" className="px-4 py-2 font-semibold text-white bg-accent-primary rounded-md shadow-sm hover:bg-opacity-90">
                    Añadir Servicio
                </Link>
            </div>
            <div className="bg-background border border-border-color rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-border-color">
                    <thead className="bg-border-color/50 dark:bg-border-color/20">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">Título</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase">Orden</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border-color">
                        {services.length > 0 ? (
                            services.map((service) => (
                                <tr key={service.id}>
                                    <td className="px-6 py-4 font-medium">{service.title}</td>
                                    <td className="px-6 py-4">{service.order}</td>
                                    <td className="px-6 py-4 text-right space-x-4">
                                        <Link href={`/services/edit/${service.id}`} className="text-accent-primary hover:text-accent-primary/80 inline-block"><Edit size={18} /></Link>
                                        <button onClick={() => handleDelete(service)} className="text-red-500 hover:text-red-400"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={3} className="px-6 py-4 text-center text-text-secondary">No hay servicios creados.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

}