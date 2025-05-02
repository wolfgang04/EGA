import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SERVER from "../SERVER";
import type { RequestOverview } from "../models/Request.model";
import ToolTable from "../components/RequestOverview/ToolTable";
import StatusTable from "../components/RequestOverview/StatusTable";
import AdminNavbar from "../components/AdminNavbar";

const RequestOverview = () => {
  const [requestDetails, setRequestDetails] = useState<RequestOverview>();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const requestID = location.pathname.slice(12);

  useEffect(() => {
    const fetchRequestOverview = async () => {
      try {
        const { data } = await axios.get(`${SERVER}/request/overview`, {
          withCredentials: true,
          params: { requestID },
        });

        setRequestDetails(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequestOverview();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center">
      <AdminNavbar />
      <p>Request ID: {requestDetails?.publicID}</p>
      <p>
        Request By:{" "}
        {`${requestDetails?.requestBy?.name.last}, ${requestDetails?.requestBy?.name.first} ${requestDetails?.requestBy?.name.middle}`}
      </p>

      <ToolTable requests={requestDetails?.requestFiled || []} />
      <StatusTable statusChanges={requestDetails?.statuses || []} />
    </div>
  );
};

export default RequestOverview;
