import {PaidServices} from './providers.ts';

export interface User {
  id: number;
  username: string;
  user_login_id?: number;
  allow_random_messages: boolean;
  created_at: Date;
  user_contact: UserContact;
  paid_services?: PaidServices[];
}

export interface UserContact {
  id: number;
  user_id: number;
  email?: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  zip_code?: string;
}
