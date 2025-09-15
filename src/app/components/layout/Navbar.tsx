// =================================================================================
// ARCHIVO: app/components/layout/Navbar.tsx
// DESCRIPCIÓN: Barra de navegación con lógica de autenticación y estilos semánticos.
// =================================================================================

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeSwitcher } from '../ui/ThemeSwitcher';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuthStore } from '@/app/store/Store';

export const Navbar = () => {
    const navLinks = [
        { href: '/sobre-mi', label: 'Sobre Mí' },
        { href: '/servicios', label: 'Servicios' },
        { href: '/proyectos', label: 'Proyectos' },
        { href: '/perspectivas', label: 'Blog' },
        // { href: '/dashboard', label: 'dashboard' },
    ];

    const [menuOpen, setMenuOpen] = useState(false);
    const { userAuth, logout } = useAuthStore();

    // Evita el scroll del body cuando el menú está abierto
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen, userAuth]);

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b border-border-color bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">

                    <Link href="/" className="font-heading text-xl font-bold text-text-main hover:text-accent-primary transition-colors">
                        IsmaelVargasM.
                    </Link>

                    {/* Menú de Escritorio */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-sm font-medium text-text-secondary hover:text-accent-primary transition-colors">
                                {link.label}
                            </Link>
                        ))}
                        {userAuth && (
                            <>
                                <Link key="/dashboard" href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent-primary transition-colors">
                                    <span>Dashboard</span>
                                </Link>
                                <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent-primary transition-colors">
                                    <LogOut size={16} />
                                    <span>Salir</span>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Controles de la derecha */}
                    <div className="flex items-center space-x-2">
                        <ThemeSwitcher />
                        <button
                            className="md:hidden p-2 rounded-md text-text-secondary cursor-pointer"
                            onClick={() => setMenuOpen(true)} // Solo abre el menú
                            aria-label="Abrir menú"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Menú Overlay para Móviles */}
            {menuOpen && (
                <div className="fixed inset-0 z-50 flex flex-col md:hidden">
                    {/* Fondo oscuro */}
                    <div
                        className="fixed inset-0 bg-black/60"
                        onClick={() => setMenuOpen(false)}
                    ></div>
                    {/* Contenido del menú */}
                    <div className="relative z-10 flex flex-col w-full max-w-xs h-full bg-background">
                        {/* Cabecera del menú móvil con botón de cierre */}
                        <div className="flex items-center justify-between p-4 border-b border-border-color">
                            <span className="font-heading font-bold text-text-primary">Menú</span>
                            <button
                                onClick={() => setMenuOpen(false)}
                                className="p-2 rounded-md text-text-secondary cursor-pointer"
                                aria-label="Cerrar menú"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Enlaces de navegación */}
                        <nav className="flex flex-col space-y-2 p-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={handleLinkClick}
                                    className="text-lg font-medium text-text-primary hover:text-accent-primary transition-colors py-2 rounded-md px-2"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {userAuth && (
                                <button onClick={handleLogout} className="flex items-center gap-2 text-lg font-medium text-text-primary hover:text-accent-primary transition-colors py-2 rounded-md px-2">
                                    <LogOut size={20} />
                                    <span>Logout</span>
                                </button>
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};
