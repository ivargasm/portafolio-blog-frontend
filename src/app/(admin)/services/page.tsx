'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/Store';
import { getServices, deleteService } from '@/app/lib/api';
import { ServiceResponse } from '@/app/lib/types';
import { Edit, Trash2, Plus } from 'lucide-react';

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
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="px-4 py-2 text-sm font-medium rounded-md"
                        style={{ backgroundColor: 'var(--surface)', color: 'var(--text-primary)' }}
                    >
                        Cancelar
                    </button>
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
                    Cargando servicios...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg font-medium text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="font-heading text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Gestionar Servicios
                    </h1>
                    <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                        Administra los servicios que ofreces
                    </p>
                </div>
                <Link
                    href="/services/new"
                    className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                    style={{ backgroundColor: 'var(--primary)' }}
                >
                    <Plus size={20} />
                    Añadir Servicio
                </Link>
            </div>

            {/* Services Table */}
            <div className="rounded-2xl border overflow-hidden"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y" style={{ borderColor: 'var(--border)' }}>
                        <thead style={{ backgroundColor: 'var(--background)' }}>
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Título
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Orden
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y" style={{ borderColor: 'var(--border)' }}>
                            {services.length > 0 ? (
                                services.map((service) => (
                                    <tr key={service.id} className="hover:bg-[var(--background)] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                                                {service.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm px-3 py-1 rounded-full font-medium"
                                                style={{
                                                    backgroundColor: 'var(--background)',
                                                    color: 'var(--text-secondary)'
                                                }}>
                                                {service.order}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link
                                                    href={`/services/edit/${service.id}`}
                                                    className="p-2 rounded-lg transition-colors hover:bg-[var(--background)]"
                                                    style={{ color: 'var(--primary)' }}
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(service)}
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
                                    <td colSpan={3} className="px-6 py-12 text-center" style={{ color: 'var(--text-secondary)' }}>
                                        No hay servicios creados.
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
