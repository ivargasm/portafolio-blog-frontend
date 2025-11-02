"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/Store";
import { Navbar } from "@/app/components/layout/Navbar";
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
    const router = useRouter();
    const { url, loginUser, userValid, userAuth, user } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false)

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
                setError("An unknown error occurred");
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center p-4 bg-background">
            <form onSubmit={handleLogin} className="w-full max-w-md">
                <Card className="shadow-lg bg-background border-border-color">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center text-text-primary">Iniciar sesión</CardTitle>
                        <CardDescription className="text-center text-text-secondary">
                            Ingresa tus credenciales para acceder
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-text-primary">
                                Correo electrónico
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="correo@ejemplo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-background border-border-color text-text-primary placeholder:text-text-secondary"
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-text-primary">
                                    Contraseña
                                </Label>
                                <Link href="/auth/forgot-password" className="text-sm text-accent-primary hover:text-accent-secondary transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="pr-10 bg-background border-border-color text-text-primary placeholder:text-text-secondary"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 text-text-secondary hover:text-text-primary"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-accent-primary hover:bg-accent-primary/90 text-white border-0">
                            Iniciar sesión
                        </Button>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-text-secondary">
                            ¿No tienes una cuenta?{" "}
                            <Link href="/auth/register" className="text-accent-primary hover:text-accent-secondary transition-colors">
                                Regístrate
                            </Link>
                        </p>
                    </CardFooter>
                    {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
                </Card>
            </form>
        </div>
        </>
    );
}
