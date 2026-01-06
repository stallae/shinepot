export interface Providers {
  id: number;
  name: string;
  country: string;
}

export interface PaidServices {
  id: number;
  user_id: number;
  amount: number;
  provider_id: number;
}
