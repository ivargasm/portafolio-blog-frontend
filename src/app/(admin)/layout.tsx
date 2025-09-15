// =================================================================================
// ARCHIVO: app/(admin)/layout.tsx
// DESCRIPCIÓN: Layout principal para la sección de administración.
// =================================================================================
'use client'
import Link from 'next/link';
import { Home, FilePlus, LayoutDashboard, LogOut } from 'lucide-react';
import ProtectedRoute from '../components/ProtectedRoutes';
import { useAuthStore } from '../store/Store';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const { logout } = useAuthStore();

    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-background">
                {/* Barra Lateral de Navegación */}
                <aside className="w-64 border-r border-border-color p-6 hidden md:block">
                    <nav className="flex flex-col space-y-4">
                        <h2 className="font-heading text-xl font-bold mb-4">Panel</h2>
                        <Link href="/dashboard" className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors">
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </Link>
                        <Link href="/posts/new" className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors">
                            <FilePlus size={20} />
                            <span>Nuevo Post</span>
                        </Link>
                        <hr className="border-border-color my-4" />
                        <Link href="/" className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors">
                            <Home size={20} />
                            <span>Volver al Sitio</span>
                        </Link>
                        <Link onClick={() => { logout(); } } className="flex items-center gap-3 text-text-secondary hover:text-text-primary transition-colors" href={"/"}>
                            <LogOut size={20} /> Logout
                        </Link>
                    </nav>
                </aside>

                {/* Contenido Principal */}
                <main className="flex-1 p-6 md:p-10">
                    {children}
                </main>
            </div>

        </ProtectedRoute>
    );
}
