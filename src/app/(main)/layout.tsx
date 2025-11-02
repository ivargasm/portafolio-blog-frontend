import {Navbar} from '@/app/components/layout/Navbar';
import { Footer } from '@/app/components/layout/Footer';

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow container mx-auto max-w-5xl px-4 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
}