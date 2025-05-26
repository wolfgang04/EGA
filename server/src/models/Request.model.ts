export interface CreateAccountRequestBody {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  address: string;
  contact: string;
  birthday: string;
  userType: "admin" | "employee";
}

export interface CreateToolRequestBody {
  name: string;
  location: string;
  quantity: number;
  categoryID: number;
}

export interface CreateRequestToolBody {
  tools: RequestTool[];
}

interface RequestTool {
  quantity: number;
  note: string;
  toolID: number;
}

enum Status {
  pending = "pending",
  denied = "denied",
  approved = "approved",
  borrowed = "borrowed",
  returned = "returned",
}

export interface ChangeRequestStatus {
  requestID: number;
  status: Status;
}

export type LatestChange = {
  requestID: number;
  lastChangedAt: string;
};

export interface RequestToolInterface {
  toolID: number;
  quantity: number;
}

export interface ToolAvailability {
  id: number;
  name: string;
  total_quantity: number;
  category_id: number;
  location: string;
  category_name: string;
  available_quantity: number;
}
