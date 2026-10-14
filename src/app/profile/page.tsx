"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../components/ProtectedRoutes";

export default function ProfilePage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/dashboard/perfil");
    }, [router]);

    return (
        <ProtectedRoute>
            <div className="flex items-center justify-center min-h-[50vh]">
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Redirigiendo a tu perfil y seguridad...
                </p>
            </div>
        </ProtectedRoute>
    );
}

