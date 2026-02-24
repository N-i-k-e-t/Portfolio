import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  role: string;
  favoriteSubject: string;
  joinedDate: string;
  xp: number;
  streak: number;
  levelsCompleted: number;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (data: Omit<User, "xp" | "streak" | "levelsCompleted" | "avatar" | "joinedDate"> & { password: string }) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("kg_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem("kg_users") || "[]");
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem("kg_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = (data: any): boolean => {
    const users = JSON.parse(localStorage.getItem("kg_users") || "[]");
    if (users.find((u: any) => u.email === data.email)) return false;
    const newUser = {
      ...data,
      xp: 0,
      streak: 1,
      levelsCompleted: 0,
      avatar: "🎓",
      joinedDate: new Date().toISOString().split("T")[0],
    };
    users.push(newUser);
    localStorage.setItem("kg_users", JSON.stringify(users));
    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem("kg_user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("kg_user");
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("kg_user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
