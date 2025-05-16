import React from "react";
import { Input, Segmented, Select, Space } from "antd";

interface Props {
  categories: { name: string }[];
  searchVal: string;
  onFilter: (filter: string) => void;
  onSearch: (search: string) => void;
  onChangeDisplay: (display: string) => void;
  display: string;
  category: string;
}

const FilterAndSearch: React.FC<Props> = ({
  categories,
  searchVal,
  onFilter,
  onSearch,
  onChangeDisplay,
  display,
  category,
}) => {
  const categoryValue = category || undefined;

  return (
    <Space>
      <Input
        placeholder="Search Tool"
        style={{ width: "300px" }}
        value={searchVal}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onSearch(e.target.value)
        }
      />
      <Space style={{ width: "125px" }} direction="vertical">
        <Select
          allowClear
          style={{ width: "100%" }}
          placeholder="Select Tool Types"
          onChange={onFilter}
          defaultValue={categoryValue}
          options={categories.map((category) => ({
            label: category.name,
            value: category.name,
          }))}
        />
      </Space>
      <Segmented
        options={["Grid", "Table"]}
        defaultValue={display}
        onChange={(value) => onChangeDisplay(value)}
      />
    </Space>
  );
};

export default FilterAndSearch;
