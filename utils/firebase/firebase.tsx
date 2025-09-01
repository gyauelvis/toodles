
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, Timestamp, addDoc, collection, getDoc, getDocs, query, where, DocumentData } from "firebase/firestore";
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


export const getClass = async () => {
    try {
        const classDoc = await getDoc(doc(db, 'classes', 'knust-comp-eng-2025'));
        if (classDoc.exists()) {
            return classDoc.data() as FirestoreClass;
        } else {
            console.log('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error getting document:', error);
        throw error;
    }

}

export const getMessagesForClass = async (classId: string): Promise<(FirestoreMessage & { id: string })[]> => {
    try {
        const messagesRef = collection(db, 'messages');
        const q = query(messagesRef, where("classId", "==", classId), where("isActive", "==", true));
        const querySnapshot = await getDocs(q);
        const messages: (FirestoreMessage & { id: string })[] = [];
        querySnapshot.forEach((doc) => {
            messages.push({ id: doc.id, ...(doc.data()) } as FirestoreMessage);
        });
        return messages;
    } catch (error) {
        console.error('Error getting messages:', error);
        throw error;
    }
}


export const addMessage = async (message: FirestoreMessage): Promise<boolean> => {
    try {
        await addDoc(collection(db, 'messages'), message);
        return true;
    } catch (error) {
        console.error('❌ Error adding message:', error);
        throw error;
    }
}


export const getClassByCode = async (code: string) => {
    const classesRef = collection(db, 'classes');
    const q = query(classesRef, where("code", "==", code));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    const dataFetched: DocumentData = []
    querySnapshot.forEach(doc => {
        dataFetched.push(doc.data)
    })
    console.log(dataFetched)
    return dataFetched.length > 0 && dataFetched[1]
}





// export const getAllMessages = async (): Promise<FirestoreMessage[]> => {
//     try {
//         const messagesSnapshot = await getDoc(doc(db, 'classes', 'knust-comp-eng-2025'));
//         if (messagesSnapshot.exists()) {
//             const messages = messagesSnapshot.data() as FirestoreMessage[];
//             return messages;
//         } else {
//             console.log('No messages found!');
//             return [];
//         }
//     } catch (error) {
//         console.error('Error getting messages:', error);
//         throw error;
//     }
// }
