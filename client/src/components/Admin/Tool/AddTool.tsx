import React, { useState } from "react";
import { ToolDetails } from "../../../models/Tool.model";

interface Props {
  onAddTool: (toolDetails: ToolDetails) => void;
  onClose: () => void;
}

const AddTool: React.FC<Props> = ({ onAddTool, onClose }) => {
  const [toolDetails, setToolDetails] = useState<ToolDetails>({
    name: "",
    quantity: 0,
    location: "",
  });

  const handleAddTool = (e: React.FormEvent) => {
    e.preventDefault();

    onAddTool(toolDetails);
    setToolDetails({
      name: "",
      quantity: 1,
      location: "",
    });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToolDetails({
      ...toolDetails,
      name: e.target.value,
    });
  };

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToolDetails({
      ...toolDetails,
      quantity: Number(e.target.value),
    });
  };

  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToolDetails({
      ...toolDetails,
      location: e.target.value,
    });
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-black/5">
      <div className="w-full" />
      <form onSubmit={handleAddTool}>
        <input
          type="text"
          placeholder="enter tool name"
          value={toolDetails.name}
          className="block"
          onChange={(e) => handleChangeName(e)}
        />
        <input
          type="number"
          value={toolDetails.quantity || ""}
          className="block"
          onChange={(e) => handleChangeQuantity(e)}
        />
        <input
          type="text"
          placeholder="enter location"
          value={toolDetails.location}
          className="block"
          onChange={(e) => handleChangeLocation(e)}
        />
        <button type="submit" className="w-full">
          add
        </button>
      </form>
      <button className="block w-full" onClick={onClose}>
        close
      </button>
    </div>
  );
};

export default AddTool;
