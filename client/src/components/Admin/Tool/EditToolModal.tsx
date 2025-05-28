import { Input, Modal } from "antd";
import React, { useEffect, useState } from "react";

interface Tool {
  id: string;
  quantity: number;
  location: string;
  name: string;
}

interface Props {
  close: () => void;
  onEdit: (id: number, tool: { quantity?: number; location?: string }) => void;
  isOpen: boolean;
  toolDetails: Tool;
}

const EditToolModal: React.FC<Props> = ({
  close,
  onEdit,
  isOpen,
  toolDetails,
}) => {
  const [quantity, setQuantity] = useState(toolDetails.quantity);
  const [location, setLocation] = useState(toolDetails.location);
  const [name, setName] = useState(toolDetails.name);

  useEffect(() => {
    setLocation(toolDetails.location);
    setQuantity(toolDetails.quantity);
    setName(toolDetails.name);
  }, [toolDetails]);

  return (
    <Modal
      title={name}
      onCancel={close}
      onClose={close}
      onOk={() => {
        let edited: { quantity?: number; location?: string } = {};
        if (quantity != toolDetails.quantity) edited.quantity = quantity;
        if (location != toolDetails.location) edited.location = location;

        onEdit(Number(toolDetails.id), edited);
      }}
      open={isOpen}
    >
      <div className="flex gap-3">
        <Input
          placeholder="Quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuantity(Number(e.target.value))
          }
        />
        <Input
          placeholder="Location"
          value={location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocation(e.target.value)
          }
        />
      </div>
    </Modal>
  );
};

export default EditToolModal;
