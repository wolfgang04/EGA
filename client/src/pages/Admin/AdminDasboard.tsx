import { useEffect, useState } from "react";
import axios from "axios";
import SERVER from "../../SERVER";
import { Histories } from "../../models/History.model";
import HistoryTableRow from "../../components/Admin/Requests/HistoryTableRow";
import PageNav from "../../components/Admin/Requests/PageNav";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [histories, setHistories] = useState<Histories>([]);
  const [numOfPages, setNumOfPages] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get<{ numOfPages: number; rows: Histories }>(
          `${SERVER}/request/requests`,
          {
            withCredentials: true,
            params: { page },
          },
        );

        setHistories(res.data.rows);
        setNumOfPages(res.data.numOfPages);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [page]);

  return (
    <div className="flex flex-col items-center justify-center">
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

      <PageNav numOfPages={numOfPages} setPage={setPage} currPage={page} />
    </div>
  );
};

export default AdminDashboard;
