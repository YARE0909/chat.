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
  // ...add more shared state/actions here
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [inAudioCall, setInAudioCall] = useState(false);
  const [inVideoCall, setInVideoCall] = useState(false);

  const startAudioCall = useCallback(() => setInAudioCall(true), []);
  const endAudioCall = useCallback(() => setInAudioCall(false), []);
  const startVideoCall = useCallback(() => setInVideoCall(true), []);
  const endVideoCall = useCallback(() => setInVideoCall(false), []);

  return (
    <UserContext.Provider
      value={{
        inAudioCall,
        inVideoCall,
        startAudioCall,
        endAudioCall,
        startVideoCall,
        endVideoCall,
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
