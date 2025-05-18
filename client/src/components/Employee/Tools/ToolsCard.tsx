import { Flex, Pagination } from "antd";
import React from "react";
import ToolCard from "./ToolCard";
import { Tool } from "../../../pages/Employee/Tools";

interface CART {
  quantity: number;
  note: string;
  id: string;
  name: string;
  max: number;
}

const ToolsCard: React.FC<{
  filteredTools: Tool[];
  isLoading: boolean;
  onChange: (page: number) => void;
  onAdd: (tool: CART) => void;
  page: number;
}> = ({ filteredTools, isLoading, onChange, onAdd, page }) => {
  const displayedItems = filteredTools.slice((page - 1) * 10, page * 10);

  return (
    <>
      <Flex
        wrap
        justify="center"
        gap="middle"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        <div className="my-5 grid w-fit grid-cols-5 justify-center gap-4">
          {displayedItems.map((tool: Tool) => (
            <ToolCard
              isLoading={isLoading}
              tool={tool}
              onAdd={onAdd}
              key={tool.id}
            />
          ))}
        </div>
      </Flex>
      <Pagination
        showQuickJumper
        pageSize={10}
        current={Number(page)}
        total={filteredTools.length}
        align="center"
        onChange={(page) => onChange(page)}
      />
    </>
  );
};

export default ToolsCard;
