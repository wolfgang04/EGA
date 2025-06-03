import { SearchOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import { Dayjs } from "dayjs";
import React from "react";

type PickerMode = "date" | "week" | "month" | "year" | undefined;

interface Props {
  onSubmit: () => void;
  search: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeOption: React.Dispatch<React.SetStateAction<PickerMode>>;
  onChangeDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  dateOptions: PickerMode[];
  dateOption: PickerMode;
  date: Dayjs | null;
  onSort: (sort: string) => void;
}

const DateSearch: React.FC<Props> = ({
  onSubmit,
  date,
  dateOptions,
  dateOption,
  onChangeDate,
  onChangeSearch,
  onChangeOption,
  search,
  onSort,
}) => {
  return (
    <Form onFinish={onSubmit}>
      <Space>
        <Form.Item style={{ marginBottom: 0 }}>
          <Input
            value={search}
            onChange={onChangeSearch}
            placeholder="Search"
            style={{ width: "20rem", boxShadow: "none" }}
            prefix={<SearchOutlined className="text-gray-400" />}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Select
            allowClear
            style={{ width: "100px" }}
            placeholder="Select Date"
            onChange={(filter) => {
              onChangeOption((filter as PickerMode) ?? "date");
              onChangeDate(null);
            }}
            defaultValue={dateOptions[0]}
            options={dateOptions.map((date) => ({
              label: date!.charAt(0).toUpperCase() + date!.slice(1),
              value: date,
            }))}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Select
            style={{ width: "115px" }}
            defaultValue={"DESC"}
            options={[
              { label: "Descending", value: "DESC" },
              { label: "Ascending", value: "ASC" },
            ]}
            onChange={(sort) => onSort(sort)}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <DatePicker
            value={date}
            onChange={onChangeDate}
            picker={dateOption}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button variant="solid" color="default" htmlType="submit">
            Filter
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default DateSearch;
