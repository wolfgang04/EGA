import React from "react";
import { UserProfile, UserType } from "../../../models/User.model";

interface Props {
  onChangeFirstName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMiddleName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeLastName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAddress: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContact: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBirthday: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSetRole: (role: UserType) => void;
  profile: UserProfile;
  address: string;
  contact: string;
  birthday: Date;
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
  profile,
}) => {
  return (
    <>
      <input
        type="text"
        placeholder="first name"
        value={profile.name.first}
        onChange={(e) => onChangeFirstName(e)}
      />
      <input
        type="text"
        placeholder="middle name"
        value={profile.name.middle}
        onChange={(e) => onChangeMiddleName(e)}
      />
      <input
        type="text"
        placeholder="last name"
        value={profile.name.last}
        onChange={(e) => onChangeLastName(e)}
      />
      <input
        type="email"
        placeholder="email"
        value={profile.email}
        onChange={(e) => onChangeEmail(e)}
      />
      <input
        type="text"
        placeholder="address"
        value={address}
        onChange={(e) => onChangeAddress(e)}
      />
      <input
        type="text"
        placeholder="contact"
        value={contact}
        onChange={(e) => onChangeContact(e)}
      />
      <input
        type="date"
        placeholder="Birthday"
        value={birthday.toISOString().split("T")[0]}
        onChange={(e) => onChangeBirthday(e)}
      />

      <fieldset
        className="flex gap-2"
        onChange={(e) =>
          onSetRole((e.target as HTMLInputElement).id as UserType)
        }
      >
        <div>
          <input type="radio" id="employee" name="options" defaultChecked />
          <label htmlFor="employee">employee</label>
        </div>
        <div>
          <input type="radio" id="admin" name="options" />
          <label htmlFor="admin">admin</label>
        </div>
      </fieldset>
    </>
  );
};

export default AddUserInputs;
