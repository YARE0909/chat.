"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface UserContextValue {
  inAudioCall: boolean;
  inVideoCall: boolean;
  startAudioCall: () => void;
  endAudioCall: () => void;
  startVideoCall: () => void;
  endVideoCall: () => void;
  dmList: {
    userId: number;
    userName: string;
  }[];
  updateDmList: (
    list: {
      userId: number;
      userName: string;
    }[]
  ) => void;
  activeDm: {
    userId: number;
    userName: string;
  } | undefined;
  updateCurrentDm: (user: { userId: number; userName: string }) => void;
  // ...add more shared state/actions here
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [inAudioCall, setInAudioCall] = useState(false);
  const [inVideoCall, setInVideoCall] = useState(false);
  const [dmList, setDmList] = useState<
    {
      userId: number;
      userName: string;
    }[]
  >([
    { userId: 0, userName: "John Doe" },
    { userId: 1, userName: "Bob" },
    { userId: 2, userName: "Charlie" },
    { userId: 3, userName: "Dana" },
    { userId: 4, userName: "Jack" },
  ]);
  const [activeDm, setActiveDm] = useState<
    | {
        userId: number;
        userName: string;
      }
    | undefined
  >();

  const startAudioCall = useCallback(() => setInAudioCall(true), []);
  const endAudioCall = useCallback(() => setInAudioCall(false), []);
  const startVideoCall = useCallback(() => setInVideoCall(true), []);
  const endVideoCall = useCallback(() => setInVideoCall(false), []);

  const updateDmList = useCallback(
    (
      list: {
        userId: number;
        userName: string;
      }[]
    ) => setDmList(list),
    []
  );
  const updateCurrentDm = useCallback(
    (user: { userId: number; userName: string }) => setActiveDm(user),
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
