import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SERVER from "../SERVER";
import type { RequestOverview } from "../models/Request.model";
import ToolTable from "../components/RequestOverview/ToolTable";
import StatusTable from "../components/RequestOverview/StatusTable";

const RequestOverview = () => {
  const [requestDetails, setRequestDetails] = useState<RequestOverview>();
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [statusChanged, setStatusChanged] = useState(false);
  const location = useLocation();
  const requestID = location.pathname.slice(-1);
  const role = localStorage.getItem("role") as "admin" | "employee";
  const disableBtn =
    ["returned", "denied", "pending", ""].includes(selected) &&
    (role === "admin" || (role === "employee" && selected !== "returned"));
  const roleOptions = {
    admin: ["pending", "denied", "approved"],
    employee: ["borrowed", "returned"],
  } as const;

  useEffect(() => {
    const fetchRequestOverview = async () => {
      try {
        const { data } = await axios.get(`${SERVER}/request/overview`, {
          withCredentials: true,
          params: { requestID },
        });

        setRequestDetails(data);
        setSelected(data.statuses[0].status);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequestOverview();
  }, [statusChanged]);

  const handleChangeStatus = async () => {
    try {
      const res = await axios.post(
        `${SERVER}/request/status`,
        { status: selected, requestID: requestDetails?.id },
        {
          withCredentials: true,
        },
      );

      console.log(res);

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
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                className=""
              >
                {roleOptions[role].map((option) => (
                  <option
                    key={option}
                    value={option}
                    disabled={option === selected}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleChangeStatus}>change</button>
          </>
        )}
      </div>

      <ToolTable requests={requestDetails?.requestFiled || []} />
      <StatusTable statusChanges={requestDetails?.statuses || []} />
    </div>
  );
};

export default RequestOverview;
