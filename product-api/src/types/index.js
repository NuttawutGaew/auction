export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  currentBid: number;
}

export interface ProductInput {
  name: string;
  image: string;
  price: number;
  description: string;
  currentBid: number;
}