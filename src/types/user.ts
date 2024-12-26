export type PaymentStatus = "PAID" | "PENDING";

export interface Payment {
  id: string;
  userId: string;
  date: Date;
  month: string;
  year: number;
  status: PaymentStatus;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: PaymentStatus;
  payments: Payment[];
}