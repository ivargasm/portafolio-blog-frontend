// =================================================================================
// ARCHIVO: app/(main)/contacto/page.tsx 
// DESCRIPCIÓN: Página de contacto con formulario protegido.
// =================================================================================
'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/Store';
import { sendContactMessage } from '@/app/lib/api';
import { ContactFormPayload } from '@/app/lib/types';
import { Mail, Send } from 'lucide-react';

export default function ContactoPage() {
    const apiUrl = useAuthStore((state) => state.url);
    const [formData, setFormData] = useState<ContactFormPayload>({
        name: '', email: '', message: '', honeypot: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        toast.promise(
            sendContactMessage(formData, apiUrl),
            {
                loading: 'Enviando mensaje...',
                success: (data) => {
                    setFormData({ name: '', email: '', message: '', honeypot: '' }); // Limpia el formulario
                    return data.message;
                },
                error: (err) => err.message,
            }
        ).finally(() => setIsLoading(false));
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-16">
            <header className="text-center mb-16">
                <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-text-primary">
                    Hablemos
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
                    ¿Tienes una idea, un proyecto o simplemente quieres conectar? Estaré encantado de escucharte.
                </p>
            </header>

            <div className="max-w-2xl mx-auto">
                <div className="bg-background border border-border-color rounded-xl shadow-lg p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Nombre</label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="w-full p-2 bg-background border border-border-color rounded-md" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Correo Electrónico</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required className="w-full p-2 bg-background border border-border-color rounded-md" />
                            </div>
                        </div>

                        {/* --- CAMPO HONEYPOT --- */}
                        {/* Este campo está oculto para los humanos pero visible para los bots. */}
                        <div className="hidden">
                            <label htmlFor="honeypot">No llenar este campo</label>
                            <input type="text" name="honeypot" id="honeypot" value={formData.honeypot} onChange={handleInputChange} tabIndex={-1} autoComplete="off" />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">Mensaje</label>
                            <textarea name="message" id="message" rows={5} value={formData.message} onChange={handleInputChange} required className="w-full p-2 bg-background border border-border-color rounded-md"></textarea>
                        </div>
                        <div className="text-right">
                            <button type="submit" disabled={isLoading} className="inline-flex items-center gap-2 px-6 py-2 font-semibold text-white bg-accent-primary rounded-md shadow-sm hover:bg-opacity-90 disabled:bg-gray-400">
                                {isLoading ? 'Enviando...' : 'Enviar Mensaje'} <Send size={16} />
                            </button>
                        </div>
                    </form>
                </div>

                <div className="text-center mt-12">
                    <p className="text-text-secondary">Si prefieres, también puedes contactarme directamente por correo:</p>
                    <a href="mailto:contacto@ivargasm.com" className="font-semibold text-accent-primary hover:underline mt-2 inline-flex items-center gap-2">
                        <Mail size={16} /> contacto@ivargasm.com
                    </a>
                </div>
            </div>
        </div>
    );
}
