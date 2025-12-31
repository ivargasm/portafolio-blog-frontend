// =================================================================================
// ARCHIVO: app/(main)/sobre-mi/page.tsx
// =================================================================================

import Image from 'next/image';
import Link from 'next/link';
import { Scale, Code, Database, BookOpen, Shield, FileText, ArrowRight } from 'lucide-react';

export default function SobreMiPage() {
    return (
        <div className="min-h-screen">
            <HeroSection />
            <TransitionSection />
            <ProfessionalJourneySection />
            <DualCompetenciesSection />
            <CTASection />
        </div>
    );
}

// Hero Section
function HeroSection() {
    return (
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

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Columna izquierda - Texto */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                                Ingeniero & Abogado en formación
                            </span>
                        </div>

                        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                            Construyendo el puente entre el{' '}
                            <span style={{ color: 'var(--primary)' }}>Código</span>
                            {' '}y la{' '}
                            <span style={{ color: 'var(--primary)' }}>Ley.</span>
                        </h1>

                        <p className="text-xl md:text-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            En el sector jurídico, la tecnología a menudo llega tarde; en el desarrollo de software, la ley suele verse como un obstáculo invisible. <b>Yo opero justo en esa intersección.</b>
                            <br />
                            No soy solo un desarrollador que &quot;conoce&quot; leyes, ni un estudiante de derecho que &quot;sabe algo&quot; de computadoras. Poseo la capacidad técnica para diseñar arquitecturas de datos escalables y el criterio jurídico para entender el fondo de un litigio o contrato. No necesitas un intermediario entre tus ingenieros y tu equipo legal: <b>yo hablo ambos idiomas de forma nativa.</b>
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg"
                                style={{ backgroundColor: 'var(--surface)', borderLeft: `4px solid var(--primary)` }}>
                                <Code className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Python Expert</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg"
                                style={{ backgroundColor: 'var(--surface)', borderLeft: `4px solid var(--primary)` }}>
                                <Database className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Data Engineer</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg"
                                style={{ backgroundColor: 'var(--surface)', borderLeft: `4px solid var(--primary)` }}>
                                <Scale className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>Legal Tech</span>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha - Foto */}
                    <div className="relative lg:block">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border aspect-[3/4]"
                            style={{ borderColor: 'var(--border)' }}>
                            <Image
                                src="https://res.cloudinary.com/ivargasm/image/upload/v1756997966/ivargasm/yo_kn2ih3.jpg"
                                alt="Ismael Vargas M."
                                fill
                                className="object-cover"
                            />
                            {/* Overlay con info */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <p className="text-white font-semibold text-lg">Ismael Vargas M.</p>
                                <p className="text-white/80 text-sm">Systems Engineer • Law Student</p>
                            </div>
                        </div>

                        {/* Elemento decorativo */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-20 blur-3xl"
                            style={{ backgroundColor: 'var(--primary)' }}>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// La Transición Section
function TransitionSection() {
    return (
        <section className="py-24" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
                    La Transición
                </h2>
                <div className="space-y-6 text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <p>
                        Comencé mi carrera resolviendo problemas desde la lógica determinista de los algoritmos.
                        Como <strong style={{ color: 'var(--primary)' }}>Ingeniero de Datos</strong>, pasé años construyendo
                        pipelines y arquitecturas en la nube, dominando el ecosistema de datos (Python, SQL).
                        Disfrutaba la construcción técnica, pero sentía la inquietud de explorar sistemas lógicos
                        fuera de la informática.
                    </p>

                    <p>
                        Mi ingreso al <strong style={{ color: 'var(--primary)' }}>Derecho</strong> no fue un cálculo estratégico,
                        sino producto de una pura curiosidad intelectual. Sin embargo, ya inmerso en el estudio,
                        tuve una revelación: podía utilizar mi experiencia técnica para traducir la complejidad jurídica
                        y hacer que los procesos legales sean accesibles y comprensibles para el ciudadano común.
                    </p>

                    <p>
                        Hoy, esta fusión es mi mayor fortaleza. No solo busco eficiencia; busco claridad.
                        Desarrollo herramientas que esconden la complejidad del código y la ley detrás de interfaces amigables,
                        permitiendo que cualquier persona pueda navegar procesos jurídicos con la misma facilidad con la que usa una app.
                    </p>
                </div>
            </div>
        </section>
    );
}

// Trayectoria Profesional Section
function ProfessionalJourneySection() {
    const journey = [
        {
            year: '2017 - 2020',
            role: 'Analista de Datos',
            company: 'Storecheck',
            description: 'Desarrollo de lógica de negocio y pipelines ETL. <br>Construcción de soluciones backend para transformar datos complejos en información procesable.',
            icon: <Code className="w-5 h-5" />
        },
        {
            year: '2020 - Actualidad',
            role: 'Ingeniería de Datos & Arquitectura Cloud',
            company: 'Storecheck',
            description: 'Diseño de infraestructuras escalables y orquestación de datos masivos. <br>Experto en <strong style="color: var(--primary)">Python</strong> para automatización avanzada, manejo de Data Lakes (AWS) y optimización de consultas.',
            icon: <Database className="w-5 h-5" />
        },
        {
            year: '2022 - Actualidad',
            role: 'Derecho e Innovación Legal',
            company: 'Universidad CESBA',
            description: 'Estudios enfocados en la intersección de la tecnología y la ley. Analizo el Derecho Mercantil y Laboral no solo como normas, sino como <strong style="color: var(--primary)">algoritmos sociales</strong> listos para ser optimizados y democratizados.',
            icon: <Scale className="w-5 h-5" />
        }
    ];

    return (
        <section className="py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-16 text-center" style={{ color: 'var(--text-primary)' }}>
                    Trayectoria Profesional
                </h2>

                <div className="relative">
                    {/* Línea vertical */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 hidden md:block"
                        style={{ backgroundColor: 'var(--border)' }}>
                    </div>

                    <div className="space-y-12">
                        {journey.map((item, index) => (
                            <div key={index} className="relative md:pl-24">
                                {/* Icono en la línea */}
                                <div className="absolute left-0 md:left-4 top-0 flex items-center justify-center w-16 h-16 rounded-full text-white shadow-lg"
                                    style={{ backgroundColor: 'var(--primary)' }}>
                                    {item.icon}
                                </div>

                                {/* Contenido */}
                                <div className="ml-20 md:ml-0 p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl"
                                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-sm font-bold px-3 py-1 rounded-full"
                                            style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                                            {item.year}
                                        </span>
                                    </div>
                                    <h3 className="font-heading text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                                        {item.role}
                                    </h3>
                                    <p className="text-lg"
                                        style={{ color: 'var(--text-secondary)' }}
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// Competencias Duales Section
function DualCompetenciesSection() {
    const techStack = [
        { name: 'Python & Backend Systems', description: 'Desarrollo de APIs rápidas (FastAPI), scripting de datos y automatización de lógica compleja.', icon: <Code className="w-6 h-6" /> },
        { name: 'Big Data & Cloud Architecture', description: 'Diseño de infraestructuras en la nube (AWS/VPS) y orquestación de pipelines ETL escalables.', icon: <Database className="w-6 h-6" /> },
        { name: 'DevOps & Deployment', description: 'Containerización (Docker), CI/CD y gestión de entornos de producción.', icon: <Code className="w-6 h-6" /> },
    ];

    const legalKnowledge = [
        { name: 'Legal Operations (Legal Ops)', description: 'Ingeniería de procesos jurídicos: transformación de flujos de trabajo manuales en sistemas automatizados eficientes.', icon: <Shield className="w-6 h-6" /> },
        { name: 'Ingeniería Contractual', description: 'Estructuración de contratos como datos estructurados, facilitando su generación masiva y análisis.', icon: <FileText className="w-6 h-6" /> },
        { name: 'Enfoque Mercantil & Laboral', description: 'Interés activo en la digitalización de procesos comerciales y la gestión de relaciones laborales.', icon: <BookOpen className="w-6 h-6" /> },
    ];

    return (
        <section className="py-24" style={{ backgroundColor: 'var(--surface)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="font-heading text-4xl md:text-5xl font-bold mb-16 text-center" style={{ color: 'var(--text-primary)' }}>
                    Competencias Duales
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Tech Stack */}
                    <div className="p-8 rounded-2xl border"
                        style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                                style={{ backgroundColor: 'var(--primary)' }}>
                                <Code className="w-6 h-6" />
                            </div>
                            <h3 className="font-heading text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                Tech Stack
                            </h3>
                        </div>
                        <div className="space-y-6">
                            {techStack.map((skill, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: 'var(--surface)', color: 'var(--primary)' }}>
                                        {skill.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                                            {skill.name}
                                        </h4>
                                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                            {skill.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legal Knowledge */}
                    <div className="p-8 rounded-2xl border"
                        style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                                style={{ backgroundColor: 'var(--primary)' }}>
                                <Scale className="w-6 h-6" />
                            </div>
                            <h3 className="font-heading text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                Legal Knowledge
                            </h3>
                        </div>
                        <div className="space-y-6">
                            {legalKnowledge.map((skill, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: 'var(--surface)', color: 'var(--primary)' }}>
                                        {skill.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                                            {skill.name}
                                        </h4>
                                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                            {skill.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// CTA Section
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
                            ¿Interesado en colaborar conmigo?
                        </h2>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                            Siempre estoy abierto a nuevos proyectos que combinen tecnología y derecho.
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
