// =================================================================================
// ARCHIVO: app/(admin)/layout.tsx
// DESCRIPCIÓN: Layout principal para la sección de administración.
// =================================================================================
'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, LogOut, Briefcase, Home, Wrench, MessageSquare, User } from 'lucide-react';
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
    ];

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
                {/* Sidebar */}
                <aside className="w-64 flex-shrink-0 border-r"
                    style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                    <div className="flex flex-col h-full p-6">
                        {/* Logo/Header */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: 'var(--primary)' }}>
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-heading font-bold" style={{ color: 'var(--text-primary)' }}>
                                        Admin
                                    </h2>
                                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                        Panel de Control
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="flex flex-col space-y-1 flex-grow">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || pathname?.startsWith(link.href + '/');
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive ? 'shadow-md' : ''
                                            }`}
                                        style={{
                                            backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                                            color: isActive ? 'white' : 'var(--text-secondary)',
                                        }}
                                    >
                                        <link.icon size={20} />
                                        <span className="font-medium">{link.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Quick Link to Home */}
                        <div className="pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                            <Link
                                href="/"
                                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                <Home size={20} />
                                <span className="font-medium">Ver Sitio</span>
                            </Link>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={logout}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-red-500 hover:text-white mt-2"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Cerrar Sesión</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <div className="p-6 md:p-10">
                        {children}
                    </div>
                </main>
            </div>

        </ProtectedRoute>
    );
}
