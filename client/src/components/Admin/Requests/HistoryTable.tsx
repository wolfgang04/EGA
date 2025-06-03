import { Table, TableProps } from "antd";
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
    <Table<HistoryTable>
      components={{
        body: {
          cell: (props) => <td {...props} className="w-52 hover:bg-black/10" />,
        },
      }}
      loading={onLoad}
      columns={tableColumns}
      dataSource={history.map((history) => ({
        ...history,
        key: history.changed_at,
      }))}
      pagination={{
        current: currPage,
        pageSize: 10,
        total: totalItems,
        onChange: (page) => setCurrentPage(page),
        showQuickJumper: true,
      }}
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
  );
};

export default HistoryTable;
