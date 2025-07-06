import { useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "agent" | "client";
  avatar: string;
}

const mockUser: User = {
  id: "1",
  name: "Jane Doe",
  email: "jane.doe@example.com",
  role: "agent",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
};

export function useUser() {
  const [user] = useState<User>(mockUser);
  return user;
}
