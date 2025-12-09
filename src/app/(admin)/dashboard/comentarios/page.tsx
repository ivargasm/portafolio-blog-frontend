import { Metadata } from 'next';
import CommentsManagement from '../../components/CommentsManagement';

export const metadata: Metadata = {
    title: 'Gestión de Comentarios | Dashboard',
    description: 'Administra los comentarios de tu blog',
};

export default function CommentsPage() {
    return <CommentsManagement />;
}
