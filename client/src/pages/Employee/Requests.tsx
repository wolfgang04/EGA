import axios from "axios";
import React, { useEffect, useState } from "react";
import SERVER from "../../SERVER";
import RequestsTable from "../../components/Employee/Requests/RequestsTable";
import { CurrReq } from "../../models/Request.model";

const Requests = () => {
  const [currRequests, setCurrRequests] = useState<CurrReq[]>([]);
  const [prevRequests, setPrevRequests] = useState<CurrReq[]>([]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const { data } = await axios.get(SERVER + "/request/ongoing", {
          withCredentials: true,
        });
        setCurrRequests(data);

        const { data: prevData } = await axios.get(
          SERVER + "/request/previous",
          {
            withCredentials: true,
          },
        );

        setPrevRequests(prevData);
      } catch (error) {
        console.log(error);
      }
    };

    getRequests();
  }, []);

  return (
    <div className="flex justify-center text-center">
      <div className="flex flex-col">
        <h2>Current Requests</h2>
        <RequestsTable requests={currRequests} />
      </div>

      <div className="flex flex-col">
        <h2>Previous Requests</h2>
        <RequestsTable requests={prevRequests} />
      </div>
    </div>
  );
};

export default Requests;
