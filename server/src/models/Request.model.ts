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
  approved = "approved",
  borrowed = "borrowed",
  returned = "returned",
}

export interface ChangeRequestStatus {
  requestHistoryID: number;
  status: Status;
}
