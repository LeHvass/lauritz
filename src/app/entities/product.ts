import { User, UserVm } from './user';

export class Product {
  _id: string; // User does not fill out
  customerId?: string;
  user: UserVm; // User does not fill out
  name: string;
  description: string;
  startingPrice: number;
  minimumBid: number; // Increase in bid of ?
  images: string[];
  dateCreated: Date;  // User does not fill out
  endDate: Date;
  bids: Bid[];  // User does not fill out
  location: string;
}

export class Bid {
  _id: string;
  userId: string;
  amount: number;
  date: Date;
}