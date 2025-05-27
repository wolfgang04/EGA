import React, { useState } from "react";
import { NewUser, UserProfile, UserType } from "../../../models/User.model";
import AddUserInputs from "./AddUserInputs";
import { Form, Modal } from "antd";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  onAdd: (user: NewUser) => void;
  onClose: () => void;
  isOpen: boolean;
}

const AddUser: React.FC<Props> = ({ onAdd, onClose, isOpen }) => {
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
  const [birthday, setBirthday] = useState<Dayjs>(dayjs());
  const [role, setRole] = useState<UserType>("employee");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd({
      userProfile: profile,
      birthday: birthday.toDate(),
      userType: role,
      address,
      contact,
    });
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

    onClose();
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

  return (
    <Modal
      title="Create User"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={onClose}
    >
      {/* <Form>

      </Form> */}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <AddUserInputs
          address={address}
          birthday={birthday}
          contact={contact}
          onChangeAddress={handleChangeAddress}
          onChangeBirthday={setBirthday}
          onChangeContact={handleChangeContact}
          onChangeEmail={handleChangeEmail}
          onChangeFirstName={handleChangeFirstName}
          onChangeLastName={handleChangeLastName}
          onChangeMiddleName={handleChangeMiddleName}
          onSetRole={setRole}
          role={role}
          profile={profile}
        />
      </form>
    </Modal>
  );
};

export default AddUser;
