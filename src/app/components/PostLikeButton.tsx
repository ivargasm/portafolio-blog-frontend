'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { togglePostLike, getPostLikeStats } from '@/app/lib/api';
import { API_URL } from '@/app/lib/constants';

interface PostLikeButtonProps {
    postId: number;
}

export default function PostLikeButton({ postId }: PostLikeButtonProps) {
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Cargar estadísticas iniciales
    useEffect(() => {
        const loadStats = async () => {
            try {
                const stats = await getPostLikeStats(postId, API_URL);
                setLikes(stats.total_likes);
                setHasLiked(stats.user_has_liked);
            } catch (error) {
                console.error('Error al cargar estadísticas de likes:', error);
            }
        };

        loadStats();
    }, [postId]);

    const handleLikeClick = async () => {
        if (isLoading) return;

        setIsLoading(true);
        setIsAnimating(true);

        // Actualización optimista de la UI
        const previousLikes = likes;
        const previousHasLiked = hasLiked;

        setHasLiked(!hasLiked);
        setLikes(hasLiked ? likes - 1 : likes + 1);

        try {
            await togglePostLike(postId, API_URL);

            // Recargar estadísticas para asegurar sincronización
            const stats = await getPostLikeStats(postId, API_URL);
            setLikes(stats.total_likes);
            setHasLiked(stats.user_has_liked);
        } catch (error) {
            console.error('Error al procesar like:', error);
            // Revertir cambios en caso de error
            setLikes(previousLikes);
            setHasLiked(previousHasLiked);
        } finally {
            setIsLoading(false);
            setTimeout(() => setIsAnimating(false), 300);
        }
    };

    return (
        <button
            onClick={handleLikeClick}
            disabled={isLoading}
            className={`
        flex items-center gap-2 px-4 py-2 rounded-full
        transition-all duration-200 ease-in-out
        ${hasLiked
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isAnimating ? 'scale-110' : 'scale-100'}
      `}
            aria-label={hasLiked ? 'Quitar like' : 'Dar like'}
        >
            <Heart
                className={`
          w-5 h-5 transition-all duration-200
          ${hasLiked ? 'fill-current' : ''}
          ${isAnimating ? 'animate-pulse' : ''}
        `}
            />
            <span className="font-medium text-sm">
                {likes} {likes === 1 ? 'like' : 'likes'}
            </span>
        </button>
    );
}
