
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, Timestamp, addDoc, collection } from "firebase/firestore";
import { FirestoreClass, FirestoreMessage } from "@/utils/firebase/type";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
    measurementId: process.env.NEXT_PUBLIC_measurementId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

// export const createInitialClass = async (): Promise<void> => {
//     try {
//         const classData: FirestoreClass = {
//             name: "KNUST Computer Engineering 2025",
//             description: "Leave your mark before we part ways. No names, just vibes.",
//             isActive: true,
//             createdAt: Timestamp.now(),
//             settings: {
//                 maxMessageLength: 500,
//                 requireModeration: false,
//                 allowAnonymous: true
//             },
//             stats: {
//                 totalMessages: 0,
//                 totalMembers: 0
//             }
//         };

//         await setDoc(doc(db, 'classes', 'knust-comp-eng-2025'), classData);
//         console.log('✅ Class document created successfully');
//     } catch (error) {
//         console.error('❌ Error creating class document:', error);
//         throw error;
//     }
// };


export const createSampleMessages = async (): Promise<void> => {
    try {
        const sampleMessages: FirestoreMessage[] = [
            {
                message: "Can't believe we're finally graduating! These last 4 years flew by so fast. Remember when we all got lost during freshman orientation? Good times. 💯",
                likes: 14,
                dislikes: 2,
                senderName: 'Ratata',
                classId: 'knust-comp-eng-2025',
                isActive: true,
                createdAt: Timestamp.now(),
            },
            {
                message: "Shoutout to Prof. Garcia for making calculus bearable with his dad jokes. \"What did the zero say to the eight? Nice belt!\" Still makes me laugh. 😂",
                likes: 27,
                dislikes: 0,
                senderName: 'El Rata 12',
                classId: 'knust-comp-eng-2025',
                isActive: true,
                createdAt: Timestamp.now(),
            },
            {
                message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit, exercitationem quo, delectus recusandae sapiente accusantium id blanditiis dolorib',
                likes: 18,
                dislikes: 1,
                senderName: 'Elvis',
                classId: 'knust-comp-eng-2025',
                isActive: true,
                createdAt: Timestamp.now(),
            }
        ];

        const promises = sampleMessages.map(message =>
            addDoc(collection(db, 'messages'), message)
        );

        await Promise.all(promises);
        console.log('✅ Sample messages created successfully');
    } catch (error) {
        console.error('❌ Error creating sample messages:', error);
        throw error;
    }
};


// export const createSampleVotes = async (): Promise<void> => {
//     try {
//         const sampleVotes = [
//             {
//                 userId: 'anonymous_user_001',
//                 messageId: 'sample_message_1',
//                 voteType: 'like' as const,
//                 votedAt: Timestamp.now()
//             },
//             {
//                 userId: 'anonymous_user_002',
//                 messageId: 'sample_message_1',
//                 voteType: 'dislike' as const,
//                 votedAt: Timestamp.now()
//             }
//         ];

//         const promises = sampleVotes.map(vote =>
//             setDoc(doc(db, 'userVotes', `${vote.userId}_${vote.messageId}`), vote)
//         );

//         await Promise.all(promises);
//         console.log('✅ Sample votes created successfully');
//     } catch (error) {
//         console.error('❌ Error creating sample votes:', error);
//         throw error;
//     }
// };
