// =================================================================================
// ARCHIVO: app/(admin)/layout.tsx
// DESCRIPCIÓN: Layout principal para la sección de administración.
// =================================================================================
'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, LogOut, Briefcase, Home, Wrench, MessageSquare } from 'lucide-react';
import ProtectedRoute from '../components/ProtectedRoutes';
import { useAuthStore } from '../store/Store';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const { logout } = useAuthStore();
    const pathname = usePathname();

    const navLinks = [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/projects', label: 'Proyectos', icon: Briefcase },
        { href: '/services', label: 'Servicios', icon: Wrench },
        { href: '/dashboard/comentarios', label: 'Comentarios', icon: MessageSquare },
        { href: '/', label: 'Inicio', icon: Home }
    ];

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-background">
                {/* Barra Lateral de Navegación */}
                <aside className="w-64 flex-shrink-0 border-r border-border-color p-6">
                    <div className="flex flex-col h-full">
                        <h1 className="font-heading text-2xl font-bold mb-8">Panel</h1>
                        <nav className="flex flex-col space-y-2 flex-grow">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${isActive
                                            ? 'bg-accent-primary text-white'
                                            : 'hover:bg-border-color'
                                            }`}
                                    >
                                        <link.icon size={20} />
                                        <span>{link.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                        <button
                            onClick={logout}
                            className="flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-text-secondary hover:bg-red-500 hover:text-white"
                        >
                            <LogOut size={20} />
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </aside>

                {/* Contenido Principal */}
                <main className="flex-1 p-6 md:p-10">
                    {children}
                </main>
            </div>

        </ProtectedRoute>
    );
}
