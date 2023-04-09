import { User } from './user';

export type NewComment = {
  comment: string;
  rating: number;
  hotelId: string;
}

export type Review = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: User;
}

export type Reviews = Review[];
