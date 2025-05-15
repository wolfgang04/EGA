import { useEffect, useState } from "react";
import axios from "axios";
import SERVER from "../../SERVER";
import { Histories } from "../../models/History.model";
import { Button } from "antd";
import FilterModal from "../../components/Admin/Requests/FilterModal";
import HistoryTable from "../../components/Admin/Requests/HistoryTable";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [histories, setHistories] = useState<Histories>([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchFilter, setSearchFilter] = useState("");
  const [addFilter, setAddFilter] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get<{ count: number; rows: Histories }>(
          `${SERVER}/request/requests`,
          {
            withCredentials: true,
            params: { page, filter: searchFilter },
          },
        );

        setHistories(res.data.rows);
        setTotalItems(res.data.count);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [page, addFilter]);

  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setAddFilter((prevFilter) => !prevFilter);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            className="w-fit"
            value={searchFilter}
            onChange={handleChangeFilter}
          />
        </form>

        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Filter
        </Button>
        <FilterModal
          handleCancel={handleCancel}
          handleOk={handleCancel}
          isModalOpen={isModalOpen}
        />
      </div>

      <HistoryTable
        history={histories}
        currPage={page}
        totalItems={totalItems}
        setCurrentPage={setPage}
      />
    </div>
  );
};

export default AdminDashboard;
