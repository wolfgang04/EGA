import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SERVER from "../SERVER";
import type { RequestOverview, RequestStatus } from "../models/Request.model";
import { message } from "antd";
import Header from "../components/RequestOverview/Header";
import Information from "../components/RequestOverview/Information";
import Tools from "../components/RequestOverview/Tools";
import Statuses from "../components/RequestOverview/Statuses";

const RequestOverview = () => {
  const [requestDetails, setRequestDetails] = useState<RequestOverview>();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [statusChanged, setStatusChanged] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const role = localStorage.getItem("role") as "admin" | "employee";
  const roleOptions = {
    admin: ["pending", "denied", "approved"],
    employee: ["approved", "borrowed", "returned"],
  } as const;
  const [initialStatus, setInitialStatus] = useState<RequestStatus>("pending");
  const [currStatus, setCurrStatus] = useState<RequestStatus>("pending");
  const [nextStatuses, setNextStatuses] = useState<RequestStatus[]>([]);

  const location = useLocation();
  const id = location.pathname.slice(12);

  // fetch request details
  useEffect(() => {
    const fetchRequestOverview = async () => {
      try {
        const { data } = await axios.get(`${SERVER}/request/overview/${id}`, {
          withCredentials: true,
        });
        console.log(`${SERVER}/request/overview/${id}`);

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
  const isDisabled =
    (["returned", "denied", "approved", "borrowed"].includes(currStatus) &&
      role === "admin") ||
    (["pending", "returned"].includes(currStatus) && role === "employee");

  // decides which options to show depending on user role and current status
  useEffect(() => {
    const currStatusIdx = roleOptions[role].findIndex(
      (status) => status === currStatus,
    );
    const nextOptions =
      role === "admin" ? currStatusIdx + 3 : currStatusIdx + 2;
    const nextStatus = roleOptions[role].slice(currStatusIdx, nextOptions);
    setNextStatuses(nextStatus);
  }, [currStatus]);

  const error = (msg: string) => {
    messageApi.open({
      type: "error",
      content: msg,
    });
  };

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
    } catch (err) {
      const errr = err as AxiosError<{ msg: string }>;
      const msg = errr?.response?.data?.msg!;
      error(msg);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      {contextHolder}
      <Header id={requestDetails!.id} />

      <Information
        name={requestDetails!.requestByProfile?.name}
        created={
          requestDetails?.statuses[requestDetails.statuses.length - 1].changedAt
        }
        lastUpdated={requestDetails?.statuses[0].changedAt}
      />

      <Tools requestFiled={requestDetails!.requestFiled} />
      <Statuses
        nextStatuses={nextStatuses}
        currStatus={currStatus}
        handleChange={setCurrStatus}
        statuses={requestDetails!.statuses}
        isDisabled={isDisabled}
        initialStatus={initialStatus}
        onChangeStatus={handleChangeStatus}
      />
    </>
  );
};

export default RequestOverview;
