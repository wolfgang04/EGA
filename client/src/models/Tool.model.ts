export interface Tool {
  public_id: string;
  name: string;
  location: string;
  total_available?: number;
  quantity: number;
}

export type ToolDetails = {
  name: string;
  quantity: number;
  location: string;
};
