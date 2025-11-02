export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  onPromotion: boolean;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin';
}

export interface Slide {
  title: string;
  subtitle: string;
  color: string;
  image: string;
}