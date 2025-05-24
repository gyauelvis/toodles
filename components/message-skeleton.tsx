export default function MessageSkeleton() {
    return (
        <div className="p-5 min-h-40 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-skeleton border animate-pulse border-border rounded-full"></div>
                <div className="bg-skeleton block w-24 h-2 animate-pulse rounded-full">
                </div>
            </div>
            <div className="text-sm text-foreground font-sans my-4">
                <div className="bg-skeleton block w-11/12 h-3 rounded-full mb-2 animate-pulse"></div>
                <div className="bg-skeleton block w-3/4 h-2 rounded-full mb-2 animate-pulse"></div>
                <div className="bg-skeleton block w-1/2 h-1.5 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center gap-3 pt-2 border-t border-border/30 justify-between"></div>
        </div>
    )
}