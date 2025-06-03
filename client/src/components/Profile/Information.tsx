import { Card } from "antd";
import React from "react";
import InformationRow from "./InformationRow";

interface Entry {
  label: string;
  data: string;
  icon?: React.ReactNode;
}

interface Props {
  information: string;
  entry1: Entry;
  entry2: Entry;
  entry3: Entry;
  icon: React.ReactNode;
  loading: boolean;
}

const Information: React.FC<Props> = ({
  information,
  entry1,
  entry2,
  entry3,
  icon,
  loading,
}) => {
  return (
    <Card className="w-full shadow-sm" loading={loading}>
      <div className="flex gap-2">
        {icon}
        <h3>{information} Information</h3>
      </div>

      <InformationRow
        style="flex flex-col py-2"
        data={entry1.data}
        icon={entry1.icon}
        label={entry1.label}
      />
      <InformationRow
        style="flex flex-col border-y border-gray-200 py-2"
        data={entry2.data}
        icon={entry2.icon}
        label={entry2.label}
      />
      <InformationRow
        style="flex flex-col py-2"
        data={entry3.data}
        icon={entry3.icon}
        label={entry3.label}
      />
    </Card>
  );
};

export default Information;
