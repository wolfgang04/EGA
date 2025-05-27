import axios from "axios";
import { useEffect, useState } from "react";
import SERVER from "../../SERVER";
import RequestsTable from "../../components/Employee/Requests/RequestsTable";
import { CurrReq } from "../../models/Request.model";
import { Spin } from "antd";

const Requests = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currRequests, setCurrRequests] = useState<CurrReq[]>([]);
  const [prevRequests, setPrevRequests] = useState<CurrReq[]>([]);
  const [currReqsPage, setCurrReqsPage] = useState(1);
  const [prevReqsPage, setPrevReqsPage] = useState(1);

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
      } finally {
        setIsLoading(false);
      }
    };

    getRequests();
  }, []);

  return isLoading === false ? (
    <div className="flex justify-center gap-2 text-center">
      <div className="flex flex-col">
        <h2>Current Requests</h2>
        <RequestsTable
          requests={currRequests}
          setPage={(page) => setCurrReqsPage(page)}
        />
      </div>

      <div className="flex flex-col">
        <h2>Previous Requests</h2>
        <RequestsTable
          requests={prevRequests}
          setPage={(page) => setPrevReqsPage(page)}
        />
      </div>
    </div>
  ) : (
    <Spin />
  );
};

export default Requests;
