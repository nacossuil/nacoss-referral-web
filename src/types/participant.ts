import { Timestamp } from "firebase/firestore";

export interface Participant {
  id: string;
  name: string;
  email: string;
  youtube: string;
  instagram: string;
  x: string;
  referredBy?: string;
  referralLink: string;
  createdAt: Timestamp;
  verified?: boolean;
  adminNote?: string;
}
