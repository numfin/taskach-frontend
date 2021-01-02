import { createAuthStore } from "./auth.store";

export const auth = createAuthStore();

export interface Profile {
  exp: number;
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface ProfileStore {
  loading: boolean;
  user: Profile | null;
  errors: string[];
  registeredUser: IUser | null;
}

export type IUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  jwt: string;
};
