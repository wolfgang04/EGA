import React from "react";

const InfoItem: React.FC<{
  label: string;
  data: string;
  icon: React.ReactNode;
}> = ({ label, data, icon }) => {
  return (
    <div className="flex gap-5">
      {icon}{" "}
      <div className="flex flex-col">
        <label className="font-gray-800 text-lg font-medium">{label}</label>
        <p>{data}</p>
      </div>
    </div>
  );
};

export default InfoItem;
