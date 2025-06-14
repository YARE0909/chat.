"use client";
import { getUserToken } from "@/lib/utils";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import jwt from "jsonwebtoken";

interface UserContextValue {
  inAudioCall: boolean;
  inVideoCall: boolean;
  startAudioCall: () => void;
  endAudioCall: () => void;
  startVideoCall: () => void;
  endVideoCall: () => void;
  dmList: {
    chatId: number;
    title: string;
  }[];
  updateDmList: (
    list: {
      chatId: number;
      title: string;
    }[]
  ) => void;
  activeDm:
    | {
        chatId: number;
        title: string;
      }
    | undefined;
  updateCurrentDm: (user: { chatId: number; title: string }) => void;
  user: { id: number; email: string } | null;
  updateUser: () => void;
  // ...add more shared state/actions here
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const [inAudioCall, setInAudioCall] = useState(false);
  const [inVideoCall, setInVideoCall] = useState(false);
  const [dmList, setDmList] = useState<
    {
      chatId: number;
      title: string;
    }[]
  >([]);
  const [activeDm, setActiveDm] = useState<
    | {
        chatId: number;
        title: string;
      }
    | undefined
  >();

  const startAudioCall = useCallback(() => setInAudioCall(true), []);
  const endAudioCall = useCallback(() => setInAudioCall(false), []);
  const startVideoCall = useCallback(() => setInVideoCall(true), []);
  const endVideoCall = useCallback(() => setInVideoCall(false), []);

  const updateUser = useCallback(async () => {
    const token = await getUserToken();

    if (!token) return;
    const decoded: any = jwt.decode(token);
    const { id, email } = decoded;
    setUser({ id, email });
  }, []);

  const updateDmList = useCallback(
    (
      list: {
        chatId: number;
        title: string;
      }[]
    ) => setDmList(list),
    []
  );

  const updateCurrentDm = useCallback(
    (user: { chatId: number; title: string }) => setActiveDm(user),
    []
  );

  return (
    <UserContext.Provider
      value={{
        inAudioCall,
        inVideoCall,
        startAudioCall,
        endAudioCall,
        startVideoCall,
        endVideoCall,
        dmList,
        updateDmList,
        activeDm,
        updateCurrentDm,
        user,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
}
