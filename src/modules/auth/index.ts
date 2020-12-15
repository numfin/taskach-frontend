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

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  active: string;
  createdAt: string;
  updatedAt: string;
}
