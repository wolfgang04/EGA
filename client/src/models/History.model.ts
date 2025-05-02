export interface History {
  request_id: string;
  status: string;
  changed_by: string;
  changed_at: string;
  request: {
    public_id: string;
    requestByProfile: null | {
      name: {
        last: string;
        first: string;
        middle: string;
      };
    };
  };
  changedByProfile: {
    name: {
      last: string;
      first: string;
      middle: string;
    };
  };
}

export type Histories = History[];
