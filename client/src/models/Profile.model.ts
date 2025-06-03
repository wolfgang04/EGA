export interface User {
  id: string;
  userID: string;
  name: {
    first: string;
    middle: string;
    last: string;
  };
  email: string;
  contact: string;
  address: string;
  birthday: string;
  image: string | null;
  userProfile: { public_id: string };
}
