'use client';

import { AppNav } from "@/components/app-nav";
import { useState, useEffect, useContext } from "react";
import { generateRandomName } from "@/utils/random-name";
import AnnonymousMessage from "@/components/message";
import ZeroMessages from "@/components/zero-messages";
import MessageSkeleton from "@/components/message-skeleton";
import { IsClassMemberContext, ClassDataContext } from "@/context";
import { useRouter } from "next/navigation";
import { getMessagesForClass } from "@/utils/firebase/firebase";
import { FirestoreMessage } from "@/utils/firebase/type";
import { Timestamp } from "firebase/firestore";
import { addMessage } from "@/utils/firebase/firebase";
import { Toast } from "@/components/toast";

export default function Home() {
  const [message, setMessage] = useState('');
  const [sort, setSort] = useState('latest');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isClassMember } = useContext(IsClassMemberContext)!;
  const { classData } = useContext(ClassDataContext)!;
  const [classMessages, setClassMessages] = useState<(FirestoreMessage)[]>([]);
  const [showToast, setShowToast] = useState({
    show: false, message: 'Message sent successfully!',
    type: 'success'
  });


  useEffect(() => {
    const fetchMessages = async () => {
      if (!classData) return;
      setIsLoading(true);
      try {
        const messages = await getMessagesForClass(classData.id);
        setClassMessages(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [classData]);

  const sortByLatest = () => {
    setSort('latest');
    const messageListAlt = [...classMessages];
    const filteredMessages = messageListAlt.sort((a, b) => b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime());
    setClassMessages(filteredMessages);
  }

  const sortByPopular = () => {
    setSort('popular');
    const messageListAlt = [...classMessages];
    const filteredMessages = messageListAlt.sort((a, b) => b.likes - a.likes);
    setClassMessages(filteredMessages);
  }


  useEffect(() => {
    console.log('triggered');
    if (sort === 'latest') sortByLatest();
    else if (sort === 'popular') sortByPopular();
  }, [sort])


  const sendMessage = async () => {
    const randomWord = generateRandomName();
    const messageData: FirestoreMessage = {
      message: message,
      likes: 0,
      createdAt: Timestamp.now(),
      dislikes: 0,
      senderName: randomWord,
      classId: classData!.id,
      id: '',
      isActive: true,
    }
    try {
      setShowToast({
        show: true, message: 'Sending message...',
        type: 'loading'
      });
      const sent = await addMessage(messageData);
      if (sent) {
        setShowToast({
          show: true, message: 'Message sent successfully!',
          type: 'success'
        });
        setMessage('');
        setClassMessages(prevMessages => [messageData, ...prevMessages]);
      }
    } catch (error) {
      setShowToast({ type: 'error', message: 'Error sending message', show: true });
      console.error('Error sending message:', error);
    }
  }

  useEffect(() => {
    const fxn = () => {
      if (!isClassMember && !sessionStorage.getItem('isClassMember')) {
        router.push('/landing');
        return <></>
      }
    }
    fxn();
  }, [isClassMember]);

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-background to-background/90">
      {classData ? <AppNav name={classData.name} /> : (
        <div className="flex items-center justify-center w-full h-16 border-b border-border/50 bg-background/80 backdrop-blur-lg">
          {/* <div className="h-6 w-32 bg-border/50 rounded-full animate-pulse"></div> */}
        </div>
      )}
      <div className="w-full py-6 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full flex flex-col items-center px-4">

          <h1 className="text-2xl md:text-3xl font-bold font-space-grotesk text-center mb-1">Last Words</h1>
          <p className="text-foreground-muted text-center text-sm max-w-md mb-6">Leave your mark before we part ways. No names, just vibes.</p>
        </div>
      </div>

      <main className="flex flex-col items-center justify-center p-4">
        <section className="flex flex-col w-full max-w-2xl p-5 gap-4 border border-border/50 rounded-xl mb-6 bg-background/50 backdrop-blur-sm shadow-sm">
          <div className="text-xs text-foreground-muted font-space-grotesk flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            Your identity is completely <span className="font-bold text-accent">anonymous.</span>
          </div>

          <textarea
            placeholder="What do you have to say before we part ways? 🤔 ✨"
            name="message"
            value={message.length > 500 ? message.slice(0, 500) : message}
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            className="w-full focus:border-accent focus:ring-1 focus:ring-accent/30 focus:outline-0 transition-all p-4 text-foreground text-sm border border-border/70 rounded-lg h-32 bg-background/20 placeholder:text-foreground-muted/70"
          ></textarea>

          <div className="flex items-center justify-between">
            <div className={`text-sm ${message.length > 500 ? 'text-red-500' : 'text-foreground-muted'} font-space-grotesk flex items-center gap-1`}>
              <span>{message.length > 500 ? 501 : message.length}</span>
              <span className="text-xs opacity-60">/</span>
              <span className="text-xs opacity-60">500</span>
            </div>

            <button onClick={() => sendMessage()} disabled={message.length <= 5} className="px-6 disabled:cursor-not-allowed disabled:opacity-20 disabled:hover:scale-100 py-2 text-sm font-bold text-background font-space-grotesk bg-accent hover:bg-accent/90 rounded-full cursor-pointer transition-all transform hover:scale-105 active:scale-95 flex items-center gap-1">
              Send
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </section>

        <div className="w-full max-w-2xl mb-4 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <button onClick={() => setSort('latest')} className={`text-xs px-3 cursor-pointer py-1 rounded-full ${sort === 'latest' ? 'border border-border' : ''} text-foreground-muted hover:text-foreground transition-colors"`}>
              Latest
            </button>
            <button onClick={() => setSort('popular')} className={`text-xs px-3 cursor-pointer py-1 rounded-full ${sort === 'popular' ? 'border border-border' : ''} text-foreground-muted hover:text-foreground transition-colors`}>
              Popular
            </button>
          </div>

          <div className="text-xs text-foreground-muted">
            {classMessages.length} messages
          </div>
        </div>


        <section className="flex flex-col w-full max-w-2xl gap-4">
          {
            isLoading ? (
              [1, 2, 3].map((_, index) => (
                <MessageSkeleton key={index} />
              ))) : !isLoading && classMessages.length <= 0 ? (
                <ZeroMessages />
              ) : (
              classMessages.map((message, index) => (
                <AnnonymousMessage key={index + message.id} prop={message} />
              ))
            )
          }
        </section>
        {showToast.show && <Toast isVisible={showToast.show} type={showToast.type as "success" | "loading" | "error" | "info" | "warning" | undefined} message={showToast.message} onClose={() => setShowToast({ ...showToast, show: false })} />}
      </main>
      <footer className="flex items-center justify-center w-full bg-background/50 backdrop-blur-sm border-t border-dashed border-border/50">
        <div className="w-full max-w-2xl flex gap-2 flex-col items-center justify-between px-4 py-2 border-border/50">
          <div className="text-xs text-foreground-muted flex items-center justify-center text-center w-full">
            Made with ❤️ by <a href="https://x.com/gyauboahen" target="_blank" className="text-accent hover:text-accent/80 transition-colors px-1 underline">G.ELVIS</a>
          </div>
          <div className="text-xs text-foreground-muted">
            KNUST Computer Engineering 2025
          </div>
        </div>
      </footer>
    </div>
  );
}