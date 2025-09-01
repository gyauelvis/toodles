'use client';
import { createContext, useState } from "react";
import { FirestoreClass } from "@/utils/firebase/type";

type IsClassMemberContextType = {
  isClassMember: boolean;
  setIsClassMember: (value: boolean) => void;
};

type ClassDataContextType = {
  classData: FirestoreClass | null;
  setClassData: (value: FirestoreClass | null) => void;
};

export const IsClassMemberContext = createContext<IsClassMemberContextType | undefined>(undefined);
export const ClassDataContext = createContext<ClassDataContextType | undefined>(undefined);

export const IsClassMemberProvider = ({ children }: { children: React.ReactNode }) => {
  const [isClassMember, setIsClassMember] = useState(false);

  const value = {
    isClassMember,
    setIsClassMember,
  };

  return (
    <IsClassMemberContext.Provider value={value}>
      {children}
    </IsClassMemberContext.Provider>
  );
};

export const ClassDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [classData, setClassData] = useState<FirestoreClass | null>(null);

  const value = {
    classData,
    setClassData,
  };

  return (
    <ClassDataContext.Provider value={value}>
      {children}
    </ClassDataContext.Provider>
  );
};