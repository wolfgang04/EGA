import React, { useState } from "react";
import { NewUser, UserProfile, UserType } from "../../../models/User.model";
import AddUserInputs from "./AddUserInputs";

interface Props {
  onAdd: (user: NewUser) => void;
  onClose: () => void;
}

const AddUser: React.FC<Props> = ({ onAdd, onClose }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: {
      first: "",
      middle: "",
      last: "",
    },
    email: "",
  });
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [role, setRole] = useState<UserType>("employee");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd({ userProfile: profile, birthday, userType: role, address, contact });
    setProfile({
      name: {
        first: "",
        middle: "",
        last: "",
      },
      email: "",
    });
    setAddress("");
    setContact("");
  };

  const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      name: {
        first: e.target.value,
        middle: profile.name.middle,
        last: profile.name.last,
      },
      email: profile.email,
    });
  };
  const handleChangeMiddleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prevProfile) => ({
      name: {
        middle: e.target.value,
        first: prevProfile.name.first,
        last: prevProfile.name.last,
      },
      email: prevProfile.email,
    }));
  };
  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prevProfile) => ({
      name: {
        last: e.target.value,
        middle: prevProfile.name.middle,
        first: prevProfile.name.first,
      },
      email: prevProfile.email,
    }));
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prevProfile) => ({
      name: {
        first: prevProfile.name.first,
        middle: prevProfile.name.middle,
        last: prevProfile.name.last,
      },
      email: e.target.value,
    }));
  };
  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  const handleChangeContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact(e.target.value);
  };
  const handleChangeBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split("-");
    setBirthday(new Date(Number(year), Number(month) - 1, Number(day)));
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-1/2 bg-black/5">
      <div className="w-full" />
      <form onSubmit={handleSubmit} className="flex flex-col">
        <AddUserInputs
          address={address}
          birthday={birthday}
          contact={contact}
          onChangeAddress={handleChangeAddress}
          onChangeBirthday={handleChangeBirthday}
          onChangeContact={handleChangeContact}
          onChangeEmail={handleChangeEmail}
          onChangeFirstName={handleChangeFirstName}
          onChangeLastName={handleChangeLastName}
          onChangeMiddleName={handleChangeMiddleName}
          onSetRole={(e) => setRole(e)}
          profile={profile}
        />

        <button type="submit">add</button>
      </form>
      <button className="block w-full" onClick={onClose}>
        close
      </button>
    </div>
  );
};

export default AddUser;
