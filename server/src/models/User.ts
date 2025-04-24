export interface Name {
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface createAccountRequestBody {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  address: string;
  contact: string;
  birthday: string;
  userType: "admin" | "employee";
}
