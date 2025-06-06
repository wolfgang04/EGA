import { Pagination, Table, TableProps } from "antd";
import React from "react";
import { useNavigate } from "react-router";

interface HistoryTable {
  request_id: string;
  status: string;
  changed_by: string;
  changed_at: string;
  request: {
    public_id: string;
    requestByProfile: null | {
      name: {
        last: string;
        first: string;
        middle: string;
      };
    };
  };
  changedByProfile: {
    name: {
      last: string;
      first: string;
      middle: string;
    };
  };
}

const HistoryTable: React.FC<{
  history: HistoryTable[];
  currPage: number;
  totalItems: number;
  setCurrentPage: (page: number) => void;
  onLoad: boolean;
}> = ({ history, currPage, setCurrentPage, totalItems, onLoad }) => {
  const navigate = useNavigate();

  const start = (currPage - 1) * 10 + 1;
  const end = Math.min(start + 10 - 1, totalItems);

  const groupedByRequest: Record<string, string[]> = {};

  history.forEach((entry) => {
    const req_id = entry.request_id;
    if (!groupedByRequest[req_id]) {
      groupedByRequest[req_id] = [];
    }
    groupedByRequest[req_id].push(entry.status);
  });

  const onlyPendingRequests = Object.entries(groupedByRequest)
    .filter(([_, statuses]) => statuses.length === 1)
    .map(([request_id]) => request_id);

  const tableColumns: TableProps<HistoryTable>["columns"] = [
    {
      title: "Request ID",
      dataIndex: ["request", "public_id"],
      key: "publicID",
    },
    {
      title: "Request By",
      render: (_, record) => {
        const profile = record.request.requestByProfile;

        if (!profile) return "N/A";

        const { first, middle, last } = profile.name;

        return `${last}, ${first}${middle ? ` ${middle}` : ""}`;
      },
      key: "request by",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Changed By",
      render: (_, record) => {
        const profile = record.changedByProfile;
        const { first, middle, last } = profile.name;
        return `${last}, ${first}${middle ? ` ${middle}` : ""}`;
      },
      key: "changed by",
    },
    {
      title: "Date",
      dataIndex: "changed_at",
      key: "changed at",
      render: (date: string) =>
        new Date(date).toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
    },
  ];

  return (
    <>
      <Table<HistoryTable>
        components={{
          body: {
            cell: (props) => (
              <td {...props} className="w-52 hover:bg-black/10" />
            ),
          },
        }}
        loading={onLoad}
        columns={tableColumns}
        dataSource={history}
        rowKey={(record) => record.changed_at}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => {
              navigate("/request/" + record.request.public_id);
            },
          };
        }}
        rowClassName={(record) => {
          return onlyPendingRequests.findIndex(
            (id) => id === record.request_id,
          ) !== -1
            ? "bg-yellow-50"
            : "";
        }}
      />

      <div className="mt-2 mb-3 flex items-center justify-between px-6">
        <div className="text-gray-500">
          Showing {start}–{end} of {totalItems}
        </div>
        <Pagination
          current={currPage}
          total={totalItems}
          pageSize={10}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          showQuickJumper={true}
        />
      </div>
    </>
  );
};

export default HistoryTable;
