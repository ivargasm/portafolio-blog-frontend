// =================================================================================
// ARCHIVO: app/(main)/page.tsx
// =================================================================================

import Link from 'next/link';
import Image from 'next/image'; // <-- 1. IMPORTAR EL COMPONENTE
import { ArrowRight, Database, Code, Scale } from 'lucide-react';

// Componente principal de la página de inicio
export default function HomePage() {
    return (
        <div className="space-y-24 md:space-y-32">
            <HeroSection />
            <PillarsSection />
            <FeaturedProjectsSection />
            <CTASection />
        </div>
    );
}

// --- Secciones de la Página (Rediseñadas) ---

function HeroSection() {
    return (
        <section className="relative text-center pt-12 md:pt-20 pb-12 md:pb-20 overflow-hidden">
            <div className="absolute inset-0 -z-10 grid-background"></div>
            <div className="absolute inset-0 -z-20 bg-background"></div>
            <div className="container mx-auto px-4">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary leading-tight animate-fade-in-up">
                    Ingeniero de Datos y Desarrollador de Software
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-text-secondary animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Conectando la tecnología con el Derecho para crear soluciones innovadoras, seguras y eficientes.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <Link href="/proyectos" className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-accent-primary rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
                        Ver mis Proyectos
                    </Link>
                    <Link href="/contacto" className="inline-flex items-center justify-center px-8 py-3 font-semibold text-text-primary bg-background border-2 border-border-color rounded-lg shadow-lg hover:bg-border-color transition-all duration-300 transform hover:scale-105">
                        Contactar <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

function PillarsSection() {
    const pillars = [
        {
            icon: <Database className="h-8 w-8 text-accent-primary" />,
            title: 'Ingeniería de Datos',
            description: 'Diseño y optimización de pipelines de datos, automatización de ETLs y modelado de arquitecturas para análisis de alto rendimiento.',
        },
        {
            icon: <Code className="h-8 w-8 text-accent-primary" />,
            title: 'Desarrollo de Software',
            description: 'Creación de APIs robustas con FastAPI y aplicaciones web interactivas con React para construir herramientas a medida.',
        },
        {
            icon: <Scale className="h-8 w-8 text-accent-primary" />,
            title: 'Estrategia LegalTech',
            description: 'Análisis "Privacy by Design", automatización de procesos legales y prototipado de soluciones para hacer el derecho más accesible.',
        },
    ];

    return (
        <section className="container mx-auto px-4">
            <div className="text-center">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">Mis Pilares de Trabajo</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
                    Combino tres disciplinas para ofrecer un valor único.
                </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
                {pillars.map((pillar, index) => (
                    <div key={pillar.title} className="p-8 bg-background border border-border-color rounded-xl shadow-lg hover:shadow-2xl hover:border-accent-primary/50 transition-all duration-300 transform hover:-translate-y-2" style={{ animation: `fade-in-up 0.5s ease-out ${0.2 * (index + 1)}s forwards`, opacity: 0 }}>
                        <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-accent-primary/10 mb-6">
                            {pillar.icon}
                        </div>
                        <h3 className="font-heading text-xl font-bold text-text-primary">{pillar.title}</h3>
                        <p className="mt-2 text-text-secondary">{pillar.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

function FeaturedProjectsSection() {
    const projects = [
        {
            title: 'Generador de Scripts ETL',
            description: 'Herramienta interna que automatiza la creación de ETLs, reduciendo el tiempo de desarrollo de horas a minutos.',
            link: '/proyectos#etl-generator',
            // imageUrl: 'https://placehold.co/600x400/2563EB/FFFFFF?text=Data+Pipeline',
            imageUrl: 'https://res.cloudinary.com/ivargasm/image/upload/v1756051783/ivargasm/etl_nb4ix0.png',
        },
        {
            title: 'Plataforma de Gestión de Contratos',
            description: 'Prototipo LegalTech que guía a los usuarios en la creación de contratos legales de forma sencilla y accesible.',
            link: '/proyectos#contract-management',
            // imageUrl: 'https://placehold.co/600x400/0D9488/FFFFFF?text=LegalTech',
            imageUrl: 'https://res.cloudinary.com/ivargasm/image/upload/v1756051782/ivargasm/contratos_jxxg8t.png',
        },
        {
            title: 'Configurador Visual de JSON',
            description: 'Aplicación que elimina el 100% de errores humanos al construir configuraciones complejas para reportes.',
            link: '/proyectos#json-configurator',
            // imageUrl: 'https://placehold.co/600x400/1A202C/FFFFFF?text=No-Code+UI',
            imageUrl: 'https://res.cloudinary.com/ivargasm/image/upload/v1756051783/ivargasm/json_stm9gy.png',
        },
    ];

    return (
        <section className="container mx-auto px-4">
            <div className="text-center">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">Proyectos Destacados</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
                    Casos de estudio que demuestran cómo transformo ideas en soluciones funcionales.
                </p>
            </div>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
                {projects.map((project) => (
                    <Link href={project.link} key={project.title} className="group block bg-background border border-border-color rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                        <div className="overflow-hidden">
                            {/* <-- 2. REEMPLAZAR <img> por <Image> con width y height --> */}
                            <Image
                                src={project.imageUrl}
                                alt={`Imagen de ${project.title}`}
                                width={600}
                                height={400}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="font-heading text-xl font-bold text-text-primary">{project.title}</h3>
                            <p className="mt-2 text-text-secondary text-sm">{project.description}</p>
                            <div className="mt-4 font-semibold text-accent-primary flex items-center group-hover:underline">
                                Ver caso de estudio <ArrowRight className="ml-2 h-5 w-5" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

function CTASection() {
    return (
        <section className="container mx-auto px-4">
            <div className="relative text-center bg-gradient-to-r from-accent-primary to-accent-secondary py-16 md:py-20 rounded-xl shadow-2xl overflow-hidden">
                <div className="relative z-10">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">¿Tienes una idea o un reto en mente?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80">
                        Me encantaría escuchar sobre tu proyecto y explorar cómo podemos colaborar para llevarlo al siguiente nivel.
                    </p>
                    <div className="mt-8">
                        <Link href="/contacto" className="inline-flex items-center justify-center px-8 py-3 font-semibold text-accent-primary bg-white rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                            Hablemos
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
