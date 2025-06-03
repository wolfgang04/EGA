import axios from "axios";
import { useEffect, useState } from "react";
import SERVER from "../SERVER";
import { User } from "../models/Profile.model";
import Header from "../components/Profile/Header";
import Information from "../components/Profile/Information";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Profile = () => {
  const [profile, setProfile] = useState<User>({
    id: "",
    userID: "",
    name: {
      first: "",
      middle: "",
      last: "",
    },
    email: "",
    contact: "",
    address: "",
    birthday: "",
    image: null,
    userProfile: { public_id: "" },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(SERVER + "/user/profile", {
          withCredentials: true,
        });

        console.log(data);

        setProfile(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex w-screen flex-col justify-center gap-5 px-[25%]">
      <Header name={profile.name} loading={isLoading} />

      <div className="flex gap-5">
        <Information
          information="Personal"
          entry1={{
            label: "Full Name",
            data: `${profile.name.first} ${profile.name.middle} ${profile.name.last}`,
          }}
          entry2={{
            label: "Birthday",
            data: new Date(profile.birthday).toLocaleString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            icon: <CalendarOutlined style={{ fontSize: 20 }} />,
          }}
          entry3={{ label: "User ID", data: profile.userProfile.public_id }}
          icon={<UserOutlined style={{ fontSize: 30 }} />}
          loading={isLoading}
        />
        <Information
          information="Contact"
          icon={<PhoneOutlined style={{ fontSize: 30 }} />}
          entry1={{
            label: "Email Address",
            data: profile.email,
            icon: <MailOutlined style={{ fontSize: 20 }} />,
          }}
          entry2={{
            label: "Phone Number",
            data: profile.contact,
            icon: <PhoneOutlined style={{ fontSize: 20 }} />,
          }}
          entry3={{
            label: "Address",
            data: profile.address,
            icon: <EnvironmentOutlined style={{ fontSize: 20 }} />,
          }}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default Profile;
