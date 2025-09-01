'use client';
import { FirestoreMessage } from "@/utils/firebase/type";
import { useState } from "react";
import Image from "next/image";

export default function AnnonymousMessage({ prop }: { prop: FirestoreMessage }) {
    const [isLike, setIsLike] = useState(false);
    const [isDislike, setIsDislikes] = useState(false);
    const [likes, setLikes] = useState(prop.likes);
    const [dislikes, setDislikes] = useState(prop.dislikes);

    const likefxn = () => {
        if (isLike) {
            setIsLike(false);
            setLikes(likes - 1);
        } else {
            setIsLike(true);
            setLikes(likes + 1);
        }
        if (isDislike) {
            setIsDislikes(false);
            setDislikes(dislikes - 1);
        }
    }

    const dislikefxn = () => {
        if (isDislike) {
            setIsDislikes(false);
            setDislikes(dislikes - 1);
        } else {
            setIsDislikes(true);
            setDislikes(dislikes + 1);
        }

        if (isLike) {
            setIsLike(false);
            setLikes(likes - 1);
        }
    }

    return (
        <div className="p-5 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="relative aspect-square flex items-center justify-center w-8 h-8 bg-accent/10 border border-accent/20 rounded-full overflow-hidden">
                        <Image alt="" src={`/avatar/${Math.floor(((prop.likes + prop.dislikes + Math.random()) % 10))}.png`} width={32} height={32} className="w-5 h-5 object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-sm font-medium font-space-grotesk">{prop.senderName}</div>
                    </div>
                </div>

                <a href="#" className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/10 text-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-square-arrow-up-right-icon lucide-square-arrow-up-right"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M8 8h8v8" /><path d="m8 16 8-8" /></svg>
                    </span>
                </a>
            </div>

            <div className="text-sm text-foreground font-sans mb-4">
                {prop.message}
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-border/30 justify-between">
                <button onClick={() => likefxn()} className={`text-xs flex items-center gap-1 ${!isLike ? 'text-foreground-muted' : 'font-black text-foreground'} hover:text-accent transition-colors`}>
                    <span>👍</span>
                    <span>{likes}</span>
                </button>
                <button onClick={() => dislikefxn()} className={`text-xs flex items-center gap-1 ${!isDislike ? 'text-foreground-muted' : 'font-black text-foreground'} hover:text-accent transition-colors`}>
                    <span>👎</span>
                    <span>{dislikes}</span>
                </button>
            </div>
        </div>
    )
}