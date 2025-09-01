'use client';
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { Toast } from '@/components/toast';
import { compare } from '@/utils/hash-compare';
import { getClass } from '@/utils/firebase/firebase';
import { IsClassMemberContext, ClassDataContext } from '@/context';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [classCodes, setClassCodes] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const { isClassMember, setIsClassMember } = useContext(IsClassMemberContext)!;
  const [toastType, setToastType] = useState<"success" | "error" | "loading" | "info" | "warning" | undefined>('loading');
  const [toastMessage, setToastMessage] = useState('Class code complete! Redirecting...');
  const { setClassData } = useContext(ClassDataContext)!;
  const router = useRouter();

  const handleCodeChange = (index: number, value: string): void => {
    if (value.length <= 1 && /^[A-Z0-9]*$/.test(value)) {
      const newCodes = [...classCodes];
      newCodes[index] = value.toUpperCase();
      setClassCodes(newCodes);
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  useEffect(() => {
    if (isClassMember) router.push('/');
  }, []);


  interface HandleKeyDownEvent {
    key: string;
  }

  const handleKeyDown = (index: number, e: HandleKeyDownEvent): void => {
    if (e.key === 'Backspace' && !classCodes[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const getAllClass = async (code: string) => {
    const classV = await getClass();
    if (classV && classV.code) {
      const isMember = await compare(code, classV?.code);
      if (isMember) {
        setIsClassMember(true);
        setClassData(classV);
        setToastType('success');
        setToastMessage('Class code verified! Redirecting...');
        sessionStorage.setItem('isClassMember', 'true');
        sessionStorage.setItem('classData', JSON.stringify(classV));
        setTimeout(() => { }, 500);
        router.push('/');
      }
      else console.log('Not authorized')
    } else console.log('failed to fetch')

  }


  useEffect(() => {
    setIsCodeComplete(classCodes.every(code => code !== ''));
    const fetchData = async () => {
      const code = classCodes.join('');
      await getAllClass(code);
    }

    if (classCodes.every(code => code !== '')) fetchData();

  }, [classCodes]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen font-sans">
        <header className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border/50 z-20">
          <nav className="flex items-center justify-between max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-accent to-accent/70 rounded-xl flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white">
                  <path d="M18 2L33 10L18 18L3 10L18 2Z" fill="currentColor" />
                  <path d="M9 22V14L18 18L27 14V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M18 18V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M18 28L13 33H23L18 28Z" fill="currentColor" />
                </svg>
              </div>
              <div className="text-xl font-unbounded font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Toodles
              </div>
            </div>
            <div className="text-sm font-medium text-foreground-muted">COE25</div>
          </nav>
        </header>

        <main className="flex flex-col items-start w-full max-w-4xl px-6 py-20 mt-16">
          <div className="mb-8 flex items-start justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-sm font-medium text-accent shadow-sm">
              <span className="text-base">🤫</span>
              <span className="italic font-medium">Wɔn shouti</span>
              <div className="w-2 h-2 bg-accent/60 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="mb-12 space-y-6">
            <h1 className="text-4xl bg-gradient-to-b from-accent to-white bg-clip-text text-transparent font-bold leading-tight font-unbounded">
              Spill It All, Class of '{new Date().getFullYear().toString().slice(2)}!
            </h1>

            <p className="text-foreground-muted mt-4 font-sans max-w-md leading-relaxed">
              As we stand on the brink of new beginnings, let's take a moment to share our final thoughts, memories, and dreams. This is your space to leave a lasting mark, a piece of your journey with the class of {new Date().getFullYear()}. No names, just vibes. Let's make it unforgettable.
            </p>
          </div>

          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-sm font-medium text-green-600 dark:text-green-400 mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Join Class
            </div>
            <h2 className="text-xl font-semibold text-foreground">Enter Class Code</h2>
          </div>

          <div className="flex gap-3 mb-6 justify-center">
            {classCodes.map((code, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                value={code}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                className={`
                      w-14 h-14 text-2xl font-bold text-center bg-background border-2 rounded-xl
                      transition-all duration-200 focus:outline-none focus:scale-105
                      ${focusedIndex === index ? 'border-accent shadow-lg shadow-accent/20' : 'border-border hover:border-accent/50'}
                      ${code ? 'bg-accent/5' : ''}
                    `}
                maxLength={1}
                placeholder="•"
              />
            ))}
          </div>

          <div className='flex flex-col md:flex-row gap-6 md:gap-12 w-full justify-center items-center'>
            <Image
              src="/landing/coe.webp"
              alt="Class Image"
              width={400}
              height={300}
              className={`rounded-xl w-full aspect-auto grayscale hover:grayscale-0 h-full shadow-lg transition duration-300 ${isHovered ? 'scale-105 shadow-2xl' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />


          </div>
        </main>
        <footer className="mt-auto py-6 text-center text-sm text-foreground-muted">
          <p>Made with 💝 for the Class of {new Date().getFullYear()}</p>
        </footer>

        <Toast
          message={toastMessage}
          type={toastType}
          isVisible={isCodeComplete}
          onClose={() => setIsCodeComplete(false)}
        />
      </div>
    </div>
  );
}