import Link from 'next/link';
import { Scale, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ backgroundColor: 'var(--background)' }}>
            <div
                className="max-w-md w-full text-center p-8 md:p-10 rounded-3xl border shadow-2xl relative overflow-hidden"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
                {/* Elemento decorativo sutil en fondo */}
                <div
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none"
                    style={{ backgroundColor: 'var(--primary)' }}
                ></div>

                {/* Icono temático */}
                <div
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform hover:rotate-6"
                    style={{ backgroundColor: 'var(--primary)' }}
                >
                    <Scale className="w-8 h-8" />
                </div>

                <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                    style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                    Error 404 • Recurso No Encontrado
                </div>

                <h1 className="font-heading text-3xl md:text-4xl font-extrabold mb-3" style={{ color: 'var(--text-primary)' }}>
                    Acto Sin Sustento Jurídico
                </h1>

                <p className="text-base md:text-lg mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    El recurso o documento al que intentas acceder no existe, ha sido revocado o carece de fundamento en este servidor.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                        style={{ backgroundColor: 'var(--primary)' }}
                    >
                        <Home className="w-4 h-4" />
                        Ir al Inicio
                    </Link>
                    <Link
                        href="/perspectivas"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold border transition-all duration-200 hover:scale-105"
                        style={{
                            borderColor: 'var(--border)',
                            color: 'var(--text-primary)',
                            backgroundColor: 'var(--background)'
                        }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Ver Blog
                    </Link>
                </div>
            </div>
        </div>
    );
}
