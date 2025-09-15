// =================================================================================
// ARCHIVO: app/(main)/servicios/page.tsx
// =================================================================================

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export default function ServiciosPage() {
    const services = [
        {
            title: 'Consultoría en Ingeniería de Datos',
            offer: 'Soluciones a medida para optimizar el flujo, calidad y uso de los datos en entornos técnicos y operativos complejos.',
            // imageUrl: 'https://placehold.co/600x400/2563EB/FFFFFF?text=Ingeniería+de+Datos',
            imageUrl: 'https://res.cloudinary.com/ivargasm/image/upload/v1756071218/ivargasm/inegenieria_de_datos_bgh7as.png',
            details: [
                'Diseño, construcción y optimización de pipelines ETL/ELT en Python.',
                'Integración de datos desde fuentes heterogéneas (APIs, BBDD, etc.).',
                'Modelado y administración de bases de datos (PostgreSQL, Redshift).',
                'Automatización de procesos de ingesta y transformación con herramientas cloud.',
                'Desarrollo de dashboards y estructuras de datos para toma de decisiones.'
            ]
        },
        {
            title: 'Desarrollo de Software a Medida',
            offer: 'Aplicaciones diseñadas desde cero para resolver problemas específicos, con énfasis en seguridad, rendimiento y escalabilidad.',
            // imageUrl: 'https://placehold.co/600x400/1A202C/FFFFFF?text=Desarrollo+Web',
            imageUrl: 'https://res.cloudinary.com/ivargasm/image/upload/v1756071222/ivargasm/desarrollo_de_software_y0hneb.png',
            details: [
                'Creación de APIs RESTful y microservicios robustos con FastAPI.',
                'Desarrollo de interfaces web modernas y accesibles con ReactJS.',
                'Construcción de herramientas internas que optimizan flujos de trabajo.',
                'Implementación de autenticación segura y control de acceso basado en roles.',
                'Proyectos modulares listos para integración y despliegue en cloud.'
            ]
        },
        {
            title: 'Asesoría Estratégica en LegalTech',
            offer: 'Una visión híbrida que permite construir soluciones legales digitalizadas, accesibles y pensadas para todos.',
            // imageUrl: 'https://placehold.co/600x400/0D9488/FFFFFF?text=LegalTech',
            imageUrl: 'https://res.cloudinary.com/ivargasm/image/upload/v1756071218/ivargasm/legalTech_h9y6qm.png',
            details: [
                'Análisis y diseño de soluciones bajo el enfoque "Privacy by Design".',
                'Prototipado y validación de aplicaciones para facilitar el acceso a información legal.',
                'Automatización de documentos legales (contratos, avisos de privacidad, etc.).',
                'Evaluación de herramientas LegalTech para despachos o departamentos legales.',
                'Creación de contenidos interactivos que simplifican trámites jurídicos.'
            ]
        }
    ];

    return (
        <div className="relative py-8 md:py-16">
            {/* Capa de fondo con patrón de puntos */}
            <div className="absolute inset-0 -z-10 bg-dot-pattern"></div>
            {/* Capa de color de fondo sólido para compatibilidad */}
            <div className="absolute inset-0 -z-20 bg-background"></div>

            <div className="container mx-auto px-4">
                {/* Cabecera de la página */}
                <header className="text-center mb-16 md:mb-20">
                    <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-text-primary">
                        Servicios
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
                        Ofrezco soluciones especializadas en la intersección de datos, software y derecho para impulsar tus proyectos.
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
                                    {service.offer}
                                </p>
                                <ul className="mt-6 space-y-3">
                                    {service.details.map((detail, detailIndex) => (
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
