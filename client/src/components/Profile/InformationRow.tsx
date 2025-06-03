import React from "react";

interface Props {
  style: string;
  label: string;
  data: string;
  icon?: React.ReactNode;
}

const InformationRow: React.FC<Props> = ({ style, data, icon, label }) => {
  return (
    <div className={style}>
      <label className="font-medium">{label}</label>
      <div className="flex gap-2">
        {icon}
        {data.trim() !== "" ? <p>{data}</p> : <p>Not set</p>}
      </div>
    </div>
  );
};

export default InformationRow;
