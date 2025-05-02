export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  priceUnit: 'hour' | 'day' | 'week';
  owner: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
  location: string;
  images: string[];
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  available: boolean;
  rating?: number;
  numReviews?: number;
  features?: string[];
  specifications?: {[key: string]: string};
} 