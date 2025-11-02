// =================================================================================
// ARCHIVO: app/(main)/sobre-mi/page.tsx
// =================================================================================

import Image from 'next/image';
import { Briefcase, GraduationCap, Code, Database, Scale } from 'lucide-react';

export default function SobreMiPage() {
    const skills = [
        { name: 'Python', icon: <Code className="h-5 w-5" /> },
        { name: 'React', icon: <Code className="h-5 w-5" /> },
        { name: 'FastAPI', icon: <Code className="h-5 w-5" /> },
        { name: 'AWS Glue', icon: <Database className="h-5 w-5" /> },
        { name: 'Redshift', icon: <Database className="h-5 w-5" /> },
        { name: 'PostgreSQL', icon: <Database className="h-5 w-5" /> },
        { name: 'LegalTech', icon: <Scale className="h-5 w-5" /> },
        { name: 'Privacy by Design', icon: <Scale className="h-5 w-5" /> },
    ];

    const timeline = [
        {
            icon: <Briefcase />,
            title: "El Ingeniero",
            content: [
                "Soy Ingeniero en Sistemas con más de 7 años de experiencia profesional en el diseño y automatización de procesos de datos en organizaciones de gran escala. A lo largo de mi trayectoria, he liderado la creación de pipelines ETL eficientes con Python, construyendo herramientas internas que han reducido tiempos de procesamiento en más del 60% y minimizado errores críticos en operaciones diarias.",
                "He trabajado con tecnologías como Apache Hop, AWS Glue, Redshift, PostgreSQL y he desarrollado APIs robustas con FastAPI, integradas con frontends modernos en ReactJS. Estas soluciones no solo han mejorado el rendimiento técnico, sino que también han facilitado la toma de decisiones basada en datos de forma más ágil y confiable."
            ]
        },
        {
            icon: <GraduationCap />,
            title: "El Punto de Inflexión",
            content: [
                "Mi interés por el Derecho comenzó como una inquietud personal: quería aprender algo completamente distinto a lo técnico. Fue al adentrarme en el mundo jurídico que descubrí el enorme potencial de aplicar mis habilidades tecnológicas en este campo.",
                "Me di cuenta de que muchos procesos legales son inaccesibles para quienes no tienen formación jurídica, lo que crea barreras innecesarias. A partir de ahí, nació mi interés por construir herramientas que no solo ayuden a profesionales del Derecho, sino que también acerquen la justicia y el conocimiento legal a cualquier persona, de forma clara, sencilla y comprensible."
            ]
        },
        {
            icon: <Scale />,
            title: "La Misión",
            content: [
                "Mi propósito es claro: integrar tecnología y derecho para construir soluciones que sean técnicamente eficientes y accesibles para todos. Me enfoco especialmente en el desarrollo de herramientas LegalTech que simplifiquen el acceso a servicios legales, promuevan la educación jurídica práctica y contribuyan a cerrar la brecha entre sistemas complejos y usuarios comunes.",
                "Creo que la tecnología debe estar al servicio de las personas, no solo de los expertos, y que podemos construir plataformas más justas, intuitivas y humanamente útiles. Mi objetivo es aportar a ese futuro desde una mirada híbrida, resolviendo problemas reales con una combinación única de código y criterio jurídico."
            ]
        }
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

                {/* Columna Izquierda: Foto y Habilidades */}
                <aside className="lg:col-span-1 space-y-10 lg:sticky lg:top-24 h-fit">
                    <div className="relative w-full aspect-[3/4] rounded-2xl shadow-2xl overflow-hidden group">
                        <Image
                            src="https://res.cloudinary.com/ivargasm/image/upload/v1756997966/ivargasm/yo_kn2ih3.jpg"
                            alt="Foto de Ismael Vargas"
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div>
                        <h3 className="font-heading text-2xl font-bold text-text-primary mb-4">Competencias Clave</h3>
                        <div className="flex flex-wrap gap-3">
                            {skills.map(skill => (
                                <div key={skill.name} className="flex items-center bg-background border border-border-color text-text-secondary text-sm font-medium px-3 py-1.5 rounded-full shadow-sm hover:bg-border-color hover:text-text-primary transition-all cursor-default">
                                    {skill.icon}
                                    <span className="ml-2">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Columna Derecha: La Narrativa como Línea de Tiempo */}
                <main className="lg:col-span-2">
                    <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-text-primary mb-12">
                        Mi Trayectoria
                    </h1>
                    <div className="relative">
                        {/* La línea vertical de la línea de tiempo */}
                        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border-color"></div>

                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <div key={index} className="relative pl-12">
                                    <div className="absolute left-0 top-0 flex items-center justify-center h-10 w-10 rounded-full bg-accent-primary text-white shadow-lg">
                                        {item.icon}
                                    </div>
                                    <div className="p-6 bg-background border border-border-color rounded-xl shadow-lg ml-4">
                                        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">{item.title}</h2>
                                        <div className="space-y-4 text-text-secondary">
                                            {item.content.map((paragraph, pIndex) => (
                                                <p key={pIndex}>{paragraph}</p>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
