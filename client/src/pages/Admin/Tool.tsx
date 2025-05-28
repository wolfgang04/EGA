import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import SERVER from "../../SERVER";
import type { Tool, ToolDetails } from "../../models/Tool.model";
import ToolTable from "../../components/Admin/Tool/ToolTable";
import AddTool from "../../components/Admin/Tool/AddTool";
import EditToolModal from "../../components/Admin/Tool/EditToolModal";
import { message } from "antd";

const Tool = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toolToEdit, setToolToEdit] = useState({
    id: "",
    quantity: 0,
    location: "",
    name: "",
  });
  const { state } = useLocation();
  const [msg, setMsg] = useState("updated successfully");

  const [messageApi, contextHolder] = message.useMessage();

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
  }, []);

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

  const success = () => {
    messageApi.open({
      type: "success",
      content: msg,
    });
  };

  const handleEditTool = async (
    id: number,
    tool: { quantity?: number; location?: string },
  ) => {
    if (Object.keys(tool).length === 0) return;

    try {
      await axios.post(
        `${SERVER}/tool/edit/${id}`,
        {
          edit: tool,
        },
        { withCredentials: true },
      );

      const msg =
        Object.keys(tool)
          .map((tool) => tool)
          .join(" and ") + " updated successfully";
      setMsg(msg);
      success();

      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {contextHolder}
      <EditToolModal
        close={() => setIsOpen(false)}
        isOpen={isOpen}
        onEdit={handleEditTool}
        toolDetails={toolToEdit}
      />
      <button onClick={() => setIsVisible(true)}>Add</button>
      {isVisible && (
        <AddTool
          onAddTool={handleAddTool}
          onClose={() => setIsVisible(false)}
        />
      )}

      <ToolTable
        tools={tools}
        onEdit={(
          id: string,
          quantity: number,
          location: string,
          name: string,
        ) => {
          setToolToEdit({ id, quantity, location, name });
          setIsOpen(true);
        }}
      />
    </div>
  );
};

export default Tool;
