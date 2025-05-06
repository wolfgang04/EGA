import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import SERVER from "../../SERVER";
import type { Tool, ToolDetails } from "../../models/Tool.model";
import ToolTable from "../../components/Admin/Tool/ToolTable";
import AddTool from "../../components/Admin/Tool/AddTool";

const Tool = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const { state } = useLocation();

  const handleAddTool = async (toolDetails: ToolDetails) => {
    try {
      await axios.post(
        `${SERVER}/tool/create`,
        { ...toolDetails, categoryID: state.categoryID },
        {
          withCredentials: true,
        },
      );

      setTools((prevTools) => [...prevTools, { ...toolDetails, publicID: "" }]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const { data } = await axios.get(`${SERVER}/tool/tools`, {
          withCredentials: true,
          params: { categoryID: state.categoryID },
        });

        setTools(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTools();
  }, [tools]);

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={() => setIsVisible(true)}>Add</button>
      {isVisible && (
        <AddTool
          onAddTool={handleAddTool}
          onClose={() => setIsVisible(false)}
        />
      )}

      <ToolTable Tools={tools} />
    </div>
  );
};

export default Tool;
