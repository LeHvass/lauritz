export class Product {
  _id: string;
  name: string;
  description: string;
  dateCreated: Date;
  dateEnd: Date;
  startingPrice: number;
  minimumBid: number;
  increments: number;
  images?: string[];
  finalPrice: number;
  category: string;
  seller: string;
}

export class Bid {
  _id: string;
  userId: string;
  amount: number;
  dateBid: Date;
}