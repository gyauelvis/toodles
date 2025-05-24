export default function ZeroMessages() {
    return (
        <div className="flex items-center justify-center h-64 font-space-grotesk">
            <div className="text-center p-10 border border-border/50 w-full rounded-xl bg-background/50 backdrop-blur-sm transition-all hover:shadow-md">
                <h1 className="text-2xl flex items-center justify-center gap-2 font-bold mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-off-icon lucide-circle-off text-accent"><path d="m2 2 20 20" /><path d="M8.35 2.69A10 10 0 0 1 21.3 15.65" /><path d="M19.08 19.08A10 10 0 1 1 4.92 4.92" /></svg>
                    <span>No Messages Yet</span>
                </h1>
                <p className="text-sm text-foreground-muted font-sans">Be the first to send a message to your graduating class!</p>
            </div>
        </div>
    )
}