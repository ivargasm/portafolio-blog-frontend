// =================================================================================
// ARCHIVO: app/(main)/page.tsx
// =================================================================================

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Database, Code, Scale, Sparkles } from 'lucide-react';

// Componente principal de la página de inicio
export default function HomePage() {
    return (
        <div className="min-h-screen">
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
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Fondo con gradiente */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--surface)] to-[var(--background)]"></div>

            {/* Patrón de puntos sutil */}
            <div className="absolute inset-0 opacity-30 dark:opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Columna izquierda - Texto */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface)]">
                            <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                                Disponible para roles LegalTech
                            </span>
                        </div>

                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                            Donde la{' '}
                            <span className="relative inline-block">
                                <span style={{ color: 'var(--primary)' }}>Ingeniería</span>
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] to-transparent"></span>
                            </span>
                            {' '}de Datos se Encuentra con la{' '}
                            <span style={{ color: 'var(--primary)' }}>Jurisprudencia.</span>
                        </h1>

                        <p className="text-xl md:text-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            Construyo infraestructuras de datos escalables y navego por marcos legales complejos.
                            Uniendo scripts de Python y lógica jurídica para innovar en LegalTech.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link
                                href="/proyectos"
                                className="group inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                                style={{ backgroundColor: 'var(--primary)' }}
                            >
                                Explorar Proyectos
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/perspectivas"
                                className="inline-flex items-center justify-center px-8 py-4 font-semibold rounded-lg border-2 transition-all duration-300 transform hover:scale-105"
                                style={{
                                    borderColor: 'var(--border)',
                                    color: 'var(--text-primary)',
                                    backgroundColor: 'var(--surface)'
                                }}
                            >
                                Leer Investigación
                            </Link>
                        </div>

                        <div className="flex items-center gap-8 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
                            <div>
                                <div className="flex items-center gap-2">
                                    <Database className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                                        Experto en Python
                                    </span>
                                </div>
                            </div>
                            <div className="h-6 w-px" style={{ backgroundColor: 'var(--border)' }}></div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <Scale className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                                        Estudiante de Derecho
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha - Mockup de código */}
                    <div className="relative lg:block hidden">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border"
                            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                            {/* Barra superior del editor */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <span className="ml-4 text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
                                    legal_logic.py
                                </span>
                            </div>

                            {/* Código */}
                            <div className="p-6 font-mono text-sm leading-relaxed">
                                <div className="space-y-2">
                                    <div><span style={{ color: 'var(--text-secondary)' }}>1</span>  <span className="text-purple-500">def</span> <span className="text-blue-400">analizar_contrato</span><span style={{ color: 'var(--text-primary)' }}>(doc):</span></div>
                                    <div><span style={{ color: 'var(--text-secondary)' }}>2</span>      <span className="text-orange-400">&quot;&quot;&quot;</span></div>
                                    <div><span style={{ color: 'var(--text-secondary)' }}>3</span>      <span className="text-orange-400">Analiza puntaje de cumplimiento &gt; 0.95:</span></div>
                                    <div><span style={{ color: 'var(--text-secondary)' }}>4</span>      <span className="text-orange-400">return &quot;Aprobado&quot;</span></div>
                                    <div><span style={{ color: 'var(--text-secondary)' }}>5</span>      <span className="text-orange-400">else:</span></div>
                                    <div><span style={{ color: 'var(--text-secondary)' }}>6</span>      <span className="text-orange-400">return &quot;Revisión Requerida&quot;</span></div>
                                    <div><span style={{ color: 'var(--text-secondary)' }}>7</span>      <span className="text-orange-400">&quot;&quot;&quot;</span></div>
                                    <div><span style={{ color: 'var(--text-secondary)' }}>8</span>      <span className="text-purple-500">if</span> <span style={{ color: 'var(--text-primary)' }}>doc.</span><span className="text-blue-400">puntaje_cumplimiento</span> <span style={{ color: 'var(--text-primary)' }}>&gt;</span> <span className="text-green-400">0.95</span><span style={{ color: 'var(--text-primary)' }}>:</span></div>
                                    <div><span style={{ color: 'var(--text-secondary)' }}>9</span>          <span className="text-purple-500">return</span> <span className="text-green-400">&quot;Aprobado&quot;</span></div>
                                    <div><span style={{ color: 'var(--text-secondary)' }}>10</span>     <span className="text-purple-500">else</span><span style={{ color: 'var(--text-primary)' }}>:</span></div>
                                    <div><span style={{ color: 'var(--text-secondary)' }}>11</span>         <span className="text-purple-500">return</span> <span className="text-green-400">&quot;Revisión Requerida&quot;</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Elemento decorativo flotante */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-20 blur-3xl"
                            style={{ backgroundColor: 'var(--primary)' }}>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PillarsSection() {
    const pillars = [
        {
            icon: <Database className="h-8 w-8" />,
            title: 'Experto en Python',
            description: 'Scripting avanzado, automatización de flujos de trabajo legales y desarrollo backend.',
        },
        {
            icon: <Code className="h-8 w-8" />,
            title: 'Ingeniería de Datos',
            description: 'Construcción de pipelines ETL robustos, optimización SQL y data warehousing.',
        },
        {
            icon: <Scale className="h-8 w-8" />,
            title: 'Investigación Legal',
            description: 'Comprensión profunda de regulaciones, derecho constitucional y marcos de cumplimiento.',
        },
    ];

    return (
        <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                        Competencias Clave
                    </h2>
                    <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Fusionando experiencia técnica con visión legal para ofrecer soluciones especializadas.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {pillars.map((pillar) => (
                        <div
                            key={pillar.title}
                            className="group p-8 rounded-2xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                            style={{
                                backgroundColor: 'var(--surface)',
                                borderColor: 'var(--border)'
                            }}
                        >
                            <div
                                className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 transition-all duration-300 group-hover:scale-110"
                                style={{
                                    backgroundColor: 'var(--primary)',
                                    color: 'white'
                                }}
                            >
                                {pillar.icon}
                            </div>
                            <h3 className="font-heading text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                                {pillar.title}
                            </h3>
                            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
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
            imageUrl: 'https://res.cloudinary.com/ivargasm/image/upload/v1756051783/ivargasm/etl_nb4ix0.png',
        },
        {
            title: 'Plataforma de Gestión de Contratos',
            description: 'Prototipo LegalTech que guía a los usuarios en la creación de contratos legales de forma sencilla y accesible.',
            link: '/proyectos#contract-management',
            imageUrl: 'https://res.cloudinary.com/ivargasm/image/upload/v1756051782/ivargasm/contratos_jxxg8t.png',
        },
        {
            title: 'Configurador Visual de JSON',
            description: 'Aplicación que elimina el 100% de errores humanos al construir configuraciones complejas para reportes.',
            link: '/proyectos#json-configurator',
            imageUrl: 'https://res.cloudinary.com/ivargasm/image/upload/v1756051783/ivargasm/json_stm9gy.png',
        },
    ];

    return (
        <section className="py-24" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                        Proyectos Destacados
                    </h2>
                    <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Casos de estudio que demuestran cómo transformo ideas en soluciones funcionales.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <Link
                            href={project.link}
                            key={project.title}
                            className="group block rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                            style={{
                                backgroundColor: 'var(--background)',
                                borderColor: 'var(--border)'
                            }}
                        >
                            <div className="overflow-hidden">
                                <Image
                                    src={project.imageUrl}
                                    alt={`Imagen de ${project.title}`}
                                    width={600}
                                    height={400}
                                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-heading text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                    {project.title}
                                </h3>
                                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                                    {project.description}
                                </p>
                                <div className="inline-flex items-center font-semibold group-hover:gap-3 transition-all" style={{ color: 'var(--primary)' }}>
                                    Ver caso de estudio
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CTASection() {
    return (
        <section className="py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="relative text-center py-20 px-8 rounded-3xl shadow-2xl overflow-hidden"
                    style={{
                        background: `linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)`
                    }}
                >
                    {/* Patrón decorativo */}
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '32px 32px'
                        }}>
                    </div>

                    <div className="relative z-10">
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
                            ¿Tienes una idea o un reto en mente?
                        </h2>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                            Me encantaría escuchar sobre tu proyecto y explorar cómo podemos colaborar para llevarlo al siguiente nivel.
                        </p>
                        <Link
                            href="/contacto"
                            className="inline-flex items-center justify-center px-8 py-4 font-semibold bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            style={{ color: 'var(--primary)' }}
                        >
                            Hablemos
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
