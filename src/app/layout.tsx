// app/layout.tsx
import { Manrope, Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './theme-provider';
import { Toaster } from 'react-hot-toast';
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  title: 'Ismael Vargas - Ingeniero de Datos y LegalTech',
  description: 'Portafolio de Ismael Vargas, conectando tecnología y derecho.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#374151',
                color: '#E2E8F0',
              },
            }}
          />
          {children}
          <Analytics/>
        </ThemeProvider>
      </body>
    </html>
  );
}