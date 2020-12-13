import { createProfileStore } from "./profile.store";

export const profile = createProfileStore();

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
}
