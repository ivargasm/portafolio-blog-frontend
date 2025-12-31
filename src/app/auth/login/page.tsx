"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/Store";
import Link from "next/link";
import { User, Lock, ArrowLeft, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const { url, loginUser, userValid, userAuth, user } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const validateUser = async () => {
            await userValid();
        };
        validateUser();
    }, [userValid]);

    useEffect(() => {
        if ((userAuth || user)) {
            router.push('/dashboard');
        }
    }, [user, userAuth, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await loginUser(email, password, url);
            router.push("/dashboard");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ocurrió un error desconocido");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, #5b21b6 0%, #1e1b4b 50%, #0f172a 100%)'
            }}>
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
            </div>

            {/* Login Card */}
            <div className="relative w-full max-w-md">
                <div className="rounded-2xl border p-8 backdrop-blur-sm"
                    style={{
                        backgroundColor: 'rgba(15, 23, 42, 0.8)',
                        borderColor: 'rgba(139, 92, 246, 0.3)'
                    }}>
                    {/* Logo/Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                            style={{ backgroundColor: 'var(--primary)' }}>
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="font-heading text-3xl font-bold text-white mb-2">
                            Admin Access
                        </h1>
                        <p className="text-sm uppercase tracking-wider"
                            style={{ color: 'rgba(156, 163, 175, 0.8)' }}>
                            Systems & Legal Engineering
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'rgba(209, 213, 219, 0.9)' }}>
                                Email / Usuario
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5" style={{ color: 'rgba(156, 163, 175, 0.6)' }} />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="engineer@legaltech.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                                    style={{
                                        backgroundColor: 'rgba(15, 23, 42, 0.6)',
                                        borderColor: 'rgba(75, 85, 99, 0.5)',
                                        color: 'white'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'rgba(209, 213, 219, 0.9)' }}>
                                Contraseña
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5" style={{ color: 'rgba(156, 163, 175, 0.6)' }} />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                                    style={{
                                        backgroundColor: 'rgba(15, 23, 42, 0.6)',
                                        borderColor: 'rgba(75, 85, 99, 0.5)',
                                        color: 'white'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                                    style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)' }}
                                />
                                <span className="ml-2 text-sm" style={{ color: 'rgba(209, 213, 219, 0.8)' }}>
                                    Recordarme
                                </span>
                            </label>
                            <Link
                                href="/auth/forgot-password"
                                className="text-sm hover:underline"
                                style={{ color: 'var(--primary)' }}
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 rounded-lg text-sm text-center"
                                style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:scale-105"
                            style={{ backgroundColor: 'var(--primary)' }}
                        >
                            Iniciar Sesión
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-8 flex items-center justify-between text-sm">
                        <Link
                            href="/"
                            className="flex items-center gap-1 hover:underline"
                            style={{ color: 'rgba(156, 163, 175, 0.8)' }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver al portafolio
                        </Link>
                        <span style={{ color: 'rgba(156, 163, 175, 0.6)' }}>
                            v1.0.4 Admin
                        </span>
                    </div>
                </div>

                {/* Copyright */}
                <p className="text-center mt-6 text-sm"
                    style={{ color: 'rgba(156, 163, 175, 0.6)' }}>
                    © 2024 LegalTech Solutions. Todos los derechos reservados.
                </p>
            </div>
        </div>
    );
}
