import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { RequestStatus, StatusDetails } from "../../models/Request.model";
import StatusTable from "./StatusTable";

const Statuses: React.FC<{
  nextStatuses: RequestStatus[];
  handleChange: React.Dispatch<React.SetStateAction<RequestStatus>>;
  currStatus: RequestStatus;
  statuses: StatusDetails[];
  isDisabled: boolean;
  initialStatus: RequestStatus;
  onChangeStatus: () => void;
}> = ({
  nextStatuses,
  handleChange,
  currStatus,
  statuses,
  isDisabled,
  initialStatus,
  onChangeStatus,
}) => {
  const [options, setOptions] = useState<RequestStatus[]>([currStatus]);
  useEffect(() => {
    setOptions(nextStatuses);
  }, [nextStatuses]);

  return (
    <div className="mx-50 mb-6 rounded-md border border-gray-200 bg-white p-5">
      <h3>Status Management</h3>
      <div className="flex justify-center gap-2">
        <Select
          value={currStatus}
          onChange={handleChange}
          options={options.map((nextStatus) => ({
            value: nextStatus,
            label: nextStatus,
            disabled: nextStatus === currStatus,
          }))}
          disabled={isDisabled}
        />
        <Button
          color="default"
          variant="solid"
          onClick={onChangeStatus}
          disabled={currStatus === initialStatus}
        >
          change
        </Button>
      </div>

      <StatusTable statuses={statuses} />
    </div>
  );
};

export default Statuses;
