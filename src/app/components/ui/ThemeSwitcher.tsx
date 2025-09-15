'use client'; 

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { Button } from "@/components/ui/button";

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Evita el "hydration mismatch"
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Cambiar tema"
            className='cursor-pointer'
        >
            {theme === 'dark' ? (
                <SunIcon className="w-6 h-6 text-accent-primary cursor-pointer" />
            ) : (
                <MoonIcon className="w-6 h-6 text-accent-primary cursor-pointer" />
            )}
        </Button>
    );
};