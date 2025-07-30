import { useEffect, useState } from "react";
import HistoryTable from "../../components/Admin/Requests/HistoryTable";
import { useSearchParams } from "react-router";
import { Dayjs } from "dayjs";
import DateSearch from "../../components/Admin/Requests/DateSearch";
import { useQuery } from "@tanstack/react-query";
import { fetchHistory } from "../../utils/api/history";

type PickerMode = "date" | "week" | "month" | "year" | undefined;

const AdminDashboard = () => {
  const [search, setSearch] = useState("");
  const [pageParams, setPageParams] = useSearchParams();
  const [dateOption, setDateOption] = useState<PickerMode>();
  const [date, setDate] = useState<Dayjs | null>(null);
  const [sortParams, setSortParams] = useSearchParams();

  const page = pageParams.get("page") || "1";
  const sort = sortParams.get("sort") || "DESC";

  const dateOptions: PickerMode[] = ["date", "week", "month", "year"];

  useEffect(() => {
    const currPage = pageParams.get("page");
    if (!currPage) {
      pageParams.set("page", "1");
      setPageParams(pageParams);
    }
  }, [pageParams, setPageParams]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "histories",
      page,
      search,
      date?.format("YYYY-MM-DD"),
      dateOption,
      sort,
    ],
    queryFn: () => fetchHistory(page, search, date, dateOption, sort),
  });

  const histories = data?.rows || [];
  const totalItems = data?.count || 0;

  console.log(histories);

  const handleSumbit = () => {
    refetch();
  };

  return (
    <div className="m-6 rounded-lg border border-gray-200 bg-white">
      <div className="p-5">
        <h4 className="mb-2">All Requests</h4>
        <DateSearch
          date={date}
          dateOption={dateOption}
          dateOptions={dateOptions}
          onChangeDate={setDate}
          onChangeSearch={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          onChangeOption={setDateOption}
          onSubmit={handleSumbit}
          search={search}
          onSort={(sort) => {
            setSortParams((prev) => {
              const params = new URLSearchParams(prev);
              if (sort) params.set("sort", sort.toLowerCase());
              else params.delete("sort");

              return params;
            });
          }}
        />
      </div>

      <HistoryTable
        history={histories}
        onLoad={isLoading}
        currPage={Number(page)}
        totalItems={totalItems}
        setCurrentPage={(page) => {
          setPageParams((prev) => {
            const params = new URLSearchParams(prev);
            if (page) params.set("page", page.toString());
            else params.delete("page");

            return params;
          });
        }}
      />
    </div>
  );
};

export default AdminDashboard;
