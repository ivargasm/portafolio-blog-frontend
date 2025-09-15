import { Github, Linkedin } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="py-8 mt-16 border-t border-border-color">
            <div className="container mx-auto px-4 text-center text-text-secondary flex justify-around">

                {/* Enlaces a Redes Sociales */}
                <div className="flex justify-center space-x-6 mb-4">
                    <a
                        href="https://github.com/ivargasm"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Perfil de GitHub"
                        className="text-text-secondary hover:text-accent-primary transition-colors"
                    >
                        <Github size={24} />
                    </a>
                    <a
                        href="https://linkedin.com/in/ismael-vargas-martinez-47a618195"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Perfil de LinkedIn"
                        className="text-text-secondary hover:text-accent-primary transition-colors"
                    >
                        <Linkedin size={24} />
                    </a>
                </div>

                <p className="text-sm">&copy; {currentYear} Ismael Vargas M. Todos los derechos reservados.</p>

            </div>
        </footer>
    );
};