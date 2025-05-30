export interface Category {
  description: string | null;
  id: number;
  image: Blob | null;
  name: string;
}

export interface CategoryOverView {
  category_name: string;
  id: number;
  total_available: number;
  total_quantity: number;
  total_tools: number;
}
