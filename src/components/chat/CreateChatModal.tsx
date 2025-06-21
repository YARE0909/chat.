import { useEffect, useState } from "react";
import { Input } from "../common/Input";
import Modal from "../common/Modal";
import { SearchIcon } from "lucide-react";
import { getUsersListResponse } from "@/utils/api/types";
import UserIcon from "./UserIcon";
import { fetchUsersListAction } from "@/actions/users/fetchUserList";

export default function CreateModalChat({
  setCreateChatModal,
  createChat,
}: {
  setCreateChatModal: any;
  createChat: (userId: number) => void;
}) {
  const [searchValue, setSearchValue] = useState<string>("");
  const [usersList, setUserList] = useState<getUsersListResponse[]>([]);

  const fetchUsersList = async () => {
    const { data, status } = await fetchUsersListAction();
    if (status === "success") {
      setUserList(data!);
    }
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  return (
    <Modal title="New Chat" close={() => setCreateChatModal(false)}>
      <div className="flex flex-col gap-4">
        <div>
          <Input
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setSearchValue(e.target.value);
            }}
            value={searchValue}
            icon={SearchIcon}
            placeholder="Search Users"
          />
        </div>
        <ul className="flex-1 overflow-y-auto flex flex-col gap-2 px-2">
          {usersList.map((user) => {
            return (
              <li
                key={user.id}
                className={`flex items-center gap-3 px-2 py-1 cursor-pointer rounded-lg transition-all backdrop-blur-md hover:bg-white/10 duration-300
              `}
                onClick={() => createChat(user.id)}
              >
                {/* Avatar */}
                <UserIcon userName={user.name} />

                {/* Name + Status */}
                <div className="flex-1">
                  <p className="font-medium leading-none">{user.name}</p>
                  <p className="text-xs font-bold text-zinc-400 mt-1">
                    {user.email}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Modal>
  );
}
