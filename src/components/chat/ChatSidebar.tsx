"use client";
import { Search, UserPlus, FilterIcon, LogOut, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../common/Button";
import AudioCall from "./AudioCall";
import { useUser } from "@/context/UserContext";
import UserIcon from "./UserIcon";
import { logout } from "@/actions/authentication/logout";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSocket } from "@/context/SocketContext";
import { getUserToken } from "@/lib/utils";
import jwt from "jsonwebtoken";
import Modal from "../common/Modal";
import { Input } from "../common/Input";
import CreateModalChat from "./CreateChatModal";

export function ChatSidebar() {
  const [createChatModal, setCreateChatModal] = useState<boolean>(false);
  const [createChatValue, setCreateChatValue] = useState<string>("");

  const { inAudioCall, dmList, activeDm, updateCurrentDm, updateDmList } =
    useUser();

  const router = useRouter();

  const { socket, disconnectSocket } = useSocket();

  const logUserOut = async () => {
    const res = await logout();

    if (res.status === "success") {
      disconnectSocket();
      router.push("/");
      toast.success("Logged Out Successfully");
    } else {
      toast.error("Something Went Wrong");
    }
  };

  const loadChat = async () => {
    const token = await getUserToken();
    if (token) {
      const decoded: any = jwt.decode(token);
      const { id } = decoded;
      socket?.emit("load-chat-list", id);
    }
  };

  const createChat = async (userId: number) => {
    const token = await getUserToken();
    if (token) {
      const decoded: any = jwt.decode(token);
      const { id } = decoded;
      socket?.emit("create-chat", {
        creatorId: Number(id),
        memberIds: [Number(userId)],
        type: "DM",
      });
      setCreateChatModal(false);
    }
  };

  useEffect(() => {
    loadChat();
  }, [socket]);

  socket?.on("chat-list", (data) => {
    updateDmList(data.data);
    console.log({ data });
  });

  return (
    <aside className="w-72 bg-white/10 backdrop-blur-md text-white flex flex-col gap-4">
      {/* Header */}
      <div className="w-full h-16 p-4 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-wide">chat.</h2>
        </div>
        <div>
          <Button icon={LogOut} onClick={logUserOut} />
        </div>
      </div>
      <div className="flex items-center gap-2 px-2">
        <Button icon={Search} />

        <Button icon={UserPlus} onClick={() => setCreateChatModal(true)} />

        <Button icon={FilterIcon} />
      </div>
      {/* Contact List */}
      <ul className="flex-1 overflow-y-auto flex flex-col gap-2 px-2">
        {dmList.map((name) => {
          const isActive = name?.chatId === activeDm?.chatId;
          return (
            <li
              key={name.chatId}
              className={`flex items-center gap-3 px-4 py-1 cursor-pointer rounded-lg transition-all backdrop-blur-md
                ${isActive ? "bg-white/10" : "hover:bg-white/10"}
              `}
              onClick={() => updateCurrentDm(name)}
            >
              {/* Avatar */}
              <UserIcon userName={name.title} />

              {/* Name + Status */}
              <div className="flex-1">
                <p className="font-medium leading-none">{name.title}</p>
                <p className="text-xs font-bold text-zinc-400 mt-1">Online</p>
              </div>

              {/* Unread badge */}
              <div className="w-2 h-2 bg-indigo-500 rounded-full shadow" />
            </li>
          );
        })}
      </ul>
      {inAudioCall && (
        <div className="p-2">
          <AudioCall />
        </div>
      )}

      {createChatModal && (
        <CreateModalChat
          setCreateChatModal={setCreateChatModal}
          createChat={createChat}
        />
        // <Modal title="New Chat" close={() => setCreateChatModal(false)}>
        //   <div className="flex flex-col gap-4">
        //     <div>
        //       <Input
        //         type="text"
        //         onChange={(e) => {
        //           console.log(e.target.value);
        //           setCreateChatValue(e.target.value);
        //         }}
        //         value={createChatValue}
        //         icon={SearchIcon}
        //         placeholder="Search Users"
        //       />
        //     </div>
        //     <ul className="flex-1 overflow-y-auto flex flex-col gap-2 px-2">
        //       {dmList.map((name) => {
        //         const isActive = name?.chatId === activeDm?.chatId;
        //         return (
        //           <li
        //             key={name.chatId}
        //             className={`flex items-center gap-3 px-4 py-1 cursor-pointer rounded-lg transition-all backdrop-blur-md
        //         ${isActive ? "bg-white/10" : "hover:bg-white/10"}
        //       `}
        //             onClick={() => createChat(name.chatId)}
        //           >
        //             {/* Avatar */}
        //             <UserIcon userName={name.title} />

        //             {/* Name + Status */}
        //             <div className="flex-1">
        //               <p className="font-medium leading-none">
        //                 {name.title}
        //               </p>
        //               <p className="text-xs font-bold text-zinc-400 mt-1">
        //                 Online
        //               </p>
        //             </div>
        //           </li>
        //         );
        //       })}
        //     </ul>
        //   </div>
        // </Modal>
      )}
    </aside>
  );
}
