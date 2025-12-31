// =================================================================================
// ARCHIVO: app/(main)/servicios/page.tsx
// =================================================================================
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { getServices } from '@/app/lib/api';
import { ServiceResponse } from '@/app/lib/types';
import { useAuthStore } from '@/app/store/Store';

export default function ServiciosPage() {
    const apiUrl = useAuthStore((state) => state.url);
    const [services, setServices] = useState<ServiceResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServicesData = async () => {
            try {
                setIsLoading(true);
                const fetchedServices = await getServices(apiUrl);
                setServices(fetchedServices.sort((a: ServiceResponse, b: ServiceResponse) => a.order - b.order));
            } catch (error) {
                console.error("Failed to fetch services:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServicesData();
    }, [apiUrl]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Cargando servicios...
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

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                        style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                        <Sparkles className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                            EXPERTISE
                        </span>
                    </div>

                    <h1 className="font-heading text-5xl md:text-6xl font-extrabold mb-6" style={{ color: 'var(--text-primary)' }}>
                        Áreas de Especialización
                    </h1>

                    <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Un enfoque híbrido único que combina la precisión de la ingeniería de datos
                        con el rigor analítico del derecho para crear soluciones LegalTech de vanguardia.
                    </p>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24" style={{ backgroundColor: 'var(--background)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-32">
                        {services.map((service, index) => (
                            <div
                                key={service.title}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}
                            >
                                {/* Columna de la Imagen */}
                                <div className={`relative aspect-video rounded-2xl shadow-2xl overflow-hidden group border ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
                                    style={{ borderColor: 'var(--border)' }}>
                                    <Image
                                        src={service.imageUrl}
                                        alt={`Imagen representativa de ${service.title}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Overlay sutil */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>

                                {/* Columna del Texto */}
                                <div className={`space-y-6 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                                    {/* Badge del servicio */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
                                        style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                                        Especialización {index + 1}
                                    </div>

                                    <h2 className="font-heading text-4xl md:text-5xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                        {service.title}
                                    </h2>

                                    <p className="text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                        {service.description}
                                    </p>

                                    {/* Features list */}
                                    <ul className="space-y-4 pt-4">
                                        {service.features.map((detail, detailIndex) => (
                                            <li key={detailIndex} className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-1"
                                                    style={{ backgroundColor: 'var(--primary)' }}>
                                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                                </div>
                                                <span className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                                                    {detail}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
