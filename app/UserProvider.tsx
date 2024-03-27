"use client";

import React, { createContext, useContext, useState } from "react";

interface UserContextType {
  username?: string;
  setUsername: (username: string) => void;
  quizCompleted: boolean;
  quizSelected: number | undefined;
  setQuizSelected: (quizId: number | undefined) => void;
  quizzesCompletion: Record<number, number>;
  addQuizScore: (quizId: number, score: number) => void
}

const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [username, setUsername] = useState<string>();
  const [quizCompleted] = useState<boolean>(false);
  const [quizSelected, setQuizSelected] = useState<number>()
  const [quizzesCompletion, setQuizzesCompletion] = useState<Record<number, number>>({})

  const addQuizScore = (quizId: number, score: number) => {
    setQuizzesCompletion((prevQuizzesCompletion) => ({
      ...prevQuizzesCompletion,
      [quizId]: score,
    }));
  }

  const value = { username, setUsername, quizCompleted, quizSelected, setQuizSelected, quizzesCompletion, addQuizScore };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error("UserContext not found");
  }

  return context as UserContextType;
};

export default UserContextProvider;