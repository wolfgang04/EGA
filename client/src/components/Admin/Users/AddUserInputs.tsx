import React from "react";
import { UserProfile, UserType } from "../../../models/User.model";
import { DatePicker, Input, Radio, RadioChangeEvent, Space } from "antd";
import { Dayjs } from "dayjs";

interface Props {
  onChangeFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMiddleName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContact: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBirthday: React.Dispatch<React.SetStateAction<Dayjs>>;
  onSetRole: React.Dispatch<React.SetStateAction<UserType>>;
  role: UserType;
  profile: UserProfile;
  address: string;
  contact: string;
  birthday: Dayjs;
}

const AddUserInputs: React.FC<Props> = ({
  onChangeAddress,
  onChangeBirthday,
  onChangeContact,
  onChangeEmail,
  onChangeFirstName,
  onChangeLastName,
  onChangeMiddleName,
  onSetRole,
  address,
  birthday,
  contact,
  role,
  profile,
}) => {
  return (
    <Space direction="vertical">
      <Space>
        <Input
          type="text"
          placeholder="first name"
          value={profile.name.first}
          onChange={(e) => onChangeFirstName(e)}
        />
        <Input
          type="text"
          placeholder="middle name"
          value={profile.name.middle}
          onChange={(e) => onChangeMiddleName(e)}
        />
        <Input
          type="text"
          placeholder="last name"
          value={profile.name.last}
          onChange={(e) => onChangeLastName(e)}
        />
      </Space>

      <Space>
        <Input
          type="email"
          placeholder="email"
          value={profile.email}
          onChange={(e) => onChangeEmail(e)}
        />
        <Input
          type="text"
          placeholder="contact"
          value={contact}
          onChange={(e) => onChangeContact(e)}
        />
      </Space>

      <Input
        type="text"
        placeholder="address"
        value={address}
        onChange={(e) => onChangeAddress(e)}
      />

      <Space>
        <DatePicker value={birthday} onChange={onChangeBirthday} />
        <Radio.Group
          value={role}
          options={[
            { value: "employee", label: "employee" },
            { value: "admin", label: "admin" },
          ]}
          onChange={(e: RadioChangeEvent) => onSetRole(e.target.value)}
        />
      </Space>
    </Space>
  );
};

export default AddUserInputs;
