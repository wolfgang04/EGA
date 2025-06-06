interface Name {
  first: string;
  middle?: string | undefined;
  last: string;
}

export interface Tool {
  public_id: string;
  name: string;
  location: string;
  total_available?: number;
  quantity: number;
  borrowers: { name: Name; request_id: number };
}

export type ToolDetails = {
  name: string;
  quantity: number;
  location: string;
};
