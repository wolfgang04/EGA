export interface Tool {
  publicID: string;
  name: string;
  location: string;
  quantity: number;
}

export type ToolDetails = {
  name: string;
  quantity: number;
  location: string;
};
