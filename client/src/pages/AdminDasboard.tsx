import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";
import SERVER from "../SERVER";
import { Histories } from "../models/History.model";
import HistoryTableRow from "../components/tables/HistoryTableRow";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [histories, setHistories] = useState<Histories>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${SERVER}/request/requests`, {
          withCredentials: true,
        });

        setHistories(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      <AdminNavbar />

      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Requested by</th>
            <th>Status</th>
            <th>Changed by</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {isLoading && (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
          {histories.map((history) => (
            <HistoryTableRow history={history} key={history.changed_at} />
          ))}
        </tbody>
      </table>

      <div className="flex w-fit grow-0 gap-2">
        <button>prev</button>
        <button>next</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
