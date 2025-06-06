import React from "react";
import RequestToolTable from "./RequestToolTable";
import { Request } from "../../models/Request.model";

const Tools: React.FC<{ requestFiled: Request[] }> = ({ requestFiled }) => {
  return (
    <div className="mx-50 my-6 rounded-md border border-gray-200 bg-white p-5">
      <h3>Tools Requested ({requestFiled.length} items)</h3>
      <RequestToolTable requests={requestFiled} />
    </div>
  );
};

export default Tools;
