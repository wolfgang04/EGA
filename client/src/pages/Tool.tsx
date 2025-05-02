import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { useLocation } from "react-router";
import axios from "axios";
import SERVER from "../SERVER";
import type { Tool } from "../models/Tool.model";
import ToolTable from "../components/Tool/ToolTable";

const Tool = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const { state } = useLocation();

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const { data } = await axios.get(`${SERVER}/tool/tools`, {
          withCredentials: true,
          params: { categoryID: state.categoryID },
        });

        setTools(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTools();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <AdminNavbar />

      <ToolTable Tools={tools} />
    </div>
  );
};

export default Tool;
