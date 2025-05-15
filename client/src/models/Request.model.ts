export type RequestStatus =
  | "pending"
  | "approved"
  | "borrowed"
  | "returned"
  | "denied";

export interface RequestOverview {
  id: string; // The request ID
  publicID: string; // Public identifier for the request
  requestByProfile: null | {
    name: {
      first: string;
      middle?: string;
      last: string;
    };
  }; // The profile of the person who made the request (nullable)
  requestFiled: Request[]; // Array of tools requested
  statuses: StatusDetails[]; // Array of status changes
}

export interface Request {
  quantity: number;
  note: string | null;
  requestedTool: {
    name: string;
    location: string;
    categoryID: string;
    publicID: string;
    categoryTool: { name: string };
  };
}

export interface StatusDetails {
  status: RequestStatus;
  changedAt: string; // ISO date string
  changedByProfile: {
    name: {
      first: string;
      middle?: string;
      last: string;
    };
  };
}

export interface CurrReq {
  changed_at: Date;
  status: string;
  request_id: string;
}
