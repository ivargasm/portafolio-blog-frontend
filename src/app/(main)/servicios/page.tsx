// =================================================================================
// ARCHIVO: app/(main)/servicios/page.tsx
// =================================================================================
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
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

    if (isLoading) return <div>Cargando servicios...</div>;

    return (
        <div className="relative py-8 md:py-16">
            {/* Capa de fondo con patrón de puntos */}
            <div className="absolute inset-0 -z-10 bg-dot-pattern"></div>
            {/* Capa de color de fondo sólido para compatibilidad */}
            <div className="absolute inset-0 -z-20 bg-background"></div>

            <div className="max-w-5xl mx-auto px-4">
                {/* Cabecera de la página */}
                <header className="text-center mb-16 md:mb-20">
                    <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-text-primary">
                        Especialidades
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
                        Mis áreas de expertise en la intersección de datos, software y derecho para impulsar proyectos innovadores.
                    </p>
                </header>

                {/* Lista de servicios */}
                <div className="space-y-20">
                    {services.map((service, index) => (
                        <section
                            key={service.title}
                            // Alterna el layout para las filas pares e impares en desktop
                            className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center`}
                        >
                            {/* Columna de la Imagen */}
                            <div className={`relative aspect-video rounded-xl shadow-2xl overflow-hidden group ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                                <Image
                                    src={service.imageUrl}
                                    alt={`Imagen representativa de ${service.title}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Columna del Texto */}
                            <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                                <h2 className="font-heading text-3xl font-bold text-text-primary">
                                    {service.title}
                                </h2>
                                <p className="mt-4 text-lg text-text-secondary italic">
                                    {service.description}
                                </p>
                                <ul className="mt-6 space-y-3">
                                    {service.features.map((detail, detailIndex) => (
                                        <li key={detailIndex} className="flex items-start">
                                            <CheckCircle2 className="h-6 w-6 text-accent-secondary flex-shrink-0 mt-1 mr-3" />
                                            <span className="text-text-secondary">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}
