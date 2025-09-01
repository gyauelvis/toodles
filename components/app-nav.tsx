
export const AppNav = ({ name = "COE25" }: { name: string }) => {
    return (
        <header className="flex items-center justify-center border-b border-border border-dashed">
            <nav className="flex items-center w-full max-w-3xl font-space-grotesk justify-between p-4">
                <a href="#" className="relative w-8 h-8">
                    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-accent size-3">
                        <path d="M18 2L33 10L18 18L3 10L18 2Z" fill="currentColor" />
                        <path d="M9 22V14L18 18L27 14V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M18 18V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M18 28L13 33H23L18 28Z" fill="currentColor" />
                    </svg>
                </a>
                <div className="text-lg font-bold ">{name}</div>
            </nav>
        </header>
    );
}