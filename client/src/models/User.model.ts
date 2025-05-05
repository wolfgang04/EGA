interface Name {
  first: string;
  middle?: string;
  last: string;
}

export interface UserProfile {
  name: Name;
  email: string;
}

export type UserType = "employee" | "admin";

export interface UserRecord {
  public_id: string;
  userType: UserType;
  created_by: string | null;
  created_at: string; // ISO date
  userProfile: UserProfile;
}

export interface NewUser {
  userType: UserType;
  birthday: Date;
  address: string;
  contact: string;
  userProfile: UserProfile;
}
