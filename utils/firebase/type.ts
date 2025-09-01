import { Timestamp } from "firebase/firestore";

export interface MessagType {
    id: string;
    message: string;
    likes: number;
    dislikes: number;
    createdAt: string;
    senderName: string;
}

export interface FirestoreMessage {
    id: string;
    message: string;
    likes: number;
    dislikes: number;
    senderName: string;
    classId: string;
    isActive: boolean;
    createdAt: Timestamp;
}

export interface FirestoreUserVote {
    userId: string;
    messageId: string;
    voteType: 'like' | 'dislike';
    votedAt: Timestamp; 
}

export interface FirestoreClass {
    name: string;
    id: string;
    description: string;
    isActive: boolean;
    createdAt: Timestamp;
    code: string;
    settings: {
        maxMessageLength: number;
        requireModeration: boolean;
        allowAnonymous: boolean;
    };
    stats: {
        totalMessages: number;
        totalMembers: number;
    };
}
