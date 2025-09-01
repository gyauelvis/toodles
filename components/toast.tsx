import { useEffect, useState } from 'react';

export const Toast = ({
    message,
    type = 'success',
    isVisible,
    onClose,
    loading = false,
    duration = 3000
}: {
    message: string;
    type?: 'success' | 'error' | 'info' | 'warning' | 'loading';
    isVisible: boolean;
    onClose: () => void;
    loading?: boolean;
    duration?: number;
}) => {
    const [shouldRender, setShouldRender] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
            setIsAnimatingOut(false);
        } else if (shouldRender) {
            setIsAnimatingOut(true);
            const timer = setTimeout(() => setShouldRender(false), 400);
            return () => clearTimeout(timer);
        }
    }, [isVisible, shouldRender]);

    useEffect(() => {
        if (isVisible && !loading && type !== 'loading') {
            const timer = setTimeout(() => {
                setIsAnimatingOut(true);
                setTimeout(onClose, 400);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose, loading, type, duration]);

    if (!shouldRender) return null;

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️',
        warning: '⚠️',
        loading: null
    };

    const LoadingSpinner = () => (
        <div className="relative">
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-5 h-5 border border-white/10 rounded-full animate-pulse"></div>
        </div>
    );

    const isLoadingType = type === 'loading' || loading;

    const handleClose = () => {
        setIsAnimatingOut(true);
        setTimeout(onClose, 400);
    };

    return (
        <div
            className={`
                fixed top-20 right-0 transform md:-translate-x-1/2 
                bg-accent/10 border border-accent/20 text-white 
                py-4 rounded-full shadow-2xl z-50 
                backdrop-blur-sm
                flex items-center gap-3 min-w-80 max-w-md
                h-10 font-unbounded px-2 text-xs
                transition-all duration-400 ease-out
                ${isAnimatingOut 
                    ? 'opacity-0 translate-y-2 scale-95' 
                    : 'opacity-100 translate-y-0 scale-100'
                }
                ${!isAnimatingOut && shouldRender 
                    ? 'animate-in slide-in-from-top-4 fade-in duration-500 ease-out' 
                    : ''
                }
                hover:scale-105 hover:shadow-3xl
                before:absolute before:inset-0 before:rounded-full 
                before:bg-gradient-to-r before:from-white/5 before:via-transparent before:to-white/5
                before:opacity-0 before:transition-opacity before:duration-300
                hover:before:opacity-100
                group
            `}
        >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className={`
                text-xl font-bold flex items-center transition-all duration-300
                ${isLoadingType ? '' : 'group-hover:scale-110'}
            `}>
                {isLoadingType ? <LoadingSpinner /> : (
                    <span className="animate-in zoom-in duration-300 delay-100">
                        {icons[type]}
                    </span>
                )}
            </div>
        
            <div className="flex-1 font-medium animate-in slide-in-from-left-2 duration-400 delay-200">
                {message}
            </div>
        
            {!isLoadingType && (
                <button
                    onClick={handleClose}
                    className={`
                        ml-2 text-white/60 hover:text-white transition-all 
                        group-hover:scale-110 hover:rotate-90
                        animate-in fade-in duration-400 delay-300
                        relative overflow-hidden
                        before:absolute before:inset-0 before:rounded-full
                        before:bg-white/10 before:scale-0 before:transition-transform before:duration-300
                        hover:before:scale-100
                    `}
                    aria-label="Close toast"
                >
                    <span className="relative z-10 text-xs font-bold">✕</span>
                </button>
            )}
            
            {!isLoadingType && isVisible && (
                <div className="absolute bottom-0 left-0 h-0.5 bg-white/20 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-gradient-to-r from-white/40 to-white/80 rounded-full animate-progress"
                        style={{
                            animation: `progress ${duration}ms linear`
                        }}
                    ></div>
                </div>
            )}
            
            <style jsx>{`
                @keyframes progress {
                    from { width: 100%; }
                    to { width: 0%; }
                }
            `}</style>
        </div>
    );
};