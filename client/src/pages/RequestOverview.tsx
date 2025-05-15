import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SERVER from "../SERVER";
import type { RequestOverview, RequestStatus } from "../models/Request.model";
import RequestToolTable from "../components/RequestOverview/RequestToolTable";
import StatusTable from "../components/RequestOverview/StatusTable";

const RequestOverview = () => {
  const [requestDetails, setRequestDetails] = useState<RequestOverview>();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [statusChanged, setStatusChanged] = useState(false);

  const role = localStorage.getItem("role") as "admin" | "employee";
  const roleOptions = {
    admin: ["pending", "denied", "approved"],
    employee: ["approved", "borrowed", "returned"],
  } as const;
  const [initialStatus, setInitialStatus] = useState<RequestStatus>("pending");
  const [currStatus, setCurrStatus] = useState<RequestStatus>("pending");
  const [nextStatuses, setNextStatuses] = useState<RequestStatus[]>([]);

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
        setCurrStatus(data.statuses[0].status);
        setInitialStatus(data.statuses[0].status);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequestOverview();
  }, [statusChanged]);

  // decides which option is displayed depending on the user's role and the current status
  const disableBtn =
    (["returned", "denied", "approved", "borrowed"].includes(currStatus) &&
      role === "admin") ||
    (["pending", "returned"].includes(currStatus) && role === "employee");

  useEffect(() => {
    const currStatusIdx = roleOptions[role].findIndex(
      (status) => status === currStatus,
    );
    const nextOptions =
      role === "admin" ? currStatusIdx + 3 : currStatusIdx + 2;
    const nextStatus = roleOptions[role].slice(currStatusIdx, nextOptions);
    setNextStatuses(nextStatus);
  }, [currStatus]);

  const handleChangeStatus = async () => {
    try {
      await axios.post(
        `${SERVER}/request/status`,
        { status: currStatus, requestID: requestDetails?.id },
        {
          withCredentials: true,
        },
      );

      setIsVisible(false);
      setStatusChanged((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center">
      <p>Request ID: {requestDetails?.id}</p>
      <p>
        Request By:{" "}
        {`${requestDetails?.requestByProfile?.name.last}, ${requestDetails?.requestByProfile?.name.first} ${requestDetails?.requestByProfile?.name.middle}`}
      </p>

      <div className="mt-4 flex gap-1">
        <button onClick={() => setIsVisible(!isVisible)} disabled={disableBtn}>
          change status
        </button>
        {isVisible && (
          <>
            <div className="flex flex-col items-start">
              <select
                id="status-select"
                name="status"
                value={currStatus}
                onChange={(e) => setCurrStatus(e.target.value as RequestStatus)}
                className=""
              >
                {nextStatuses.map((nextStatus) => (
                  <option
                    key={nextStatus}
                    value={nextStatus}
                    disabled={nextStatus === currStatus}
                  >
                    {nextStatus}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleChangeStatus}
              disabled={currStatus === initialStatus}
            >
              change
            </button>
          </>
        )}
      </div>

      <RequestToolTable requests={requestDetails!.requestFiled} />
      <StatusTable statuses={requestDetails!.statuses} />
    </div>
  );
};

export default RequestOverview;
