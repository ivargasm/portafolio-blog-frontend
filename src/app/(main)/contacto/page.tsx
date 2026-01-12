// =================================================================================
// ARCHIVO: app/(main)/contacto/page.tsx 
// DESCRIPCIÓN: Página de contacto con formulario y diseño moderno de dos columnas.
// =================================================================================
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/Store';
import { sendContactMessage } from '@/app/lib/api';
import { ContactFormPayload } from '@/app/lib/types';
import { Mail, MapPin, Send, Linkedin, Github, Code } from 'lucide-react';

export default function ContactoPage() {
    const apiUrl = useAuthStore((state) => state.url);
    const [formData, setFormData] = useState<ContactFormPayload>({
        name: '', email: '', message: '', honeypot: ''
    });
    const [subject, setSubject] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'subject') {
            setSubject(value);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Agregar el asunto al mensaje
        const messageWithSubject = `Asunto: ${subject}\n\n${formData.message}`;
        const payload = { ...formData, message: messageWithSubject };

        toast.promise(
            sendContactMessage(payload, apiUrl),
            {
                loading: 'Enviando mensaje...',
                success: (data) => {
                    setFormData({ name: '', email: '', message: '', honeypot: '' });
                    setSubject('');
                    return data.message;
                },
                error: (err) => err.message,
            }
        ).finally(() => setIsLoading(false));
    };

    return (
        <div className="min-h-screen py-16 md:py-24" style={{ backgroundColor: 'var(--background)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="font-heading text-5xl md:text-6xl font-extrabold mb-6"
                        style={{ color: 'var(--text-primary)' }}>
                        Hablemos de{' '}
                        <span style={{ color: 'var(--primary)' }}>LegalTech</span>
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl"
                        style={{ color: 'var(--text-secondary)' }}>
                        Convergencia entre Ingeniería de Datos y Derecho. Si tienes un proyecto de
                        Data Engineering o una consulta legal tecnológica, estoy aquí para ayudar.
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Column - Contact Info */}
                    <div className="space-y-8">
                        {/* Email Directo */}
                        <div className="p-6 rounded-2xl border"
                            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: 'var(--primary)' }}>
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium mb-1"
                                        style={{ color: 'var(--text-secondary)' }}>
                                        Email Directo
                                    </p>
                                    <a href="mailto:contacto@ivargasm.com"
                                        className="text-lg font-semibold hover:underline"
                                        style={{ color: 'var(--text-primary)' }}>
                                        contacto@ivargasm.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Ubicación */}
                        <div className="p-6 rounded-2xl border"
                            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: 'var(--primary)' }}>
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium mb-1"
                                        style={{ color: 'var(--text-secondary)' }}>
                                        Ubicación
                                    </p>
                                    <p className="text-lg font-semibold"
                                        style={{ color: 'var(--text-primary)' }}>
                                        Querétaro, Querétaro, MX
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sígueme */}
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4"
                                style={{ color: 'var(--text-secondary)' }}>
                                Sígueme
                            </h3>
                            <div className="space-y-3">
                                <a href="https://www.linkedin.com/in/ivargasm/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 hover:scale-105"
                                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                    <Linkedin className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                    <div>
                                        <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                                            LinkedIn
                                        </p>
                                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                            Conexión Profesional
                                        </p>
                                    </div>
                                </a>
                                <a href="https://github.com/ivargasm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 hover:scale-105"
                                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                                    <Github className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                    <div>
                                        <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                                            GitHub
                                        </p>
                                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                            Proyectos de Código
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Tech Stack Focus */}
                        <div className="p-6 rounded-2xl border"
                            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                            <div className="flex items-center gap-2 mb-4">
                                <Code className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                <h3 className="text-sm font-semibold uppercase tracking-wider"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Tech Stack Focus
                                </h3>
                            </div>
                            <p className="text-sm leading-relaxed"
                                style={{ color: 'var(--text-secondary)' }}>
                                Python • Pandas • SQL • Automatizaciones
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="p-8 rounded-2xl border"
                        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Nombre y Email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name"
                                        className="block text-sm font-medium mb-2"
                                        style={{ color: 'var(--text-secondary)' }}>
                                        Nombre Completo
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Ej. Ana García"
                                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                                        style={{
                                            backgroundColor: 'var(--background)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email"
                                        className="block text-sm font-medium mb-2"
                                        style={{ color: 'var(--text-secondary)' }}>
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="nombre@empresa.com"
                                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                                        style={{
                                            backgroundColor: 'var(--background)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--text-primary)'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Asunto */}
                            <div>
                                <label htmlFor="subject"
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Asunto
                                </label>
                                <select
                                    name="subject"
                                    id="subject"
                                    value={subject}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                                    style={{
                                        backgroundColor: 'var(--background)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    <option value="">Selecciona un tema</option>
                                    <option value="Proyecto de Data Engineering">Proyecto de Data Engineering</option>
                                    <option value="Consulta Legal Tecnológica">Consulta Legal Tecnológica</option>
                                    <option value="Colaboración">Colaboración</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>

                            {/* Honeypot */}
                            <div className="hidden">
                                <label htmlFor="honeypot">No llenar este campo</label>
                                <input
                                    type="text"
                                    name="honeypot"
                                    id="honeypot"
                                    value={formData.honeypot}
                                    onChange={handleInputChange}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>

                            {/* Mensaje */}
                            <div>
                                <label htmlFor="message"
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: 'var(--text-secondary)' }}>
                                    Mensaje
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="Cuéntame sobre tu proyecto o consulta..."
                                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all resize-none"
                                    style={{
                                        backgroundColor: 'var(--background)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--text-primary)'
                                    }}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 font-semibold text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                style={{ backgroundColor: 'var(--primary)' }}
                            >
                                {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
