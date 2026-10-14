'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/Store';
import { changePassword } from '@/app/lib/api';
import { User, Mail, ShieldCheck, Lock, KeyRound, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export default function PerfilSeguridadPage() {
    const { user, url } = useAuthStore();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentPassword) {
            toast.error('Ingresa tu contraseña actual');
            return;
        }

        if (!newPassword) {
            toast.error('Ingresa tu nueva contraseña');
            return;
        }

        if (newPassword.length < 6) {
            toast.error('La nueva contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        if (currentPassword === newPassword) {
            toast.error('La nueva contraseña no puede ser igual a la anterior');
            return;
        }

        setIsSubmitting(true);
        const loadingToast = toast.loading('Actualizando contraseña...');

        try {
            await changePassword(url, currentPassword, newPassword);
            toast.success('¡Contraseña actualizada con éxito!', { id: loadingToast });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error al cambiar contraseña:', error);
            const message = error instanceof Error ? error.message : 'Error desconocido al cambiar la contraseña';
            toast.error(message, { id: loadingToast });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl">
            {/* Header */}
            <div>
                <h1 className="font-heading text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    Perfil y Seguridad
                </h1>
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                    Administra tu información personal y credenciales de acceso
                </p>
            </div>

            {/* Account Info Card */}
            <div
                className="p-6 md:p-8 rounded-2xl border transition-all"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: 'var(--primary)' }}
                        >
                            <User className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-bold font-heading" style={{ color: 'var(--text-primary)' }}>
                                    {user?.username || 'Administrador'}
                                </h2>
                                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Activo
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1" style={{ color: 'var(--text-secondary)' }}>
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">{user?.email || 'No disponible'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <span
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border"
                            style={{
                                backgroundColor: 'var(--background)',
                                borderColor: 'var(--border)',
                                color: 'var(--text-secondary)',
                            }}
                        >
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            Rol: <strong style={{ color: 'var(--text-primary)' }}>{user?.role || 'admin'}</strong>
                        </span>
                    </div>
                </div>
            </div>

            {/* Change Password Card */}
            <div
                className="p-6 md:p-8 rounded-2xl border"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
                <div className="flex items-center gap-3 mb-6 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: 'var(--primary)' }}
                    >
                        <KeyRound className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold font-heading" style={{ color: 'var(--text-primary)' }}>
                            Cambiar Contraseña
                        </h2>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            Modifica tu contraseña de acceso para mantener protegida tu cuenta
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contraseña actual */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                            Contraseña actual
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: 'var(--text-secondary)' }}>
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Ingresa tu contraseña actual"
                                className="w-full pl-11 pr-12 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                style={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--text-primary)',
                                }}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center transition-colors hover:opacity-80"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Nueva contraseña */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                            Nueva contraseña
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: 'var(--text-secondary)' }}>
                                <KeyRound className="w-5 h-5" />
                            </div>
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Mínimo 6 caracteres"
                                className="w-full pl-11 pr-12 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                style={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--text-primary)',
                                }}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center transition-colors hover:opacity-80"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirmar nueva contraseña */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                            Confirmar nueva contraseña
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none" style={{ color: 'var(--text-secondary)' }}>
                                <KeyRound className="w-5 h-5" />
                            </div>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Repite la nueva contraseña"
                                className="w-full pl-11 pr-12 py-3 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                style={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--border)',
                                    color: 'var(--text-primary)',
                                }}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center transition-colors hover:opacity-80"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {confirmPassword && newPassword !== confirmPassword && (
                            <p className="text-xs text-red-500 mt-1.5">
                                Las contraseñas no coinciden.
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || !currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                            style={{ backgroundColor: 'var(--primary)' }}
                        >
                            <KeyRound className="w-5 h-5" />
                            {isSubmitting ? 'Actualizando...' : 'Actualizar Contraseña'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
